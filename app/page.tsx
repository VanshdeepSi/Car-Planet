import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/types";
import HomeClient from "@/components/HomeClient";

const MOCK_CARS: Car[] = [
  {
    id: "mock-1",
    make: "Hyundai",
    model: "Creta",
    year: 2023,
    price: 1850000,
    mileage_km: 12500,
    fuel_type: "petrol",
    transmission: "automatic",
    condition: "used",
    color: "White",
    vin: null,
    image_urls: [
      "https://lh3.googleusercontent.com/aida/AP1WRLu0wIvbxffZmMFjhDXLln-GbyV1SJlERJ2hzmomqQORUC8Hc4Ow7woKYs0fhl2agZYSrvAFF-TUPcOiu--JCE-8SpokKD8bjAe3ajeF9ITREFG0Luii4cV0Xif4Osz8d2rKM8R2mOiqthVpC71U-xU--On1Z1matHkTkAoskPV-_YzwDdVTsQMxp4PjzNsB6CJnlfZny5f8cB3mNI4XAV0-GM2uYKWVOnFWivYG2a_B1EMLQqd0PjdsRw"
    ],
    description: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-2",
    make: "Maruti",
    model: "Brezza",
    year: 2022,
    price: 1280000,
    mileage_km: 28000,
    fuel_type: "petrol",
    transmission: "automatic",
    condition: "used",
    color: "Red",
    vin: null,
    image_urls: [
      "https://lh3.googleusercontent.com/aida/AP1WRLuVwYJcSRPDNLQznqUj6pNu3LQQKVnikqlXZNZv7viRDM-lo5eUs_VtI2XctlXojWgix61u9KXwHGugCXo1bmBgtNRww21hYjIRu_tAJZ4i38L8jg_ZdIqISf0QgwHnOzdvI-UXX-SEZ1J2NLvN5RgSxOzWOZjmPwby9GIl-pWGNRFIt-QQ0uTcDPFt6s7Hi6pz1Qws3yjtQSxojBAOE-RXSAy1sXGyB0Y2NlLvqQcX3qI5vXKkITJzJlc"
    ],
    description: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-3",
    make: "Audi",
    model: "Q3",
    year: 2021,
    price: 4200000,
    mileage_km: 18500,
    fuel_type: "petrol",
    transmission: "automatic",
    condition: "used",
    color: "Blue",
    vin: null,
    image_urls: [
      "https://lh3.googleusercontent.com/aida/AP1WRLvJYyiXPKWZblUi9vxuaV_nafYT8SCwjELcxdm4T6M6UZNtvwZ9wRV3dbdsMRMAQKRyA5djsndZ_vMx_BUl1BSnBQAua6ZsF5sbU0sYkhwNal_WPYK2szXA6Rl9UOzG6gAEN_isPA87dlr-2kgk6u5kx9BpTcw0PRZKbwAQLWxw1ldDJsKEcp3gxQ7F-6GlY3RIBYPi2c8kUCCL3ZA3yLcTq8g58fXE3KgixXOoxfIhWOSirRTel-60yPg"
    ],
    description: null,
    created_at: new Date().toISOString(),
  }
];

export default async function Page() {
  const supabase = createClient();
  const { data: cars, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  const list = !error && cars && cars.length > 0 ? (cars as Car[]) : MOCK_CARS;

  return <HomeClient cars={list} />;
}
