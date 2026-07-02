"use client";

import { useState } from "react";

export default function ImageGallery({ images, alt }: { images: string[], alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-surface relative">
        <img className="w-full h-full object-cover" alt={alt} src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-[16/9] bg-surface relative overflow-hidden group">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt={`${alt} view ${currentIndex + 1}`} 
          src={images[currentIndex]} 
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white w-10 h-10 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white w-10 h-10 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
          {images.map((img, index) => (
            <button 
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-[4/3] relative overflow-hidden border-2 transition-colors ${currentIndex === index ? 'border-primary' : 'border-transparent hover:border-surface-variant'}`}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
