import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData } from '@/lib/subdomains';
import { protocol, rootDomain } from '@/lib/utils';
import { getExperiences, getFeaturedExperiences, getExperienceImage } from '@/lib/experiences-api';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain
    };
  }

  return {
    title: `${subdomainData.name || subdomain} - Creative Experiences`,
    description: `${subdomainData.description || `Creative workshops and experiences on ${subdomain}.${rootDomain}`}`
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  // Get experiences data
  const [experiences, featuredExperiences] = await Promise.all([
    getExperiences(),
    getFeaturedExperiences()
  ]);

  // Filter experiences by category if subdomain has one
  const filteredExperiences = subdomainData.category
    ? experiences.filter(exp => exp.category.toLowerCase() === subdomainData.category?.toLowerCase())
    : experiences;

  const displayExperiences = filteredExperiences.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{subdomainData.emoji}</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {subdomainData.name || `${subdomain} Creative Studio`}
                </h1>
                {subdomainData.location && (
                  <p className="text-sm text-gray-500">📍 {subdomainData.location}</p>
                )}
              </div>
            </div>
            <Link
              href={`${protocol}://${rootDomain}`}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to {rootDomain}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {subdomainData.description || 'Discover Amazing Creative Experiences'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {subdomainData.category
              ? `Specialized in ${subdomainData.category} workshops and classes`
              : 'Pottery, painting, and craft workshops for all skill levels'
            }
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Available Experiences</h3>

          {displayExperiences.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-gray-500 text-lg">No experiences available yet.</p>
              <p className="text-gray-400">Check back soon for exciting workshops!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayExperiences.map((experience) => (
                <div key={experience.id} className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={getExperienceImage(experience.category)}
                      alt={experience.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{experience.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{experience.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-purple-600">
                        €{experience.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {experience.duration} min
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">
                        {experience.category}
                      </span>
                      <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                        {experience.level}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600">
                      📍 {experience.city} • {experience.shop_name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Powered by Creative Experiences Marketplace
          </p>
          <p className="text-gray-500 text-sm mt-2">
            <Link href={`${protocol}://${rootDomain}`} className="hover:text-gray-700">
              Create your own marketplace at {rootDomain}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
