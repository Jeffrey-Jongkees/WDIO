
describe('Drag and Drop', () => {
    beforeEach(() => {
        browser.maximizeWindow()
    });
    
    it('Testing drag and drop', async () => {
        
        await browser.url('/Actions/index.html#');

        $('#draggable').waitForDisplayed();
        const elem = await $('#draggable');
        const target = await $('#droppable');

        await browser.pause(2000);
        
        await elem.dragAndDrop(target);

        await browser.pause(2000);

        // Double click
        const doubleClick_button = await $('#double-click');
        await doubleClick_button.doubleClick();
        await browser.pause(2000);

        //Mouse over
        await ($("//button[text()='Hover Over Me First!']")).moveTo();
        await browser.pause(2000);
        const firstLink = await $('//div[@class="dropdown hover"]//a');
        await firstLink.waitForClickable();
        await firstLink.click();
        await browser.pause(2000);
    
    }); 

    it('Handling windows', async () => {
        await browser.url('https://www.webdriveruniversity.com/'); 
        await browser.newWindow('https://www.automationteststore.com/');

        let currentWindow_Title = await browser.getTitle();
        console.log(`>>Current Window Title: ${currentWindow_Title}`);
        await expect(browser).toHaveUrlContaining('automationteststore');
        

        await browser.switchWindow('webdriveruniversity.com/')
        let parentWindow_Title = await browser.getTitle();
        console.log(`>>Current Window Title: ${parentWindow_Title}`);
        await expect(browser).toHaveUrlContaining('webdriveruniversity');


        await $('[id="contact-us"]').click() 
        await browser.switchWindow('automationteststore')
        await browser.closeWindow();

        await browser.switchWindow('contactus')
        await browser.closeWindow();

        await browser.switchWindow('webdriveruni')
        console.log(await browser.getTitle());
    });

    it('Iframes', async () => {
        await browser.url('IFrame/index.html')
        const iframe = await $('[id="frame"]')
        await browser.switchToFrame(iframe)
        await $('[href="products.html"]').click()
        await browser.switchToParentFrame();
    });

    it('Alerts', async () => {
        await browser.url('Popup-Alerts/index.html');
        await $('[id="button1"]').click();
        await browser.acceptAlert();

        await $('[id="button4"]').click();
        const alertText = await browser.getAlertText();
        expect(alertText).toEqual('Press a button!');

        await browser.acceptAlert();//uses the positive route. Pressing OK for this instance
        await expect($('[id="confirm-alert-text"]')).toHaveText('You pressed OK!');
        await browser.pause(2000);

        await $('[id="button4"]').click();
        await browser.dismissAlert();
        await expect($('[id="confirm-alert-text"]')).toHaveText('You pressed Cancel!');

    });

    it('File upload', async () => {
        await browser.url('File-Upload/index.html');
        await $('[id="myFile"]').addValue(`${process.cwd()}\\test\\uploadTestFile.txt`)
        await $('[id="submit-button"]').click()

        const alertText = await browser.getAlertText();
        expect(alertText).toEqual('Your file has now been uploaded!');

    });


    it('JS execute - hidden elements', async () => {
        await browser.url('Hidden-Elements/index.html');
        await browser.execute(()=> {
            return document.getElementById('not-displayed').setAttribute("id", "");
        })
        
        await browser.execute(()=> {
            return document.body.style.backgroundColor = "tomato";
        })

    });
});