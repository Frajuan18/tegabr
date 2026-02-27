// src/components/Skeletons.jsx
export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F7] font-outfit flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-16 sm:pt-0">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content Skeleton */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Badge skeleton */}
            <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-6 sm:mb-8">
              <div className="w-4 h-4 bg-[#E5E5EA] rounded-full mr-2 animate-pulse"></div>
              <div className="w-32 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
            </div>

            {/* Heading skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-12 sm:h-16 bg-[#E5E5EA] rounded-lg w-3/4 mx-auto lg:mx-0 animate-pulse"></div>
              <div className="h-12 sm:h-16 bg-[#E5E5EA] rounded-lg w-2/3 mx-auto lg:mx-0 animate-pulse"></div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-[#E5E5EA] rounded w-full max-w-md mx-auto lg:mx-0 animate-pulse"></div>
              <div className="h-4 bg-[#E5E5EA] rounded w-5/6 max-w-md mx-auto lg:mx-0 animate-pulse"></div>
              <div className="h-4 bg-[#E5E5EA] rounded w-4/6 max-w-md mx-auto lg:mx-0 animate-pulse"></div>
            </div>

            {/* Stats skeleton */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center bg-white rounded-xl px-4 py-2 shadow-sm">
                  <div className="w-4 h-4 bg-[#E5E5EA] rounded-full mr-2 animate-pulse"></div>
                  <div className="w-16 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <div className="w-full sm:w-40 h-12 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
              <div className="w-full sm:w-32 h-12 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
            </div>

            {/* Trust badges skeleton */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-48 h-6 bg-[#E5E5EA] rounded animate-pulse"></div>
            </div>
          </div>

          {/* Right Content Skeleton - hidden on mobile */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-white rounded-3xl p-4 shadow-[0_20px_0_#E5E5EA]">
              <div className="bg-[#F2F2F7] rounded-2xl p-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-[#E5E5EA] rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-[#E5E5EA] rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-[#E5E5EA] rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-24 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white rounded-lg p-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#E5E5EA] rounded mr-2 animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-[#E5E5EA] rounded w-3/4 mb-1 animate-pulse"></div>
                            <div className="h-2 bg-[#E5E5EA] rounded w-1/2 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturesSkeleton = () => {
  return (
    <div className="bg-[#F2F2F7] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-sm mb-4">
            <div className="w-24 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-[#E5E5EA] rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-[#E5E5EA] rounded w-96 max-w-full mx-auto animate-pulse"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center">
              <div className="w-8 h-8 bg-[#E5E5EA] rounded-xl mx-auto mb-2 animate-pulse"></div>
              <div className="w-16 h-6 bg-[#E5E5EA] rounded mx-auto mb-1 animate-pulse"></div>
              <div className="w-20 h-4 bg-[#E5E5EA] rounded mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Features grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-3xl p-6">
              <div className="w-12 h-12 bg-[#E5E5EA] rounded-2xl mb-4 animate-pulse"></div>
              <div className="h-5 bg-[#E5E5EA] rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 bg-[#E5E5EA] rounded w-full animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ServicesSkeleton = () => {
  return (
    <div className="bg-[#F2F2F7] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-sm mb-4">
            <div className="w-24 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-[#E5E5EA] rounded-lg w-72 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-[#E5E5EA] rounded w-96 max-w-full mx-auto animate-pulse"></div>
        </div>

        {/* Services grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-3xl p-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-[#E5E5EA] rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-[#E5E5EA] rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-[#E5E5EA] rounded w-5/6 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="flex items-center">
                        <div className="w-4 h-4 bg-[#E5E5EA] rounded-full mr-2 animate-pulse"></div>
                        <div className="h-3 bg-[#E5E5EA] rounded w-2/3 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-3xl p-6">
              <div className="text-center mb-6">
                <div className="h-5 bg-[#E5E5EA] rounded w-24 mx-auto mb-2 animate-pulse"></div>
                <div className="h-8 bg-[#E5E5EA] rounded w-20 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-[#E5E5EA] rounded w-32 mx-auto animate-pulse"></div>
              </div>
              <div className="space-y-3 mb-6">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="flex items-center">
                    <div className="w-4 h-4 bg-[#E5E5EA] rounded-full mr-2 animate-pulse"></div>
                    <div className="h-3 bg-[#E5E5EA] rounded w-5/6 animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="h-10 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Add this to your Skeletons.jsx file

export const TestimonialsSkeleton = () => {
  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <div className="w-4 h-4 bg-[#E5E5EA] rounded-full mr-2 animate-pulse"></div>
            <div className="w-32 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-[#E5E5EA] rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-[#E5E5EA] rounded w-96 max-w-full mx-auto animate-pulse"></div>
        </div>

        {/* Desktop/Tablet View Skeleton - 3 cards */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-6">
            {/* Left card skeleton */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-[#E5E5EA] rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-[#E5E5EA] rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
              <div className="flex space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-4 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-[#E5E5EA] rounded w-full animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-4/6 animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-3 bg-[#E5E5EA] rounded w-1/2 mt-3 animate-pulse"></div>
            </div>

            {/* Center card skeleton */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_15px_0_#E5E5EA]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-[#E5E5EA] rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-[#E5E5EA] rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
              <div className="flex space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-4 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
                ))}
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-[#E5E5EA] rounded w-full animate-pulse"></div>
                <div className="h-4 bg-[#E5E5EA] rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-[#E5E5EA] rounded w-4/6 animate-pulse"></div>
                <div className="h-4 bg-[#E5E5EA] rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-4 bg-[#E5E5EA] rounded w-2/3 animate-pulse"></div>
            </div>

            {/* Right card skeleton */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-[#E5E5EA] rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-[#E5E5EA] rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
              <div className="flex space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-4 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-[#E5E5EA] rounded w-full animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-4/6 animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-3 bg-[#E5E5EA] rounded w-1/2 mt-3 animate-pulse"></div>
            </div>
          </div>

          {/* Navigation buttons skeleton */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] animate-pulse"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] animate-pulse"></div>
        </div>

        {/* Mobile View Skeleton */}
        <div className="md:hidden">
          <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-[#E5E5EA] rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
            <div className="flex space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-4 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
              ))}
            </div>
            <div className="space-y-2 mb-3">
              <div className="h-3 bg-[#E5E5EA] rounded w-full animate-pulse"></div>
              <div className="h-3 bg-[#E5E5EA] rounded w-5/6 animate-pulse"></div>
              <div className="h-3 bg-[#E5E5EA] rounded w-4/6 animate-pulse"></div>
            </div>
            <div className="h-3 bg-[#E5E5EA] rounded w-1/2 animate-pulse"></div>
          </div>

          {/* Mobile navigation skeleton */}
          <div className="flex items-center justify-between mt-6">
            <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] animate-pulse"></div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-2 h-2 bg-[#E5E5EA] rounded-full animate-pulse"></div>
              ))}
            </div>
            <div className="w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] animate-pulse"></div>
          </div>
        </div>

        {/* Stats row skeleton */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center">
              <div className="h-8 bg-[#E5E5EA] rounded w-20 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-[#E5E5EA] rounded w-24 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Trust badges skeleton */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <div className="h-4 bg-[#E5E5EA] rounded w-32 animate-pulse"></div>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-[#E5E5EA] rounded w-16 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// Add to your Skeletons.jsx file

export const HowItWorksSkeleton = () => {
  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <div className="w-24 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-[#E5E5EA] rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-[#E5E5EA] rounded w-96 max-w-full mx-auto animate-pulse"></div>
        </div>

        {/* Desktop Steps Skeleton */}
        <div className="hidden lg:block relative mb-16">
          <div className="absolute top-24 left-0 right-0 h-1 bg-[#E5E5EA] rounded-full"></div>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#E5E5EA] rounded-3xl animate-pulse"></div>
                <div className="h-5 bg-[#E5E5EA] rounded w-3/4 mx-auto mb-3 animate-pulse"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-[#E5E5EA] rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-[#E5E5EA] rounded w-5/6 mx-auto animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-3 bg-[#E5E5EA] rounded w-2/3 mx-auto animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Steps Skeleton */}
        <div className="lg:hidden space-y-4 mb-16">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA]">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-[#E5E5EA] rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-[#E5E5EA] rounded w-full mb-1 animate-pulse"></div>
                  <div className="h-3 bg-[#E5E5EA] rounded w-5/6 mb-2 animate-pulse"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="h-6 bg-[#E5E5EA] rounded-full w-16 animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-[0_8px_0_#E5E5EA]">
              <div className="h-8 bg-[#E5E5EA] rounded w-20 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-[#E5E5EA] rounded w-24 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Video Demo Skeleton */}
        <div className="bg-[#E5E5EA] rounded-3xl p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="h-8 bg-white/50 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-white/50 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/50 rounded w-5/6 animate-pulse"></div>
              </div>
              <div className="flex gap-4">
                <div className="w-32 h-12 bg-white/50 rounded-2xl animate-pulse"></div>
                <div className="w-32 h-12 bg-white/50 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="bg-black/20 rounded-2xl p-4">
              <div className="aspect-video bg-white/10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Add this to your Skeletons.jsx file

export const ContactUsSkeleton = () => {
  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <div className="w-24 h-4 bg-[#E5E5EA] rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-[#E5E5EA] rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-[#E5E5EA] rounded w-96 max-w-full mx-auto animate-pulse"></div>
        </div>

        {/* Contact Info Cards Skeleton */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-3xl p-6 text-center shadow-[0_10px_0_#E5E5EA]">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#E5E5EA] rounded-2xl animate-pulse"></div>
              <div className="h-5 bg-[#E5E5EA] rounded w-24 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-[#E5E5EA] rounded w-32 mx-auto mb-1 animate-pulse"></div>
              <div className="h-3 bg-[#E5E5EA] rounded w-28 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Contact Form Skeleton */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_15px_0_#E5E5EA]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - Form Skeleton */}
            <div>
              <div className="h-6 bg-[#E5E5EA] rounded w-40 mb-6 animate-pulse"></div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i}>
                    <div className="h-4 bg-[#E5E5EA] rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-12 bg-[#E5E5EA] rounded-2xl w-full animate-pulse"></div>
                  </div>
                ))}
                
                <div className="h-12 bg-[#E5E5EA] rounded-2xl w-full mt-6 animate-pulse"></div>
              </div>
            </div>

            {/* Right side - Illustration Skeleton */}
            <div className="bg-[#F2F2F7] rounded-3xl p-6 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-[#E5E5EA] rounded-3xl mb-6 animate-pulse"></div>
              <div className="h-5 bg-[#E5E5EA] rounded w-32 mb-2 animate-pulse"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-[#E5E5EA] rounded w-48 animate-pulse"></div>
                <div className="h-3 bg-[#E5E5EA] rounded w-44 animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-[#E5E5EA] rounded-full w-20 animate-pulse"></div>
                <div className="h-6 bg-[#E5E5EA] rounded-full w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};