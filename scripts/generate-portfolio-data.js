const fs = require('fs').promises;
const path = require('path');

const PORTFOLIO_DIR = path.join(__dirname, '../assets/img/portfolio');
const OUTPUT_FILE = path.join(__dirname, '../assets/js/portfolio-data.json');

async function generatePortfolioData() {
    console.log('Starting portfolio data generation...');

    const allData = { categories: [] };
    const categories = (await fs.readdir(PORTFOLIO_DIR, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const categoryId of categories) {
        const categoryPath = path.join(PORTFOLIO_DIR, categoryId);
        const categoryInfoPath = path.join(categoryPath, 'category-info.json');

        let categoryTitle = categoryId;
        let categoryDescription = '';

        try {
            const categoryInfoContent = await fs.readFile(categoryInfoPath, 'utf8');
            const categoryInfo = JSON.parse(categoryInfoContent);
            categoryTitle = categoryInfo.title || categoryId;
            categoryDescription = categoryInfo.description || '';
        } catch (error) {
            console.warn(`- Warning: Could not read category info for "${categoryId}". Using defaults.`);
        }

        const categoryData = {
            id: categoryId,
            title: categoryTitle,
            description: categoryDescription,
            albums: [],
        };

        const albums = (await fs.readdir(categoryPath, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const albumId of albums) {
            const albumPath = path.join(categoryPath, albumId);
            const albumInfoPath = path.join(albumPath, 'info.json');

            let albumTitle = albumId;
            let albumDescription = '';

            try {
                const albumInfoContent = await fs.readFile(albumInfoPath, 'utf8');
                const albumInfo = JSON.parse(albumInfoContent);
                albumTitle = albumInfo.title || albumId;
                albumDescription = albumInfo.description || '';
            } catch (error) {
                 // It's okay if an album doesn't have an info file, we'll use defaults.
            }
            
            const imageFiles = (await fs.readdir(albumPath))
                .filter(file => file.toLowerCase().endsWith('.webp'))
                .sort(); // Sort alphabetically

            if (imageFiles.length === 0) {
                console.warn(`- Warning: Album "${albumId}" in category "${categoryId}" has no images. Skipping.`);
                continue;
            }

            // Find a cover image: one starting with '0' or 'cover', otherwise the first image.
            let coverImage = imageFiles.find(file => file.startsWith('0') || file.toLowerCase().startsWith('cover'));
            if (!coverImage) {
                coverImage = imageFiles[0];
            }

            categoryData.albums.push({
                id: albumId,
                title: albumTitle,
                description: albumDescription,
                path: `${categoryId}/${albumId}`, // Relative path for URLs
                coverImage: coverImage,
                images: imageFiles,
            });
        }
        
        // Only add category if it has at least one album with images
        if (categoryData.albums.length > 0) {
            allData.categories.push(categoryData);
        }
    }

    try {
        await fs.writeFile(OUTPUT_FILE, JSON.stringify(allData, null, 2));
        console.log(`
✅ Successfully generated portfolio data at:
   ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('\n❌ Error writing portfolio data file:', error);
    }
}

generatePortfolioData();
