'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import Image from 'next/image'
import { Upload, X, Link as LinkIcon, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getYouTubeThumbnail, isYouTubeUrl } from '@/lib/utils'
import type { Media } from '@/types/database'

interface Props {
  module: 'real-estate' | 'interior-design'
  listingId?: string
  projectId?: string
}

export function MediaUploader({ module, listingId, projectId }: Props) {
  const [media, setMedia] = useState<Media[]>([])
  const [uploading, setUploading] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkAlt, setLinkAlt] = useState('')

  const bucket = module === 'real-estate' ? 'real-estate' : 'interior-design'

  useEffect(() => {
    loadMedia()
  }, [listingId, projectId])

  const loadMedia = async () => {
    const params = new URLSearchParams()
    if (listingId) params.set('listing_id', listingId)
    if (projectId) params.set('project_id', projectId)

    const res = await fetch(`/api/media?${params}`)
    if (res.ok) {
      const data = await res.json()
      setMedia(data)
    }
  }

  const uploadFile = async (file: File) => {
    let fileToUpload = file

    if (file.type.startsWith('image/')) {
      try {
        fileToUpload = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })
      } catch {}
    }

    const formData = new FormData()
    formData.append('file', fileToUpload)
    formData.append('bucket', bucket)
    formData.append('folder', file.type.startsWith('image/') ? 'images' : 'videos')

    const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!uploadRes.ok) throw new Error('Upload failed')

    const { url } = await uploadRes.json()
    const type = file.type.startsWith('image/') ? 'image' : 'video'

    await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module,
        type,
        url,
        listing_id: listingId,
        project_id: projectId,
        sort_order: media.length,
        is_cover: media.length === 0,
      }),
    })
  }

  const onDrop = useCallback(async (accepted: File[]) => {
    setUploading(true)
    try {
      await Promise.all(accepted.map(uploadFile))
      await loadMedia()
    } catch (err) {
      alert('Some files failed to upload')
    } finally {
      setUploading(false)
    }
  }, [media.length, listingId, projectId, module])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
    multiple: true,
  })

  const addLink = async () => {
    if (!linkUrl) return
    const thumbnail = isYouTubeUrl(linkUrl) ? getYouTubeThumbnail(linkUrl) : null

    await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module,
        type: 'link',
        url: linkUrl,
        thumbnail_url: thumbnail,
        alt_text: linkAlt || null,
        listing_id: listingId,
        project_id: projectId,
        sort_order: media.length,
        is_cover: false,
      }),
    })

    setLinkUrl('')
    setLinkAlt('')
    await loadMedia()
  }

  const deleteMedia = async (id: string) => {
    await fetch(`/api/media?id=${id}`, { method: 'DELETE' })
    await loadMedia()
  }

  const setCover = async (id: string) => {
    await Promise.all(
      media.map((m) =>
        fetch(`/api/media/${m.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_cover: m.id === id }),
        })
      )
    )
    await loadMedia()
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-amber-400 bg-amber-50' : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        {uploading ? (
          <p className="text-sm text-slate-500">Uploading...</p>
        ) : (
          <>
            <p className="text-sm font-medium text-slate-700">Drop images or videos here</p>
            <p className="text-xs text-slate-400 mt-1">or click to browse — images auto-compressed to 1MB</p>
          </>
        )}
      </div>

      <div className="flex gap-2 items-end">
        <Input
          label="Add External Link (YouTube, Vimeo, URL)"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="flex-1"
        />
        <Input
          label="Label (optional)"
          value={linkAlt}
          onChange={(e) => setLinkAlt(e.target.value)}
          placeholder="Video tour"
          className="w-40"
        />
        <Button type="button" onClick={addLink} variant="outline" className="mb-0.5">
          <LinkIcon className="w-4 h-4" />
          Add
        </Button>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {media.map((item) => (
            <div key={item.id} className="relative group rounded-lg overflow-hidden bg-slate-100 aspect-square border border-slate-200">
              {item.type === 'image' ? (
                <Image src={item.url} alt={item.alt_text || ''} fill className="object-cover" sizes="200px" />
              ) : item.thumbnail_url ? (
                <Image src={item.thumbnail_url} alt="" fill className="object-cover opacity-80" sizes="200px" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LinkIcon className="w-8 h-8 text-slate-400" />
                </div>
              )}

              {item.is_cover && (
                <div className="absolute top-1 left-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                  <Star className="w-2.5 h-2.5" /> Cover
                </div>
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!item.is_cover && item.type === 'image' && (
                  <button
                    onClick={() => setCover(item.id)}
                    className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    title="Set as cover"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => deleteMedia(item.id)}
                  className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
