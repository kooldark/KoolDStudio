const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '..', 'assets', 'img', 'portfolio');
const outputJsonFile = path.join(portfolioDir, 'images-list.json');

const galleryFolders = ['cuoi', 'makeup', 'gia-dinh', 'phong-su'];

const allImages = {};

galleryFolders.forEach(folder => {
    const folderPath = path.join(portfolioDir, folder);
    try {
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath).filter(file => 
                /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
            );
            allImages[folder] = files;
        } else {
            allImages[folder] = [];
        }
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
