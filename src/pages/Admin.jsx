import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { supabase } from '../lib/supabase'
import {
  Plus, Trash2, Pencil, X, Eye, LogOut,
  Upload, Check, ChevronRight, ImageOff, Save,
} from 'lucide-react'

const BADGES = ['', 'Bestseller', 'Nouveau', 'Exclusif', 'Premium', 'Solde']

const emptyForm = { name: '', desc: '', price: '', badge: '', image: '', catId: '' }

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email,   setEmail]   = useState('')
  const [pwd,     setPwd]     = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pwd,
    })
    if (error) {
      setError('Email ou mot de passe incorrect')
      setLoading(false)
    }
    // Si succès → onAuthStateChange dans <Admin> met à jour l'état automatiquement
  }

  return (
    <div className="min-h-screen bg-[#0F0C09] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-serif text-white text-2xl mb-1">Rose Élégance</div>
          <div className="text-[#B8922A] text-[0.55rem] tracking-[0.5em] uppercase">Administration</div>
        </div>
        <form onSubmit={submit} className="bg-white p-8 flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              required
              className={`w-full border-b py-2.5 text-sm focus:outline-none transition-colors duration-200 ${
                error ? 'border-red-300' : 'border-gray-200 focus:border-[#9B1B30]'
              }`}
              placeholder="votre@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Mot de passe</label>
            <input
              type="password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              required
              className={`w-full border-b py-2.5 text-sm focus:outline-none transition-colors duration-200 ${
                error ? 'border-red-400 text-red-500' : 'border-gray-200 focus:border-[#9B1B30]'
              }`}
              placeholder="••••••••••"
            />
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#9B1B30] hover:bg-[#B8202E] disabled:bg-gray-200 text-white text-[0.6rem] tracking-[0.35em] uppercase py-3.5 transition-colors duration-300 mt-1"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
          <Link to="/" className="text-center text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Retour au site
          </Link>
        </form>
      </div>
    </div>
  )
}

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductModal({ initial, categories, onSave, onClose }) {
  const [form, setForm] = useState(initial)
  const [preview, setPreview] = useState(initial.image || '')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleFile = async e => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 8 * 1024 * 1024) {
      alert('Image trop grande (max 8 Mo).')
      return
    }
    setUploading(true)
    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(path, file, { upsert: false })
    if (error) {
      alert("Erreur d'upload. Vérifiez que le bucket 'product-images' est bien public.")
      setUploading(false)
      return
    }
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path)
    set('image', publicUrl)
    setPreview(publicUrl)
    setUploading(false)
  }

  const handleUrl = e => {
    set('image', e.target.value)
    setPreview(e.target.value)
  }

  const valid = form.name.trim() && form.price && form.catId

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg shadow-2xl my-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800 text-sm">
            {initial.id ? 'Modifier le produit' : 'Ajouter un produit'}
          </h3>
          <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-gray-700" /></button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Image preview + upload */}
          <div>
            <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Photo</label>
            <div className="flex gap-3">
              {/* Preview box */}
              <div className="w-24 h-24 border border-gray-100 bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {preview
                  ? <img src={preview} alt="" className="w-full h-full object-cover" onError={() => setPreview('')} />
                  : <ImageOff size={20} className="text-gray-300" />
                }
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="url"
                  value={form.image.startsWith('data:') ? '' : form.image}
                  onChange={handleUrl}
                  placeholder="https://... (coller une URL)"
                  className="border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#9B1B30] w-full"
                />
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span>ou</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className="flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-[#9B1B30] text-gray-400 hover:text-[#9B1B30] text-xs py-2 transition-colors"
                >
                  <Upload size={13} />
                  {uploading ? 'Chargement…' : 'Choisir un fichier (max 3 Mo)'}
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Catégorie *</label>
            <select
              value={form.catId}
              onChange={e => set('catId', e.target.value)}
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#9B1B30]"
            >
              <option value="">— Choisir —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Nom *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="ex : Éclat de Roses"
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#9B1B30]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Description</label>
            <input
              type="text"
              value={form.desc}
              onChange={e => set('desc', e.target.value)}
              placeholder="ex : Roses de Damask & pivoines"
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#9B1B30]"
            />
          </div>

          {/* Price + Badge */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Prix (€) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="89"
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#9B1B30]"
              />
            </div>
            <div>
              <label className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400 block mb-2">Badge</label>
              <select
                value={form.badge}
                onChange={e => set('badge', e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#9B1B30]"
              >
                {BADGES.map(b => <option key={b} value={b}>{b || '— Aucun —'}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-500 text-xs py-3 hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button
            onClick={() => valid && onSave(form)}
            disabled={!valid}
            className={`flex-1 text-white text-xs py-3 flex items-center justify-center gap-2 transition-colors ${
              valid ? 'bg-[#9B1B30] hover:bg-[#B8202E]' : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Save size={13} /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const {
    categories, productsByCategory, countByCategory,
    addCategory, renameCategory, deleteCategory,
    addProduct, updateProduct, deleteProduct,
  } = useStore()

  const [selectedCat, setSelectedCat] = useState(categories[0]?.id || '')
  const [modal, setModal]   = useState(null)  // null | { mode:'add'|'edit', data:{} }
  const [renamingId, setRenamingId] = useState(null)
  const [renameVal,  setRenameVal]  = useState('')
  const [newCat,     setNewCat]     = useState('')
  const [addingCat,  setAddingCat]  = useState(false)

  const currentProducts = productsByCategory(selectedCat)
  const currentCat = categories.find(c => c.id === selectedCat)

  // ── Category actions
  const startRename = cat => { setRenamingId(cat.id); setRenameVal(cat.name) }
  const confirmRename = () => {
    if (renameVal.trim()) renameCategory(renamingId, renameVal)
    setRenamingId(null)
  }
  const confirmAddCat = () => {
    if (newCat.trim()) {
      addCategory(newCat)
      setNewCat('')
      setAddingCat(false)
    }
  }
  const confirmDelete = cat => {
    const n = countByCategory(cat.id)
    if (window.confirm(`Supprimer "${cat.name}"${n > 0 ? ` et ses ${n} produit(s)` : ''} ?`)) {
      if (selectedCat === cat.id) setSelectedCat(categories.find(c => c.id !== cat.id)?.id || '')
      deleteCategory(cat.id)
    }
  }

  // ── Product actions
  const openAdd  = () => setModal({ mode: 'add',  data: { ...emptyForm, catId: selectedCat } })
  const openEdit = prod => setModal({ mode: 'edit', data: { ...prod } })
  const saveProduct = form => {
    if (modal.mode === 'add') addProduct(form)
    else updateProduct(form.id, form)
    setModal(null)
  }
  const confirmDeleteProd = prod => {
    if (window.confirm(`Supprimer "${prod.name}" ?`)) deleteProduct(prod.id)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="font-serif text-[#0F0C09] text-lg">Rose Élégance</div>
          <span className="text-[0.5rem] tracking-[0.4em] uppercase bg-[#9B1B30]/10 text-[#9B1B30] px-2 py-1">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
            <Eye size={13} /> Voir le site
          </Link>
          <button onClick={onLogout} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={13} /> Déconnexion
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — categories */}
        <aside className="w-60 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <span className="text-[0.55rem] tracking-[0.4em] uppercase text-gray-400">Catégories</span>
            <button
              onClick={() => setAddingCat(v => !v)}
              className="text-[#9B1B30] hover:text-[#B8202E] transition-colors"
              title="Ajouter une catégorie"
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Add category inline form */}
          {addingCat && (
            <div className="px-3 py-2.5 border-b border-gray-50 flex gap-2">
              <input
                autoFocus
                type="text"
                value={newCat}
                onChange={e => setNewCat(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') confirmAddCat(); if (e.key === 'Escape') setAddingCat(false) }}
                placeholder="Nom de la catégorie"
                className="flex-1 text-xs border-b border-gray-200 focus:border-[#9B1B30] focus:outline-none py-1 bg-transparent"
              />
              <button onClick={confirmAddCat} className="text-[#9B1B30]"><Check size={14} /></button>
              <button onClick={() => setAddingCat(false)} className="text-gray-300 hover:text-gray-500"><X size={14} /></button>
            </div>
          )}

          {/* Category list */}
          <nav className="flex-1 overflow-y-auto py-1">
            {categories.length === 0 && (
              <p className="text-xs text-gray-300 text-center py-8">Aucune catégorie</p>
            )}
            {categories.map(cat => (
              <div key={cat.id}>
                {renamingId === cat.id ? (
                  <div className="flex items-center gap-1 px-3 py-2">
                    <input
                      autoFocus
                      value={renameVal}
                      onChange={e => setRenameVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') confirmRename(); if (e.key === 'Escape') setRenamingId(null) }}
                      className="flex-1 text-xs border-b border-[#9B1B30] focus:outline-none py-0.5 bg-transparent"
                    />
                    <button onClick={confirmRename} className="text-[#9B1B30]"><Check size={13} /></button>
                    <button onClick={() => setRenamingId(null)} className="text-gray-300"><X size={13} /></button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedCat(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left group transition-colors ${
                      selectedCat === cat.id
                        ? 'bg-[#9B1B30]/[0.06] border-r-2 border-[#9B1B30]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`text-sm truncate ${selectedCat === cat.id ? 'text-[#9B1B30] font-medium' : 'text-gray-600'}`}>
                      {cat.name}
                    </span>
                    <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                      <span className="text-[0.6rem] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                        {countByCategory(cat.id)}
                      </span>
                      <button
                        onClick={e => { e.stopPropagation(); startRename(cat) }}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-blue-500 transition-all"
                      >
                        <Pencil size={11} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); confirmDelete(cat) }}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main — products */}
        <main className="flex-1 overflow-y-auto p-6">
          {!selectedCat || !currentCat ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-300 text-sm">Sélectionnez une catégorie</p>
            </div>
          ) : (
            <>
              {/* Products header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-[#0F0C09] text-xl">{currentCat.name}</h2>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {currentProducts.length} produit{currentProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={openAdd}
                  className="flex items-center gap-2 bg-[#9B1B30] hover:bg-[#B8202E] text-white text-xs px-4 py-2.5 transition-colors"
                >
                  <Plus size={14} /> Ajouter un produit
                </button>
              </div>

              {/* Empty state */}
              {currentProducts.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded py-16 flex flex-col items-center gap-3 text-center">
                  <ImageOff size={28} className="text-gray-200" />
                  <p className="text-gray-400 text-sm">Aucun produit dans cette catégorie</p>
                  <button onClick={openAdd} className="text-[#9B1B30] text-xs flex items-center gap-1 hover:underline">
                    <Plus size={12} /> Ajouter le premier
                  </button>
                </div>
              )}

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {currentProducts.map(prod => (
                  <div key={prod.id} className="bg-white border border-gray-100 rounded overflow-hidden group">
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                      {prod.image ? (
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff size={24} className="text-gray-200" />
                        </div>
                      )}
                      {prod.badge && (
                        <span className="absolute top-2 left-2 bg-[#9B1B30] text-white text-[0.48rem] tracking-[0.4em] uppercase px-2 py-1">
                          {prod.badge}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-serif text-[#0F0C09] text-base leading-tight">{prod.name}</h4>
                        <span className="font-serif text-[#9B1B30] text-lg flex-shrink-0">{prod.price} €</span>
                      </div>
                      {prod.desc && <p className="text-gray-400 text-xs">{prod.desc}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex border-t border-gray-50">
                      <button
                        onClick={() => openEdit(prod)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={12} /> Modifier
                      </button>
                      <div className="w-px bg-gray-50" />
                      <button
                        onClick={() => confirmDeleteProd(prod)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={12} /> Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Product modal */}
      {modal && (
        <ProductModal
          initial={modal.data}
          categories={categories}
          onSave={saveProduct}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(null) // null = vérification en cours

  useEffect(() => {
    // Vérifier la session existante
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session)
    })
    // Écouter les changements (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthed(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#0F0C09] flex items-center justify-center">
        <div className="text-white/30 text-xs tracking-[0.3em] uppercase">Chargement…</div>
      </div>
    )
  }

  return authed
    ? <Dashboard onLogout={logout} />
    : <LoginScreen />
}
