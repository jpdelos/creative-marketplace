import { getExperiences, getExperienceImage } from '@/lib/experiences-api';

export default async function HomePage() {
  // Get experiences data
  const experiences = await getExperiences();
  const displayExperiences = experiences.slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                🎨 Creative Experiences Marketplace
              </h1>
              <p className="text-gray-600">Discover amazing pottery, painting, and craft workshops</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Available Creative Experiences
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect workshop for your creative journey
          </p>

          {/* Phase indicator */}
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            Phase 1: Single Marketplace - Multi-tenant features coming soon!
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {displayExperiences.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-gray-500 text-lg">Loading experiences from API...</p>
              <p className="text-gray-400">This connects to your Flask backend</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            Creative Experiences Marketplace - Phase 1
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Connected to Flask API • Multi-tenant features in development
          </p>
        </div>
      </footer>
    </div>
  );
}
