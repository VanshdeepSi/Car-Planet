"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Car } from "@/lib/types";

function TestDriveForm() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const searchParams = useSearchParams();
  const carIdParam = searchParams.get('car');
  
  // Initialize with the URL parameter if present, otherwise empty string
  const [selectedVehicle, setSelectedVehicle] = useState<string>(carIdParam || "");

  useEffect(() => {
    async function fetchCars() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setCars(data);
      }
    }
    fetchCars();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const vehicleId = formData.get("vehicle");
    const date = formData.get("date");
    const time = formData.get("time");

    // Find the selected car name for the message
    const selectedCar = cars.find(car => car.id === vehicleId);
    const vehicleName = selectedCar ? `${selectedCar.make} ${selectedCar.model}` : vehicleId;

    const message = `*New Test Drive Booking*\n\n*Client Name:* ${name}\n*Client Phone:* ${phone}\n*Client Email:* ${email}\n*Preferred Vehicle:* ${vehicleName}\n*Preferred Date:* ${date}\n*Preferred Time:* ${time}`;

    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: message,
          to: "919811606000"
        })
      });
      
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to book test drive. Please try again.");
      }
    } catch (error) {
      alert("Error booking test drive. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-lg mx-margin-mobile md:mx-auto">
        <div className="bg-surface-container-high border border-surface-variant p-margin-mobile md:p-10 shadow-2xl relative overflow-hidden group">
          <div className="mb-8 border-b border-surface-variant pb-4">
            <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight mb-2">Book Test Drive</h2>
            <p className="font-body-md text-body-md text-secondary">Experience engineering excellence firsthand.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wider" htmlFor="name">Full Name</label>
                <input className="w-full bg-background border border-surface-variant text-on-surface font-body-md text-body-md px-4 py-3 focus:border-on-surface focus:ring-0 transition-colors placeholder-secondary/50" id="name" name="name" placeholder="ENTER YOUR NAME" required type="text"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wider" htmlFor="phone">Phone Number</label>
                  <input className="w-full bg-background border border-surface-variant text-on-surface font-body-md text-body-md px-4 py-3 focus:border-on-surface focus:ring-0 transition-colors placeholder-secondary/50" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" required type="tel"/>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wider" htmlFor="email">Email Address</label>
                  <input className="w-full bg-background border border-surface-variant text-on-surface font-body-md text-body-md px-4 py-3 focus:border-on-surface focus:ring-0 transition-colors placeholder-secondary/50" id="email" name="email" placeholder="EMAIL@DOMAIN.COM" required type="email"/>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wider" htmlFor="vehicle">Preferred Vehicle</label>
              <div className="relative">
                <select 
                  className="w-full bg-background border border-surface-variant text-on-surface font-body-md text-body-md px-4 py-3 appearance-none focus:border-on-surface focus:ring-0 transition-colors cursor-pointer rounded-none" 
                  id="vehicle" 
                  name="vehicle" 
                  required 
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                  <option className="text-secondary" disabled value="">SELECT IN-STOCK MODEL</option>
                  {cars.map(car => (
                    <option key={car.id} value={car.id}>{car.make} {car.model} {car.year ? `(${car.year})` : ''}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'wght\' 300, \'FILL\' 0' }}>expand_more</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wider" htmlFor="date">Preferred Date</label>
                <div className="relative">
                  <input className="w-full bg-background border border-surface-variant text-on-surface font-body-md text-body-md px-4 py-3 focus:border-on-surface focus:ring-0 transition-colors [color-scheme:dark]" id="date" name="date" required type="date"/>
                </div>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wider" htmlFor="time">Preferred Time</label>
                <div className="relative">
                  <select className="w-full bg-background border border-surface-variant text-on-surface font-body-md text-body-md px-4 py-3 appearance-none focus:border-on-surface focus:ring-0 transition-colors cursor-pointer rounded-none" id="time" name="time" required defaultValue="">
                    <option className="text-secondary" disabled value="">SELECT TIME</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'wght\' 300, \'FILL\' 0' }}>schedule</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button disabled={isSubmitting || isSuccess} className="w-full bg-[#FF0000] text-white font-label-md text-label-md uppercase py-4 tracking-widest hover:bg-[#CC0000] transition-all duration-300 glow-effect flex justify-center items-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed" type="submit">
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : isSuccess ? (
                  <>
                    <span>Booking Sent!</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'wght\' 400, \'FILL\' 0', fontSize: '18px' }}>check_circle</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'wght\' 400, \'FILL\' 0', fontSize: '18px' }}>arrow_forward</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-label-sm text-label-sm text-secondary text-center mt-4">
              By confirming, you agree to our <a className="text-on-surface hover:text-[#FF0000] underline transition-colors" href="#">Privacy Policy</a>.
            </p>
          </form>
          
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#FF0000] group-hover:w-full transition-all duration-500 ease-in-out"></div>
        </div>
      </div>
    </div>
  );
}

export default function TestDrivePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-24 pb-12 flex justify-center items-center"><div className="animate-pulse text-white">Loading...</div></div>}>
      <TestDriveForm />
    </Suspense>
  );
}
