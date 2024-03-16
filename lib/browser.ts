import { Browser, executablePath } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import scrapeCarousellProduct from './scapper'

export const fetchHTML = async (url: string) => {
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

  scrapeCarousellProduct(data.html)
  await page.screenshot({ path: '1.png' })
  await browser.close()
}
