<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Automated Cocoon Quality Assessment & Silk Yield Estimation – README</title>
<meta name="description" content="AI-powered cocoon quality assessment using YOLOv8 + EfficientNet-B0 with Renditta-based silk yield estimation and a Flask web app." />
<style>
  :root{
    --bg:#0b1020; --panel:#0f1530; --muted:#98a2b3; --text:#e6e7ea; --brand:#7c9cff; --accent:#9ef0b8;
    --code:#0a0f1f; --border:#1e2440; --chip:#1b2242; --badge:#181f3a;
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial}
  a{color:var(--brand);text-decoration:none}
  a:hover{text-decoration:underline}
  code,kbd,pre{font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace}
  .wrap{display:grid;grid-template-columns:280px 1fr;gap:24px;max-width:1200px;margin:32px auto;padding:0 16px}
  .side{position:sticky;top:16px;height:max-content;background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:16px}
  .brand{display:flex;align-items:center;gap:12px;margin-bottom:12px}
  .logo{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--brand),var(--accent))}
  .title{font-weight:700;font-size:18px}
  .badgebar{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 4px}
  .badge{font-size:12px;padding:6px 10px;border-radius:999px;background:var(--badge);border:1px solid var(--border)}
  .toc h4{margin:8px 0 6px;color:#cbd5e1;font-size:13px;letter-spacing:.02em;text-transform:uppercase}
  .toc ul{list-style:none;padding:0;margin:0}
  .toc li{margin:.2rem 0}
  .toc a{display:block;padding:6px 8px;border-radius:8px;color:#dbe2ff}
  .toc a:hover{background:#11183a}
  .main{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:24px}
  h1,h2,h3{scroll-margin-top:80px}
  h1{font-size:28px;margin:.2rem 0 1rem}
  h2{font-size:22px;margin:1.6rem 0 .6rem;border-top:1px solid var(--border);padding-top:1rem}
  h3{font-size:18px;margin:1.2rem 0 .4rem;color:#d8dbea}
  .chips{display:flex;flex-wrap:wrap;gap:8px;margin:.6rem 0 1rem}
  .chip{background:var(--chip);border:1px solid var(--border);padding:6px 10px;border-radius:999px;font-size:12px}
  .lead{color:#d6e0ff}
  .hero{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0 20px}
  .btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(180deg,#1a2250,#141a3a);
       border:1px solid var(--border);padding:10px 14px;border-radius:10px;color:#e9ecff;text-decoration:none}
  .btn:hover{filter:brightness(1.08)}
  .grid{display:grid;gap:14px}
  @media(min-width:840px){.grid.two{grid-template-columns:1fr 1fr}}
  pre{background:var(--code);border:1px solid var(--border);border-radius:12px;padding:14px;overflow:auto}
  pre:has(code[block="true"]){position:relative}
  .copy{position:absolute;right:10px;top:10px;padding:6px 10px;font-size:12px;border:1px solid var(--border);
        background:#121735;border-radius:8px;color:#cfd6ff;cursor:pointer}
  ul{margin:.6rem 0 .6rem 1.1rem}
  li{margin:.25rem 0}
  .callout{border:1px dashed var(--border);background:#0c1330;padding:12px 14px;border-radius:12px;color:#dbe2ff}
  .kbd{border:1px solid var(--border);background:#09102a;padding:2px 6px;border-radius:6px}
  .screens{display:grid;gap:12px}
  @media(min-width:760px){.screens{grid-template-columns:repeat(3,1fr)}}
  .shot{aspect-ratio:16/10;border-radius:12px;border:1px solid var(--border);background:#0a1028;display:flex;align-items:center;justify-content:center;color:#6b7280}
  .foot{margin-top:24px;padding-top:12px;border-top:1px solid var(--border);color:var(--muted);font-size:14px}
</style>
</head>
<body>
  <div class="wrap">
    <aside class="side">
      <div class="brand">
        <div class="logo" aria-hidden="true"></div>
        <div>
          <div class="title">Cocoon Quality Assessment</div>
          <div style="font-size:13px;color:var(--muted)">YOLOv8 + EfficientNet-B0 + Flask</div>
        </div>
      </div>

      <div class="badgebar">
        <span class="badge">Python 3.x</span>
        <span class="badge">YOLOv8 (seg)</span>
        <span class="badge">EfficientNet-B0</span>
        <span class="badge">PyTorch</span>
        <span class="badge">OpenCV</span>
        <span class="badge">Roboflow</span>
        <span class="badge">Flask</span>
        <span class="badge">MIT</span>
      </div>

      <div class="toc">
        <h4>Contents</h4>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#workflow">System Workflow</a></li>
          <li><a href="#structure">Project Structure</a></li>
          <li><a href="#performance">Model Performance</a></li>
          <li><a href="#install">Installation & Setup</a></li>
          <li><a href="#dataset">Dataset</a></li>
          <li><a href="#tech">Technologies</a></li>
          <li><a href="#yield">Silk Yield Estimation</a></li>
          <li><a href="#screens">Screenshots</a></li>
          <li><a href="#license">License</a></li>
          <li><a href="#contributors">Contributors</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </aside>

    <main class="main">
      <h1>🐛 Automated Cocoon Quality Assessment and Silk Yield Estimation</h1>
      <p class="lead">
        AI-powered system that automates silk cocoon grading and yield estimation using a <strong>two-stage deep learning pipeline</strong>:
        <strong>YOLOv8</strong> for detection/segmentation and <strong>EfficientNet-B0</strong> for fine-grained classification.
        Includes a <strong>Renditta-based</strong> silk yield estimator and a <strong>Flask</strong> web interface for real-time use.
      </p>

      <div class="hero">
        <a class="btn" href="https://github.com/omrajbhalke/Cocoon_Classification" target="_blank" rel="noopener">🔗 View Source</a>
        <a class="btn" href="#install">⚙️ Get Started</a>
        <a class="btn" href="#performance">📊 Metrics</a>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          Manual cocoon grading is slow and subjective (typically 70–80% accurate). This project leverages
          computer vision and deep learning to deliver consistent, fast, and precise grading:
        </p>
        <ul>
          <li><strong>96.1% mAP@0.5</strong> in cocoon segmentation</li>
          <li><strong>97% classification accuracy</strong> for quality grading</li>
        </ul>
        <p>Supports industrial-scale factories and small farms with automated defect detection, batch grading, and yield forecasting.</p>
        <div class="chips">
          <span class="chip">Defects: double</span>
          <span class="chip">pierced</span>
          <span class="chip">crushed</span>
          <span class="chip">decayed</span>
          <span class="chip">yellow-spotted</span>
          <span class="chip">qualified (good)</span>
        </div>
      </section>

      <section id="workflow">
        <h2>System Workflow</h2>
        <div class="grid two">
          <div>
            <h3>1) Data Acquisition</h3>
            <ul>
              <li>3,460 cocoons photographed (smartphone cameras)</li>
              <li>Final curated dataset: <strong>3,068 annotated cocoons</strong> across 6 categories</li>
            </ul>

            <h3>2) Preprocessing & Augmentation</h3>
            <ul>
              <li>YOLOv8: 640×640; EfficientNet-B0: 224×224</li>
              <li>Mosaic, mixup, flips, rotations, brightness/contrast</li>
            </ul>

            <h3>3) Stage 1 — Segmentation (YOLOv8)</h3>
            <ul>
              <li>Detects/segments individual cocoons from batch images</li>
              <li>Robust to dense packing and lighting variations</li>
            </ul>
          </div>
          <div>
            <h3>4) Stage 2 — Classification (EfficientNet-B0)</h3>
            <ul>
              <li>Classifies each cocoon into: Good, Double, Crushed, Decayed, Pierced, Yellow-spotted</li>
            </ul>

            <h3>5) Yield Estimation</h3>
            <ul>
              <li>Industry-standard <strong>Renditta</strong> formula with batch weight & quality distribution</li>
            </ul>

            <h3>6) Deployment</h3>
            <ul>
              <li>Flask backend + HTML/CSS/JS frontend</li>
              <li>Real-time reports with grading & yield outputs</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="structure">
        <h2>Project Structure</h2>
        <div style="position:relative">
          <button class="copy" data-copy="tree">Copy</button>
          <pre><code id="tree" block="true">Cocoon_Classification/
├── app.py                 # Flask backend for inference & API
├── app.js                 # Frontend logic (AJAX to backend)
├── index.html             # Web UI for uploads & results
├── style.css              # Frontend styling
├── best_classifier.pth    # EfficientNet-B0 classification weights
├── best_s_300.pt          # YOLOv8 segmentation weights
├── uploads/               # Uploaded images
└── requirements.txt       # Python dependencies
</code></pre>
        </div>
      </section>

      <section id="performance">
        <h2>Model Performance</h2>
        <h3>Segmentation (YOLOv8)</h3>
        <ul>
          <li><strong>mAP@0.5:</strong> 96.1%</li>
          <li><strong>Precision:</strong> 98.3%</li>
          <li><strong>Recall:</strong> 94.9%</li>
          <li><strong>F1-score:</strong> 96.6%</li>
        </ul>

        <h3>Classification (EfficientNet-B0)</h3>
        <ul>
          <li><strong>Accuracy:</strong> 97%</li>
          <li><strong>Defective — Precision/Recall:</strong> 100% / 93%</li>
          <li><strong>Qualified — Precision/Recall:</strong> 94% / 100%</li>
        </ul>
      </section>

      <section id="install">
        <h2>Installation & Setup</h2>
        <div class="callout">Prereqs: Python 3.x, pip, and (optionally) a GPU-enabled PyTorch environment.</div>

        <h3>1) Clone</h3>
        <div style="position:relative">
          <button class="copy" data-copy="clone">Copy</button>
          <pre><code id="clone" block="true">git clone https://github.com/omrajbhalke/Cocoon_Classification.git
cd Cocoon_Classification
</code></pre>
        </div>

        <h3>2) Install dependencies</h3>
        <div style="position:relative">
          <button class="copy" data-copy="deps">Copy</button>
          <pre><code id="deps" block="true">pip install -r requirements.txt
</code></pre>
        </div>

        <h3>3) Verify trained models</h3>
        <ul>
          <li>Ensure <code>best_s_300.pt</code> and <code>best_classifier.pth</code> are in the repo root.</li>
        </ul>

        <h3>4) Run the app</h3>
        <div style="position:relative">
          <button class="copy" data-copy="run">Copy</button>
          <pre><code id="run" block="true">python app.py
