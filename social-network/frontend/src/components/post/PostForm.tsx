import { useRef, useState } from 'react'

interface Props {
  onSubmit: (data: {
    title: string; description: string
    location: string; tags: string; image: File | null
  }) => void
  loading: boolean
  onCancel: () => void
}

const INPUT = "w-full px-4 py-2.5 rounded-2xl border border-[#cce4f0] bg-[#f7fcff] text-sm text-[#3a5a6e] placeholder:text-[#b0cdd9] focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] transition"

export const PostForm = ({ onSubmit, loading, onCancel }: Props) => {
  const [title, setTitle]       = useState('')
  const [description, setDesc]  = useState('')
  const [location, setLocation] = useState('')
  const [tags, setTags]         = useState('')
  const [image, setImage]       = useState<File | null>(null)
  const [preview, setPreview]   = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const inputRef                = useRef<HTMLInputElement>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.')
      return
    }
    setError(null)
    onSubmit({ title, description, location, tags, image })
  }

  return (
    <div className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="Title *" className={INPUT} />
      <textarea value={description} onChange={(e) => setDesc(e.target.value)}
        placeholder="Description *" rows={3}
        className={`${INPUT} resize-none`} />
      <input value={location} onChange={(e) => setLocation(e.target.value)}
        placeholder="Location (optional)" className={INPUT} />
      <input value={tags} onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)" className={INPUT} />

      {preview && (
        <div className="relative">
          <img src={preview} alt="Preview"
            className="w-full max-h-64 object-cover rounded-2xl" />
          <button onClick={() => { setImage(null); setPreview(null) }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white text-xs flex items-center justify-center">
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button onClick={() => inputRef.current?.click()}
          className="text-xs text-[#5ab6d8] font-medium hover:text-[#3a9abf] transition">
          📷 {image ? 'Change photo' : 'Add photo'}
        </button>
        <input ref={inputRef} type="file" accept="image/*"
          className="hidden" onChange={handleImage} />
        <div className="flex items-center gap-2">
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button onClick={onCancel}
            className="px-4 py-1.5 rounded-2xl text-xs text-[#8aabbf] hover:bg-[#f0f8fd] transition">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-[#7ec8e3] to-[#5ab6d8] text-white text-xs font-semibold disabled:opacity-40 transition">
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}