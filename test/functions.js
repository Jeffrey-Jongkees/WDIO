import testData from '../'

import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function downloadFile() {
    // Destructure the variables from the test data
    const { attributeSelector, attribute, nameDirectory, nameDocument, website } = testData.fileDownload;

    // Navigate to the page 
    await browser.url(website);

    // Extract the download URL using WebdriverIO's methods
    const downloadUrl = await browser.getAttribute(attributeSelector, attribute);

    // Define the path for the downloads folder
    const downloadsFolderPath = path.resolve(process.cwd(), nameDirectory);

    // Ensure the downloads folder exists
    if (!fs.existsSync(downloadsFolderPath)) {
        fs.mkdirSync(downloadsFolderPath, { recursive: true });
    }

    // Define the full path for saving the file
    const downloadPath = path.join(downloadsFolderPath, nameDocument);

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