# Backend starts at http://localhost:5000
</code></pre>
        </div>

        <h3>5) Open the frontend</h3>
        <ul>
          <li>Open <code>index.html</code> directly or serve via a local HTTP server.</li>
        </ul>
      </section>

      <section id="dataset">
        <h2>Dataset</h2>
        <ul>
          <li>Total images: <strong>3,068 cocoons</strong></li>
          <li>Categories & counts:
            <ul>
              <li>Good — 773</li>
              <li>Double — 468</li>
              <li>Crushed — 681</li>
              <li>Decayed — 474</li>
              <li>Pierced — 207</li>
              <li>Yellow-spotted — 465</li>
            </ul>
          </li>
          <li>Annotated using <strong>Roboflow</strong> for YOLOv8 segmentation training</li>
        </ul>
      </section>

      <section id="tech">
        <h2>Technologies Used</h2>
        <div class="chips">
          <span class="chip">Python 3.x</span>
          <span class="chip">YOLOv8 (segmentation)</span>
          <span class="chip">EfficientNet-B0</span>
          <span class="chip">PyTorch</span>
          <span class="chip">Roboflow</span>
          <span class="chip">OpenCV</span>
          <span class="chip">Flask</span>
          <span class="chip">HTML/CSS/JS</span>
        </div>
      </section>

      <section id="yield">
        <h2>Silk Yield Estimation</h2>
        <p>Uses the industry-standard <strong>Renditta</strong> approach:</p>
        <pre><code block="true">Silk Yield (kg) = Total Cocoon Weight (kg) / Effective Renditta
