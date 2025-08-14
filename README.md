# 🐛 Automated Cocoon Quality Assessment and Silk Yield Estimation

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Segmentation-green.svg)
![EfficientNet](https://img.shields.io/badge/EfficientNet-B0-orange.svg)
![OpenCV](https://img.shields.io/badge/OpenCV-4.x-red.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

An **AI-powered cocoon quality assessment system** that automates silk cocoon grading and yield estimation using a **two-stage deep learning pipeline**:

1. **YOLOv8** – for cocoon detection and segmentation  
2. **EfficientNet-B0** – for fine-grained classification into 6 quality categories  

Includes a **Renditta-based silk yield estimator** and a **Flask-based web interface** for real-time industrial deployment.

---

## 📌 Overview

Manual silk cocoon grading is **slow**, **inconsistent**, and **subjective**, with accuracy typically ranging from 70–80%.  
This project leverages **computer vision** and **deep learning** to improve grading consistency, speed, and precision, achieving:

- **96.1% mAP@0.5** in cocoon segmentation  
- **97% classification accuracy** for quality grading  

The system is suitable for **industrial-scale silk factories** and **small farms**, offering:
- Automated defect detection (double, pierced, crushed, decayed, yellow-spotted)  
- Batch-level grading and yield forecasting  
- Real-time web-based reporting

---

## 🖼️ System Workflow

1. **Data Acquisition**  
   - 3,460 cocoons photographed with high-resolution smartphone cameras  
   - Final dataset: **3,068 annotated cocoons** across 6 quality categories  

2. **Preprocessing & Augmentation**  
   - Resized to 640×640 pixels (YOLOv8) / 224×224 pixels (EfficientNet-B0)  
   - Augmentations: mosaic, mixup, flips, rotations, brightness/contrast adjustments  

3. **Stage 1 – Segmentation (YOLOv8)**  
   - Detects and segments individual cocoons from batch images  
   - Achieves high precision even under varying lighting and dense packing  

4. **Stage 2 – Classification (EfficientNet-B0)**  
   - Classifies each cocoon into one of six categories:  
     - **Good (Qualified)**  
     - **Double, Crushed, Decayed, Pierced, Yellow-spotted (Defective)**  

5. **Yield Estimation**  
   - Uses industry-standard **Renditta** formula to estimate silk production from batch weight and quality distribution  

6. **Deployment**  
   - Flask backend + HTML/CSS/JavaScript frontend for real-time use  
   - Generates detailed batch reports with grading and yield outputs

---

## 🏗️ Project Structure

```
Cocoon_Classification/
├── app.py                 # Flask backend for model inference and API
├── app.js                 # Frontend logic (AJAX requests to backend)
├── index.html             # Web interface for uploading and viewing results
├── style.css              # Frontend styling
├── best_classifier.pth    # Trained EfficientNet-B0 classification model
├── best_s_300.pt          # Trained YOLOv8 segmentation model
├── uploads/               # Directory for uploaded cocoon images
└── requirements.txt       # Python dependencies
```

---

## 📊 Model Performance

### **Segmentation (YOLOv8)**
- **mAP@0.5:** 96.1%  
- **Precision:** 98.3%  
- **Recall:** 94.9%  
- **F1-score:** 96.6%  

### **Classification (EfficientNet-B0)**
- **Accuracy:** 97%  
- **Defective Precision/Recall:** 100% / 93%  
- **Qualified Precision/Recall:** 94% / 100%  

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/omrajbhalke/Cocoon_Classification.git
cd Cocoon_Classification
```

### 2️⃣ Install Python dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Download/verify trained models

Ensure `best_s_300.pt` and `best_classifier.pth` are present in the root folder.
(If not, download from release assets or contact the maintainers.)

### 4️⃣ Run the application

```bash
python app.py
```

The backend will start at **`http://localhost:5000`**.

### 5️⃣ Access the frontend

Open `index.html` in your browser or serve it via a local server.

---

## 📂 Dataset

* Total images: **3,068 cocoons**
* Categories:
  * **Good** – 773 samples
  * **Double** – 468 samples
  * **Crushed** – 681 samples
  * **Decayed** – 474 samples
  * **Pierced** – 207 samples
  * **Yellow-spotted** – 465 samples
* Annotated using **Roboflow** for YOLOv8 segmentation training

---

## 🛠️ Technologies Used

* **Python 3.x**
* **YOLOv8** – segmentation
* **EfficientNet-B0** – classification
* **PyTorch** – deep learning framework
* **Roboflow** – dataset labeling & augmentation
* **OpenCV** – image preprocessing
* **Flask** – backend API
* **HTML, CSS, JavaScript** – frontend

---

## 📄 Silk Yield Estimation

The system predicts silk yield using **Renditta**:

```
Silk Yield (kg) = Total Cocoon Weight (kg) / Effective Renditta
```

Grades batches as:

* **Grade A:** > 85% qualified cocoons
* **Grade B:** 70–84%
* **Grade C:** 50–69%
* **Substandard:** < 50%

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

* **Omraj Ravindra Bhalke**, **Aryan Vats**, **Krrish Agrawal**, **Aditya Singh**

---

## 📬 Contact

For queries or collaboration:

* **Email:** [omrajbhalke245@gmail.com](mailto:omrajbhalke245@gmail.com)
* **GitHub:** [@omrajbhalke](https://github.com/omrajbhalke)

---
