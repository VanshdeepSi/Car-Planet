import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, to } = await request.json();

    const WHATSAPP_TOKEN = process.env.WHATSAPP_API_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      // If keys aren't set yet, we just simulate success so the frontend works for now.
      console.log('MOCK WHATSAPP SEND (Keys missing in .env.local):', message);
      return NextResponse.json({ success: true, mock: true, message: "Add your Meta API keys to .env.local to send real messages" });
    }

    // Official Meta Graph API endpoint for sending WhatsApp messages
    const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

    // WhatsApp Cloud API payload format for text messages
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "text",
      text: { 
        preview_url: false,
        body: message
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Meta API Response:", data);

    if (!response.ok) {
      console.error("WhatsApp API Error:", data);
      return NextResponse.json({ success: false, error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("Error processing WhatsApp query:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
