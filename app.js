// Run image segmentation simulation
function runSegmentation() {
  const input = document.getElementById("uploadImage");
  const details = document.getElementById("cocoonDetails");
  const output = document.getElementById("outputImage");

  if (!input.files.length) {
    alert("Please upload a cocoon image first.");
    return;
  }

  // Simulate preview (could be replaced with backend response later)
  const reader = new FileReader();
  reader.onload = function (e) {
    output.src = e.target.result;
    details.innerHTML = `
      <strong>Segmentation Result:</strong><br/>
      📏 Length: <b>3.2 cm</b><br/>
      📐 Width: <b>1.1 cm</b><br/>
      🧬 Grade: <b>A</b><br/>
      🟢 Defects: <b>None</b>
    `;
  };
  reader.readAsDataURL(input.files[0]);
}

// Handle price estimation form
document.getElementById("valuationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById("weightInput").value);
  const grade = document.getElementById("gradeInput").value;
  const output = document.getElementById("priceOutput");

  if (isNaN(weight) || weight <= 0) {
    output.innerHTML = `<span class="text-danger">Please enter a valid weight in grams.</span>`;
    return;
  }

  const pricePerGram = {
    A: 15,
    B: 10,
    C: 5
  };

  const estimatedPrice = weight * pricePerGram[grade];
  output.innerHTML = `
    💰 <strong>Estimated Market Price:</strong><br/>
    ₹ <b>${estimatedPrice.toFixed(2)}</b> (Grade ${grade}, ${weight}g)
  `;
});

// Optional: Auto-clear output on file change
document.getElementById("uploadImage").addEventListener("change", function () {
  document.getElementById("cocoonDetails").innerHTML = "";
  document.getElementById("outputImage").src = "assets/placeholder.jpg";
});
