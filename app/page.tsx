"use client"

import { useState, useEffect } from "react"
import VideoUploadForm from "@/components/video-upload-form"
import VideoDisplay from "@/components/video-display"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [responseVideoUrl, setResponseVideoUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [taskId, setTaskId] = useState<string | null>(null)

  // --- This useEffect hook will poll for the video status ---
  useEffect(() => {
    if (!isLoading || !taskId) {
      return
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-status?id=${taskId}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "X-DubSync-API-Key": process.env.NEXT_PUBLIC_API_KEY as string // <-- NEW: Security Header
          }
        })
        
        if (!response.ok) {
          throw new Error("Failed to check status")
        }
        
        const data = await response.json()

        if (data.status === "complete") {
          // --- SUCCESS ---
          clearInterval(interval) 
          setIsLoading(false)
          const fullVideoUrl = `${process.env.NEXT_PUBLIC_API_URL}${data.videoUrl}`;
          setResponseVideoUrl(fullVideoUrl);
          setTaskId(null) 
        } else if (data.status === "error") {
          // --- FAILED ---
          clearInterval(interval) 
          setIsLoading(false)
          setError(data.error || "An unknown error occurred during processing.")
          setTaskId(null) 
        }
      } catch (err) {
        clearInterval(interval)
        setIsLoading(false)
        setError(err instanceof Error ? err.message : "Failed to fetch status")
        setTaskId(null)
      }
    }, 5000) 

    return () => clearInterval(interval)
    
  }, [isLoading, taskId]) 

  const handleUpload = async (file: File, language: string) => {
    setUploadedFile(file)
    setSelectedLanguage(language)
    setIsLoading(true)
    setError("")
    setResponseVideoUrl("") 
    setTaskId(null) 

    try {
      const formData = new FormData()
      formData.append("video", file)
      formData.append("language", language)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process-video`, {
        method: "POST",
        body: formData,
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "X-DubSync-API-Key": process.env.NEXT_PUBLIC_API_KEY as string // <-- NEW: Security Header
        }
      })

      if (!response.ok) {
         const errData = await response.json()
        throw new Error(errData.error || "Failed to start processing video")
      }

      const data = await response.json()
      setTaskId(data.taskId)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Upload error:", err)
      setIsLoading(false) 
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Video Processor</h1>
          <p className="text-slate-400">Upload your video and select a language for processing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Upload Form & Input Info */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 p-6 sticky top-6">
              <VideoUploadForm onUpload={handleUpload} isLoading={isLoading} />

              {uploadedFile && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="text-sm font-semibold text-white mb-4">Current Input</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">File Name</p>
                      <p className="text-sm text-white truncate">{uploadedFile.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">File Size</p>
                      <p className="text-sm text-white">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Selected Language</p>
                      <p className="text-sm text-white capitalize">{selectedLanguage}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Panel - Response Video */}
          <div className="lg:col-span-2">
            <VideoDisplay videoUrl={responseVideoUrl} isLoading={isLoading} error={error} />
          </div>
        </div>
      </div>
    </main>
  )
}