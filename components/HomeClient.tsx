"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import type { Car } from "@/lib/types";

export default function HomeClient({ cars }: { cars: Car[] }) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          if(entry.target.querySelector('#finance-chart')) {
            entry.target.querySelector('#finance-chart')!.classList.add('is-visible');
          }
          
          if(entry.target.querySelector('#shield-img')) {
            setTimeout(() => {
              entry.target.querySelector('#shield-img')!.classList.add('is-visible');
            }, 300);
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => {
      observer.observe(el);
    });
    
    const financeSection = document.querySelector('.draw-line')?.closest('.reveal-up');
    if(financeSection) observer.observe(financeSection);
    
    const insuranceSection = document.querySelector('#shield-img')?.closest('.reveal-up');
    if(insuranceSection) observer.observe(insuranceSection);

            const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext('2d');
      const frameCount = 93;
      const currentFrame = (index: number) => (
        `/hero-frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
      );
      
      const images: HTMLImageElement[] = [];
      
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i + 1);
        images.push(img);
      }
      
      images[0].onload = () => {
        canvas.width = images[0].width;
        canvas.height = images[0].height;
        context?.drawImage(images[0], 0, 0);
      }

      let frameRequest: number | null = null;
      let lastDrawnFrame = -1;
      
      const scrollPlay = () => {
        const heroSection = canvas.closest('section');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        const scrollOffset = -rect.top;
        const scrollDistance = rect.height - window.innerHeight;
        
        let scrollProgress = 0;
        if (scrollDistance > 0) {
          scrollProgress = Math.min(Math.max(scrollOffset / scrollDistance, 0), 1);
        }
        
        const frameIndex = Math.min(
          frameCount - 1,
          Math.max(0, Math.floor(scrollProgress * frameCount))
        );
        
        if (frameIndex !== lastDrawnFrame && images[frameIndex].complete) {
          // ensure canvas size matches first image size before drawing
          if(canvas.width === 300) { // default width is 300
             canvas.width = images[0].width;
             canvas.height = images[0].height;
          }
          context?.drawImage(images[frameIndex], 0, 0);
          lastDrawnFrame = frameIndex;
        }
        
        frameRequest = null;
      };
      
      let loadRenderRequest: number;
      const checkAndDraw = () => {
          scrollPlay();
          loadRenderRequest = requestAnimationFrame(checkAndDraw);
      }
      checkAndDraw();
      
      const stopRender = setTimeout(() => {
          cancelAnimationFrame(loadRenderRequest);
      }, 3000);

      const onScroll = () => {
        if (!frameRequest) {
          frameRequest = requestAnimationFrame(scrollPlay);
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      scrollPlay();
      
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        cancelAnimationFrame(loadRenderRequest);
        clearTimeout(stopRender);
      }
    }
  }, []);

  return (
    <div ref={heroRef} className="w-full">
      
{/*  */}
<section className="relative w-full h-[200vh] bg-black">
<div className="sticky top-0 w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black pt-20">
{/*  */}
<div className="absolute inset-0 z-0">
<canvas className="w-full h-full object-cover opacity-60" id="hero-canvas"></canvas>
<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-inverse-primary/20 via-transparent to-transparent z-10 fade-in-load mix-blend-screen"></div>
</div>
<div className="relative z-20 w-full max-w-[1440px] px-margin-mobile md:px-margin-desktop mx-auto flex flex-col items-center justify-center h-full pt-10">
{/*  */}
<div className="text-center max-w-4xl mx-auto mb-12 slide-up-load">
<h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white mb-6 uppercase">
                        Your Trusted Journey to the<br /><span className="text-[#FF0000]">Perfect Car</span>&nbsp;</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10"><br /></p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
<Link className="w-full sm:w-auto bg-[#FF0000] text-white font-label-md text-label-md uppercase px-10 py-4 btn-primary-glow text-center" href="/inventory">
    Explore Inventory
</Link>
<Link className="w-full sm:w-auto bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 font-label-md text-label-md uppercase px-10 py-4 text-center" href="/sell-car">
    Sell Your Car
</Link>
</div>
</div>
</div>
{/*  */}
<div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 fade-in-load flex flex-col items-center gap-2" style={{ animationDelay: '1.5s' }}>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Scroll</span>
<span className="material-symbols-outlined text-[#FF0000] animate-bounce" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_downward</span>
</div>
</div>
</section>
{/*  */}
<section className="py-section-gap bg-background w-full" id="inventory">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-up is-visible">
<div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-2 uppercase">Available <span className="text-[#FF0000]">Inventory</span></h2>
</div>
<Link className="mt-6 md:mt-0 flex items-center gap-2 text-primary font-label-md text-label-md uppercase hover:text-white transition-colors" href="/inventory">
                        View All Vehicles <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
</Link>
</div>
{/*  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{cars.map(car => <CarCard key={car.id} car={car} />)}
</div>
</div>
</section>
{/*  */}
<section className="py-section-gap bg-surface-container-lowest border-y border-surface-variant">
<div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
{/*  */}
<div className="flex flex-col justify-center reveal-up is-visible">
<div className="w-12 h-12 mb-6 border border-[#FF0000] flex items-center justify-center text-[#FF0000]">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0", fontWeight: '300' }}>account_balance</span>
</div>
<h2 className="font-headline-lg text-headline-md md:text-headline-lg text-white mb-4 uppercase">Comprehensive <span className="text-primary">Financing</span></h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">
                            Seamless loan processing with competitive interest rates. Our financial architects design payment structures tailored to your portfolio.
                        </p>
{/*  */}
<div className="relative h-40 w-full mb-8 border-b border-l border-surface-variant/50 p-4 overflow-hidden">
{/*  */}
<div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
<div className="w-full h-px bg-surface-variant"></div>
<div className="w-full h-px bg-surface-variant"></div>
<div className="w-full h-px bg-surface-variant"></div>
</div>
{/*  */}
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
{/*  */}
<path d="M0,80 Q50,80 100,60 T200,50 T300,30 T400,10" fill="none" filter="blur(4px)" stroke="rgba(255,0,0,0.2)" strokeWidth="8"></path>
{/*  */}
<path className="draw-line is-visible" d="M0,80 Q50,80 100,60 T200,50 T300,30 T400,10" fill="none" id="finance-chart" stroke="#FF0000" strokeLinecap="round" strokeWidth="2"></path>
</svg>
</div>
<div>
<Link className="inline-flex items-center gap-2 border border-white text-white font-label-md text-label-md uppercase px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300" href="/finance">
    Calculate EMI
</Link>
</div>
</div>
{/*  */}
<div className="bg-surface-container-low border border-surface-variant p-8 md:p-12 flex flex-col items-center text-center justify-center relative overflow-hidden reveal-up delay-200 is-visible">
{/*  */}
<div className="absolute inset-0 pointer-events-none opacity-10">
<div className="absolute top-0 right-1/4 w-px h-full bg-[#FF0000] rotate-45 transform origin-top"></div>
<div className="absolute top-1/4 -right-10 w-full h-px bg-[#FF0000] -rotate-12"></div>
</div>
{/*  */}
<div className="relative w-64 h-64 mb-8 flex items-center justify-center">
{/*  */}
<div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full mix-blend-screen"></div>
<img alt="Premium Insurance Shield" className="w-full h-full object-contain relative z-10 spring-bounce is-visible mix-blend-lighten" id="shield-img" src="/images/insurance-shield.jpg" />
</div>
<h2 className="font-headline-md text-2xl text-white mb-4 uppercase">Instant <span className="text-primary">Insurance</span></h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto mb-8">
                            Zero-depreciation coverage protecting your asset against the unpredictable. Drive with absolute peace of mind.
                        </p>
<Link className="inline-flex items-center gap-2 border border-surface-variant text-white font-label-md text-label-md uppercase px-8 py-3 hover:border-primary hover:text-primary transition-colors duration-300" href="/insurance">
    Get Quote <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
</Link>
</div>
</div>
</div>
</section>

    </div>
  );
}
