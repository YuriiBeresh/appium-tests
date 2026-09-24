class SettingsPage {
    // ЛОКАТОРИ (гетери — шукаються заново щоразу)
    get firstCell() {
        return $('-ios class chain:**/XCUIElementTypeCell[1]');
    }

    get navBar() {
        return $('-ios class chain:**/XCUIElementTypeNavigationBar');
    }

    get allCells() {
        return $$('-ios class chain:**/XCUIElementTypeCell');
    }

    get searchField() {
        return $('-ios class chain:**/XCUIElementTypeSearchField[`name == "Поиск"`]');
    }

    // МЕТОДИ
    async waitUntilLoaded() {
        await this.firstCell.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'Список Settings не завантажився за 15с — екран не відкрився?',
        });
    }

    async getTitle() {
        return this.navBar.getAttribute('name');
    }

    async openFirstItem() {
        await this.firstCell.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'Перша клітинка не стала видимою для тапу',
        });
        await this.firstCell.click();
    }

    // чекаємо, поки список головного екрана ЗНИКНЕ (reverse!)
    async waitUntilListDisappeared() {
        await this.firstCell.waitForDisplayed({
            reverse: true,
            timeout: 15000,
            timeoutMsg: 'Список головного екрана не зник — перехід не відбувся?',
        });
    }

    // методи пошуку (для skip-тесту)
    async tapSearch() {
        await this.searchField.waitForExist({ timeout: 15000 });
        await this.searchField.click();
    }

    async searchFor(text: string) {
        await this.searchField.setValue(text);
    }

    async getSearchValue() {
        return this.searchField.getValue();
    }
}

export default new SettingsPage();