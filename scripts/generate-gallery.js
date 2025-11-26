const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '..', 'assets', 'img', 'portfolio');
const outputJsonFile = path.join(portfolioDir, 'images-list.json');

// Automatically find all subdirectories in the portfolio directory
const galleryFolders = fs.readdirSync(portfolioDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const allImages = {};

galleryFolders.forEach(folder => {
    const folderPath = path.join(portfolioDir, folder);
    try {
        const files = fs.readdirSync(folderPath).filter(file => 
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );
        allImages[folder] = files;
    } catch (error) {
        console.error(`Error reading directory ${folderPath}:`, error);
        allImages[folder] = [];
    }
});

try {
    fs.writeFileSync(outputJsonFile, JSON.stringify(allImages, null, 2));
    console.log(`✅ Successfully generated ${outputJsonFile}`);
} catch (error) {
    console.error(`Error writing to ${outputJsonFile}:`, error);
}
