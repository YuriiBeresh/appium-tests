import SettingsPage from '../pageobjects/settings.page';

describe('iOS Settings app', () => {

    it('should open Settings and show the list', async () => {
        await SettingsPage.waitUntilLoaded();

        const rows = await SettingsPage.allCells;
        await expect(rows.length).toBeGreaterThan(0);
    });

    it('should navigate into the first settings item', async () => {
        await SettingsPage.waitUntilLoaded();

        const titleBefore = await SettingsPage.getTitle();
        await SettingsPage.openFirstItem();

        await browser.waitUntil(async () => {
            const titleNow = await SettingsPage.getTitle();
            return titleNow !== titleBefore;
        }, {
            timeout: 15000,
            timeoutMsg: 'Заголовок не змінився — перехід не відбувся',
        });

        const titleAfter = await SettingsPage.getTitle();
        await expect(titleAfter).not.toEqual(titleBefore);
    });

    it.skip('should type into the search field', async () => {
        await SettingsPage.waitUntilLoaded();
        await SettingsPage.tapSearch();
        await SettingsPage.searchFor('Wi-Fi');

        const typed = await SettingsPage.getSearchValue();
        await expect(typed).toContain('Wi-Fi');
    });

    it('should scroll down to reveal more items', async () => {
        await SettingsPage.waitUntilLoaded();

        await SettingsPage.scrollDown();
        await SettingsPage.scrollDown();

        const rows = await SettingsPage.allCells;
        await expect(rows.length).toBeGreaterThan(0);

        await SettingsPage.scrollUp();
        await SettingsPage.scrollUp();

        await expect(SettingsPage.firstCell).toBeDisplayed();
    });

    it('should handle swipe gestures', async () => {
        await SettingsPage.waitUntilLoaded();

        await SettingsPage.swipe('up');

        const rows = await SettingsPage.allCells;
        await expect(rows.length).toBeGreaterThan(0);

        await SettingsPage.swipe('down');
        await SettingsPage.swipe('down');

        await expect(SettingsPage.firstCell).toBeDisplayed();
    });

});