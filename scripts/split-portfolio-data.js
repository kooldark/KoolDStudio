const fs = require('fs').promises;
const path = require('path');

const sourceFilePath = path.join(__dirname, '../assets/js/portfolio-data.json');
const outputDir = path.join(__dirname, '../assets/js/portfolio-data');
const categoriesFilePath = path.join(__dirname, '../assets/js/categories.json');

async function splitPortfolioData() {
  try {
    // 1. Read the main data file
    console.log(`Đang đọc tệp dữ liệu chính từ: ${sourceFilePath}`);
    const mainData = await fs.readFile(sourceFilePath, 'utf-8');
    const portfolio = JSON.parse(mainData);

    // 2. Create the output directory if it doesn't exist
    console.log(`Đảm bảo thư mục đầu ra tồn tại: ${outputDir}`);
    await fs.mkdir(outputDir, { recursive: true });

    // 3. Get category keys and save them to categories.json
    const categories = Object.keys(portfolio);
    console.log(`Tìm thấy các danh mục: ${categories.join(', ')}`);
    await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));
    console.log(`Đã lưu danh sách danh mục vào: ${categoriesFilePath}`);

    // 4. Iterate and create a file for each category
    for (const category of categories) {
      const categoryData = portfolio[category];
      const outputFilePath = path.join(outputDir, `${category}.json`);
      
      console.log(`- Đang ghi dữ liệu cho danh mục '${category}' vào tệp: ${outputFilePath}`);
      await fs.writeFile(outputFilePath, JSON.stringify(categoryData, null, 2));
    }

    console.log('\nHoàn tất! Tất cả các tệp dữ liệu đã được chia nhỏ thành công.');

  } catch (error) {
    console.error('\nĐã xảy ra lỗi trong quá trình xử lý:', error);
    process.exit(1); // Exit with an error code
  }
}

splitPortfolioData();