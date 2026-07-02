import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // We must use the Service Role Key to bypass RLS for admin uploads
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    if (!supabaseServiceKey) {
      return NextResponse.json({ error: "Server configuration error: Missing Service Role Key." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Extract non-file fields
    const make = formData.get("make")?.toString();
    const model = formData.get("model")?.toString();
    const year = parseInt(formData.get("year")?.toString() || "0");
    const price = parseInt(formData.get("price")?.toString() || "0");
    const mileage_km = parseInt(formData.get("mileage")?.toString() || "0");
    const color = formData.get("color")?.toString();
    const fuel_type = formData.get("fuel_type")?.toString();
    const transmission = formData.get("transmission")?.toString();
    const condition = formData.get("condition")?.toString();
    const category = formData.get("category")?.toString() || "Sedan";
    const is_exclusive = formData.get("is_exclusive") === "true";
    const vin = formData.get("vin")?.toString() || null;
    const description = formData.get("description")?.toString() || null;

    if (!make || !model || !year || !price || !mileage_km || !color || !fuel_type || !transmission || !condition) {
      return NextResponse.json({ error: "Missing required vehicle fields." }, { status: 400 });
    }

    // 2. Extract and upload images
    const images = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const file of images) {
      if (file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `cars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("inventory")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Storage Upload Error:", uploadError);
          return NextResponse.json({ error: `Failed to upload image: ${file.name}` }, { status: 500 });
        }

        const { data: publicUrlData } = supabase.storage
          .from("inventory")
          .getPublicUrl(filePath);

        imageUrls.push(publicUrlData.publicUrl);
      }
    }

    // 3. Insert into Database
    const { data: carData, error: dbError } = await supabase
      .from("cars")
      .insert({
        make,
        model,
        year,
        price,
        mileage_km,
        color,
        fuel_type,
        transmission,
        condition,
        category,
        is_exclusive,
        vin,
        description,
        image_urls: imageUrls,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database Insert Error:", dbError);
      return NextResponse.json({ error: "Failed to save vehicle to database." }, { status: 500 });
    }

    return NextResponse.json({ success: true, car: carData });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
