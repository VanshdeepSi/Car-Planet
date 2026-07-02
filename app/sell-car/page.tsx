"use client";

import { useState } from "react";

export default function SellCarPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [rearPreview, setRearPreview] = useState<string | null>(null);
  const [interiorPreview, setInteriorPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'rear' | 'interior') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'front') setFrontPreview(url);
      else if (type === 'rear') setRearPreview(url);
      else setInteriorPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    const name = formData.get("name");
    const phone = formData.get("phone");
    const carName = formData.get("carName");
    const modelYear = formData.get("modelYear");
    const kmDriven = formData.get("kmDriven");
    const fuelType = formData.get("fuelType");
    const gearType = formData.get("gearType");

    const message = `*Sell Your Car Inquiry*\n\n*Client Name:* ${name}\n*Client Phone:* ${phone}\n\n*Car Name:* ${carName}\n*Model/Year:* ${modelYear}\n*KM Driven:* ${kmDriven} km\n*Fuel Type:* ${fuelType}\n*Gear Type:* ${gearType}`;

    const apiFormData = new FormData();
    apiFormData.append("to", "919811606000");
    apiFormData.append("message", message);
    
    const frontFile = formData.get("front") as File;
    if (frontFile && frontFile.size > 0) apiFormData.append("front", frontFile);
    
    const rearFile = formData.get("rear") as File;
    if (rearFile && rearFile.size > 0) apiFormData.append("rear", rearFile);

    const interiorFile = formData.get("interior") as File;
    if (interiorFile && interiorFile.size > 0) apiFormData.append("interior", interiorFile);

    try {
      const res = await fetch('/api/whatsapp-sell', {
        method: 'POST',
        body: apiFormData
      });
      
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        formElement.reset();
        setFrontPreview(null);
        setRearPreview(null);
        setInteriorPreview(null);
      } else {
        alert("Failed to send details. Please try again.");
      }
    } catch (error) {
      alert("Error sending details. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="flex-grow flex flex-col">
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-6 uppercase">Sell Your Car</h2>
              <p className="text-secondary max-w-2xl mx-auto">Provide the details and photos of your vehicle below. Our acquisition team will evaluate your submission and contact you shortly with a competitive offer.</p>
            </div>

            <form className="space-y-8 bg-[#1A1A1A] border border-[#2A2A2A] p-8 md:p-12 shadow-2xl" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Client Details */}
                <div className="space-y-6">
                  <h3 className="text-white uppercase font-label-md tracking-widest border-b border-[#2A2A2A] pb-2">Your Details</h3>
                  
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Full Name</label>
                    <input name="name" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="Your Name" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Contact Number</label>
                    <input name="phone" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="+91" type="tel" required />
                  </div>
                </div>

                {/* Car Details */}
                <div className="space-y-6">
                  <h3 className="text-white uppercase font-label-md tracking-widest border-b border-[#2A2A2A] pb-2">Vehicle Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Car Name</label>
                      <input name="carName" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="e.g. Audi Q3" type="text" required />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Model / Year</label>
                      <input name="modelYear" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="e.g. 2021" type="text" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">KM Driven</label>
                      <input name="kmDriven" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="e.g. 15000" type="number" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Fuel Type</label>
                      <select name="fuelType" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors appearance-none" required defaultValue="">
                        <option disabled value="">Select Fuel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Gear Type</label>
                      <select name="gearType" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors appearance-none" required defaultValue="">
                        <option disabled value="">Select Gear</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* Photo Uploads */}
              <div className="space-y-6 pt-6 border-t border-[#2A2A2A]">
                <h3 className="text-white uppercase font-label-md tracking-widest pb-2 text-center">Vehicle Photos (3 Angles)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block text-center">Front Angle</label>
                    <div className="relative border-2 border-dashed border-[#2A2A2A] hover:border-primary transition-colors h-40 flex items-center justify-center cursor-pointer overflow-hidden group">
                      <input type="file" name="front" accept="image/*" onChange={(e) => handleImageChange(e, 'front')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" required />
                      {frontPreview ? (
                        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${frontPreview})` }}></div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-secondary group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-3xl mb-1">directions_car</span>
                          <span className="font-body-sm text-[12px]">Upload Front</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block text-center">Rear Angle</label>
                    <div className="relative border-2 border-dashed border-[#2A2A2A] hover:border-primary transition-colors h-40 flex items-center justify-center cursor-pointer overflow-hidden group">
                      <input type="file" name="rear" accept="image/*" onChange={(e) => handleImageChange(e, 'rear')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" required />
                      {rearPreview ? (
                        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${rearPreview})` }}></div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-secondary group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-3xl mb-1">time_auto</span>
                          <span className="font-body-sm text-[12px]">Upload Rear</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block text-center">Interior</label>
                    <div className="relative border-2 border-dashed border-[#2A2A2A] hover:border-primary transition-colors h-40 flex items-center justify-center cursor-pointer overflow-hidden group">
                      <input type="file" name="interior" accept="image/*" onChange={(e) => handleImageChange(e, 'interior')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" required />
                      {interiorPreview ? (
                        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${interiorPreview})` }}></div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-secondary group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-3xl mb-1">airline_seat_recline_normal</span>
                          <span className="font-body-sm text-[12px]">Upload Interior</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button disabled={isSubmitting || isSuccess} className="bg-[#FF0000] text-white w-full py-5 font-label-md text-label-md font-bold uppercase hover:bg-[#CC0000] transition-colors flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed glow-effect" type="submit">
                  {isSubmitting ? (
                    <span>Transmitting Data...</span>
                  ) : isSuccess ? (
                    <>
                      <span>Photos & Details Sent!</span>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Vehicle For Valuation</span>
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
