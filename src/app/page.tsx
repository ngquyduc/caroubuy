import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <main className='flex h-screen w-screen justify-center items-center space-x-2'>
      {/* <h1 className="text-6xl font-bold">
        Welcome to <span className="text-blue-600">Caroubuy</span>
      </h1> */}
      <SearchBar />
    </main>
  )
}
