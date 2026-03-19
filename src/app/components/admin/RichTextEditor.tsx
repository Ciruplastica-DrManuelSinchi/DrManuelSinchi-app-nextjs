'use client'

import './RichTextEditor.css'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Youtube from '@tiptap/extension-youtube'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Highlighter,
  Undo,
  Redo,
  Unlink,
  Loader2,
  Upload,
  Minus,
  Palette,
  Type,
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const FONT_COLORS = [
  { name: 'Negro', value: '#000000' },
  { name: 'Gris oscuro', value: '#374151' },
  { name: 'Gris', value: '#6B7280' },
  { name: 'Rojo', value: '#DC2626' },
  { name: 'Naranja', value: '#EA580C' },
  { name: 'Amarillo', value: '#CA8A04' },
  { name: 'Verde', value: '#16A34A' },
  { name: 'Azul', value: '#2563EB' },
  { name: 'Púrpura', value: '#7C3AED' },
  { name: 'Rosa', value: '#DB2777' },
  { name: 'Primary', value: '#391142' },
  { name: 'Accent', value: '#d4a853' },
]

const FONT_SIZES = [
  { name: 'Pequeño', value: '0.875em' },
  { name: 'Normal', value: '1em' },
  { name: 'Grande', value: '1.25em' },
  { name: 'Muy grande', value: '1.5em' },
  { name: 'Extra grande', value: '2em' },
]

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showYoutubeModal, setShowYoutubeModal] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontSizePicker, setShowFontSizePicker] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const fontSizePickerRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full mx-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Escribe el contenido del artículo...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'highlight-marker',
        },
      }),
      TextStyle,
      Color,
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'rounded-xl mx-auto',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  // Close color/font size pickers when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
      if (fontSizePickerRef.current && !fontSizePickerRef.current.contains(event.target as Node)) {
        setShowFontSizePicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setShowLinkModal(false)
    }
  }, [editor, linkUrl])

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetLink().run()
    }
  }, [editor])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede superar los 5MB')
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadAndInsertImage = async () => {
    if (!selectedFile || !editor) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('folder', 'blog-content')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run()
        closeImageModal()
      } else {
        alert(data.error || 'Error al subir imagen')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error al subir imagen')
    } finally {
      setIsUploading(false)
    }
  }

  const closeImageModal = () => {
    setShowImageModal(false)
    setSelectedFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const addYoutube = useCallback(() => {
    if (youtubeUrl && editor) {
      editor.commands.setYoutubeVideo({ src: youtubeUrl })
      setYoutubeUrl('')
      setShowYoutubeModal(false)
    }
  }, [editor, youtubeUrl])

  if (!editor) {
    return (
      <div className="border border-gray-200 rounded-xl p-4 animate-pulse">
        <div className="h-10 bg-gray-100 rounded mb-3"></div>
        <div className="h-64 bg-gray-50 rounded"></div>
      </div>
    )
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <div className="relative group">
      <button
        type="button"
        onClick={onClick}
        className={`p-2 rounded-lg transition-colors ${
          isActive
            ? 'bg-primary text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {children}
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {title}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  )

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-gray-200 mx-1" />
  )

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Deshacer"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Rehacer"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Título 1"
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Título 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Título 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Negrita"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Cursiva"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Subrayado"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Tachado"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="Resaltar"
        >
          <Highlighter className="w-4 h-4" />
        </ToolbarButton>

        {/* Color Picker */}
        <div className="relative" ref={colorPickerRef}>
          <ToolbarButton
            onClick={() => {
              setShowColorPicker(!showColorPicker)
              setShowFontSizePicker(false)
            }}
            title="Color de texto"
          >
            <Palette className="w-4 h-4" />
          </ToolbarButton>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
              <div className="grid grid-cols-4 gap-2">
                {FONT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(color.value).run()
                      setShowColorPicker(false)
                    }}
                    title={color.name}
                    className="w-7 h-7 rounded-full border-2 border-gray-200 hover:border-primary transition-colors"
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run()
                  setShowColorPicker(false)
                }}
                className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 py-1"
              >
                Quitar color
              </button>
            </div>
          )}
        </div>

        {/* Font Size Picker */}
        <div className="relative" ref={fontSizePickerRef}>
          <ToolbarButton
            onClick={() => {
              setShowFontSizePicker(!showFontSizePicker)
              setShowColorPicker(false)
            }}
            title="Tamaño de texto"
          >
            <Type className="w-4 h-4" />
          </ToolbarButton>
          {showFontSizePicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50 min-w-[140px]">
              {FONT_SIZES.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setMark('textStyle', { fontSize: size.value }).run()
                    setShowFontSizePicker(false)
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                  style={{ fontSize: size.value }}
                >
                  {size.name}
                </button>
              ))}
              <hr className="my-1 border-gray-200" />
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetMark('textStyle').run()
                  setShowFontSizePicker(false)
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                Tamaño normal
              </button>
            </div>
          )}
        </div>

        <ToolbarDivider />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Alinear izquierda"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Centrar"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Alinear derecha"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Lista con viñetas"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Lista numerada"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Block elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Cita"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Bloque de código"
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Divisor horizontal"
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Links & Media */}
        <ToolbarButton
          onClick={() => setShowLinkModal(true)}
          isActive={editor.isActive('link')}
          title="Agregar enlace"
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        {editor.isActive('link') && (
          <ToolbarButton
            onClick={removeLink}
            title="Quitar enlace"
          >
            <Unlink className="w-4 h-4" />
          </ToolbarButton>
        )}
        <ToolbarButton
          onClick={() => setShowImageModal(true)}
          title="Subir imagen"
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setShowYoutubeModal(true)}
          title="Video de YouTube"
        >
          <YoutubeIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Agregar enlace</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://ejemplo.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setLinkUrl('')
                  setShowLinkModal(false)
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={addLink}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Subir imagen</h3>
            <div className="space-y-4">
              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Haz clic para seleccionar una imagen</span>
                  <span className="text-xs text-gray-400 mt-1">Máximo 5MB (JPG, PNG, WebP, GIF)</span>
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-xl p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="max-h-48 mx-auto rounded-lg object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null)
                      setImagePreview(null)
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ''
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Cambiar imagen
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={closeImageModal}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={uploadAndInsertImage}
                disabled={!selectedFile || isUploading}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  'Insertar imagen'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Modal */}
      {showYoutubeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Agregar video de YouTube</h3>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-4"
              autoFocus
            />
            <p className="text-sm text-gray-500 mb-4">
              Pega la URL del video de YouTube que deseas incrustar.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setYoutubeUrl('')
                  setShowYoutubeModal(false)
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={addYoutube}
                disabled={!youtubeUrl}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
