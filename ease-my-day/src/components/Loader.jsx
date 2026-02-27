// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-[#6C63FF] to-[#4EC5B1] animate-spin"></div>
        {/* Inner circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#F2F2F7] rounded-2xl"></div>
        {/* Logo or icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 bg-gradient-to-r from-[#6C63FF] to-[#4EC5B1] rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}