</code></pre>
        <p><strong>Batch Grades</strong></p>
        <ul>
          <li>Grade A: &gt; 85% qualified</li>
          <li>Grade B: 70–84%</li>
          <li>Grade C: 50–69%</li>
          <li>Substandard: &lt; 50%</li>
        </ul>
      </section>

      <section id="license">
        <h2>License</h2>
        <p>Released under the <strong>MIT License</strong>. Add a <code>LICENSE</code> file for clarity.</p>
      </section>

      <section id="contributors">
        <h2>Contributors</h2>
        <ul>
          <li>Omraj Ravindra Bhalke, Aryan Vats, Krrish Agrawal, Aditya Singh</li>
        </ul>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          📧 <a href="mailto:omrajbhalke245@gmail.com">omrajbhalke245@gmail.com</a> &nbsp;•&nbsp;
          🧑‍💻 <a href="https://github.com/omrajbhalke" target="_blank" rel="noopener">@omrajbhalke</a> &nbsp;•&nbsp;
          🔗 <a href="https://github.com/omrajbhalke/Cocoon_Classification" target="_blank" rel="noopener">Repository</a>
        </p>
        <div class="foot">Tip: Add real screenshots and a LICENSE file to polish the repo for recruiters and collaborators.</div>
      </section>
    </main>
  </div>

<script>
  // Copy-to-clipboard for code blocks
  document.querySelectorAll('.copy').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.getAttribute('data-copy');
      const el = document.getElementById(id);
      if(!el) return;
      navigator.clipboard.writeText(el.innerText.trim()).then(()=>{
        const old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(()=> btn.textContent = old, 1200);
      });
    });
  });
</script>
</body>
</html>
