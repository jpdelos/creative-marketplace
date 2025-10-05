// API integration with Creative Experiences backend
const API_BASE = 'https://creative-marketplace-seven.vercel.app/api/v2'

export interface Experience {
  id: number
  title: string
  description: string
  shop_name: string
  category: string
  price: number
  duration: number
  level: string
  city: string
  latitude: number
  longitude: number
}

export interface Shop {
  id: number
  name: string
  description: string
  owner_id: number
  city: string
  latitude?: number
  longitude?: number
  experience_count: number
}

// Fetch all experiences
export async function getExperiences(): Promise<Experience[]> {
  try {
    const response = await fetch(`${API_BASE}/experiences`)
    if (!response.ok) {
      throw new Error('Failed to fetch experiences')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

// Fetch all shops
export async function getShops(): Promise<Shop[]> {
  try {
    const response = await fetch(`${API_BASE}/shops`)
    if (!response.ok) {
      throw new Error('Failed to fetch shops')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching shops:', error)
    return []
  }
}

// Search experiences
export async function searchExperiences(params: {
  q?: string
  category?: string
  city?: string
  min_price?: number
  max_price?: number
  level?: string
}): Promise<Experience[]> {
  try {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.append(key, value.toString())
      }
    })

    const response = await fetch(`${API_BASE}/search?${searchParams}`)
    if (!response.ok) {
      throw new Error('Failed to search experiences')
    }
    return response.json()
  } catch (error) {
    console.error('Error searching experiences:', error)
    return []
  }
}

// Get featured experiences
export async function getFeaturedExperiences(): Promise<Experience[]> {
  try {
    const response = await fetch(`${API_BASE}/discover`)
    if (!response.ok) {
      throw new Error('Failed to fetch featured experiences')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching featured experiences:', error)
    return []
  }
}

// Generate category-based images for experiences
export function getExperienceImage(category: string): string {
  const categoryImages = {
    'Arte': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    'Cerámica': 'https://images.unsplash.com/photo-1578593745816-4d43c9b0d75c?w=800&h=600&fit=crop',
    'Pintura': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop'
  };

  return categoryImages[category as keyof typeof categoryImages] ||
         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop';
}