import * as cheerio from "cheerio";

function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }

  return "";
}

const scrapeCarousellProduct = async () => {
  "use server";

  const url1 =
    "https://www.carousell.sg/p/dell-s2715h-27-inch-monitor-1286760037/?t-id=33183307_1709540007797&t-referrer=category_homescreen&t-referrer_browse_type=user_item_rec&t-referrer_page_type=homepage&t-referrer_request_id=w_GNpk0RkxIrbiw2&t-referrer_source=homepage";
  const url2 =
    "https://www.carousell.sg/p/sg-stock-26%E2%80%9D-shimano-21-s-mountain-bike-mtb-bike-bicycle-mountain-bike-mountain-bicycle-mtb-1194623496/?t-id=33183307_1709540007797&t-referrer=category_homescreen&t-referrer_browse_type=trending&t-referrer_page_type=homepage&t-referrer_request_id=pUrcE2Vfed87eHFp&t-referrer_source=homepage";
  let response = await fetch(url2);
  let html = await response.text();
  const $ = cheerio.load(html);

  // Extract the title
  const title = $("h1").text().trim();

  // Extract the price
  const h2PriceElement = $("#FieldSetField-Container-field_price h2");
  const h3PriceElement = $("#FieldSetField-Container-field_price h3");
  let price;
  if (h2PriceElement.length > 0) {
    price = h2PriceElement.text();
  } else if (h3PriceElement.length > 0) {
    price = h3PriceElement.text();
  } else {
    price = "Price not found";
  }

  // Extract original price
  const originalPrice = $("#FieldSetField-Container-field_price s").text();

  /// Extract the condition
const conditionElement = $('div.D_aMu div:nth-child(1) div.D_aMx p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aMA.D_nl span.D_mH.D_mI.D_mL.D_mP.D_mS.D_mU.D_awb.D_nl');
const condition = conditionElement.text().trim();

// Extract the category
const categoryElement = $('div.D_aMu div:nth-child(4) div p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aMA.D_nl span.D_mH.D_mI.D_mL.D_mP.D_mS.D_mU.D_awb.D_nl, div.D_aMu div:nth-child(4) div p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aMA.D_nl a.D_awb.D_pm.D_rp span.D_mH.D_mI.D_mL.D_mO.D_mS.D_mU.D_ph.D_nl');
const category = categoryElement.map((i, el) => $(el).text().trim()).get().join(' ');

// Extract the description
const descriptionElement = $('div.D_asL#FieldSetField-Container-field_description div.D_blH p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_blH.D_blJ.D_nl');
const description = descriptionElement.text().trim();

// Extract delivery options
const deliveryOptions = [];

// Standard delivery
const standardDeliveryElement = $('div.D_aGO:nth-child(1)');
const standardDeliveryName = standardDeliveryElement.find('div.D_aGT p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGU.D_nl').text().trim();
const standardDeliveryPrice = standardDeliveryElement.find('div.D_aGW p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGX.D_nl').text().trim();
const standardDeliveryDuration = standardDeliveryElement.find('div.D_aGQ p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGZ.D_nm').text().trim();
deliveryOptions.push({ name: standardDeliveryName, price: standardDeliveryPrice, duration: standardDeliveryDuration });

// Express delivery
const expressDeliveryElement = $('div.D_aGO:nth-child(2)');
const expressDeliveryName = expressDeliveryElement.find('div.D_aGT p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGU.D_nl').text().trim();
const expressDeliveryPrice = expressDeliveryElement.find('div.D_aGW p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGX.D_nl').text().trim();
const expressDeliveryDuration = expressDeliveryElement.find('div.D_aGQ p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGZ.D_nm').text().trim();
deliveryOptions.push({ name: expressDeliveryName, price: expressDeliveryPrice, duration: expressDeliveryDuration });

// Same day delivery
const sameDayDeliveryElement = $('div.D_aGO:nth-child(3)');
const sameDayDeliveryName = sameDayDeliveryElement.find('div.D_aGT p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGU.D_nl').text().trim();
const sameDayDeliveryPrice = sameDayDeliveryElement.find('div.D_aGW p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGX.D_nl').text().trim();
const sameDayDeliveryDuration = sameDayDeliveryElement.find('div.D_aGQ p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGZ.D_nm').text().trim();
deliveryOptions.push({ name: sameDayDeliveryName, price: sameDayDeliveryPrice, duration: sameDayDeliveryDuration });

// Meet-up
const meetupElement = $('div.D_aGO:nth-child(4)');
const meetupName = meetupElement.find('div.D_aGT p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGU.D_nl').text().trim();
const meetupPrice = meetupElement.find('div.D_aGW p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_aGX.D_nl').text().trim();
const meetupLocation = meetupElement.find('div.D_aGQ div a.D_aHa.D_xu span.D_mH.D_mI.D_mM.D_mO.D_mS.D_mU.D_uv.D_aHb.D_nn').text().trim();
deliveryOptions.push({ name: meetupName, price: meetupPrice, location: meetupLocation });
// Extract "Getting this" details
const gettingThisElement = $('div.D_asL#FieldSetField-Container-field_action_panel_delivery button.D_nv.D_nQ.D_nI.D_nO.D_aHM.D_aHN.D_aHO');
const gettingThisDescription = gettingThisElement.find('div.D_aHL p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_nl').text().trim();

  // Print out
  return {title, price, originalPrice, condition, category, description,deliveryOptions, gettingThisDescription};
};

export default scrapeCarousellProduct;
