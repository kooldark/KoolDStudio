const fs = require('fs');
const path = require('path');

// Define the directory for hero images and the output JSON file path
const heroDir = path.join(__dirname, '..', 'assets', 'img', 'hero');
const outputJsonFile = path.join(__dirname, '..', 'assets', 'js', 'hero-images.json');

let heroImages = [];

try {
    // Check if the directory exists
    if (fs.existsSync(heroDir)) {
        // Read all files in the directory, filter for common image formats
        heroImages = fs.readdirSync(heroDir).filter(file => 
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );
    }
} catch (error) {
    console.error(`Error reading directory ${heroDir}:`, error);
}

try {
    // Write the array of filenames to the JSON file
    fs.writeFileSync(outputJsonFile, JSON.stringify(heroImages, null, 2));
    console.log(`✅ Successfully generated ${outputJsonFile} with ${heroImages.length} images.`);
} catch (error) {
    console.error(`Error writing to ${outputJsonFile}:`, error);
}
