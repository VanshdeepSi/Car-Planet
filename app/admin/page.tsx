"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Car } from "@/lib/types";

const ADMIN_PIN = "0888";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [previews, setPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCars();
    }
  }, [isAuthenticated, activeTab]);

  const fetchCars = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
    if (data) setCars(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Incorrect PIN");
      setPin("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles);
      
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (images.length === 0) {
      alert("Please select at least one image.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    images.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        formRef.current?.reset();
        setImages([]);
        setPreviews([]);
        fetchCars();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(data.error || "Failed to upload car. Please try again.");
      }
    } catch (error) {
      alert("Error uploading car. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this car from inventory?")) return;
    
    try {
      const res = await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCars();
      } else {
        alert("Failed to delete car.");
      }
    } catch (error) {
      alert("Error deleting car.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCar) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`/api/admin/cars/${editingCar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setEditingCar(null);
        fetchCars();
      } else {
        alert("Failed to update car.");
      }
    } catch (error) {
      alert("Error updating car.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-surface-container-high border border-surface-variant p-8 md:p-12 w-full max-w-md shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="text-center mb-8 relative z-10">
            <span className="material-symbols-outlined text-[48px] text-primary mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>admin_panel_settings</span>
            <h1 className="font-headline-md text-white uppercase tracking-wider">Admin Portal</h1>
            <p className="font-body-sm text-on-surface-variant mt-2">Enter PIN to access inventory management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="****"
                maxLength={4}
                className="bg-black border border-surface-variant text-center tracking-[1em] text-xl font-bold text-white w-full p-4 focus:border-primary focus:ring-0 outline-none transition-colors"
                required
                autoFocus
              />
              {pinError && <p className="text-[#FF0000] font-label-sm text-center animate-pulse">{pinError}</p>}
            </div>
            
            <button type="submit" className="w-full bg-primary text-white uppercase font-label-md py-4 hover:brightness-110 transition-colors">
              Access Dashboard
            </button>
            <div className="text-center">
              <Link href="/" className="font-label-sm text-on-surface-variant hover:text-white uppercase tracking-widest transition-colors">Return to Home</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 relative">
      <main className="flex-grow flex flex-col max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-8 border-b border-surface-variant pb-4">
          <div>
            <h1 className="font-headline-lg text-white uppercase tracking-tighter">Inventory Management</h1>
            <p className="font-body-md text-on-surface-variant">Upload or manage vehicles in the live inventory.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="font-label-sm uppercase text-on-surface hover:text-primary transition-colors flex items-center gap-2">
            Logout <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab("add")}
            className={`font-label-md uppercase tracking-widest px-6 py-3 border-b-2 transition-colors ${activeTab === 'add' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-white'}`}
          >
            Add New Car
          </button>
          <button 
            onClick={() => setActiveTab("manage")}
            className={`font-label-md uppercase tracking-widest px-6 py-3 border-b-2 transition-colors ${activeTab === 'manage' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-white'}`}
          >
            Manage Cars
          </button>
        </div>

        {activeTab === "add" && (
          <form ref={formRef} onSubmit={handleAddSubmit} className="bg-surface-container-lowest border border-surface-variant p-6 md:p-12 shadow-xl">
            <h2 className="font-headline-sm text-white uppercase tracking-widest mb-6 text-primary">Vehicle Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Make / Brand *</label>
                <input name="make" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors" placeholder="e.g. Mercedes-Benz" required />
              </div>
              
              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Model *</label>
                <input name="model" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors" placeholder="e.g. S-Class S350d" required />
              </div>
              
              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Year *</label>
                <input name="year" type="number" min="1990" max={new Date().getFullYear()} className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors" placeholder="e.g. 2022" required />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Price (₹) *</label>
                <input name="price" type="number" min="0" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors" placeholder="e.g. 15000000" required />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Kilometers Driven *</label>
                <input name="mileage" type="number" min="0" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors" placeholder="e.g. 12500" required />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Color *</label>
                <input name="color" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors" placeholder="e.g. Obsidian Black" required />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Category *</label>
                <select name="category" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors appearance-none" required defaultValue="Sedan">
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

              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Fuel Type *</label>
                <select name="fuel_type" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors appearance-none" required defaultValue="petrol">
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Transmission *</label>
                <select name="transmission" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors appearance-none" required defaultValue="automatic">
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Condition *</label>
                <select name="condition" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors appearance-none" required defaultValue="used">
                  <option value="used">Used / Pre-Owned</option>
                  <option value="new">New</option>
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">VIN (Optional)</label>
                <input name="vin" className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors" placeholder="Vehicle Identification Number" />
              </div>
              
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <label className="font-label-sm text-tertiary uppercase tracking-wider block">Description (Optional)</label>
                <textarea name="description" rows={4} className="bg-black border border-surface-variant focus:border-primary outline-none w-full p-3 font-body-md text-white transition-colors resize-none" placeholder="Detailed description, features, modifications..."></textarea>
              </div>

              <div className="space-y-2 md:col-span-2 lg:col-span-3 flex items-center gap-3 bg-surface-container-high p-4 border border-primary/20">
                <input type="checkbox" name="is_exclusive" value="true" id="is_exclusive" className="w-5 h-5 accent-primary cursor-pointer" />
                <label htmlFor="is_exclusive" className="font-label-md text-primary uppercase tracking-widest cursor-pointer select-none">
                  Mark as EXCLUSIVE Vehicle
                </label>
              </div>
            </div>

            <h2 className="font-headline-sm text-white uppercase tracking-widest mb-6 text-primary border-t border-surface-variant pt-8">Vehicle Photos</h2>
            
            <div className="space-y-6 mb-12">
              <div className="relative border-2 border-dashed border-surface-variant hover:border-primary transition-colors p-8 flex flex-col items-center justify-center cursor-pointer min-h-[200px] bg-black group">
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" required />
                <span className="material-symbols-outlined text-[48px] text-surface-variant group-hover:text-primary transition-colors mb-4">add_photo_alternate</span>
                <p className="font-label-md text-white uppercase tracking-widest text-center">Click or Drag to Upload Photos</p>
                <p className="font-body-sm text-tertiary mt-2 text-center">Upload multiple images (Front, Rear, Interior, Details)</p>
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                  {previews.map((src, index) => (
                    <div key={index} className="aspect-[4/3] bg-surface-variant rounded overflow-hidden relative">
                      <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-surface-variant pt-8">
              <button disabled={isSubmitting || isSuccess} className="bg-primary text-white w-full py-5 font-label-md text-label-md font-bold uppercase hover:brightness-110 transition-colors flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed glow-effect" type="submit">
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                    <span>Uploading to Database...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span>Car Added to Inventory!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                    <span>Add Vehicle to Inventory</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {activeTab === "manage" && (
          <div className="bg-surface-container-lowest border border-surface-variant p-6 md:p-12 shadow-xl">
            <h2 className="font-headline-sm text-white uppercase tracking-widest mb-6 text-primary">Manage Listed Cars</h2>
            {cars.length === 0 ? (
              <p className="text-on-surface-variant">No cars found in inventory.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <div key={car.id} className="bg-charcoal border border-surface-variant rounded-lg overflow-hidden flex flex-col">
                    <div className="w-full h-48 bg-black relative">
                      <img src={car.image_urls?.[0]} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-headline-sm text-white">{car.year} {car.make} {car.model}</h3>
                      <p className="text-primary font-body-sm mb-4">₹{car.price.toLocaleString('en-IN')}</p>
                      
                      <div className="mt-auto grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setEditingCar(car)}
                          className="bg-surface border border-surface-variant text-white py-2 font-label-sm uppercase hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(car.id)}
                          className="bg-[#FF0000]/10 border border-[#FF0000]/30 text-[#FF0000] py-2 font-label-sm uppercase hover:bg-[#FF0000] hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingCar && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div data-lenis-prevent className="bg-surface-container-highest border border-surface-variant p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-white uppercase tracking-widest">Edit {editingCar.make} {editingCar.model}</h2>
              <button onClick={() => setEditingCar(null)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Make</label>
                  <input name="make" defaultValue={editingCar.make} className="bg-black border border-surface-variant w-full p-2 text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Model</label>
                  <input name="model" defaultValue={editingCar.model} className="bg-black border border-surface-variant w-full p-2 text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Year</label>
                  <input name="year" type="number" defaultValue={editingCar.year} className="bg-black border border-surface-variant w-full p-2 text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Price (₹)</label>
                  <input name="price" type="number" defaultValue={editingCar.price} className="bg-black border border-surface-variant w-full p-2 text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Mileage</label>
                  <input name="mileage_km" type="number" defaultValue={editingCar.mileage_km} className="bg-black border border-surface-variant w-full p-2 text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Color</label>
                  <input name="color" defaultValue={editingCar.color} className="bg-black border border-surface-variant w-full p-2 text-white" required />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Category</label>
                  <select name="category" defaultValue={editingCar.category} className="bg-black border border-surface-variant w-full p-2 text-white" required>
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
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Fuel Type</label>
                  <select name="fuel_type" defaultValue={editingCar.fuel_type} className="bg-black border border-surface-variant w-full p-2 text-white" required>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Transmission</label>
                  <select name="transmission" defaultValue={editingCar.transmission} className="bg-black border border-surface-variant w-full p-2 text-white" required>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Condition</label>
                  <select name="condition" defaultValue={editingCar.condition} className="bg-black border border-surface-variant w-full p-2 text-white" required>
                    <option value="used">Used / Pre-Owned</option>
                    <option value="new">New</option>
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="font-label-sm text-tertiary uppercase text-[10px]">Description</label>
                  <textarea name="description" rows={3} defaultValue={editingCar.description || ''} className="bg-black border border-surface-variant w-full p-2 text-white"></textarea>
                </div>
                <div className="space-y-1 md:col-span-2 flex items-center gap-2 bg-surface-container-high p-3 border border-primary/20 mt-2">
                  <input type="checkbox" name="is_exclusive" value="true" defaultChecked={editingCar.is_exclusive} id="edit_is_exclusive" className="w-4 h-4 accent-primary cursor-pointer" />
                  <label htmlFor="edit_is_exclusive" className="font-label-sm text-primary uppercase tracking-widest cursor-pointer select-none text-[10px]">
                    Exclusive Vehicle
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4 mt-4 border-t border-surface-variant">
                <button type="button" onClick={() => setEditingCar(null)} className="w-1/2 py-3 border border-surface-variant text-white uppercase font-label-sm hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="w-1/2 py-3 bg-primary text-white uppercase font-label-sm hover:brightness-110 flex justify-center items-center gap-2">
                  {isSubmitting ? <span className="material-symbols-outlined animate-spin">refresh</span> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
