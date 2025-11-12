"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, FileImage, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloorPlanFile {
  id: string
  file: File
  preview: string
  uploading?: boolean
  error?: string
}

interface FloorPlanUploaderProps {
  floorPlans: FloorPlanFile[]
  onFloorPlansChange: (floorPlans: FloorPlanFile[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  className?: string
}

export function FloorPlanUploader({
  floorPlans,
  onFloorPlansChange,
  maxFiles = 5,
  maxSize = 10,
  className,
}: FloorPlanUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFloorPlans: FloorPlanFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        uploading: false,
      }))

      // Check if adding new files would exceed maxFiles
      if (floorPlans.length + newFloorPlans.length > maxFiles) {
        const allowedCount = maxFiles - floorPlans.length
        onFloorPlansChange([...floorPlans, ...newFloorPlans.slice(0, allowedCount)])
      } else {
        onFloorPlansChange([...floorPlans, ...newFloorPlans])
      }
    },
    [floorPlans, maxFiles, onFloorPlansChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "image/webp": [],
      "application/pdf": [],
    },
    maxSize: maxSize * 1024 * 1024,
    multiple: true,
    disabled: floorPlans.length >= maxFiles,
  })

  const removeFloorPlan = (id: string) => {
    const updatedFloorPlans = floorPlans.filter((plan) => plan.id !== id)
    onFloorPlansChange(updatedFloorPlans)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Floor Plans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        {floorPlans.length < maxFiles && (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-muted">
                <FileImage className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">{isDragActive ? "Drop floor plans here" : "Upload floor plans"}</p>
                <p className="text-sm text-muted-foreground">Drag & drop or click to browse</p>
                <p className="text-xs text-muted-foreground">
                  Max {maxFiles} files, {maxSize}MB each. Supports JPG, PNG, WebP, PDF
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Floor Plans List */}
        {floorPlans.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Uploaded Floor Plans ({floorPlans.length})</h4>
            </div>

            <div className="space-y-2">
              {floorPlans.map((plan, index) => (
                <div key={plan.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-shrink-0">
                    {plan.file.type === "application/pdf" ? (
                      <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                        <FileImage className="h-6 w-6 text-red-600" />
                      </div>
                    ) : (
                      <img
                        src={plan.preview || "/placeholder.svg"}
                        alt={`Floor plan ${index + 1}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{plan.file.name}</p>
                    <p className="text-sm text-muted-foreground">{(plan.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>

                  {plan.uploading && <Badge variant="outline">Uploading...</Badge>}

                  {plan.error && (
                    <div className="flex items-center gap-1 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Error</span>
                    </div>
                  )}

                  <Button size="sm" variant="ghost" onClick={() => removeFloorPlan(plan.id)} className="flex-shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
