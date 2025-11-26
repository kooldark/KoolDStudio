const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const heroDir = path.resolve(__dirname, '..', 'assets', 'img', 'hero');
const generateScript = path.resolve(__dirname, 'generate-hero-json.js');

console.log(`Watching for file changes in ${heroDir}`);

fs.watch(heroDir, (eventType, filename) => {
  if (filename) {
    console.log(`\nDetected ${eventType} in ${filename}.`);
    console.log('Regenerating hero-images.json...');
    
    exec(`node "${generateScript}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
      console.log('Successfully regenerated hero-images.json');
    });
  }
});
