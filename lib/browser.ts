const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function scrapeDescription(html) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'domcontentloaded' })

  // Click the "Read more" button to reveal the full content
  const readMoreButton = await page.$('button.D__r.D__H.D_acf.D_ach.D__z.D__v')
  if (readMoreButton) {
    await readMoreButton.click()
    await page.waitForTimeout(500) // Wait for the content to update
  }

  // Extract the full description content
  const fullDescriptionContent = await page.evaluate(() => {
    const descriptionElement = document.querySelector(
      'div.D_blH p.D_mH.D_mI.D_mM.D_mP.D_mS.D_mU.D_blH.D_blJ.D_nl'
    )
    return descriptionElement ? descriptionElement.textContent.trim() : ''
  })

  await browser.close()

  return fullDescriptionContent
}

// Usage example
const html = `
  <!-- Your HTML content goes here -->
`

scrapeDescription(html)
  .then((description) => {
    console.log('Description:', description)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
