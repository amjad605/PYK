"use client";

import { Card, CardContent } from "@/components/ui/card";

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden w-full bg-white border-gray-200 shadow-md rounded-2xl animate-pulse">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-gray-200" />

        {/* Overlay Actions Skeleton */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>

        {/* Category Badge Skeleton */}
        <div className="absolute top-4 left-4">
          <div className="w-16 h-6 rounded-full bg-gray-300" />
        </div>
      </div>

      <CardContent className="p-4 m-12">
        {/* Title Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="w-3/4 h-5 bg-gray-300 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 rounded" />
        </div>

        {/* Price Skeleton */}
        <div className="mb-4">
          <div className="w-1/3 h-6 bg-gray-300 rounded" />
        </div>

        {/* Property Details Skeleton */}
        <div className="flex items-center justify-between mb-4 space-x-4">
          <div className="w-12 h-4 bg-gray-300 rounded" />
          <div className="w-12 h-4 bg-gray-300 rounded" />
          <div className="w-12 h-4 bg-gray-300 rounded" />
        </div>

        {/* Facilities Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="w-16 h-5 bg-gray-300 rounded-full" />
          <div className="w-16 h-5 bg-gray-300 rounded-full" />
          <div className="w-16 h-5 bg-gray-300 rounded-full" />
          <div className="w-16 h-5 bg-gray-300 rounded-full" />
        </div>

        {/* Button Skeleton */}
      </CardContent>
    </Card>
  );
}
