"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function InventoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(searchParams?.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.get("max_price") || "");
  const [maxKm, setMaxKm] = useState(searchParams?.get("max_km") || "");
  const [transmission, setTransmission] = useState(searchParams?.get("transmission") || "");
  const [fuelType, setFuelType] = useState(searchParams?.get("fuel_type") || "");

  // Update state if URL changes externally
  useEffect(() => {
    setMinPrice(searchParams?.get("min_price") || "");
    setMaxPrice(searchParams?.get("max_price") || "");
    setMaxKm(searchParams?.get("max_km") || "");
    setTransmission(searchParams?.get("transmission") || "");
    setFuelType(searchParams?.get("fuel_type") || "");
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());
    
    if (minPrice) params.set("min_price", minPrice);
    else params.delete("min_price");

    if (maxPrice) params.set("max_price", maxPrice);
    else params.delete("max_price");

    if (maxKm) params.set("max_km", maxKm);
    else params.delete("max_km");

    if (transmission) params.set("transmission", transmission);
    else params.delete("transmission");

    if (fuelType) params.set("fuel_type", fuelType);
    else params.delete("fuel_type");

    router.push(`/inventory?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("min_price");
    params.delete("max_price");
    params.delete("max_km");
    params.delete("transmission");
    params.delete("fuel_type");
    params.delete("category");
    
    router.push(`/inventory?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white font-label-md uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,51,51,0.4)] flex items-center gap-2 border border-[#ff6666]"
        >
          <span className="material-symbols-outlined">filter_list</span>
          Filter Inventory
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Filter Sidebar / Mobile Drawer */}
      <aside 
        data-lenis-prevent="true"
        className={`
        bg-[#1A1A1A] border border-[#2A2A2A] shadow-xl
        lg:block lg:sticky lg:top-28 lg:h-auto lg:w-auto lg:relative lg:translate-y-0 lg:p-6 lg:rounded-none lg:z-auto
        fixed bottom-0 left-0 right-0 z-50 h-[80vh] overflow-y-auto p-6 rounded-t-3xl transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full hidden lg:block'}
      `}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2A2A2A]">
          <h3 className="font-headline-sm text-white uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">filter_list</span>
            Filters
          </h3>
          <div className="flex items-center gap-4">
            <button onClick={clearFilters} className="text-[12px] uppercase text-tertiary hover:text-primary transition-colors tracking-widest">
              Clear
            </button>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-white flex items-center justify-center p-2 rounded-full bg-surface-variant">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <label className="font-label-sm text-tertiary uppercase tracking-wider block">Price Range (₹)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-1/2 bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none p-3 font-body-sm text-white transition-colors"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Max" 
              className="w-1/2 bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none p-3 font-body-sm text-white transition-colors"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Max KM Driven */}
        <div className="space-y-3">
          <label className="font-label-sm text-tertiary uppercase tracking-wider block">Max KM Driven</label>
          <select 
            className="w-full bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none p-3 font-body-sm text-white transition-colors appearance-none"
            value={maxKm}
            onChange={(e) => setMaxKm(e.target.value)}
          >
            <option value="">Any</option>
            <option value="10000">Under 10,000 km</option>
            <option value="25000">Under 25,000 km</option>
            <option value="50000">Under 50,000 km</option>
            <option value="75000">Under 75,000 km</option>
            <option value="100000">Under 100,000 km</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="space-y-3">
          <label className="font-label-sm text-tertiary uppercase tracking-wider block">Gear Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setTransmission(transmission === 'Automatic' ? '' : 'Automatic')}
              className={`p-3 border text-center transition-colors font-body-sm uppercase ${transmission === 'Automatic' ? 'border-primary text-primary bg-primary/10' : 'border-[#2A2A2A] text-white hover:border-primary'}`}
            >
              Auto
            </button>
            <button 
              onClick={() => setTransmission(transmission === 'Manual' ? '' : 'Manual')}
              className={`p-3 border text-center transition-colors font-body-sm uppercase ${transmission === 'Manual' ? 'border-primary text-primary bg-primary/10' : 'border-[#2A2A2A] text-white hover:border-primary'}`}
            >
              Manual
            </button>
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-3">
          <label className="font-label-sm text-tertiary uppercase tracking-wider block">Fuel Type</label>
          <select 
            className="w-full bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none p-3 font-body-sm text-white transition-colors appearance-none"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="font-label-sm text-tertiary uppercase tracking-wider block">Category</label>
          <select 
            className="w-full bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none p-3 font-body-sm text-white transition-colors appearance-none"
            value={searchParams?.get("category") || ""}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams?.toString());
              if (e.target.value) params.set("category", e.target.value);
              else params.delete("category");
              router.push(`/inventory?${params.toString()}`);
            }}
          >
            <option value="">All Categories</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
            <option value="Luxury">Luxury</option>
            <option value="Sports">Sports</option>
            <option value="Wagon">Wagon</option>
          </select>
        </div>

        <button 
          onClick={applyFilters}
          className="w-full bg-[#FF0000] text-white py-4 font-label-sm uppercase tracking-widest font-bold hover:bg-[#CC0000] transition-colors glow-effect mt-4"
        >
          Apply Filters
        </button>
      </div>
    </aside>
    </>
  );
}
