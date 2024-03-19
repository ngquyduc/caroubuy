'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchAndSaveProduct } from '@/lib/browser'
import { useState } from 'react'

const SearchBar = () => {
  const [url, setUrl] = useState('')

  return (
    <div className='flex justify-center items-center space-x-2'>
      <Input
        className='w-100'
        type='text'
        placeholder='Url'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button
        onClick={async () => {
          await fetchAndSaveProduct(url)
        }}
      >
        Scrape
      </Button>
    </div>
  )
}

export default SearchBar
