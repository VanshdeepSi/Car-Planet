import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/types";

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="group bg-surface-container-low border border-surface-variant rounded-sm overflow-hidden flex flex-col card-hover-border reveal-up is-visible">
      <div className="relative h-64 overflow-hidden bg-black flex items-center justify-center p-6">
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {car.condition === 'new' && (
            <span className="border border-[#FF0000] text-[#FF0000] font-label-sm text-[10px] uppercase px-2 py-1 tracking-wider bg-black/50 backdrop-blur-sm self-start">New</span>
          )}
          {car.is_exclusive && (
            <span className="border border-[#D4AF37] text-[#D4AF37] font-label-sm text-[10px] uppercase px-2 py-1 tracking-wider bg-black/80 backdrop-blur-md shadow-[0_0_10px_rgba(212,175,55,0.3)] flex items-center gap-1 self-start">
              <span className="material-symbols-outlined text-[12px]">star</span>
              Exclusive
            </span>
          )}
        </div>
        {car.image_urls && car.image_urls.length > 0 && car.image_urls[0] ? (
          <img
            src={car.image_urls[0]}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-on-surface-variant">
            No image
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow border-t border-surface-variant">
        <h3 className="font-headline-md text-xl text-white mb-1 uppercase tracking-tight">
          {car.make} {car.model}
        </h3>
        <p className="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase tracking-wider">
          {car.year}
        </p>
        
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex justify-between items-center py-2 border-b border-surface-variant/50">
            <span className="font-body-md text-sm text-on-surface-variant">Transmission</span>
            <span className="font-label-md text-sm text-white capitalize">{car.transmission}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-surface-variant/50">
            <span className="font-body-md text-sm text-on-surface-variant">Mileage</span>
            <span className="font-label-md text-sm text-white">{car.mileage_km.toLocaleString()} KM</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-body-md text-sm text-on-surface-variant">Fuel</span>
            <span className="font-label-md text-sm text-white capitalize">{car.fuel_type}</span>
          </div>
        </div>

        <div className="mt-auto flex justify-between items-end">
          <div>
            <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Price</p>
            <p className="font-headline-md text-2xl text-[#FF0000]">
              ₹ {(car.price / 100000).toFixed(2)} L
            </p>
          </div>
          <Link
            href={`/inventory/${car.id}`}
            className="w-10 h-10 border border-surface-variant flex items-center justify-center group-hover:bg-[#FF0000] group-hover:border-[#FF0000] transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
