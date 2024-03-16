import { Button } from '@kobalte/core'
import { A } from '@solidjs/router'
import Counter from '~/components/Counter'
import scrapeCarousellProduct from '../../lib/scapper'
import { createResource } from 'solid-js'

export default function Home() {
  const product_url =
    'https://www.carousell.sg/p/thinkpad-x220-1290079037/?t-id=fgHnHCjZR9_1710598330050&t-product_id=1290079037&t-referrer_browse_type=item_item_rec&t-referrer_page_type=listing_page&t-referrer_product_id=1291303404&t-referrer_request_id=8-CB9iOAWBRf1-BV&t-referrer_source=listing_page&t-tap_index=13'
  return (
    <main>
      <Button.Root
        onClick={async () => {
          await scrapeCarousellProduct(product_url)
        }}
      >
        Click me
      </Button.Root>
    </main>
  )
}
