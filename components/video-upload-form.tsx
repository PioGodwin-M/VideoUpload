"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { Value } from "@radix-ui/react-select"

const LANGUAGES = [
  
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "ko", label: "Korean" },
  {value:"ta",label:"Tamil"},
  {value:"hi",label:"Hindi"},
  {value:"te",label:"Telugu"},
  {value: "kn", label: "Kannada" },  
  {value: "ml", label: "Malayalam" },
  {value:"gu",label:"Gujarati"},
  {value:"bn",label:"bengali"},
  {value:"ur",label:"Urudu"},
]

interface VideoUploadFormProps {
  onUpload: (file: File, language: string) => void
  isLoading: boolean
}

export default function VideoUploadForm({ onUpload, isLoading }: VideoUploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [language, setLanguage] = useState("en")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    handleFileSelect(droppedFile)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      onUpload(file, language)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* File Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging ? "border-blue-400 bg-blue-500/10" : "border-slate-600 hover:border-slate-500 bg-slate-700/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
          className="hidden"
        />
        <Upload className="mx-auto mb-3 text-slate-400" size={32} />
        <p className="text-sm font-medium text-white mb-1">{file ? file.name : "Click to upload or drag and drop"}</p>
        <p className="text-xs text-slate-400">{file ? "File selected" : "Video files supported"}</p>
      </div>

      {/* Language Selector */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Target Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!file || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
      >
        {isLoading ? "Processing..." : "Process Video"}
      </Button>
    </form>
  )
}
