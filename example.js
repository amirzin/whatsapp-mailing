const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: "./user_data"
    });

    for await (const phoneNumber of [
        '+79047673908',
        '+79047673908',
        '+79047673908'
    ]) {
        const page = await browser.newPage();
        await page.goto(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURI('Привет')}`, {
            waitUntil: 'networkidle2',
        });
        await page.waitForSelector('button [data-testid=send]', {visible: true});
        await page.focus('button [data-testid=send]');
        await page.keyboard.type('\n');
    }



    // await page.pdf({ path: 'hn.pdf', format: 'a4' });

    // await browser.close();
})();
