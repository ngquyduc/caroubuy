import * as cheerio from 'cheerio'

const scrapeCarousellProduct = async () => {
  'use server'

  const url =
    'https://www.carousell.sg/p/lenovo-thinkpad-e440-i5-4gb-ram-1291303404/?t-id=K7LJkTfAaY_1710135878678&t-referrer_browse_type=categories&t-referrer_category_id=213&t-referrer_page_type=category_browse&t-referrer_request_id=nL9AceB_AJpNMpnJ&t-referrer_sort_by=popular&t-tap_index=0'
  let response = await fetch(url)
  let html = await response.text()
  const $ = cheerio.load(html)

  const images = extractProductImages($)

  const title = extractProductTitle($)

  const currentPrice = extractProductCurrentPrice($)
  const originalPrice = extractProductOriginalPrice($)

  const condition = extractProductCondition($)
  const category = extractProductCategory($)

  const description = extractDescription($)

  console.log({
    images,
    title,
    currentPrice,
    originalPrice,
    condition,
    category,
    description,
  })
}

const extractProductTitle = ($: cheerio.CheerioAPI) => {
  return $('h1').text().trim()
}

const extractProductCurrentPrice = ($: cheerio.CheerioAPI) => {
  const H2_PRICE_TAG = '#FieldSetField-Container-field_price h2'
  const H3_PRICE_TAG = '#FieldSetField-Container-field_price h3'
  const h2PriceElement = $(H2_PRICE_TAG)
  const h3PriceElement = $(H3_PRICE_TAG)
  if (h2PriceElement.length > 0) {
    return extractPriceNumber(h2PriceElement.text().trim())
  } else if (h3PriceElement.length > 0) {
    return extractPriceNumber(h3PriceElement.text().trim())
  } else {
    return '0'
  }
}

const extractProductOriginalPrice = ($: cheerio.CheerioAPI) => {
  const ORIGINAL_PRICE_TAG = '#FieldSetField-Container-field_price s'
  return extractPriceNumber($(ORIGINAL_PRICE_TAG).text().trim())
}

const extractPriceNumber = (price: string): number => {
  return parseFloat(price.replace(/[^0-9.-]+/g, ''))
}

const extractProductImages = ($: cheerio.CheerioAPI) => {
  const IMAGES_TAG = 'img.D_nF.M_lt.D_bjx.M_aUN'
  let images: string[] = []
  $(IMAGES_TAG).each((_, el) => {
    const img = $(el).attr('src')
    images.push(img ? img : '')
  })
  return images
}

const extractProductCondition = ($: cheerio.CheerioAPI) => {
  return $('p:contains("Condition")')
    .siblings('.D_aMf')
    .find('span')
    .text()
    .trim()
}

const extractProductCategory = ($: cheerio.CheerioAPI) => {
  return $('p:contains("Category")').siblings('.D_aMf').find('a').text().trim()
}

const extractDescription = ($: cheerio.CheerioAPI) => {
  const DESCRIPTION_TAG =
    'div.D_asL#FieldSetField-Container-field_description div.D_blH p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_blH.D_blJ.D_nl'
  return $(DESCRIPTION_TAG).text().trim()
}

export default scrapeCarousellProduct
