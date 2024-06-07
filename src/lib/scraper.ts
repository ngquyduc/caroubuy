import * as cheerio from "cheerio";
import fs from "fs";

type ldJson = {
  description: string | null;
  image: string[];
  offers: {
    price: string;
  };
};

const scrapeCarousellProduct = (url: string, html: string) => {
  fs.writeFileSync("test.html", html);
  const $ = cheerio.load(html);

  const scrapedTitle = $("title").text().trim();

  const LD_JSON_TAG = 'script[type="application/ld+json"]';
  const ldJsonElements = $(LD_JSON_TAG);
  const ldJsonArray: ldJson[] = [];
  let ldJson;
  try {
    ldJsonElements.each((index, element) => {
      const ldJsonText = $(element).text().trim();
      const ldJsonObject = JSON.parse(ldJsonText) as ldJson;
      ldJsonArray.push(ldJsonObject);
    });
  } catch (error: unknown) {
    console.error("Error parsing JSON:", error);
    return;
  }
  for (let i = 0; i < ldJsonArray.length; i++) {
    if (ldJsonArray[i].offers) {
      ldJson = ldJsonArray[i];
      break;
    }
  }

  const scrapedDescription: string | null = ldJson?.description ?? null;

  const scrapedUrls: string[] = [];
  ldJson?.image?.forEach((element: string) => {
    scrapedUrls.push(element);
  });

  const scrapedPrice = Number(ldJson?.offers.price);

  let scrapedOriginalPrice = extractProductOriginalPrice($);
  scrapedOriginalPrice =
    scrapedOriginalPrice === -1 ? scrapedPrice : scrapedOriginalPrice;

  const CONDITION_TAG = 'p:contains("Condition")';
  const scrapedCondition = $(CONDITION_TAG).next().find("span").text().trim();

  const CATEGORY_TAG = 'p:contains("Category")';
  const scrapedCategory = $(CATEGORY_TAG).next().find("a span").text().trim();

  const scrapedProduct = {
    category: scrapedCategory,
    condition: scrapedCondition,
    description: scrapedDescription,
    images: scrapedUrls,
    originalPrice: scrapedOriginalPrice,
    price: scrapedPrice,
    title: scrapedTitle,
    url: url,
  };

  return scrapedProduct;
};

const extractProductOriginalPrice = ($: cheerio.Root) => {
  const ORIGINAL_PRICE_TAG = "#FieldSetField-Container-field_price s";
  const originalPriceString = $(ORIGINAL_PRICE_TAG).text().trim();
  if (!originalPriceString) return -1;
  return extractPriceNumber(originalPriceString);
};

const extractPriceNumber = (price: string): number => {
  return parseFloat(price.replace(/[^0-9.-]+/g, ""));
};

export default scrapeCarousellProduct;
