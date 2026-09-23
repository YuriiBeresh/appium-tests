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

    // SKIP: поле пошуку в iOS Settings — декоративна заглушка.
    // Appium Inspector показує "Interactions for this element may not be available":
    // value/name/label завжди = "Поиск" (плейсхолдер), програмний ввід тексту неможливий.
    // Тап відкриває окремий екран пошуку. У реальній апці поля вводу нормальні —
    // там цей сценарій працюватиме через setValue.
    it.skip('should type into the search field', async () => {
        await SettingsPage.waitUntilLoaded();
        await SettingsPage.tapSearch();
        await SettingsPage.searchFor('Wi-Fi');

        const typed = await SettingsPage.getSearchValue();
        await expect(typed).toContain('Wi-Fi');
    });

});