import {downloadFile} from "./functions.js" //npx wdio run ./wdio.conf.js

describe('Downloading file', () => {
    it('downloading .pfd file', async () => {
        await downloadFile();
    });
});