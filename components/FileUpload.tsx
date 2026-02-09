'use client'

import { useState, useRef } from 'react'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  accept?: string
}

export default function FileUpload({ onFilesSelected, maxFiles = 5, accept = 'image/*,.pdf' }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return
    const fileArray = Array.from(newFiles).slice(0, maxFiles - files.length)
    const updated = [...files, ...fileArray]
    setFiles(updated)
    onFilesSelected(updated)
  }

  function removeFile(index: number) {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
    onFilesSelected(updated)
  }

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-eu-blue-500 bg-eu-blue-50' : 'border-gray-300 hover:border-eu-blue-400'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        <svg className="mx-auto h-10 w-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-gray-600">
          Drop screenshots here or <span className="text-eu-blue-500 font-medium">browse</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Images or PDF, max {maxFiles} files
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
