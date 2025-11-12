"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Star, StarOff, GripVertical, ImageIcon, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageFile {
  id: string
  file: File
  preview: string
  isCover: boolean
  uploading?: boolean
  error?: string
}

interface ImageUploaderProps {
  images: ImageFile[]
  onImagesChange: (images: ImageFile[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
  className?: string
}

export function ImageUploader({
  images,
  onImagesChange,
  maxFiles = 10,
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  className,
}: ImageUploaderProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const draggedOverIndex = useRef<number | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        console.error("Rejected files:", rejectedFiles)
      }

      // Process accepted files
      const newImages: ImageFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        isCover: images.length === 0, // First image is cover by default
        uploading: false,
      }))

      // Check if adding new images would exceed maxFiles
      if (images.length + newImages.length > maxFiles) {
        const allowedCount = maxFiles - images.length
        onImagesChange([...images, ...newImages.slice(0, allowedCount)])
      } else {
        onImagesChange([...images, ...newImages])
      }
    },
    [images, maxFiles, onImagesChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    multiple: true,
    disabled: images.length >= maxFiles,
  })

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id)

    // If removed image was cover, make first remaining image the cover
    if (updatedImages.length > 0) {
      const removedImage = images.find((img) => img.id === id)
      if (removedImage?.isCover) {
        updatedImages[0].isCover = true
      }
    }

    onImagesChange(updatedImages)
  }

  const setCoverImage = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isCover: img.id === id,
    }))
    onImagesChange(updatedImages)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    draggedOverIndex.current = index
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && draggedOverIndex.current !== null && draggedIndex !== draggedOverIndex.current) {
      const newImages = [...images]
      const draggedImage = newImages[draggedIndex]

      // Remove dragged item
      newImages.splice(draggedIndex, 1)

      // Insert at new position
      newImages.splice(draggedOverIndex.current, 0, draggedImage)

      onImagesChange(newImages)
    }

    setDraggedIndex(null)
    draggedOverIndex.current = null
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      {images.length < maxFiles && (
        <Card>
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">{isDragActive ? "Drop images here" : "Upload property images"}</p>
                  <p className="text-sm text-muted-foreground">Drag & drop images or click to browse</p>
                  <p className="text-xs text-muted-foreground">
                    Max {maxFiles} files, {maxSize}MB each. Supports JPG, PNG, WebP
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Property Images ({images.length})</h3>
            <Badge variant="outline" className="text-xs">
              Drag to reorder
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Card
                key={image.id}
                className={cn(
                  "relative group cursor-move transition-all",
                  draggedIndex === index && "opacity-50 scale-95",
                  image.isCover && "ring-2 ring-primary",
                )}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <CardContent className="p-2">
                  <div className="aspect-square relative rounded-md overflow-hidden bg-muted">
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Controls */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setCoverImage(image.id)}
                        className="h-8 w-8 p-0"
                      >
                        {image.isCover ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(image.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Cover Badge */}
                    {image.isCover && <Badge className="absolute top-2 left-2 text-xs">Cover</Badge>}

                    {/* Drag Handle */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="h-4 w-4 text-white" />
                    </div>

                    {/* Upload Progress */}
                    {image.uploading && (
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                        <div className="text-white text-sm">Uploading...</div>
                      </div>
                    )}

                    {/* Error State */}
                    {image.error && (
                      <div className="absolute inset-0 bg-destructive/75 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Instructions */}
          <Alert>
            <ImageIcon className="h-4 w-4" />
            <AlertDescription>
              The first image will be used as the cover photo. You can change this by clicking the star icon on any
              image. Drag images to reorder them.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
