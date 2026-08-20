import type { ImageMetadata } from 'astro'
import type { PhotoData, Photo, PolaroidVariant } from '~/types'

// Auto-import all images under the photos directory.
const photoModules = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/**/*.{webp,jpg,jpeg,png}', { eager: true })

/**
 * Get a sorted list of photos by directory name.
 * @param dir - Directory name, for example '2025-06-21-cat'
 * @param alt - Image alt text
 * @param variants - Variant for each image, mapped by index
 */
function getPhotos(dir: string, alt: string, variants: PolaroidVariant[]): Photo[] {
  return Object.entries(photoModules)
    .filter(([path]) => path.includes(`/${dir}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod], index) => {
      const img = mod.default
      return {
        src: img,
        alt,
        width: img.width,
        height: img.height,
        variant: variants[index] || '4x3',
      }
    })
}

export const PhotosList: PhotoData[] = [
  {
    title: 'Mr. Hudson - My Tristam 701 Offshore',
    icon: { type: 'emoji', value: '🚤' },
    description: 'Mr. Hudson is my 3rd boat. I built it new in 2017. ',
    date: '2017-08-08',
    travel: '',
    photos: getPhotos('MrHudson', 'My latest boat Mr. Hudson', ['4x3', '4x3', '4x3']),
  },
  {
    title: 'Flight Simulator',
    icon: { type: 'emoji', value: '🖼️' },
    description: 'I built a flight simulator of a Cessna 172. It was a fantastic learning curve. I even had it certified by the CAA as a synthetic instrument training device',
    date: '2026-02-20',
    travel: '',
    photos: getPhotos('flightsim', 'My Cessna 172 Flight Simulator', ['4x3', '4x3', '4x3', '4x3', '4x3', '4x3']),
  }
]
