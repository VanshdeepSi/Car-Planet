"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InsurancePage() {
  const [selectedTier, setSelectedTier] = useState<string | null>("Zero-Depreciation");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const vehicleType = formData.get('vehicle_type');
    const carValue = formData.get('car_value');
    const city = formData.get('city');
    const policyType = formData.get('policy_type');
    const query = formData.get('query')?.toString().trim();

    let message = `*New Insurance Query*\n\n*Client Phone:* ${formData.get('phone_number')}\n*Car Name:* ${formData.get('car_name')}\n*Model/Year:* ${formData.get('model_year')}\n\n*Selected Tier:* ${selectedTier}\n*Vehicle Type:* ${vehicleType}\n*Car Value:* ₹${carValue}\n*City:* ${city}\n*Policy:* ${policyType}`;
    if (query) {
      message += `\n\n*Message:* ${query}`;
    }
    
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
      } else {
        alert("Failed to send query. Please try again.");
      }
    } catch (error) {
      alert("Error sending query. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <section className="relative w-full min-h-[716px] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-section-gap overflow-hidden">
        {/* Full-width Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: "url('/images/mercedes_hero.png')" }}></div>
          {/* Gradient to darken the left side for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>
        
        {/* Text Content Overlay */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-display text-4xl md:text-headline-xl font-extrabold text-white mb-6 uppercase leading-tight tracking-tighter">Hassle-Free <br/><span className="text-primary">Protection</span></h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-xl">
            Experience seamless vehicle insurance directly through the dealership. Bundled with your purchase, zero paperwork hassle. Drive off with absolute peace of mind.
          </p>
          <div className="flex flex-col gap-4">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Trusted Partners</span>
            <div className="flex gap-4 md:gap-8 items-center opacity-80">
              <div className="h-10 w-28 bg-surface-container-high/50 border border-surface-variant flex items-center justify-center font-label-sm text-on-surface-variant rounded">ICICI</div>
              <div className="h-10 w-28 bg-surface-container-high/50 border border-surface-variant flex items-center justify-center font-label-sm text-on-surface-variant rounded">HDFC</div>
              <div className="h-10 w-28 bg-surface-container-high/50 border border-surface-variant flex items-center justify-center font-label-sm text-on-surface-variant rounded">TATA AIG</div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Tiers */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-white mb-16 text-center uppercase tracking-tight">Insurance <span className="text-primary">Tiers</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            
            {/* Basic Card */}
            <div className={`bg-surface-container-high border p-8 flex flex-col h-full card-hover transition-colors ${selectedTier === 'Basic' ? 'border-primary shadow-[0_0_15px_rgba(255,85,64,0.3)]' : 'border-surface-variant'}`}>
              <h3 className="font-headline-md text-headline-md text-white mb-2 uppercase">Basic</h3>
              <p className="font-label-md text-label-md text-primary mb-6">Starting ₹4,999/yr</p>
              <ul className="flex-grow space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Third-party liability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Property damage</span>
                </li>
              </ul>
              <button 
                onClick={() => setSelectedTier('Basic')}
                className={`w-full font-label-md py-4 uppercase tracking-widest transition-colors ${selectedTier === 'Basic' ? 'bg-primary text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
              >
                {selectedTier === 'Basic' ? 'Selected' : 'Select Plan'}
              </button>
            </div>

            {/* Comprehensive Card */}
            <div className={`bg-surface-container-high border p-8 flex flex-col h-full card-hover transition-colors ${selectedTier === 'Comprehensive' ? 'border-primary shadow-[0_0_15px_rgba(255,85,64,0.3)]' : 'border-surface-variant'}`}>
              <h3 className="font-headline-md text-headline-md text-white mb-2 uppercase">Comprehensive</h3>
              <p className="font-label-md text-label-md text-primary mb-6">Starting ₹12,499/yr</p>
              <ul className="flex-grow space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Basic + Theft</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Natural Calamities & Fire</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Personal Accident Cover</span>
                </li>
              </ul>
              <button 
                onClick={() => setSelectedTier('Comprehensive')}
                className={`w-full font-label-md py-4 uppercase tracking-widest transition-colors ${selectedTier === 'Comprehensive' ? 'bg-primary text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
              >
                {selectedTier === 'Comprehensive' ? 'Selected' : 'Select Plan'}
              </button>
            </div>

            {/* Premium Card */}
            <div className={`bg-surface-container-high border p-8 flex flex-col h-full card-hover relative overflow-hidden transition-colors ${selectedTier === 'Zero-Depreciation' ? 'border-primary shadow-[0_0_15px_rgba(255,85,64,0.3)]' : 'border-surface-variant'}`}>
              <div className="absolute top-0 right-0 bg-primary text-white font-label-sm px-3 py-1 uppercase tracking-widest">Recommended</div>
              <h3 className="font-headline-md text-headline-md text-white mb-2 uppercase">Zero-Depreciation</h3>
              <p className="font-label-md text-label-md text-primary mb-6">Starting ₹18,999/yr</p>
              <ul className="flex-grow space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Comprehensive +</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Zero dep on parts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Engine protection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  <span className="font-body-md text-on-surface-variant">Consumables cover</span>
                </li>
              </ul>
              <button 
                onClick={() => setSelectedTier('Zero-Depreciation')}
                className={`w-full font-label-md py-4 uppercase tracking-widest transition-colors ${selectedTier === 'Zero-Depreciation' ? 'bg-primary text-white glow-hover active:scale-95' : 'border border-white text-white hover:bg-white hover:text-black'}`}
              >
                {selectedTier === 'Zero-Depreciation' ? 'Selected' : 'Select Plan'}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Quote Form */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap relative">
        <div className="absolute inset-0 z-0 bg-surface-container-low opacity-50"></div>
        <div className="relative z-10 max-w-3xl mx-auto bg-surface-container border border-surface-variant p-8 md:p-12 shadow-2xl">
          <h2 className="font-headline-lg text-headline-lg text-white mb-8 text-center uppercase tracking-tight">Send a <span className="text-primary">Query</span></h2>
          <form className="space-y-6" onSubmit={handleQuoteSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">Car Name</label>
                <input name="car_name" className="bg-background border border-surface-variant text-white font-body-md py-3 px-4 focus:outline-none focus:border-primary focus:ring-0" placeholder="e.g. Mercedes C-Class" type="text" required />
              </div>
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">Model / Year</label>
                <input name="model_year" className="bg-background border border-surface-variant text-white font-body-md py-3 px-4 focus:outline-none focus:border-primary focus:ring-0" placeholder="e.g. 2022" type="text" required />
              </div>
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">Your Phone</label>
                <input name="phone_number" className="bg-background border border-surface-variant text-white font-body-md py-3 px-4 focus:outline-none focus:border-primary focus:ring-0" placeholder="e.g. 98765 43210" type="tel" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">Vehicle Type</label>
                <select name="vehicle_type" className="bg-background border border-surface-variant text-white font-body-md py-3 px-4 focus:outline-none focus:border-primary focus:ring-0 appearance-none cursor-pointer">
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">IDV / Car Value (₹)</label>
                <input name="car_value" className="bg-background border border-surface-variant text-white font-body-md py-3 px-4 focus:outline-none focus:border-primary focus:ring-0" placeholder="e.g. 15,00,000" type="number" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">City</label>
                <select name="city" className="bg-background border border-surface-variant text-white font-body-md py-3 px-4 focus:outline-none focus:border-primary focus:ring-0 appearance-none cursor-pointer">
                  <option value="New Delhi">New Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
              <div className="flex flex-col justify-end pb-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest block">Policy Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="text-primary bg-background border-surface-variant focus:ring-primary focus:ring-offset-background cursor-pointer" name="policy_type" type="radio" value="New" />
                    <span className="font-body-md text-on-surface-variant">New</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="text-primary bg-background border-surface-variant focus:ring-primary focus:ring-offset-background cursor-pointer" name="policy_type" type="radio" value="Renewal" />
                    <span className="font-body-md text-on-surface-variant">Renewal</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">Your Query <span className="lowercase text-on-surface-variant/50 text-[10px] ml-1">(Optional)</span></label>
              <textarea name="query" className="bg-background border border-surface-variant text-white font-body-md py-3 px-4 focus:outline-none focus:border-primary focus:ring-0 min-h-[120px] resize-y" placeholder="Tell us what you're looking for..."></textarea>
            </div>
            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full bg-primary text-white font-label-md py-5 uppercase tracking-widest text-lg transition-transform hover:brightness-110 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : isSuccess ? (
                  <>
                    <span>Query Sent Successfully!</span>
                    <span className="material-symbols-outlined">check_circle</span>
                  </>
                ) : (
                  <>
                    <span>Send Query</span>
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-white mb-12 text-center uppercase tracking-tight">Common <span className="text-primary">Questions</span></h2>
          <div className="space-y-4">
            
            {/* FAQ Item 1 */}
            <div className="border-b border-surface-variant pb-4 group cursor-pointer" onClick={() => toggleFaq(0)}>
              <div className="flex justify-between items-center py-4">
                <h3 className={`font-headline-md text-headline-md transition-colors ${activeFaq === 0 ? 'text-primary' : 'text-white group-hover:text-primary'}`}>How seamless is the claim process?</h3>
                <span className={`material-symbols-outlined transition-colors ${activeFaq === 0 ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                  {activeFaq === 0 ? 'remove' : 'add'}
                </span>
              </div>
              <div className={`text-on-surface-variant font-body-md pb-4 max-w-3xl transition-all duration-300 ${activeFaq === 0 ? 'block' : 'hidden'}`}>
                Our integrated dealership system means we handle everything from vehicle pickup to repair and paperwork. We aim for a zero-hassle experience with our cashless garage network.
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="border-b border-surface-variant pb-4 group cursor-pointer" onClick={() => toggleFaq(1)}>
              <div className="flex justify-between items-center py-4">
                <h3 className={`font-headline-md text-headline-md transition-colors ${activeFaq === 1 ? 'text-primary' : 'text-white group-hover:text-primary'}`}>What documents are required for renewal?</h3>
                <span className={`material-symbols-outlined transition-colors ${activeFaq === 1 ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                  {activeFaq === 1 ? 'remove' : 'add'}
                </span>
              </div>
              <div className={`text-on-surface-variant font-body-md pb-4 max-w-3xl transition-all duration-300 ${activeFaq === 1 ? 'block' : 'hidden'}`}>
                For renewals, simply provide your previous policy number, RC copy, and a quick vehicle inspection report if the policy has expired.
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="border-b border-surface-variant pb-4 group cursor-pointer" onClick={() => toggleFaq(2)}>
              <div className="flex justify-between items-center py-4">
                <h3 className={`font-headline-md text-headline-md transition-colors ${activeFaq === 2 ? 'text-primary' : 'text-white group-hover:text-primary'}`}>Do you offer reminder services?</h3>
                <span className={`material-symbols-outlined transition-colors ${activeFaq === 2 ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                  {activeFaq === 2 ? 'remove' : 'add'}
                </span>
              </div>
              <div className={`text-on-surface-variant font-body-md pb-4 max-w-3xl transition-all duration-300 ${activeFaq === 2 ? 'block' : 'hidden'}`}>
                Yes, all clients are enrolled in our automated reminder system. You will receive notifications 30, 15, and 7 days prior to policy expiration via SMS and Email.
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}


