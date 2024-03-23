import SearchBar from '@/components/SearchBar'
import { prisma } from '@/prisma'

export default function Home() {
  prisma.products.findMany().then((product) => {
    console.log(product)
  })
  return (
    <main className='flex h-screen w-screen justify-center items-center space-x-2'>
      <SearchBar />
    </main>
  )
}
