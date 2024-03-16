import * as cheerio from 'cheerio'

const scrapeCarousellProduct = async (url: string) => {
  'use server'

  let response = await fetch(url)
  let html = await response.text()
  const $ = cheerio.load(html)

  // title
  const title = $('title').text().trim()
  console.log('title', title)

  const LD_JSON_TAG = 'script[type="application/ld+json"]'
  const ld_json = JSON.parse($(LD_JSON_TAG).text())

  // description
  const description = ld_json.description
  console.log('description', description)

  // images
  const images_url: string[] = []
  ld_json.image?.forEach((element: string) => {
    images_url.push(element);
  });
  console.log('images', images_url)

  // price
  const price = Number(ld_json.offers.price)
  console.log('price', price)

  // original price
  const original_price = extractProductOriginalPrice($);
  console.log('original_price', original_price)
}

const extractProductOriginalPrice = ($: cheerio.CheerioAPI) => {
  const ORIGINAL_PRICE_TAG = '#FieldSetField-Container-field_price s'
  return extractPriceNumber($(ORIGINAL_PRICE_TAG).text().trim())
}

const extractPriceNumber = (price: string): number => {
  return parseFloat(price.replace(/[^0-9.-]+/g, ''))
}

export default scrapeCarousellProduct
