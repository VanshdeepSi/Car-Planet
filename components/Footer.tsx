import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col mt-auto z-10 relative">
      {/* Stats Strip */}
      <div className="w-full bg-gradient-to-r from-background via-[#0f172a] to-background border-t border-b border-surface-variant py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>directions_car</span>
            <div className="flex flex-col">
              <span className="font-headline-xl text-headline-md md:text-headline-xl text-white leading-none tracking-tighter">40+</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Cars for Sale</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>group</span>
            <div className="flex flex-col">
              <span className="font-headline-xl text-headline-md md:text-headline-xl text-white leading-none tracking-tighter">5000+</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Happy Deliveries</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>verified</span>
            <div className="flex flex-col">
              <span className="font-headline-xl text-headline-md md:text-headline-xl text-white leading-none tracking-tighter">15+</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Brands</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>shield</span>
            <div className="flex flex-col">
              <span className="font-headline-xl text-headline-md md:text-headline-xl text-white leading-none tracking-tighter">25+</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Years of Trust</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full bg-[#111111] py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4WAya5B8taiabO12zicpmKsatz3mxHyU7gXyvT-h0zA89sHVX7zVPhF6-t10mZjgKjA1BtGNQLqIPhf9fpnp3uJ7YBkCDrI_xinu2Qr6grdi_pacbjmZlvk2qBTr6CKMRb2MPVL2hiCC6HKeXlDi9N3EQ2e4I6PuVEHtzhkX9cmBDNsg1NUK612zYnWCb04s-ws0-amRFsbuxtTRkti2VxR6iYCVyZzWq_3utQphnMZ8j8ozqUfDTKTE-vlNFcAb73YmR60VtMho" 
              alt="The Car Planet Logo" 
              className="h-32 md:h-40 w-auto object-contain origin-left -my-6 md:-my-10 -ml-2" 
            />
            
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              A trusted dealership for luxury & pre-owned cars in Delhi-NCR 💎
            </p>
            
            <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant list-disc pl-4">
              <li>25+ Years Of Trust</li>
              <li>Dealing across India</li>
              <li>15+ Brands | 5000+ Happy Deliveries</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h4 className="font-headline-sm text-headline-sm text-white uppercase tracking-wider">Contact Us</h4>
            
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block mb-1">Address:</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  G-34, NDM-1<br/>
                  Netaji Subhash Place<br/>
                  Delhi - 110034
                </p>
              </div>

              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block mb-1">Sales Hours:</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tuesday - Sunday: 11:00 AM - 07:00 PM<br/>
                  Monday: Closed
                </p>
              </div>

              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block mb-1">Phone & Email:</span>
                <a href="tel:+919811606000" className="font-body-sm text-body-sm text-white hover:text-primary transition-colors block">+91 98116 06000</a>
                <a href="mailto:carplanett@hotmail.com" className="font-body-sm text-body-sm text-white hover:text-primary transition-colors block mt-1">carplanett@hotmail.com</a>
              </div>
            </div>
          </div>

          {/* Social Network */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h4 className="font-headline-sm text-headline-sm text-white uppercase tracking-wider">Social Network</h4>
            
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1G7B7ruUzq/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center border border-[#2A2A2A] hover:bg-primary hover:border-primary transition-all duration-300">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg" className="w-5 h-5 filter invert" alt="Facebook" />
              </a>
              <a href="#" className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center border border-[#2A2A2A] hover:bg-primary hover:border-primary transition-all duration-300">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" className="w-5 h-5 filter invert" alt="Instagram" />
              </a>

              <a href="https://wa.me/919811606000" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center border border-[#2A2A2A] hover:bg-primary hover:border-primary transition-all duration-300">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg" className="w-5 h-5 filter invert" alt="WhatsApp" />
              </a>
            </div>
            

          </div>

        </div>
        
        <div className="max-w-[1440px] mx-auto border-t border-surface-variant mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} The Car Planet. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="font-body-sm text-body-sm text-on-surface-variant hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-body-sm text-body-sm text-on-surface-variant hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
