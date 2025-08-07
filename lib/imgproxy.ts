import CryptoJS from 'crypto-js'

const IMGPROXY_BASE_URL = process.env.NEXT_PUBLIC_IMGPROXY_URL || 'https://photo.misterogrande.pl'
const IMGPROXY_KEY = process.env.NEXT_PUBLIC_IMGPROXY_KEY || ''
const IMGPROXY_SALT = process.env.NEXT_PUBLIC_IMGPROXY_SALT || ''

/**
 * Generates a signed imgproxy URL - works both server and client side
 * @param resizing - e.g., "rs:fit:800:450" or "rs:fill:300:200"
 * @param imagePath - e.g., "2024/662.jpg"
 * @param format - optional format, e.g., "webp", "jpg", "png"
 */
export function generateImgproxyUrl(
  resizing: string,
  imagePath: string,
  format: string = 'jpg'
): string {
  const formatSuffix = format !== 'jpg' ? `@${format}` : '@jpg'
  
  // Fallback to unsafe URLs if keys are not available
  if (!IMGPROXY_KEY || !IMGPROXY_SALT) {
    return `${IMGPROXY_BASE_URL}/unsafe/${resizing}/plain/local:///${imagePath}${formatSuffix}`
  }

  // Build the path for signing
  const path = `/${resizing}/plain/local:///${imagePath}${formatSuffix}`
  
  // Server-side signing with Node.js crypto
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createHmac } = require('crypto')
    
    const keyBinary = Buffer.from(IMGPROXY_KEY, 'hex')
    const saltBinary = Buffer.from(IMGPROXY_SALT, 'hex')
    
    const hmac = createHmac('sha256', keyBinary)
    hmac.update(saltBinary)
    hmac.update(path)
    
    const signature = hmac.digest('base64url')
    
    return `${IMGPROXY_BASE_URL}/${signature}${path}`
  }

  // Client-side signing with crypto-js
  const keyWords = CryptoJS.enc.Hex.parse(IMGPROXY_KEY)
  const saltWords = CryptoJS.enc.Hex.parse(IMGPROXY_SALT)
  
  // Create HMAC with salt + path
  const hmac = CryptoJS.HmacSHA256(saltWords.concat(CryptoJS.enc.Utf8.parse(path)), keyWords)
  
  // Convert to base64url
  const signature = hmac.toString(CryptoJS.enc.Base64)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  
  return `${IMGPROXY_BASE_URL}/${signature}${path}`
}

/**
 * Helper function for common resize operations
 */
export const imgproxyHelpers = {
  /**
   * Resize and fit image within bounds
   */
  fit: (width: number, height: number, imagePath: string, format: string = 'jpg') => {
    return generateImgproxyUrl(`rs:fit:${width}:${height}`, imagePath, format)
  },

  /**
   * Resize and fill image to exact dimensions (may crop)
   */
  fill: (width: number, height: number, imagePath: string, format: string = 'jpg') => {
    return generateImgproxyUrl(`rs:fill:${width}:${height}`, imagePath, format)
  },

  /**
   * Auto-resize for responsive images
   */
  auto: (width: number, imagePath: string, format: string = 'jpg') => {
    return generateImgproxyUrl(`rs:auto:${width}`, imagePath, format)
  },

  /**
   * YouTube thumbnail helper
   */
  youtubeThumbnail: (videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`
  }
}