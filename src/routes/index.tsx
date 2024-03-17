import { Button, TextField } from '@kobalte/core'
import { For, createResource, createSignal } from 'solid-js'

import { fetchAndSaveProduct } from '../../lib/browser'
import { fetchAllProduct } from '../../lib/products'

import '../styles/Button.css'
import '../styles/TextField.css'

export default function Home() {
  const [url, seturl] = createSignal('')
  const [products, { mutate, refetch }] = createResource(fetchAllProduct)

  const isCarousellProductURL = (url: string): boolean => {
    const carousellProductURLPattern =
      /^https:\/\/www\.carousell\.sg\/p\/[a-zA-Z0-9-]+\/?/

    return carousellProductURLPattern.test(url)
  }

  return (
    <main class="flex flex-col justify-center items-center h-screen w-screen">
      <div class="flex flex-col justify-center items-center gap-4 my-4">
        <TextField.Root
          class="text-field"
          value={url()}
          onChange={seturl}
          validationState={
            url().length === 0 || isCarousellProductURL(url())
              ? 'valid'
              : 'invalid'
          }
        > 
          <TextField.Label class="text-field__label">
            Carousell product url
          </TextField.Label>
          <TextField.Input class="text-field__input" />
          <TextField.ErrorMessage>
            Please input valid Carousell product
          </TextField.ErrorMessage>
        </TextField.Root>
        <Button.Root
          class="button"
          onClick={async () => {
            if (!isCarousellProductURL(url())) {
              alert('Invalid URL')
              return
            }
            await fetchAndSaveProduct(url())
            await refetch()
          }}
          disabled={
            url() === '' || !isCarousellProductURL(url()) ? true : false
          }
        >
          Click me
        </Button.Root>
      </div>
      <div class="flex flex-col justify-center items-left my-4">
        <For each={products()} fallback={<div>Fetching all products</div>}>
          {(product, index) => (
            <div>
              <h3>
                #{index()}. {product.title}
              </h3>
              <p>${product.price}</p>
            </div>
          )}
        </For>
      </div>
    </main>
  )
}
