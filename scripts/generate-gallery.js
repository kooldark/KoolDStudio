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
        const entries = fs.readdirSync(folderPath, { withFileTypes: true });
        const subFolders = entries.filter(dirent => dirent.isDirectory());

        if (subFolders.length > 0) {
            // This folder has sub-albums, so we treat it like 'cuoi'
            allImages[folder] = {};

            // Handle loose image files in the main folder
            const looseFiles = entries
                .filter(dirent => dirent.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(dirent.name))
                .map(dirent => dirent.name);

            if (looseFiles.length > 0) {
                allImages[folder]['Ảnh lẻ'] = looseFiles;
            }

            // Handle sub-folders (albums)
            subFolders.forEach(subFolder => {
                const subFolderPath = path.join(folderPath, subFolder.name);
                const files = fs.readdirSync(subFolderPath).filter(file =>
                    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
                );
                if (files.length > 0) {
                    allImages[folder][subFolder.name] = files;
                }
            });
        } else {
            // This folder does NOT have sub-albums, so we list images directly
            const files = entries
                .filter(dirent => dirent.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(dirent.name))
                .map(dirent => dirent.name);
            
            if (files.length > 0) {
                allImages[folder] = files;
            } else {
                allImages[folder] = [];
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${folderPath}:`, error);
        allImages[folder] = {};
    }
});

try {
    fs.writeFileSync(outputJsonFile, JSON.stringify(allImages, null, 2));
    console.log(`✅ Successfully generated ${outputJsonFile}`);
} catch (error) {
    console.error(`Error writing to ${outputJsonFile}:`, error);
}
