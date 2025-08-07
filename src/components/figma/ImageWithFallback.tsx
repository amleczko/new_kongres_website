import Image from 'next/image'
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps {
  src?: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
}

export function ImageWithFallback({ 
  src, 
  alt = "", 
  className, 
  style, 
  width = 500, 
  height = 300, 
  fill = false,
  sizes
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  if (didError || !src) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <Image src={ERROR_IMG_SRC} alt="Error loading image" width={88} height={88} />
        </div>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        style={style}
        fill
        sizes={sizes}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      style={style}
      width={width}
      height={height}
      onError={handleError}
    />
  )
}
