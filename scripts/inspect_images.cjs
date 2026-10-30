const fs = require('fs');
const html = fs.readFileSync('C:/Users/Surface/.gemini/antigravity-ide/brain/20583221-711e-4b83-bff5-6b0998d9ebe2/.system_generated/steps/26/content.md', 'utf-8');

const cleanHtml = html.replace(/src="data:image\/[^"]+"/g, 'src="[IMAGE_PLACEHOLDER]"');
const parts = cleanHtml.split('src="[IMAGE_PLACEHOLDER]"');

parts.forEach((p, idx) => {
  if (idx < parts.length - 1) {
    const before = p.replace(/<[^>]+>/g, ' ').slice(-200).replace(/\s+/g, ' ').trim();
    const after = parts[idx + 1].replace(/<[^>]+>/g, ' ').slice(0, 200).replace(/\s+/g, ' ').trim();
    console.log(`\n=== IMAGE ${idx + 1} ===`);
    console.log('BEFORE:', before);
    console.log('AFTER:', after);
  }
});
