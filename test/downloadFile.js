import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

let jsonData = '';

export async function downloadFile() {
    
    jsonData = await fs.readJson("./testdata.json");

    // Navigate to the page 
    //This step can be commented/removed when this function is implemented a different testscript
    //await browser.url(jsonData.fileDownload.website);

    // Selector
    const element = await browser.$(jsonData.fileDownload.attributeSelector);

    // Attribute of the selector
    const downloadUrl = await element.getAttribute(jsonData.fileDownload.attribute);

    // Define the path for the downloads folder
    const downloadsFolderPath = path.resolve(process.cwd(), jsonData.fileDownload.nameFolder);

    // Ensure the downloads folder exists
    if (!fs.existsSync(downloadsFolderPath)) {
        fs.mkdirSync(downloadsFolderPath, { recursive: true });
    }

    // Define the full path for saving the file
    const downloadPath = path.join(downloadsFolderPath, jsonData.fileDownload.nameDocument);

    // Download the file using axios
    const response = await axios({ method: 'GET', url: downloadUrl, responseType: 'stream' });
    const writer = fs.createWriteStream(downloadPath);

    // Stream the file to the filesystem
    const streamPromise = new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', (error) => {
            console.error('Stream encountered an error while writing to the file:', error);
            reject(error);
        });
    });

    response.data.pipe(writer);
    await streamPromise;
};

export default downloadFile
