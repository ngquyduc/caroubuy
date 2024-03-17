import { Button, TextField } from '@kobalte/core'
import { For, createResource, createSignal } from 'solid-js'

import { fetchAndSaveProduct } from '../../lib/browser'
import { fetchAllProduct } from '../../lib/products'

import '../styles/Button.css'
import '../styles/TextField.css'

export default function Home() {
  const [url, seturl] = createSignal('')
  const [products, { mutate }] = createResource(fetchAllProduct)

  return (
    <main class="flex flex-col justify-center items-center h-screen w-screen">
      <div class='flex flex-col justify-center items-center gap-4 my-4'>
      <TextField.Root class="text-field" value={url()} onChange={seturl}>
        <TextField.Label class="text-field__label">Url</TextField.Label>
        <TextField.Input class="text-field__input" />
      </TextField.Root>
      <Button.Root
        class="button"
        onClick={async () => {
          await fetchAndSaveProduct(url())
        }}
      >
        Click me
      </Button.Root>
      </div>
      <div class='flex flex-col justify-center items-left my-4'>
        <For each={products()} fallback={<div>Fetching all products</div>}>
          {(product, index) => (
            <div>
              <h3>#{index()}. {product.title}</h3>
              <p>${product.price}</p>
            </div>
          )}
        </For>
      </div>
    </main>
  )
}
