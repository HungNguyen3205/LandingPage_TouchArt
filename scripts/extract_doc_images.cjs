const fs = require('fs');
const path = require('path');

const htmlPath = 'C:/Users/Surface/.gemini/antigravity-ide/brain/20583221-711e-4b83-bff5-6b0998d9ebe2/.system_generated/steps/26/content.md';
const html = fs.readFileSync(htmlPath, 'utf-8');

const outDir = path.resolve('public/images/client');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const regex = /<img[^>]+src="data:image\/(png|jpeg|jpg);base64,([^"]+)"/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  count++;
  const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
  const base64Data = match[2];
  const filePath = path.join(outDir, `doc_img_${count}.${ext}`);
  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
  console.log(`Saved: doc_img_${count}.${ext} (size: ${(base64Data.length * 0.75 / 1024).toFixed(1)} KB)`);
}
console.log(`Total images extracted: ${count}`);
