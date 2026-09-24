class SettingsPage {
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

    async waitUntilLoaded() {
        await this.firstCell.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'Список Settings не завантажився за 15с',
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

    async scrollDown() {
        await driver.execute('mobile: scroll', { direction: 'down' });
    }

    async scrollUp() {
        await driver.execute('mobile: scroll', { direction: 'up' });
    }

    async swipe(direction: 'up' | 'down' | 'left' | 'right') {
        await driver.execute('mobile: swipe', { direction });
    }

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