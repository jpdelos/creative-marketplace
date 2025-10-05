import { Redis } from '@upstash/redis';

// Simple in-memory store for development
class MockRedis {
  private store = new Map<string, any>();

  constructor() {
    // Add some sample marketplace data
    this.store.set('subdomain:pottery-studio', {
      emoji: '🏺',
      createdAt: Date.now() - 86400000, // 1 day ago
      name: 'Barcelona Pottery Studio',
      description: 'Traditional ceramics and modern pottery workshops',
      category: 'Cerámica',
      location: 'Barcelona, Spain'
    });

    this.store.set('subdomain:art-collective', {
      emoji: '🎨',
      createdAt: Date.now() - 172800000, // 2 days ago
      name: 'Madrid Art Collective',
      description: 'Painting, drawing, and mixed media art classes',
      category: 'Pintura',
      location: 'Madrid, Spain'
    });

    this.store.set('subdomain:creative-workshop', {
      emoji: '✂️',
      createdAt: Date.now() - 259200000, // 3 days ago
      name: 'Creative Workshop Hub',
      description: 'DIY crafts and handmade experiences for all ages',
      category: 'Arte',
      location: 'Valencia, Spain'
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = this.store.get(key);
    return value || null;
  }

  async set(key: string, value: any): Promise<void> {
    this.store.set(key, value);
  }

  async keys(pattern: string): Promise<string[]> {
    if (pattern === 'subdomain:*') {
      return Array.from(this.store.keys()).filter(key => key.startsWith('subdomain:'));
    }
    return [];
  }

  async mget<T>(...keys: string[]): Promise<T[]> {
    return keys.map(key => this.store.get(key) || null) as T[];
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

// Always use mock for now - no Redis required
export const redis = new MockRedis() as any;
