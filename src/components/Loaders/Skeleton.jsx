import React from 'react';
import { useSelector } from 'react-redux';

// Injection of premium shimmer wave effect to eliminate Loading.css dependency
const ShimmerStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes premiumShimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    .shimmer-wave {
      background-size: 200% 100%;
      animation: premiumShimmer 1.8s infinite linear;
    }
  `}} />
);

function Skeleton() {
  const mode = useSelector((state) => state.mode.mode);

  // Precise color weights designed for beautiful contrast in both themes
  const shimmerClass = mode === 'light'
    ? 'shimmer-wave bg-gradient-to-r from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0]'
    : 'shimmer-wave bg-gradient-to-r from-[#1E293B] via-[#334155] to-[#1E293B]';

  return (
    <>
      <ShimmerStyles />
      
      {}
      <div 
        className={`w-full rounded-2xl p-6 border transition-all duration-300 mb-4
          ${mode === 'light' 
            ? 'bg-white border-[#E2E8F0] shadow-sm' 
            : 'bg-[#11141A]/60 backdrop-blur-md border-[#334155]/40 shadow-xl shadow-black/10'
          }`}
      >
        {/* Post Header Skeleton */}
        <div className="flex items-center gap-3.5 mb-5">
          {/* Circular Profile Avatar Placeholder */}
          <div className={`h-11 w-11 rounded-full shrink-0 ${shimmerClass}`} />
          
          {/* User Names Lines */}
          <div className="flex flex-col gap-2 w-full">
            <div className={`h-4 w-1/4 rounded-md ${shimmerClass}`} />
            <div className={`h-3 w-1/6 rounded-md ${shimmerClass}`} />
          </div>
        </div>

        {/* Post Description Lines (Alternating Widths for Realistic Text Flow) */}
        <div className="flex flex-col gap-2.5 mb-5">
          <div className={`h-3.5 w-[92%] rounded-md ${shimmerClass}`} />
          <div className={`h-3.5 w-[96%] rounded-md ${shimmerClass}`} />
          <div className={`h-3.5 w-[65%] rounded-md ${shimmerClass}`} />
        </div>

        {/* Medium/Image Attachment Block Placeholder */}
        <div className={`w-full h-44 md:h-56 rounded-xl mb-5 ${shimmerClass}`} />

        {/* Post Footer Actions Placeholder */}
        <div className="flex items-center gap-6 pt-3 border-t border-slate-100/10 dark:border-slate-800/40">
          <div className={`h-5 w-16 rounded-md ${shimmerClass}`} />
          <div className={`h-5 w-16 rounded-md ${shimmerClass}`} />
        </div>
      </div>
    </>
  );
}

export default Skeleton;