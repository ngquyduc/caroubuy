"use server";

import { type Browser, executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import scrapeCarousellProduct from "./scraper";
import Product from "../../model/Product";

puppeteer.use(StealthPlugin());

export const fetchAndSaveProduct = async (url: string) => {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.evaluate(async () => {
    return {
      html: document.documentElement.innerHTML,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  });

  const scrapedProduct = scrapeCarousellProduct(url, data.html);
  if (!scrapedProduct) return;
  const existingProduct = await Product.findOne({ url: url });

  let product;
  if (existingProduct) {
    product = {
      ...existingProduct.toObject(),
      originalPrice: Math.max(
        scrapedProduct.originalPrice,
        existingProduct.originalPrice
      ),
      price: scrapedProduct.price,
    };
  } else {
    product = scrapedProduct;
  }

  const insertedProduct = await Product.findOneAndUpdate(
    { url: url },
    product,
    {
      upsert: true,
      new: true,
    }
  );

  await page.close();
  await browser.close();
};
