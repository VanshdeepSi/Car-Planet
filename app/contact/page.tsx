"use client";

import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const vehicle = formData.get("vehicle");
    const userMessage = formData.get("message")?.toString().trim();

    let message = `*New Contact Inquiry*\n\n*Client Name:* ${name}\n*Client Phone:* ${phone}\n*Vehicle of Interest:* ${vehicle}`;
    if (userMessage) {
      message += `\n\n*Message:* ${userMessage}`;
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
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="flex-grow flex flex-col">
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/**/}
<div className="lg:col-span-5 space-y-12">
<div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-6 uppercase">Get in Touch</h2>
<p className="text-secondary mb-8">Connect with our dedicated studio consultants to schedule a viewing or discuss your next acquisition.</p>
<form className="space-y-6" onSubmit={handleSubmit}>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Full Name</label>
<input name="name" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="Your Name" type="text" required />
</div>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Contact Number</label>
<input name="phone" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="+91" type="tel" required />
</div>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Vehicle of Interest</label>
<select name="vehicle" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors appearance-none" required defaultValue="">
<option disabled value="">Select a model</option>
<option value="Audi Q3">Audi Q3</option>
<option value="Maruti Brezza">Maruti Brezza</option>
<option value="Hyundai Creta">Hyundai Creta</option>
<option value="Mercedes C-Class">Mercedes C-Class</option>
<option value="Other / General Inquiry">Other / General Inquiry</option>
</select>
</div>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider block">Message</label>
<textarea name="message" className="bg-black border border-[#2A2A2A] focus:border-primary focus:ring-0 outline-none w-full p-4 font-body-md text-white transition-colors" placeholder="How can we assist you?" rows={4} required></textarea>
</div>
<button disabled={isSubmitting || isSuccess} className="bg-[#FF0000] text-white w-full py-4 font-label-md text-label-md font-bold hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed" type="submit">
{isSubmitting ? (
  <span>Transmitting...</span>
) : isSuccess ? (
  <>
    <span>Message Sent!</span>
    <span className="material-symbols-outlined text-[18px]">check_circle</span>
  </>
) : (
  <>
    <span>Send Transmission</span>
    <span className="material-symbols-outlined text-[18px]">send</span>
  </>
)}
</button>
</form>
</div>
{/**/}
<div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8">
<h3 className="font-headline-md text-headline-md text-white mb-6 uppercase flex items-center gap-3">
<span className="material-symbols-outlined text-brand-red">schedule</span>
                            Working Hours
                        </h3>
<div className="space-y-4">
<div className="flex justify-between items-center border-b border-[#2A2A2A] pb-4">
<span className="text-tertiary uppercase font-label-md text-label-md tracking-wider">Tue - Sun</span>
<span className="text-white font-body-md text-body-md">11:00 AM — 07:00 PM</span>
</div>
<div className="flex justify-between items-center pt-2">
<span className="text-tertiary uppercase font-label-md text-label-md tracking-wider">Monday</span>
<span className="text-white font-body-md text-body-md">Holiday</span>
</div>
</div>
</div>
</div>
{/**/}
          <div className="lg:col-span-7 space-y-gutter flex flex-col">
            <div className="relative w-full h-[600px] bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none mix-blend-overlay"></div>
              <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('/storefront.jpg')" }}></div>
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                <span className="px-3 py-1 border border-primary text-primary font-label-sm text-label-sm uppercase bg-black/50 backdrop-blur-sm">Netaji Subhash Place Facility</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter flex-grow">
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-1 relative overflow-hidden h-[300px] md:h-auto group">
                <iframe 
                  src="https://maps.google.com/maps?q=28.6906419,77.1510273&t=m&z=17&output=embed&iwloc=near" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-70 transition-opacity duration-300 filter grayscale contrast-125"
                ></iframe>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=28.6906419,77.1510273" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <div className="bg-primary text-white font-label-md text-label-md px-6 py-3 uppercase flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined text-[18px]">directions_car</span>
                    Get Directions
                  </div>
                </a>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-20"></div>
              </div>

              <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 flex flex-col justify-center space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div>
                  <h4 className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-2">Location</h4>
                  <p className="text-white font-body-lg text-body-lg leading-relaxed">
                    G-34, NDM-1<br />
                    Netaji Subhash Place<br />
                    Delhi - 110034
                  </p>
                </div>
                
                <div>
                  <h4 className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-2">Direct Line</h4>
                  <a className="text-white font-headline-md text-headline-md hover:text-primary transition-colors block" href="tel:+919811606000">
                    +91 98116 06000
                  </a>
                </div>
                
                <div>
                  <h4 className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-2">Email</h4>
                  <a className="text-white font-body-lg text-body-lg hover:text-primary transition-colors border-b border-[#2A2A2A] hover:border-primary inline-block pb-1" href="mailto:carplanett@hotmail.com">
                    carplanett@hotmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
</div>
</section>
</main>
    </div>
  );
}
