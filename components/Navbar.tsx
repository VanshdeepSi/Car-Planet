"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== "/" && pathname?.startsWith(path));
    return isActive
      ? "font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-1 transition-all duration-300"
      : "font-label-md text-label-md text-on-surface hover:text-primary transition-colors duration-300 border-b-2 border-transparent pb-1";
  };
  
  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== "/" && pathname?.startsWith(path));
    return isActive
      ? "block font-headline-md text-primary font-bold py-4 border-b border-surface-variant transition-colors"
      : "block font-headline-md text-on-surface hover:text-primary py-4 border-b border-surface-variant transition-colors";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/inventory?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-surface-variant transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-base max-w-[1440px] mx-auto">
        {/* Brand */}
        <Link className="font-headline-md text-headline-md font-bold text-on-surface uppercase tracking-tighter hover:text-primary transition-all duration-200 flex items-center" href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4WAya5B8taiabO12zicpmKsatz3mxHyU7gXyvT-h0zA89sHVX7zVPhF6-t10mZjgKjA1BtGNQLqIPhf9fpnp3uJ7YBkCDrI_xinu2Qr6grdi_pacbjmZlvk2qBTr6CKMRb2MPVL2hiCC6HKeXlDi9N3EQ2e4I6PuVEHtzhkX9cmBDNsg1NUK612zYnWCb04s-ws0-amRFsbuxtTRkti2VxR6iYCVyZzWq_3utQphnMZ8j8ozqUfDTKTE-vlNFcAb73YmR60VtMho" alt="The Car Planet Logo" className="h-14 md:h-16 w-auto object-contain scale-[2] origin-left" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-gutter items-center">
          <Link className={getLinkClass("/inventory")} href="/inventory">Inventory</Link>
          <Link className={getLinkClass("/finance")} href="/finance">Finance</Link>
          <Link className={getLinkClass("/insurance")} href="/insurance">Insurance</Link>
          <Link className={getLinkClass("/sell-car")} href="/sell-car">Sell Car</Link>
          <Link className={getLinkClass("/contact")} href="/contact">Contact</Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-base">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative animate-fade-in">
              <input 
                type="text" 
                autoFocus 
                className="bg-[#1A1A1A] border border-primary text-white font-body-sm outline-none px-4 py-2 rounded-full w-48 lg:w-64 transition-all duration-300 focus:ring-1 focus:ring-primary"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if(!searchQuery.trim()) setIsSearchOpen(false);
                }}
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface/50 hover:text-white text-[18px] transition-colors">close</span>
              </button>
            </form>
          ) : (
            <button onClick={() => setIsSearchOpen(true)} className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-surface-variant hover:border-primary transition-colors duration-200">
              <span className="material-symbols-outlined text-on-surface hover:text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
            </button>
          )}

          <Link className="hidden md:inline-flex bg-[#FF0000] text-white font-label-md text-label-md uppercase px-6 py-3 items-center justify-center btn-primary-glow" href="/test-drive">
            Book Test Drive
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-on-surface p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div data-lenis-prevent className="md:hidden absolute top-full left-0 w-full h-screen bg-background flex flex-col pt-6 px-margin-mobile pb-32 overflow-y-auto">
          <form onSubmit={handleSearch} className="flex items-center relative mb-8">
            <input 
              type="text" 
              className="bg-[#1A1A1A] border border-surface-variant text-white font-body-md outline-none px-6 py-4 w-full transition-all duration-300 focus:border-primary"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[24px]">search</span>
            </button>
          </form>
          
          <nav className="flex flex-col mb-10 uppercase tracking-widest">
            <Link className={getMobileLinkClass("/inventory")} href="/inventory" onClick={() => setIsMobileMenuOpen(false)}>Inventory</Link>
            <Link className={getMobileLinkClass("/finance")} href="/finance" onClick={() => setIsMobileMenuOpen(false)}>Finance</Link>
            <Link className={getMobileLinkClass("/insurance")} href="/insurance" onClick={() => setIsMobileMenuOpen(false)}>Insurance</Link>
            <Link className={getMobileLinkClass("/sell-car")} href="/sell-car" onClick={() => setIsMobileMenuOpen(false)}>Sell Car</Link>
            <Link className={getMobileLinkClass("/contact")} href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </nav>
          
          <Link className="bg-[#FF0000] text-white font-label-md text-label-md uppercase px-6 py-4 items-center justify-center text-center mt-auto shadow-[0_0_20px_rgba(255,0,0,0.3)]" href="/test-drive" onClick={() => setIsMobileMenuOpen(false)}>
            Book Test Drive
          </Link>
        </div>
      )}
    </header>
  );
}
