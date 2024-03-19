import { Browser, executablePath } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import supabase from './supabase'
import scrapeCarousellProduct from './scapper'

export const fetchAndSaveProduct = async (url: string) => {
  'use server'

  puppeteer.use(StealthPlugin())
  const browser: Browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
  })
  const page = await browser.newPage()
  await page.goto(url)
  // await page.waitForSelector('img', {
  //   visible: true
  // })
  const data = await page.evaluate(async () => {
    return {
      html: document.documentElement.innerHTML,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
  })

  const scraped_data = await scrapeCarousellProduct(data.html)
  const scraped_product = Object.assign({ url: url }, scraped_data)

  // check if product already exists, update if it does, else insert
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('url', url)
  if (error) {
    console.error('Error fetching products:', error)
    await browser.close()

    return
  }
  if (products && products.length > 0) {
    const { data, error } = await supabase
      .from('products')
      .update(scraped_product)
      .eq('url', url)
    if (error) {
      console.error('Error updating product:', error)
      await browser.close()
      return
    }
  } else {
    const { data, error } = await supabase
      .from('products')
      .insert(scraped_product)
    if (error) {
      console.error('Error inserting product:', error)
      await browser.close()
      return
    }
  }

  await browser.close()
}

const isCarousellProductURL = (url: string): boolean => {
  const carousellProductURLPattern =
    /^https:\/\/www\.carousell\.sg\/p\/[a-zA-Z0-9-]+\/?/

  return carousellProductURLPattern.test(url)
}