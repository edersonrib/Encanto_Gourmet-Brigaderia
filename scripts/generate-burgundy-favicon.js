import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Monogram SVG with rich wine/burgundy background (#531B2A / #4A1525) and gold lettering EG
const monogramBurgundySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2B96A"/>
      <stop offset="50%" stop-color="#D09F49"/>
      <stop offset="100%" stop-color="#BE8932"/>
    </linearGradient>
  </defs>

  <!-- Solid Rich Burgundy Background -->
  <rect width="512" height="512" fill="#521B29" rx="64" />

  <!-- Outer Double Circular Hand-crafted Frame -->
  <circle cx="256" cy="256" r="226" fill="none" stroke="url(#goldGrad)" stroke-width="6.5" stroke-linecap="round" />
  <circle cx="256" cy="256" r="208" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.85" />

  <!-- Monogram Calligraphy EG -->
  <g fill="url(#goldGrad)">
    <!-- Letter E -->
    <path d="M 285 106 C 242 106 202 124 178 152 C 160 173 154 196 161 213 C 168 229 186 238 207 236 C 224 234 236 223 234 210 C 232 195 214 191 202 196 C 196 198 189 194 186 186 C 183 175 190 159 208 143 C 229 124 259 116 288 120 C 304 122 308 134 300 144 C 285 163 252 188 206 217 C 160 246 123 282 108 317 C 97 342 102 365 120 379 C 143 397 182 396 232 376 C 255 367 274 353 284 344 C 288 340 286 334 281 334 C 275 334 260 345 241 354 C 197 375 162 377 143 364 C 131 354 128 338 135 321 C 146 292 178 261 221 234 C 241 222 259 211 274 200 C 283 193 289 187 292 182 C 308 160 315 137 307 122 C 301 111 293 106 285 106 Z" />
    
    <!-- Letter G intertwined -->
    <path d="M 378 182 C 334 182 278 238 238 310 C 223 337 214 366 218 392 C 222 419 240 436 269 436 C 304 436 348 409 388 360 C 408 335 417 312 411 297 C 405 282 388 276 369 283 C 354 289 344 304 348 318 C 352 331 367 334 378 328 C 384 325 389 328 390 334 C 392 344 384 358 367 374 C 335 407 298 424 270 422 C 250 420 238 406 235 385 C 231 364 239 337 252 312 C 290 242 343 194 382 194 C 406 194 420 207 416 228 C 411 254 388 285 352 316 C 322 342 284 376 250 411 C 233 429 219 448 214 466 C 208 488 215 504 234 509 C 255 514 286 501 321 471 C 347 448 368 427 377 416 C 381 411 379 405 373 405 C 367 405 352 419 330 439 C 298 468 272 481 255 477 C 243 474 239 464 242 452 C 246 439 257 424 272 408 C 306 373 344 339 374 313 C 411 281 435 247 440 220 C 446 194 424 182 378 182 Z" />
  </g>
</svg>`;

async function updateFaviconWithBurgundy() {
  const publicDir = path.join(process.cwd(), 'public');
  const publicImagesDir = path.join(publicDir, 'images');

  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(publicImagesDir, { recursive: true });

  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, monogramBurgundySvg);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon.png', size: 64 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const item of sizes) {
    const destPath = path.join(publicDir, item.name);
    await sharp(Buffer.from(monogramBurgundySvg))
      .resize(item.size, item.size)
      .png()
      .toFile(destPath);
  }

  // High-res monogram image in public/images
  const monogramPngPath = path.join(publicImagesDir, 'monograma-encanto-gourmet.png');
  await sharp(Buffer.from(monogramBurgundySvg))
    .resize(512, 512)
    .png()
    .toFile(monogramPngPath);

  // Favicon.ico copy
  const icoPath = path.join(publicDir, 'favicon.ico');
  await sharp(Buffer.from(monogramBurgundySvg))
    .resize(48, 48)
    .png()
    .toFile(icoPath);

  console.log('New Burgundy Monogram Favicon generated successfully!');
}

updateFaviconWithBurgundy().catch(console.error);
