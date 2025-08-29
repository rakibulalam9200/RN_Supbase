import { supabase } from "../supabaseClient"


// Fetch products
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })

  if (error) throw error
  return data
}

// Add product
export const addProduct = async (name: string, price: number, description: string, image_url: string) => {
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, description, image_url }])
    .select()
  if (error) throw error
  return data
}

// Update product
export const updateProduct = async (
  id: number,
  updates: { name?: string; price?: number; description?: string; image_url?: string }
) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}

// Delete product
export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// Upload Image to Supabase Storage
export const uploadImage = async (uri: string) => {
  const fileName = `${Date.now()}.jpg`

  const response = await fetch(uri)
  const blob = await response.blob()
  const arrayBuffer = await blob.arrayBuffer()

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, arrayBuffer, {
      contentType: 'image/jpeg',
      upsert: false,
    })

  if (error) throw error

  const { data: publicData } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return publicData.publicUrl
}
