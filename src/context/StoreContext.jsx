import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const StoreContext = createContext()

// Map DB row → app object
const fromDB = p => ({
  ...p,
  catId: p.cat_id,
  desc:  p.description || '',
})

// Map app object → DB row
const toDB = ({ catId, desc, ...rest }) => ({
  ...rest,
  cat_id:      catId,
  description: desc || '',
})

export function StoreProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [products,   setProducts]   = useState([])
  const [loading,    setLoading]    = useState(true)

  const reload = async () => {
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from('categories').select('*').order('created_at'),
      supabase.from('products').select('*').order('created_at'),
    ])
    if (cats)  setCategories(cats)
    if (prods) setProducts(prods.map(fromDB))
    setLoading(false)
  }

  useEffect(() => {
    reload()
    // Sync en temps réel entre appareils
    const channel = supabase
      .channel('store-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, reload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' },   reload)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  // ── Categories ──────────────────────────────────────────────────────────────

  const addCategory = async name => {
    const row = { id: `cat-${Date.now()}`, name: name.trim() }
    const { error } = await supabase.from('categories').insert(row)
    if (!error) setCategories(p => [...p, row])
  }

  const renameCategory = async (id, name) => {
    const { error } = await supabase.from('categories').update({ name: name.trim() }).eq('id', id)
    if (!error) setCategories(p => p.map(c => c.id === id ? { ...c, name: name.trim() } : c))
  }

  const deleteCategory = async id => {
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (!error) {
      setCategories(p => p.filter(c => c.id !== id))
      setProducts(p => p.filter(pr => pr.catId !== id))
    }
  }

  // ── Products ─────────────────────────────────────────────────────────────────

  const addProduct = async prod => {
    const row = toDB({ ...prod, id: `p-${Date.now()}` })
    const { data, error } = await supabase.from('products').insert(row).select().single()
    if (!error && data) setProducts(p => [...p, fromDB(data)])
  }

  const updateProduct = async (id, updates) => {
    const current = products.find(p => p.id === id)
    const merged  = { ...current, ...updates }
    const { error } = await supabase.from('products').update(toDB(merged)).eq('id', id)
    if (!error) setProducts(p => p.map(pr => pr.id === id ? { ...pr, ...updates } : pr))
  }

  const deleteProduct = async id => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) setProducts(p => p.filter(pr => pr.id !== id))
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const productsByCategory = catId => products.filter(p => p.catId === catId)
  const countByCategory    = catId => products.filter(p => p.catId === catId).length

  return (
    <StoreContext.Provider value={{
      categories, products, loading,
      addCategory, renameCategory, deleteCategory,
      addProduct, updateProduct, deleteProduct,
      productsByCategory, countByCategory,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
