export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    // координати Appium-сервера (запускаємо його вручну командою `appium`)
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',   // Appium 2/3 → базовий шлях '/', НЕ '/wd/hub'

    specs: ['./test/specs/**/*.ts'],
    maxInstances: 1,

    capabilities: [{
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone 17',
        'appium:platformVersion': '27.0',
        'appium:udid': 'EA19E24F-8DAE-44F9-AA3F-F9C633AE3454', // твій Booted-симулятор
        'appium:bundleId': 'com.apple.Preferences',            // вбудований Settings
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
        connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // сервіс appium НЕ додаємо — сервер запускаємо вручну
    services: [],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,   // перший запуск довгий — Appium збирає WebDriverAgent
    },
};