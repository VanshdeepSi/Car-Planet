export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage_km: number;
  fuel_type: "petrol" | "diesel" | "electric" | "hybrid" | "cng";
  transmission: "manual" | "automatic";
  condition: "new" | "used";
  color: string;
  vin: string | null;
  image_urls: string[];
  description: string | null;
  category: string;
  is_exclusive?: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string;
  interested_car_id: string | null;
  created_at: string;
}
