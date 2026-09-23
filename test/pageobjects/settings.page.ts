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
}

// експортуємо готовий ОБʼЄКТ (один екземпляр), а не клас —
// щоб у тестах одразу користуватись, без new
export default new SettingsPage();