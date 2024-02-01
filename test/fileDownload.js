import {downloadFile} from "./downloadFile.js" //npx wdio run ./wdio.conf.js --spec fileDownload.js

describe('Downloading file', () => {

    before(async ()=> {
        await browser.url('https://www.ah.nl/privacy')

        await expect(browser).toHaveUrl('https://www.ah.nl/privacy')
    })

    it('downloading .pfd file', async () => {
        await downloadFile();
    });
});