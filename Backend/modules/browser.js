const puppeteer = require("puppeteer");

let browserInstance;

const initBrowser = async () => {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({ headless: true });
  }
  return browserInstance;
};

const closeBrowser = async () => {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
};

const getNewPage = async () => {
  const browser = await initBrowser();
  return browser.newPage();
};

module.exports = { initBrowser, closeBrowser, getNewPage };
