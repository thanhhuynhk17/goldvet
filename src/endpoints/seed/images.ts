import type { Media } from '@/payload-types'
import type { Payload } from 'payload'
import { promises as fs } from 'fs'
import path from 'path'

export interface ImageConfig {
  filename: string
  alt: string
  category: 'product' | 'hero' | 'news' | 'logo'
  tags?: string[]
}

export class ImageSeeder {
  private payload: Payload
  private basePath = 'public/media'

  constructor(payload: Payload) {
    this.payload = payload
  }

  /**
   * Upload multiple images with progress tracking and error handling
   */
  async uploadImages(imageConfigs: ImageConfig[], batchSize = 5): Promise<Media[]> {
    const results: Media[] = []
    const errors: string[] = []

    this.payload.logger.info(`Starting upload of ${imageConfigs.length} images...`)

    // Process in batches to avoid memory issues
    for (let i = 0; i < imageConfigs.length; i += batchSize) {
      const batch = imageConfigs.slice(i, i + batchSize)
      this.payload.logger.info(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(imageConfigs.length / batchSize)}`)

      const batchResults = await Promise.allSettled(
        batch.map(config => this.uploadSingleImage(config))
      )

      // Handle successful uploads
      const successfulUploads = batchResults
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<Media>).value)

      results.push(...successfulUploads)

      // Collect errors
      const batchErrors = batchResults
        .filter(result => result.status === 'rejected')
        .map(result => {
          const reason = (result as PromiseRejectedResult).reason
          return reason instanceof Error ? reason.message : String(reason)
        })

      errors.push(...batchErrors)

      this.payload.logger.info(`Batch complete: ${successfulUploads.length} success, ${batchErrors.length} errors`)
    }

    if (errors.length > 0) {
      this.payload.logger.warn(`Completed with ${errors.length} errors`)
      errors.forEach(error => this.payload.logger.warn(`- ${error}`))
    }

    this.payload.logger.info(`Successfully uploaded ${results.length}/${imageConfigs.length} images`)
    return results
  }

  /**
   * Upload a single image with error handling
   */
  private async uploadSingleImage(config: ImageConfig): Promise<Media> {
    try {
      const imageBuffer = await this.readImageFile(config.filename)

      return await this.payload.create({
        collection: 'media',
        data: {
          alt: config.alt,
        },
        file: {
          name: config.filename,
          data: imageBuffer,
          mimetype: this.getMimeType(config.filename),
          size: imageBuffer.length,
        },
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      this.payload.logger.error(`Failed to upload ${config.filename}: ${errorMessage}`)
      throw error
    }
  }

  /**
   * Read and validate image file
   */
  private async readImageFile(filename: string): Promise<Buffer> {
    const filepath = path.join(process.cwd(), this.basePath, filename)

    try {
      // Check if file exists
      await fs.access(filepath)

      // Read file
      const buffer = await fs.readFile(filepath)

      // Validate file size (max 10MB)
      if (buffer.length > 10 * 1024 * 1024) {
        throw new Error(`Image too large: ${filename} (${buffer.length} bytes)`)
      }

      // Basic image validation (check for common image signatures)
      if (!this.isValidImage(buffer)) {
        throw new Error(`Invalid image file: ${filename}`)
      }

      return buffer
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new Error(`Image file not found: ${filename}`)
      }
      throw error
    }
  }

  /**
   * Basic image validation by checking file signatures
   */
  private isValidImage(buffer: Buffer): boolean {
    // JPEG: FF D8
    if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xD8) return true
    // PNG: 89 50 4E 47
    if (buffer.length >= 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return true
    // GIF: 47 49 46
    if (buffer.length >= 3 && buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) return true
    // WebP: 52 49 46 46 (RIFF)
    if (buffer.length >= 12 && buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) return true

    return false
  }

  /**
   * Get MIME type from filename
   */
  private getMimeType(filename: string): string {
    const ext = path.extname(filename).toLowerCase()
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg'
      case '.png':
        return 'image/png'
      case '.gif':
        return 'image/gif'
      case '.webp':
        return 'image/webp'
      default:
        return 'image/jpeg' // fallback
    }
  }

  /**
   * Validate that all required images exist
   */
  async validateImages(imageConfigs: ImageConfig[]): Promise<{ valid: boolean, missing: string[] }> {
    const missing: string[] = []

    for (const config of imageConfigs) {
      const filepath = path.join(process.cwd(), this.basePath, config.filename)
      try {
        await fs.access(filepath)
      } catch {
        missing.push(config.filename)
      }
    }

    return {
      valid: missing.length === 0,
      missing
    }
  }

  /**
   * Create fallback placeholder image
   */
  createPlaceholderImage(config: ImageConfig): Media {
    // Tiny 1x1 transparent PNG as base64
    const placeholderBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

    return {
      id: 0, // Use 0 for placeholder ID
      alt: config.alt,
      filename: 'placeholder.jpg',
      filesize: 68,
      mimeType: 'image/jpeg',
      url: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as unknown as Media // Safer type casting
  }
}

// Veterinary image configurations
export const VETERINARY_IMAGES: ImageConfig[] = [
  // Product images
  {
    filename: 'vet-examining-pig.jpg',
    alt: 'Veterinarian examining pig on farm',
    category: 'product',
    tags: ['pig', 'veterinary', 'farming']
  },
  {
    filename: 'aquaculture-fish-swimming.jpg',
    alt: 'Fish swimming in aquaculture facility',
    category: 'product',
    tags: ['aquaculture', 'fish', 'farming']
  },
  {
    filename: 'livestock-cattle-farm.jpg',
    alt: 'Cattle on grassy farm field',
    category: 'product',
    tags: ['cattle', 'livestock', 'farming']
  },
  {
    filename: 'vet-cattle-exam.jpg',
    alt: 'Veterinarian performing health check on cattle',
    category: 'product',
    tags: ['cattle', 'veterinary', 'health']
  },
  {
    filename: 'vet-examining-horse.jpg',
    alt: 'Veterinarian examining horse',
    category: 'product',
    tags: ['horse', 'veterinary', 'animal']
  },
  {
    filename: 'pet-medicine-prescription.jpg',
    alt: 'Pet medicine and prescription drugs',
    category: 'product',
    tags: ['pet', 'medicine', 'pharmacy']
  },

  // Hero/Banner images
  {
    filename: 'farm-animal-hospital.jpg',
    alt: 'Farm animal hospital facility',
    category: 'hero',
    tags: ['hospital', 'facility', 'veterinary']
  },
  {
    filename: 'aquaculture-fish-farm.jpg',
    alt: 'Aerial view of aquaculture fish farm',
    category: 'hero',
    tags: ['aquaculture', 'farm', 'farming']
  },
  {
    filename: 'farm-livestock-banner.jpg',
    alt: 'Farm livestock and poultry banner',
    category: 'hero',
    tags: ['livestock', 'poultry', 'banner']
  },

  // News images
  {
    filename: 'veterinary-health-products.jpg',
    alt: 'Veterinary health products display',
    category: 'news',
    tags: ['products', 'health', 'veterinary']
  },
  {
    filename: 'aquaculture-salt-ponds.jpg',
    alt: 'Aquaculture salt evaporation ponds',
    category: 'news',
    tags: ['aquaculture', 'salt', 'farming']
  },
  {
    filename: 'farm-products-display.jpg',
    alt: 'Farm products display with dairy and meat',
    category: 'news',
    tags: ['farm', 'products', 'dairy']
  }
]
