class SettingsPage {
    // Локатори — як ГЕТЕРИ (get). Це важливо:
    // елемент шукається заново щоразу при зверненні → завжди "свіжий",
    // не буде застарілого посилання після переходу на інший екран.
    get firstCell() {
        return $('-ios class chain:**/XCUIElementTypeCell[1]');
    }

    get navBar() {
        return $('-ios class chain:**/XCUIElementTypeNavigationBar');
    }

    get allCells() {
        return $$('-ios class chain:**/XCUIElementTypeCell');
    }

    // Методи — дії та перевірки, названі людською мовою
    async waitUntilLoaded() {
        await this.firstCell.waitForDisplayed({ timeout: 15000 });
    }

    async getTitle() {
        return this.navBar.getAttribute('name'); // name навбару = заголовок екрана
    }

    async openFirstItem() {
        await this.firstCell.click();
    }
        // поле пошуку у Settings
    get searchField() {
        return $('-ios class chain:**/XCUIElementTypeSearchField[`name == "Поиск"`]');
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

    // очистити поле пошуку
    async clearSearch() {
        await this.searchField.clearValue();
    }
}

// експортуємо готовий ОБʼЄКТ (один екземпляр), а не клас —
// щоб у тестах одразу користуватись, без new
export default new SettingsPage();