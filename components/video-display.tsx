"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, Loader } from "lucide-react"

interface VideoDisplayProps {
  videoUrl: string
  isLoading: boolean
  error: string
}

export default function VideoDisplay({ videoUrl, isLoading, error }: VideoDisplayProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 p-6 h-full min-h-96">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader className="animate-spin text-blue-400 mb-4" size={48} />
          <p className="text-slate-300">Processing your video...</p>
          <p className="text-slate-500 text-sm mt-2">This may take a few moments</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full">
          <AlertCircle className="text-red-400 mb-4" size={48} />
          <p className="text-red-300 font-medium">Error</p>
          <p className="text-slate-400 text-sm mt-2">{error}</p>
        </div>
      ) : videoUrl ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Processed Video</h3>
          <video controls className="w-full rounded-lg bg-black aspect-video" src={videoUrl} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="bg-slate-700/50 rounded-full p-4 mb-4">
            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-slate-400">Upload and process a video to see results</p>
        </div>
      )}
    </Card>
  )
}
