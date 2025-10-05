# 🎨 Creative Experiences Marketplace

A multi-tenant platform for creative workshops and experiences built with **Next.js 15** and **Vercel's Platforms Starter Kit**.

## 🚀 **Live Demo**

Visit the platform to create your own creative marketplace:
- **Main Platform**: [Creative Marketplace Platforms](https://creative-marketplace-platforms.vercel.app) (coming soon)
- **Backend API**: [Creative Experiences API](https://creative-marketplace-seven.vercel.app/api/v2/experiences)

## ✨ **Features**

### 🏪 **Multi-Tenant Architecture**
- **Custom subdomains** for each creative studio (e.g., `pottery-studio.yourdomain.com`)
- **Branded marketplace experience** with custom name, description, and specialization
- **Category-based filtering** for pottery, painting, and craft workshops
- **Tenant management** through admin interface

### 🎨 **Creative Workshop Integration**
- **Real API integration** with live workshop data
- **Experience listings** with images, pricing, duration, and skill levels
- **Shop information** including location and contact details
- **Category specialization** (Ceramics, Painting, General Arts & Crafts)

### 🛠 **Technical Stack**
- **Framework**: Next.js 15 with App Router and React 19
- **Multi-tenancy**: Vercel Platforms Starter Kit with subdomain routing
- **Database**: Upstash Redis for tenant data storage
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Deployment**: Vercel with serverless functions
- **Backend**: Flask API integration for experiences data

## 🏗 **Project Structure**

```
creative-marketplace-platforms/
├── app/
│   ├── page.tsx                    # Platform landing page
│   ├── subdomain-form.tsx          # Marketplace creation form
│   ├── actions.ts                  # Server actions for tenant management
│   ├── admin/                      # Admin dashboard
│   └── s/[subdomain]/page.tsx      # Individual marketplace pages
├── lib/
│   ├── experiences-api.ts          # API integration with Flask backend
│   ├── subdomains.ts              # Tenant data management
│   ├── redis.ts                   # Redis client with dev fallback
│   └── utils.ts                   # Shared utilities
├── components/
│   └── ui/                        # shadcn/ui components
├── middleware.ts                   # Subdomain routing logic
└── package.json                    # Dependencies and scripts
```

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18.17.0 or later
- npm or pnpm
- Upstash Redis account (for production)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jpdelos/creative-marketplace-platforms.git
   cd creative-marketplace-platforms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # For local development, create .env.local
   cp .env.example .env.local

   # Add your Redis credentials (optional for dev)
   KV_REST_API_URL=your_redis_url
   KV_REST_API_TOKEN=your_redis_token
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Main platform: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Sample marketplaces:
     - http://pottery-studio.localhost:3000
     - http://art-collective.localhost:3000
     - http://creative-workshop.localhost:3000

## 🌐 **Deployment to Vercel**

### 1. Set Up Redis (Required)

Create an Upstash Redis database:
1. Go to [Upstash Console](https://upstash.com/)
2. Create a new Redis database
3. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjpdelos%2Fcreative-marketplace-platforms&project-name=creative-marketplace-platforms&repository-name=creative-marketplace-platforms)

**🚀 IMPORTANT**: Make sure to connect Vercel to the `jpdelos/creative-marketplace-platforms` repository, not any old repositories.

Or manually:
1. Import the repository in Vercel
2. Set environment variables:
   - `KV_REST_API_URL`: Your Upstash Redis URL
   - `KV_REST_API_TOKEN`: Your Upstash Redis token
3. Deploy

### 3. Configure Custom Domain (Optional)

For custom domains with subdomain support:
1. Add your domain to Vercel project
2. Add wildcard DNS record: `*.yourdomain.com`
3. Update the domain settings in Vercel

## 🎨 **Creating a Marketplace**

1. Visit the main platform
2. Fill out the marketplace creation form:
   - **Subdomain**: Choose your unique subdomain
   - **Icon**: Select an emoji to represent your marketplace
   - **Name**: Your marketplace display name
   - **Description**: Brief description of your offerings
   - **Specialization**: Focus on specific creative categories
   - **Location**: Your city or region

3. Your marketplace will be instantly available at `subdomain.yourdomain.com`

## 🔧 **API Integration**

The platform integrates with a Flask backend API for creative experiences:

### Endpoints Used
```
GET /api/v2/experiences        # List all experiences
GET /api/v2/discover          # Featured experiences
GET /api/v2/search            # Search with filters
GET /api/v2/shops             # List all shops
```

### Data Structure
```typescript
interface Experience {
  id: number
  title: string
  description: string
  shop_name: string
  category: string        // "Cerámica", "Pintura", "Arte"
  price: number
  duration: number        // minutes
  level: string          // "Principiante", "Intermedio", "Avanzado"
  city: string
  latitude: number
  longitude: number
}
```

## 🏪 **Marketplace Features**

Each tenant marketplace includes:

- **Professional header** with marketplace branding
- **Experience grid** showing available workshops
- **Category filtering** based on specialization
- **Pricing and duration** information
- **Skill level indicators** (Beginner, Intermediate, Advanced)
- **Location details** for each workshop
- **Responsive design** for all devices

## 🛠 **Development**

### Mock Data
For local development, the platform includes mock Redis implementation with sample marketplaces:
- `pottery-studio` - Ceramics focused
- `art-collective` - Painting focused
- `creative-workshop` - General crafts

### Environment Variables
```bash
# Required for production
KV_REST_API_URL=your_upstash_redis_url
KV_REST_API_TOKEN=your_upstash_redis_token

# Optional: Override default domain
NEXT_PUBLIC_ROOT_DOMAIN=yourdomain.com
```

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📝 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 **Related Projects**

- **Backend API**: [Creative Experiences Flask API](https://github.com/jpdelos/creative-marketplace-backend)
- **Original Template**: [Vercel Platforms Starter Kit](https://github.com/vercel/platforms)

---

**Built with ❤️ using Vercel's Platforms Starter Kit**