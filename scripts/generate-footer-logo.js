import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// SVG representing "Brigadeiro Sem Fundo.png" - Circular Seal with Brigadeiro & Sparkle Stars
const brigadeiroSealSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DEB35E"/>
      <stop offset="50%" stop-color="#C99741"/>
      <stop offset="100%" stop-color="#B8832C"/>
    </linearGradient>
  </defs>

  <!-- Outer Double Hand-drawn Style Circles -->
  <circle cx="256" cy="256" r="238" fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round" />
  <circle cx="256" cy="256" r="220" fill="none" stroke="url(#goldGrad)" stroke-width="2.8" stroke-linecap="round" stroke-opacity="0.88" />

  <!-- Stars (Top Right) -->
  <!-- Large Star -->
  <path d="M 350 100 Q 350 135 382 135 Q 350 135 350 170 Q 350 135 318 135 Q 350 135 350 100 Z" fill="url(#goldGrad)" />
  <!-- Small Star -->
  <path d="M 390 162 Q 390 184 410 184 Q 390 184 390 206 Q 390 184 370 184 Q 390 184 390 162 Z" fill="url(#goldGrad)" />

  <g fill="none" stroke="url(#goldGrad)" stroke-linecap="round" stroke-linejoin="round">
    <!-- Brigadeiro Dome -->
    <path d="M 130 270 C 122 170, 200 155, 256 155 C 312 155, 390 170, 382 270" stroke-width="7.5" fill="none" />

    <!-- Sprinkles / Granulados -->
    <rect x="202" y="180" width="7" height="20" rx="3.5" transform="rotate(45 205 190)" fill="url(#goldGrad)" stroke="none" />
    <rect x="278" y="182" width="7" height="20" rx="3.5" transform="rotate(-35 281 192)" fill="url(#goldGrad)" stroke="none" />
    <rect x="245" y="210" width="7" height="20" rx="3.5" transform="rotate(60 248 220)" fill="url(#goldGrad)" stroke="none" />
    <rect x="160" y="222" width="7" height="20" rx="3.5" transform="rotate(-40 163 232)" fill="url(#goldGrad)" stroke="none" />
    <rect x="312" y="215" width="7" height="20" rx="3.5" transform="rotate(28 315 225)" fill="url(#goldGrad)" stroke="none" />
    <rect x="280" y="246" width="7" height="20" rx="3.5" transform="rotate(-50 283 256)" fill="url(#goldGrad)" stroke="none" />
    <rect x="220" y="268" width="7" height="20" rx="3.5" transform="rotate(35 223 278)" fill="url(#goldGrad)" stroke="none" />
    <rect x="175" y="264" width="7" height="20" rx="3.5" transform="rotate(30 178 274)" fill="url(#goldGrad)" stroke="none" />
    <rect x="330" y="266" width="7" height="20" rx="3.5" transform="rotate(-30 333 276)" fill="url(#goldGrad)" stroke="none" />

    <!-- Wrapper Top Scalloped Ruffled Border -->
    <path d="M 108 270 C 108 250, 126 250, 126 270 C 126 250, 144 250, 144 270 C 144 250, 162 250, 162 270 C 162 250, 180 250, 180 270 C 180 250, 198 250, 198 270 C 198 250, 216 250, 216 270 C 216 250, 234 250, 234 270 C 234 250, 252 250, 252 270 C 252 250, 270 250, 270 270 C 270 250, 288 250, 288 270 C 288 250, 306 250, 306 270 C 306 250, 324 250, 324 270 C 324 250, 342 250, 342 270 C 342 250, 360 250, 360 270 C 360 250, 378 250, 378 270 C 378 250, 396 250, 396 270 C 396 250, 404 258, 404 270" stroke-width="6.5" fill="none" />

    <!-- Wrapper Base Outline -->
    <path d="M 110 270 L 132 300 C 132 300, 175 285, 256 285 C 337 285, 380 300, 380 300 L 402 270" stroke-width="6.5" fill="none" />
    <path d="M 132 300 L 175 400 C 205 408, 307 408, 337 400 L 380 300" stroke-width="6.5" fill="none" />

    <!-- Vertical Pleat Lines on Forminha -->
    <path d="M 152 297 L 194 402" stroke-width="5.5" />
    <path d="M 185 292 L 218 405" stroke-width="5.5" />
    <path d="M 220 288 L 243 407" stroke-width="5.5" />
    <path d="M 256 285 L 268 408" stroke-width="5.5" />
    <path d="M 292 288 L 293 407" stroke-width="5.5" />
    <path d="M 327 292 L 318 405" stroke-width="5.5" />
    <path d="M 360 297 L 342 402" stroke-width="5.5" />
  </g>
</svg>`;

async function generateFooterLogo() {
  const publicImagesDir = path.join(process.cwd(), 'public', 'images');
  fs.mkdirSync(publicImagesDir, { recursive: true });

  const svgPath = path.join(publicImagesDir, 'logo-footer.svg');
  const pngPath = path.join(publicImagesDir, 'logo-footer.png');
  const pngPathAlt = path.join(publicImagesDir, 'brigadeiro-sem-fundo.png');

  fs.writeFileSync(svgPath, brigadeiroSealSvg);

  const pngBuffer = await sharp(Buffer.from(brigadeiroSealSvg))
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(pngPath, pngBuffer);
  fs.writeFileSync(pngPathAlt, pngBuffer);

  console.log('Footer brigadeiro logo created successfully!');
}

generateFooterLogo().catch(console.error);
