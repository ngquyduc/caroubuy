import * as cheerio from 'cheerio'
import { AnyNode } from 'postcss'

const scrapeCarousellProduct = async (html: string) => {
  'use server'

  const $ = await cheerio.load(html)

  // title
  const title = $('title').text().trim()

  const LD_JSON_TAG = 'script[type="application/ld+json"]'
  let ld_json
  try {
    ld_json = JSON.parse($(LD_JSON_TAG).first().text().trim())
  } catch (error: any) {
    console.error('Error parsing JSON:', error.message)
    return
  }

  // description
  const description: string = ld_json.description.trim()

  // images
  const images_url: string[] = []
  ld_json.image?.forEach((element: string) => {
    images_url.push(element)
  })

  // price
  const price = Number(ld_json.offers.price)

  // original price
  const original_price = extractProductOriginalPrice($)

  // condition
  const CONDITION_TAG =
    'div.D_aCG.M_arG p.D_mQ.M_hE.D_mR.M_hF.D_mV.M_hJ.D_mY.M_hM.D_nb.M_hP.D_ne.M_hR.D_aCK.M_arK.D_nr span.D_mQ.M_hE.D_mR.M_hF.D_mU.M_hI.D_mY.M_hM.D_nb.M_hP.D_ne.M_hR.D_auq.M_aii.D_nr'
  const condition = $(CONDITION_TAG).text().trim()

  // category
  const CATEGORY_TAG =
    'ul.D_Fh li.D_zy a.D_oU p.D_mQ.D_mR.D_mV.D_mY.D_nb.D_ne.D_z_.D_ni'
  const category = $(CATEGORY_TAG).first().text().trim()

  return {
    title: title,
    description: description,
    images: images_url,
    price: price,
    original_price: original_price,
    condition: condition,
    category: category,
  }
}

const extractProductOriginalPrice = ($: cheerio.CheerioAPI) => {
  const ORIGINAL_PRICE_TAG = '#FieldSetField-Container-field_price s'
  return extractPriceNumber($(ORIGINAL_PRICE_TAG).text().trim())
}

const extractPriceNumber = (price: string): number => {
  return parseFloat(price.replace(/[^0-9.-]+/g, ''))
}

export default scrapeCarousellProduct
