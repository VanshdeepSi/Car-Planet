import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    if (!supabaseServiceKey) {
      return NextResponse.json({ error: "Server configuration error: Missing Service Role Key." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const carId = params.id;

    if (!carId) {
      return NextResponse.json({ error: "Missing car ID." }, { status: 400 });
    }

    // 1. Delete car from Database (Images in storage will be orphaned for now to keep it simple and safe)
    const { error: dbError } = await supabase
      .from("cars")
      .delete()
      .eq("id", carId);

    if (dbError) {
      console.error("Database Delete Error:", dbError);
      return NextResponse.json({ error: "Failed to delete vehicle from database." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    if (!supabaseServiceKey) {
      return NextResponse.json({ error: "Server configuration error: Missing Service Role Key." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const carId = params.id;

    if (!carId) {
      return NextResponse.json({ error: "Missing car ID." }, { status: 400 });
    }

    const body = await request.json();
    
    const { data: updateData, error: updateError } = await supabase
      .from("cars")
      .update({
        make: body.make,
        model: body.model,
        year: parseInt(body.year),
        price: parseInt(body.price),
        mileage_km: parseInt(body.mileage_km),
        color: body.color,
        fuel_type: body.fuel_type,
        transmission: body.transmission,
        condition: body.condition,
        category: body.category,
        is_exclusive: body.is_exclusive === true || body.is_exclusive === 'true' || body.is_exclusive === 'on',
        vin: body.vin,
        description: body.description,
      })
      .eq("id", carId)
      .select()
      .single();

    if (updateError) {
      console.error("Database Update Error:", updateError);
      return NextResponse.json({ error: "Failed to update vehicle in database." }, { status: 500 });
    }

    return NextResponse.json({ success: true, car: updateData });
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
