import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/types";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: car, error } = await supabase.from('cars').select('*').eq('id', params.id).single();

  if (!car || error) {
    notFound();
  }

  // Fetch similar cars based on category (excluding the current car)
  const { data: similarCarsData } = await supabase
    .from('cars')
    .select('*')
    .eq('category', car.category || 'Sedan')
    .neq('id', car.id)
    .limit(3);

  const similarCars: Car[] = similarCarsData || [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      
      {/* Hero Section & Details Bento */}
      <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Hero Image Gallery Area */}
          <div className="lg:col-span-8 bg-charcoal border border-charcoal rounded-lg overflow-hidden relative group p-4 md:p-6">
            <div className="absolute top-8 left-8 z-10 flex gap-2">
              <span className="px-3 py-1 border border-primary text-primary font-label-sm text-label-sm uppercase bg-background/80 backdrop-blur-sm">
                {car.condition === 'new' ? 'New Arrival' : 'Pre-Owned'}
              </span>
              {car.is_exclusive && (
                <span className="px-3 py-1 border border-[#D4AF37] text-[#D4AF37] font-label-sm text-label-sm uppercase tracking-widest bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  Exclusive
                </span>
              )}
            </div>
            
            <ImageGallery images={car.image_urls || []} alt={`${car.year} ${car.make} ${car.model}`} />
          </div>

          {/* Detail Header & CTAs */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-2">{car.year} {car.make} {car.model}</h1>
              <p className="font-headline-md text-headline-md text-primary mb-4">₹{car.price.toLocaleString('en-IN')} <span className="text-body-md text-on-surface-variant font-normal">(Negotiable)</span></p>
              <p className="font-body-md text-body-md text-on-surface-variant">EMI starting at ₹{Math.round(car.price * 0.012).toLocaleString('en-IN')}/mo</p>
            </div>
            <div className="flex flex-col gap-4">
              <form action="/test-drive" method="GET" className="flex flex-col gap-2">
                <input type="hidden" name="car" value={car.id} />
                <label htmlFor="offer" className="font-label-sm text-secondary uppercase tracking-wider">Want to negotiate?</label>
                <div className="flex flex-col md:flex-row gap-2">
                  <input type="number" id="offer" name="offer" placeholder="Enter your offer price (₹)..." className="flex-grow bg-background border border-surface-variant text-on-surface font-body-md px-4 py-4 focus:border-on-surface focus:ring-0 transition-colors" />
                  <button type="submit" className="bg-primary text-white font-label-md uppercase tracking-widest py-4 px-6 md:w-auto w-full text-center hover:brightness-110 transition-colors whitespace-nowrap">Make Offer</button>
                </div>
              </form>
              <div className="flex gap-2">
                <Link href={`/test-drive?car=${car.id}`} className="flex-1 bg-charcoal border border-surface-variant text-white font-label-md uppercase tracking-widest py-4 text-center hover:bg-surface-variant transition-colors">Book Test Drive</Link>
                <Link href={`/finance?amount=${car.price}`} className="flex-1 bg-transparent border border-surface-variant text-white font-label-md uppercase tracking-widest py-4 text-center flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
                  <span className="material-symbols-outlined">calculate</span>
                  Calculate EMI
                </Link>
              </div>
            </div>
            
            {/* Spec Sheet Grid */}
            <div className="bg-charcoal border border-charcoal p-6 rounded-lg flex-grow">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-6 border-b border-charcoal pb-2">Technical Specifications</h3>
              <ul className="flex flex-col gap-0">
                <li className="flex justify-between py-3 border-b border-surface-variant bg-surface px-3">
                  <span className="text-on-surface-variant font-label-md text-label-md">Category</span>
                  <span className="text-on-surface font-body-md text-body-md font-semibold capitalize">{car.category || 'N/A'}</span>
                </li>
                <li className="flex justify-between py-3 border-b border-surface-variant bg-charcoal px-3">
                  <span className="text-on-surface-variant font-label-md text-label-md">Mileage</span>
                  <span className="text-on-surface font-body-md text-body-md font-semibold">{car.mileage_km.toLocaleString()} km</span>
                </li>
                <li className="flex justify-between py-3 border-b border-surface-variant bg-surface px-3">
                  <span className="text-on-surface-variant font-label-md text-label-md">Fuel Type</span>
                  <span className="text-on-surface font-body-md text-body-md font-semibold capitalize">{car.fuel_type}</span>
                </li>
                <li className="flex justify-between py-3 border-b border-surface-variant bg-charcoal px-3">
                  <span className="text-on-surface-variant font-label-md text-label-md">Condition</span>
                  <span className="text-on-surface font-body-md text-body-md font-semibold capitalize">{car.condition}</span>
                </li>
                <li className="flex justify-between py-3 border-b border-surface-variant bg-surface px-3">
                  <span className="text-on-surface-variant font-label-md text-label-md">Transmission</span>
                  <span className="text-on-surface font-body-md text-body-md font-semibold capitalize">{car.transmission}</span>
                </li>
                <li className="flex justify-between py-3 border-b border-surface-variant bg-charcoal px-3">
                  <span className="text-on-surface-variant font-label-md text-label-md">Color</span>
                  <span className="text-on-surface font-body-md text-body-md font-semibold">{car.color}</span>
                </li>
                <li className="flex justify-between py-3 bg-surface px-3">
                  <span className="text-on-surface-variant font-label-md text-label-md">VIN</span>
                  <span className="text-on-surface font-body-md text-body-md font-semibold">{car.vin || 'N/A'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Cars Carousel */}
      {similarCars.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-section-gap border-t border-charcoal">
          <h2 className="font-headline-md text-headline-md text-white mb-8">Explore Similar {car.category}s</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {similarCars.map((similarCar) => (
              <Link key={similarCar.id} href={`/inventory/${similarCar.id}`}>
                <div className="bg-charcoal border border-charcoal rounded-lg overflow-hidden card-hover transition-all duration-300 group cursor-pointer flex flex-col h-full">
                  <div className="w-full h-64 bg-surface relative overflow-hidden">
                    <img 
                      alt={`${similarCar.year} ${similarCar.make} ${similarCar.model}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={similarCar.image_urls?.[0] || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800'} 
                    />
                    {similarCar.is_exclusive && (
                      <div className="absolute top-3 right-3 px-2 py-1 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest bg-black/80 backdrop-blur-md shadow-[0_0_10px_rgba(212,175,55,0.3)] z-10 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">star</span>
                        Exclusive
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-surface-container-low">
                    <h3 className="font-headline-md text-headline-md text-white mb-2">{similarCar.year} {similarCar.make} {similarCar.model}</h3>
                    <p className="font-body-md text-body-md text-primary mb-4">₹{similarCar.price.toLocaleString('en-IN')}</p>
                    <div className="flex gap-4 mt-auto border-t border-surface-variant pt-4">
                      <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">local_gas_station</span> 
                        <span className="capitalize">{similarCar.fuel_type}</span>
                      </span>
                      <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">settings</span> 
                        <span className="capitalize">{similarCar.transmission}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
