import supabase from './supabase'

export const fetchAllProduct = async () => {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.error('Error fetching products:', error)
    return
  }
  return data
}
