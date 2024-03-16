import { Button } from '@kobalte/core'
import { A } from '@solidjs/router'
import Counter from '~/components/Counter'
import scrapeCarousellProduct from '../../lib/scapper'
import { supabase } from '../../lib/supabase'
import { createResource } from 'solid-js'

export default function Home() {
  return (
    <main>
      <Button.Root
        onClick={async () => {
          const scapeddata = await scrapeCarousellProduct()
        }}
      >
        Click me
      </Button.Root>
    </main>
  )
}
