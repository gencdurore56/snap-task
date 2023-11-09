/* 
Filename: advanced_web_scraping.js
Description: This code performs advanced web scraping using Node.js and Puppeteer to extract data from multiple web pages and save it to a CSV file.
*/

const puppeteer = require('puppeteer');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const websiteURLs = [
  'https://example.com/page1',
  'https://example.com/page2',
  'https://example.com/page3'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Create CSV writer
  const csvHeaders = [
    { id: 'title', title: 'Title' },
    { id: 'price', title: 'Price' },
    { id: 'description', title: 'Description' }
  ];
  const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: csvHeaders
  });

  // Iterate through each URL
  for (const url of websiteURLs) {
    await page.goto(url);

    // Extract data from the webpage
    const data = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('.title'));
      const prices = Array.from(document.querySelectorAll('.price'));
      const descriptions = Array.from(document.querySelectorAll('.description'));

      return titles.map((title, index) => ({
        title: title.textContent,
        price: prices[index].textContent,
        description: descriptions[index].textContent
      }));
    });

    // Write data to CSV file
    await csvWriter.writeRecords(data);
    console.log(`Data successfully scraped from ${url}`);
  }

  await browser.close();
  console.log('Web scraping completed.');
})();