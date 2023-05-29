import puppeteer from 'puppeteer';
import cheerio from 'cheerio';


async function getHtmlContentsOfEverySiteEverIncludingSSR(url: string) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.waitForFunction('document.readyState === "complete"');

    const html = await page.content();
    const $ = cheerio.load(html);

    await browser.close();

    return $.html();
  } catch (error) {
    console.error(error);
  }
}


const HTML = getHtmlContentsOfEverySiteEverIncludingSSR('https://website.com');