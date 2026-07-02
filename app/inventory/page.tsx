import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/types";
import Link from "next/link";
import InventoryFilters from "@/components/InventoryFilters";
import { Suspense } from "react";

export default async function InventoryPage({ 
  searchParams 
}: { 
  searchParams: { 
    q?: string,
    min_price?: string,
    max_price?: string,
    max_km?: string,
    transmission?: string,
    fuel_type?: string,
    category?: string
  } 
}) {
  const supabase = createClient();
  let query = supabase.from("cars").select("*").order("created_at", { ascending: false });

  const search = searchParams?.q?.toLowerCase();
  
  if (search) {
    query = query.or(`make.ilike.%${search}%,model.ilike.%${search}%,color.ilike.%${search}%`);
  }

  // Apply Sidebar Filters
  if (searchParams.min_price) {
    query = query.gte("price", Number(searchParams.min_price));
  }
  if (searchParams.max_price) {
    query = query.lte("price", Number(searchParams.max_price));
  }
  if (searchParams.max_km) {
    query = query.lte("mileage_km", Number(searchParams.max_km));
  }
  if (searchParams.transmission) {
    query = query.eq("transmission", searchParams.transmission);
  }
  if (searchParams.fuel_type) {
    query = query.eq("fuel_type", searchParams.fuel_type);
  }
  if (searchParams.category) {
    query = query.eq("category", searchParams.category);
  }

  const { data: cars, error } = await query;

  const inventory: Car[] = cars && cars.length > 0 ? cars : [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        <div className="flex justify-between items-end mb-8 border-b border-surface-variant pb-4">
          <h2 className="font-label-md text-on-surface/50 uppercase tracking-widest">
            {search ? `Results for "${search}"` : "Live Inventory"} <span className="text-primary ml-2">{inventory.length} Matches</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="h-[400px] bg-[#1A1A1A] border border-[#2A2A2A] animate-pulse"></div>}>
              <InventoryFilters />
            </Suspense>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {inventory.map((car) => (
                <Link key={car.id} href={`/inventory/${car.id}`}>
                  <article className="surface-charcoal group relative overflow-hidden flex flex-col h-full cursor-pointer hover:border-primary transition-colors duration-300 border border-surface-variant">
                    <div className="relative h-64 w-full overflow-hidden bg-black">
                      <div 
                        className="bg-cover bg-center w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                        style={{ backgroundImage: `url('${car.image_urls?.[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800'}')` }}
                      ></div>
                      <div className="absolute top-3 left-3 px-2 py-1 border border-primary text-white text-[10px] uppercase font-bold tracking-wider bg-black/50 backdrop-blur-sm">
                        {car.condition === 'new' ? 'New Arrival' : 'Pre-Owned'}
                      </div>
                      {car.is_exclusive && (
                        <div className="absolute top-3 right-3 px-3 py-1 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest bg-black/80 backdrop-blur-md shadow-[0_0_10px_rgba(212,175,55,0.3)] z-10 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">star</span>
                          Exclusive
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow relative z-10 bg-surface-container-low">
                      <h3 className="font-headline-md text-headline-md text-white mb-1 uppercase tracking-tight">{car.year} {car.make} {car.model}</h3>
                      <p className="font-label-sm text-on-surface/60 mb-4">{car.color} • {car.transmission} • {car.fuel_type}</p>
                      
                      <div className="mt-auto grid grid-cols-2 gap-y-2 gap-x-4 border-t border-surface-variant pt-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-on-surface/40 uppercase">Mileage</span>
                          <span className="font-label-sm text-on-surface">{car.mileage_km.toLocaleString()} km</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-on-surface/40 uppercase">Price</span>
                          <span className="font-label-sm text-primary">₹ {car.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300"></div>
                  </article>
                </Link>
              ))}
              
              {inventory.length === 0 && (
                <div className="col-span-full text-center py-20 bg-[#1A1A1A] border border-[#2A2A2A]">
                  <p className="text-white font-headline-sm uppercase tracking-widest mb-2">No Matches Found</p>
                  <p className="text-secondary font-body-sm">Try adjusting your filters to find more cars.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
