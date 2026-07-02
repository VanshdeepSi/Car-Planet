import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const to = formData.get('to')?.toString();
    const message = formData.get('message')?.toString();
    
    const front = formData.get('front') as File | null;
    const rear = formData.get('rear') as File | null;
    const interior = formData.get('interior') as File | null;

    const WHATSAPP_TOKEN = process.env.WHATSAPP_API_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ error: 'WhatsApp credentials not configured' }, { status: 500 });
    }

    const uploadToMeta = async (file: File) => {
      if (!file || file.size === 0) return null;
      const metaForm = new FormData();
      metaForm.append('messaging_product', 'whatsapp');
      metaForm.append('file', file);
      
      const res = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/media`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${WHATSAPP_TOKEN}` },
        body: metaForm
      });
      const data = await res.json();
      return data.id || null;
    };

    // 1. Upload Images to Meta
    const frontMediaId = await uploadToMeta(front!);
    const rearMediaId = await uploadToMeta(rear!);
    const interiorMediaId = await uploadToMeta(interior!);

    const sendMessage = async (payload: any) => {
      await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    };

    // 2. Send Text Message
    if (message) {
      await sendMessage({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: { body: message }
      });
    }

    // 3. Send Images
    if (frontMediaId) {
      await sendMessage({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "image",
        image: { id: frontMediaId, caption: "Front Angle" }
      });
    }
    
    if (rearMediaId) {
      await sendMessage({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "image",
        image: { id: rearMediaId, caption: "Rear Angle" }
      });
    }

    if (interiorMediaId) {
      await sendMessage({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "image",
        image: { id: interiorMediaId, caption: "Interior Photo" }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('WhatsApp API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
