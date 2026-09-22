describe('iOS Settings app', () => {

    // Тест 1: список Settings завантажився
    it('should open Settings and show the list', async () => {
        // розумне очікування замість pause: чекаємо появу першої клітинки
        const firstCell = $('-ios class chain:**/XCUIElementTypeCell[1]');
        await firstCell.waitForDisplayed({ timeout: 15000 });

        const rows = await $$('-ios class chain:**/XCUIElementTypeCell');
        await expect(rows.length).toBeGreaterThan(0);
    });

    // Тест 2: тап по першому пункту → перехід на новий екран
    it('should navigate into the first settings item', async () => {
        const firstCell = $('-ios class chain:**/XCUIElementTypeCell[1]');
        await firstCell.waitForDisplayed({ timeout: 15000 });

        // читаємо заголовок навбару ДО тапу (name = заголовок екрана)
        const titleBefore = await $('-ios class chain:**/XCUIElementTypeNavigationBar')
            .getAttribute('name');

        // тап по першій клітинці
        await firstCell.click();

        // чекаємо, поки заголовок ЗМІНИТЬСЯ — це доказ переходу
        await browser.waitUntil(async () => {
            const titleNow = await $('-ios class chain:**/XCUIElementTypeNavigationBar')
                .getAttribute('name');
            return titleNow !== titleBefore;
        }, {
            timeout: 15000,
            timeoutMsg: 'Заголовок не змінився — перехід не відбувся',
        });

        const titleAfter = await $('-ios class chain:**/XCUIElementTypeNavigationBar')
            .getAttribute('name');
        await expect(titleAfter).not.toEqual(titleBefore);
    });

});