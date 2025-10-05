import Link from 'next/link';
import { SubdomainForm } from './subdomain-form';
import { rootDomain } from '@/lib/utils';

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4 relative">
      <div className="absolute top-4 right-4">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Admin
        </Link>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
            🎨 Creative Experiences Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Multi-tenant platform for creative workshops and experiences
          </p>
          <p className="text-lg text-gray-500">
            Create your own marketplace subdomain for pottery, painting, and craft workshops
          </p>
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Launch Your Creative Marketplace</h2>
          <p className="text-gray-600 mb-6 text-center">
            Get your own branded subdomain to showcase and sell creative experiences
          </p>
          <SubdomainForm />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🏺</div>
            <h3 className="font-semibold text-gray-900">Pottery Studios</h3>
            <p className="text-gray-600 text-sm">Ceramics and clay workshops</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-900">Art Studios</h3>
            <p className="text-gray-600 text-sm">Painting and drawing classes</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-3">✂️</div>
            <h3 className="font-semibold text-gray-900">Craft Workshops</h3>
            <p className="text-gray-600 text-sm">DIY and handmade experiences</p>
          </div>
        </div>
      </div>
    </div>
  );
}
