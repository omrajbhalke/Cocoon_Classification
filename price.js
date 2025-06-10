// Updated Silk Weight & Price Estimation Calculator - Realistic Market Rates

document.getElementById("valuationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Get form values using existing HTML element IDs
    const desiredSilkWeight = parseFloat(document.getElementById("weightInput").value);
    const totalCocoonCount = parseInt(document.getElementById("totalCocoonsInput").value);
    const qualifiedPercentage = parseFloat(document.getElementById("qualifiedInput").value);
    const manualGrade = document.getElementById("gradeInput").value;
    const season = document.getElementById("seasonInput").value;
    const output = document.getElementById("priceOutput");

    // Constants
    const SINGLE_COCOON_WEIGHT = 1.5; // grams per cocoon
    
    // Auto-grade assignment based on qualified percentage (but allow manual override)
    let grade, silkYieldPercentage;
    
    // Use manual grade selection or auto-assign based on qualified percentage
    if (manualGrade) {
        grade = manualGrade;
    } else {
        if (qualifiedPercentage >= 80) {
            grade = 'A';
        } else if (qualifiedPercentage >= 60) {
            grade = 'B';
        } else {
            grade = 'C';
        }
    }
    
    // Set realistic silk yield percentage based on grade (industry standard rates)
    switch(grade) {
        case 'A': silkYieldPercentage = 18; break;  // Premium cocoons
        case 'B': silkYieldPercentage = 14; break;  // Standard cocoons
        case 'C': silkYieldPercentage = 10; break;  // Economy cocoons
        default: silkYieldPercentage = 14;
    }

    // Seasonal cocoon pricing based on government data patterns (₹ per kg)
    const seasonalCocoonPricing = {
        'A': {
            'summer': 520,      // Apr-Jun (higher demand)
            'monsoon': 480,     // Jul-Sep (moderate)
            'winter': 580,      // Oct-Dec (peak season)
            'spring': 550       // Jan-Mar (good demand)
        },
        'B': {
            'summer': 420,
            'monsoon': 380,
            'winter': 460,
            'spring': 440
        },
        'C': {
            'summer': 320,
            'monsoon': 280,
            'winter': 360,
            'spring': 340
        }
    };

    // Raw silk thread market rates (₹ per kg) - realistic wholesale prices
    const rawSilkMarketRates = {
        'A': 4800,      // Premium grade raw silk thread
        'B': 3600,      // Standard grade raw silk thread
        'C': 2400       // Economy grade raw silk thread
    };

    // Input validation
    if (isNaN(desiredSilkWeight) || desiredSilkWeight <= 0) {
        output.innerHTML = `<div class="warning">Please enter a valid desired silk weight.</div>`;
        output.style.display = "block";
        return;
    }

    if (isNaN(totalCocoonCount) || totalCocoonCount <= 0) {
        output.innerHTML = `<div class="warning">Please enter valid total cocoon count.</div>`;
        output.style.display = "block";
        return;
    }

    if (isNaN(qualifiedPercentage) || qualifiedPercentage <= 0 || qualifiedPercentage > 100) {
        output.innerHTML = `<div class="warning">Please enter a valid qualified percentage (1-100).</div>`;
        output.style.display = "block";
        return;
    }

    if (!season) {
        output.innerHTML = `<div class="warning">Please select a season.</div>`;
        output.style.display = "block";
        return;
    }

    // Calculate current cocoon analysis
    const qualifiedCocoons = Math.floor(totalCocoonCount * (qualifiedPercentage / 100));
    const defectCocoons = totalCocoonCount - qualifiedCocoons;
    const currentCocoonWeight = (totalCocoonCount * SINGLE_COCOON_WEIGHT) / 1000; // Convert to kg
    
    // Calculate current potential silk yield
    const currentPotentialSilk = (currentCocoonWeight * silkYieldPercentage * (qualifiedPercentage / 100)) / 100;

    // Calculate requirements for desired silk weight
    const totalCocoonsNeeded = (desiredSilkWeight * 1000) / 
        (SINGLE_COCOON_WEIGHT * silkYieldPercentage / 100 * qualifiedPercentage / 100);
    const totalCocoonWeightNeeded = (totalCocoonsNeeded * SINGLE_COCOON_WEIGHT) / 1000; // kg
    
    // Calculate additional requirements
    const additionalCocoonsNeeded = Math.max(0, totalCocoonsNeeded - totalCocoonCount);
    const additionalWeightNeeded = (additionalCocoonsNeeded * SINGLE_COCOON_WEIGHT) / 1000;

    // Get seasonal cocoon pricing
    const pricePerKgCocoon = seasonalCocoonPricing[grade][season];
    const totalCocoonCost = totalCocoonWeightNeeded * pricePerKgCocoon;

    // Calculate silk value using realistic market rates
    const silkValuePerKg = rawSilkMarketRates[grade];
    const totalSilkValue = desiredSilkWeight * silkValuePerKg;

    // Auto-grade suggestion based on qualified percentage
    let autoGrade = '';
    if (qualifiedPercentage >= 80) autoGrade = 'A';
    else if (qualifiedPercentage >= 60) autoGrade = 'B';
    else autoGrade = 'C';

    // Generate comprehensive output
    let resultHTML = `
        <div class="calculation-section">
            <strong>🎯 Your Requirements:</strong><br>
            Desired Silk Production: ${desiredSilkWeight} kg<br>
            Season: ${season.charAt(0).toUpperCase() + season.slice(1)}<br>
            Selected Grade: <strong>${grade}</strong><br>
            ${grade !== autoGrade ? `<em>💡 Recommended Grade based on ${qualifiedPercentage}% qualified: ${autoGrade}</em><br>` : ''}
            Silk Yield Rate: ${silkYieldPercentage}% (Industry Standard)
        </div>
        
        <div class="calculation-section">
            <strong>📊 Current Cocoon Analysis:</strong><br>
            Total Cocoons Available: ${totalCocoonCount}<br>
            Qualified Cocoons: ${qualifiedCocoons} (${qualifiedPercentage}%)<br>
            Defective Cocoons: ${defectCocoons}<br>
            Current Cocoon Weight: ${currentCocoonWeight.toFixed(3)} kg<br>
            Potential Silk from Current Stock: ${currentPotentialSilk.toFixed(3)} kg
        </div>`;

    // Requirements section
    if (currentPotentialSilk >= desiredSilkWeight) {
        const excessSilk = currentPotentialSilk - desiredSilkWeight;
        const requiredCocoons = Math.ceil(totalCocoonCount * (desiredSilkWeight / currentPotentialSilk));
        const requiredWeight = (requiredCocoons * SINGLE_COCOON_WEIGHT) / 1000;
        
        resultHTML += `
            <div class="highlight">
                <strong>✅ Excellent!</strong><br>
                You have sufficient cocoons for ${desiredSilkWeight} kg silk<br>
                Required: ${requiredCocoons} cocoons (${requiredWeight.toFixed(3)} kg)<br>
                Excess capacity: ${excessSilk.toFixed(3)} kg silk
            </div>
            
            <div class="calculation-section">
                <strong>💰 Cost Calculation:</strong><br>
                Required Cocoon Weight: ${requiredWeight.toFixed(3)} kg<br>
                Seasonal Rate (${season}): ₹${pricePerKgCocoon}/kg<br>
                <strong>Total Cocoon Cost: ₹${(requiredWeight * pricePerKgCocoon).toFixed(2)}</strong>
            </div>`;
    } else {
        resultHTML += `
            <div class="calculation-section">
                <strong>📦 Additional Requirements:</strong><br>
                Total Cocoons Needed: ${Math.ceil(totalCocoonsNeeded)}<br>
                Total Weight Needed: ${totalCocoonWeightNeeded.toFixed(3)} kg<br>
                Additional Cocoons Required: ${Math.ceil(additionalCocoonsNeeded)}<br>
                Additional Weight Required: ${additionalWeightNeeded.toFixed(3)} kg
            </div>
            
            <div class="calculation-section">
                <strong>💰 Total Investment Required:</strong><br>
                Total Cocoon Weight: ${totalCocoonWeightNeeded.toFixed(3)} kg<br>
                Seasonal Rate (${season}): ₹${pricePerKgCocoon}/kg<br>
                <strong>Total Cocoon Cost: ₹${totalCocoonCost.toFixed(2)}</strong>
            </div>`;
    }

    // Market value section
    const actualInvestment = currentPotentialSilk >= desiredSilkWeight ? 
        (totalCocoonCount * (desiredSilkWeight / currentPotentialSilk) * SINGLE_COCOON_WEIGHT / 1000 * pricePerKgCocoon) : 
        totalCocoonCost;

    // Quality recommendations
    if (qualifiedPercentage < 70) {
        const improvedCocoonsNeeded = (desiredSilkWeight * 1000) / 
            (SINGLE_COCOON_WEIGHT * silkYieldPercentage / 100 * 80 / 100);
        const reductionPercentage = ((totalCocoonsNeeded - improvedCocoonsNeeded) / totalCocoonsNeeded * 100);
        
        resultHTML += `
            <div class="warning">
                <strong>⚠️ Quality Improvement Recommendation:</strong><br>
                Current qualification (${qualifiedPercentage}%) requires more cocoons.<br>
                Improving to 80%+ would reduce quantity needed by ${reductionPercentage.toFixed(1)}%<br>
                Consider upgrading to Grade A for better returns!
            </div>`;
    }

    // Grade comparison for better decision making
    if (grade !== 'A') {
        const gradeAYield = 18;
        const gradeAPrice = rawSilkMarketRates['A'];
        const gradeACocoonsNeeded = (desiredSilkWeight * 1000) / 
            (SINGLE_COCOON_WEIGHT * gradeAYield / 100 * qualifiedPercentage / 100);
        const gradeAReturns = desiredSilkWeight * gradeAPrice;
        
        resultHTML += `
            <div class="calculation-section" style="background-color: #e8f5e8; padding: 10px; border-radius: 5px;">
                <strong>💡 Grade A Comparison:</strong><br>
                If you upgrade to Grade A quality:<br>
                • Cocoons needed: ${Math.ceil(gradeACocoonsNeeded)} (vs current ${Math.ceil(totalCocoonsNeeded)})<br>
                • Expected returns: ₹${gradeAReturns.toFixed(2)} (vs current ₹${totalSilkValue.toFixed(2)})<br>
                • Additional profit: ₹${(gradeAReturns - totalSilkValue).toFixed(2)}
            </div>`;
    }

    // Seasonal advisory
    const seasonalAdvice = {
        'summer': 'Good season for procurement, moderate prices. Consider bulk buying.',
        'monsoon': 'Lower prices but quality may vary due to humidity. Inspect carefully.',
        'winter': 'Peak season - highest prices but best quality. Premium market active.',
        'spring': 'Balanced pricing with good quality availability. Ideal for planning.'
    };

    resultHTML += `
        <div class="calculation-section">
            <strong>🌱 Seasonal Advisory:</strong><br>
            ${seasonalAdvice[season]}
        </div>`;

    // Enhanced summary table
    resultHTML += `
        <div class="calculation-section" style="margin-top: 15px;">
            <strong>📋 Executive Summary:</strong><br>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="background-color: #f1f2f6;">
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Parameter</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Value</strong></td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Target Silk Production</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${desiredSilkWeight} kg</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Quality Grade</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${grade} (${qualifiedPercentage}% | ${silkYieldPercentage}% yield)</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Cocoons Required</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${currentPotentialSilk >= desiredSilkWeight ? 
                        Math.ceil(totalCocoonCount * (desiredSilkWeight / currentPotentialSilk)) : 
                        Math.ceil(totalCocoonsNeeded)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Season</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${season.charAt(0).toUpperCase() + season.slice(1)}</td>
                </tr>
                <tr style="background-color: #d5f4e6;">
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Cocoon Cost</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>₹${actualInvestment.toFixed(2)}</strong></td>
                </tr>
            </table>
        </div>`;

    // Display results
    output.innerHTML = resultHTML;
    output.style.display = "block";
});