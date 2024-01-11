
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
});