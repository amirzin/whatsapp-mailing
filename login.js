const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: "./user_data"
    });

    const page = await browser.newPage();
    await page.goto(`https://web.whatsapp.com/`, {
        waitUntil: 'networkidle2',
    });
})();
