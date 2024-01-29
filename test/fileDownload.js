import {downloadFile} from "./downloadFile.js" //npx wdio run ./wdio.conf.js --spec fileDownload.js

describe('Downloading file', () => {
    it('downloading .pfd file', async () => {
        await downloadFile();
    });
});