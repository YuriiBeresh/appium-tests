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

});