const { getNewPage } = require("./browser");

const scrapeProducts = async (searchQuery) => {
  const Query = searchQuery.split(" ").join("+");
  // console.log(Query);

  const url = `https://www.google.com/search?q=${Query}&sca_esv=32e73b67f33f8410&biw=1536&bih=695&sxsrf=ADLYWIL-2Iy0vifomRD8E_Ul-wsUz_V8nA%3A1733163654503&ei=hvpNZ9OyHuHT0-kPhYegqAc&ved=0ahUKEwjTjdvf2YmKAxXh6TQHHYUDCHUQ4dUDCA8&uact=5&oq=lenovo+ideapad+slim+3&gs_lp=Egxnd3Mtd2l6LXNlcnAiFWxlbm92byBpZGVhcGFkIHNsaW0gMzIKECMYgAQYJxiKBTIFEAAYgAQyCxAAGIAEGJECGIoFMg4QLhiABBiRAhjlBBiKBTILEAAYgAQYkQIYigUyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgoQABiABBgUGIcCSPERUOkCWO4NcAF4AZABAJgB6gGgAdIDqgEDMi0yuAEDyAEA-AEBmAIDoALkA8ICBxAjGLADGCfCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICDhAAGLADGOQCGNYE2AEBwgIWEC4YgAQYsAMYQxjlBBjIAxiKBdgBAcICChAAGIAEGEMYigXCAggQLhiABBjlBJgDAIgGAZAGEboGBggBEAEYCZIHBTEuMC4yoAe1FA&sclient=gws-wiz-serp`;
  const page = await getNewPage();

  try {
    // Set user agent and block unnecessary resources
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "stylesheet", "font"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Navigate to the search page
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait for the search results
    await page.waitForSelector(".L66lOd", { timeout: 10000 });

    // Extract product details
    const searchResults = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll(".LvCS6d").forEach((result) => {
        const shopName =
          result.querySelector(".RHJRod")?.innerText || "No title";
        const productName =
          result.querySelector(".V4Wd4b")?.innerText || "No product name";
        const link = result.querySelector("a")?.href || "No link";
        const price = result.querySelector(".JIep9e ")?.innerText || "No price";
        // const img = result.querySelector(".KVJ1qf")?.src || "no img";
        results.push({ shopName, productName, link, price });
      });
      return results;
    });

    return searchResults;
  } catch (error) {
    throw new Error(`Scraping failed: ${error.message}`);
  } finally {
    if (page) await page.close();
  }
};
const scrapImages = async (searchQuery) => {
  const Query = searchQuery.split(" ").join("+");
  // console.log(Query);

  const url = `https://imagemobiles.com/search?type=product&options%5Bunavailable_products%5D=last&options%5Bprefix%5D=none&q=acer%20aspire%207`;
  const page = await getNewPage();

  try {
    // Set user agent and block unnecessary resources
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "stylesheet", "font"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Navigate to the search page
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait for the search results
    await page.waitForSelector(".search-card-e-slider__wrapper", { timeout: 10000 });

    // Extract product details
    const searchResults = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll(".search-card-e-slider__wrapper").forEach((result) => {
        const productImage = result.querySelector("img")?.src || "No image";
        results.push({ productImage });
      });
      return results;
    });

    return searchResults;
  } catch (error) {
    throw new Error("Scraping failed"+error.message);
  } finally {
    if (page) await page.close();
}
};

module.exports = { scrapeProducts, scrapImages }
