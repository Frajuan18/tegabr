// src/components/TestimonialsSection.jsx
import { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaQuoteRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science, Stanford",
      avatar: "SJ",
      avatarColor: "from-[#6C63FF] to-[#4EC5B1]",
      quote: "Tegbar completely transformed how I manage my coursework. The deadline tracker alone saved me from missing two major assignments this semester!",
      rating: 5,
      course: "CS101 - Intro to Programming"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Pre-Med, Harvard",
      avatar: "MC",
      avatarColor: "from-[#FF6B6B] to-[#FF9F6B]",
      quote: "The AI study assistant is incredible. It helped me understand complex biology concepts and generated practice questions that were on point for my exams.",
      rating: 5,
      course: "BIO201 - Molecular Biology"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Business, UPenn",
      avatar: "ER",
      avatarColor: "from-[#4EC5B1] to-[#6C63FF]",
      quote: "Group study rooms made collaboration so easy. My team aced our marketing presentation thanks to the shared whiteboard and real-time editing.",
      rating: 5,
      course: "MKTG301 - Marketing Strategy"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Engineering, MIT",
      avatar: "DK",
      avatarColor: "from-[#FFB86B] to-[#FF7A7A]",
      quote: "The lecture recording feature is a game-changer. I can review complex physics concepts anytime, and the transcripts are searchable!",
      rating: 5,
      course: "PHY101 - Classical Mechanics"
    },
    {
      id: 5,
      name: "Jessica Taylor",
      role: "Psychology, Yale",
      avatar: "JT",
      avatarColor: "from-[#5B6CFF] to-[#B8B5FF]",
      quote: "My GPA went from 3.2 to 3.8 after using Tegbar. The progress tracking and study reminders kept me consistent throughout the semester.",
      rating: 5,
      course: "PSY101 - Introduction to Psychology"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  // Get visible testimonials (previous, current, next)
  const getVisibleTestimonials = () => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const next = (activeIndex + 1) % testimonials.length;
    
    return {
      prev: testimonials[prev],
      current: testimonials[activeIndex],
      next: testimonials[next]
    };
  };

  const visible = getVisibleTestimonials();

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-[#FFB86B]' : 'text-[#E5E5EA]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#F2F2F7] font-outfit py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-2xl px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.05)] mb-4">
            <FaStar className="h-4 w-4 text-[#FFB86B] mr-2" />
            <span className="text-sm font-medium text-[#6B6B70]">Student Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-4">
            Loved by <span className="bg-gradient-to-r from-[#1C1C1E] to-[#6C63FF] bg-clip-text text-transparent">students</span> everywhere
          </h2>
          <p className="text-lg text-[#6B6B70] max-w-2xl mx-auto">
            Join thousands of students who have transformed their academic journey with Tegbar.
          </p>
        </div>

        {/* Desktop/Tablet View - 3 cards */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-6">
            {/* Previous card (left) */}
            <div className="transform scale-95 opacity-70 transition-all duration-300">
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] h-full">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${visible.prev.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                    {visible.prev.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#111111] truncate">{visible.prev.name}</h4>
                    <p className="text-xs text-[#6B6B70] truncate">{visible.prev.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <StarRating rating={visible.prev.rating} />
                </div>
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-1 -left-1 h-3 w-3 text-[#E5E5EA]" />
                  <p className="text-sm text-[#6B6B70] line-clamp-4 pl-4">
                    {visible.prev.quote}
                  </p>
                </div>
                <p className="text-xs font-medium text-[#9A9AA0] mt-3">
                  {visible.prev.course}
                </p>
              </div>
            </div>

            {/* Current card (center - highlighted) */}
            <div className="transform scale-105 z-10 transition-all duration-300">
              <div className="bg-white rounded-3xl p-8 shadow-[0_15px_0_#E5E5EA,0_20px_40px_rgba(0,0,0,0.15)] h-full border-2 border-transparent hover:border-[#6C63FF] transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${visible.current.avatarColor} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}>
                    {visible.current.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#111111] text-lg truncate">{visible.current.name}</h4>
                    <p className="text-sm text-[#6B6B70] truncate">{visible.current.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <StarRating rating={visible.current.rating} />
                </div>
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-1 -left-1 h-4 w-4 text-[#6C63FF] opacity-30" />
                  <p className="text-[#111111] leading-relaxed pl-5">
                    {visible.current.quote}
                  </p>
                  <FaQuoteRight className="absolute -bottom-1 -right-1 h-4 w-4 text-[#6C63FF] opacity-30" />
                </div>
                <p className="text-sm font-medium text-[#6C63FF] mt-4">
                  {visible.current.course}
                </p>
              </div>
            </div>

            {/* Next card (right) */}
            <div className="transform scale-95 opacity-70 transition-all duration-300">
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] h-full">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${visible.next.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                    {visible.next.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#111111] truncate">{visible.next.name}</h4>
                    <p className="text-xs text-[#6B6B70] truncate">{visible.next.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <StarRating rating={visible.next.rating} />
                </div>
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-1 -left-1 h-3 w-3 text-[#E5E5EA]" />
                  <p className="text-sm text-[#6B6B70] line-clamp-4 pl-4">
                    {visible.next.quote}
                  </p>
                </div>
                <p className="text-xs font-medium text-[#9A9AA0] mt-3">
                  {visible.next.course}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#1C1C1E] hover:text-[#6C63FF] hover:scale-110 transition-all z-20"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#1C1C1E] hover:text-[#6C63FF] hover:scale-110 transition-all z-20"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Mobile View - Single card with swipe */}
        <div className="md:hidden">
          <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                {testimonials[activeIndex].avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#111111]">{testimonials[activeIndex].name}</h4>
                <p className="text-xs text-[#6B6B70]">{testimonials[activeIndex].role}</p>
              </div>
            </div>
            <div className="mb-3">
              <StarRating rating={testimonials[activeIndex].rating} />
            </div>
            <div className="relative">
              <FaQuoteLeft className="absolute -top-1 -left-1 h-3 w-3 text-[#6C63FF] opacity-30" />
              <p className="text-sm text-[#111111] pl-4">
                {testimonials[activeIndex].quote}
              </p>
            </div>
            <p className="text-xs font-medium text-[#6C63FF] mt-3">
              {testimonials[activeIndex].course}
            </p>
          </div>

          {/* Mobile navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#1C1C1E]"
            >
              <FaArrowLeft />
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-6 bg-[#1C1C1E]'
                      : 'bg-[#E5E5EA]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 bg-white rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#1C1C1E]"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        

        
      </div>
    </div>
  );
}