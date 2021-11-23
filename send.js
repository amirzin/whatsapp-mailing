const puppeteer = require('puppeteer');
const fs = require('fs');
var util = require('util');
const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
const log_stdout = process.stdout;

const logToFile = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: "./user_data"
    });

    for await (const phoneNumber of [
        '+79214393060',
        '+79047673908',
        '+79033199454'
    ]) {
        try {
            const page = await browser.newPage();
            await page.goto(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURI('Тест')}`, {
                waitUntil: 'networkidle2',
            });
            try {
                var submitBtn = await page.waitForSelector('button [data-testid=send]', {visible: true, timeout: 10000});
            } catch (e) {
                logToFile(`Не удалось отправить на номер ${phoneNumber}`);
            }

            if (submitBtn) {
                await page.focus('button [data-testid=send]');
                // await page.keyboard.type('\n');
                logToFile(`Отправлено на номер ${phoneNumber}`);
                page.on('dialog', async dialog => {
                    console.log(dialog.message());
                    await dialog.dismiss();
                });
            }

            await page.close();


        } catch (e) {

        }
    }



    // await page.pdf({ path: 'hn.pdf', format: 'a4' });

    // await browser.close();
})();
