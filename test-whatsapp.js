const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) acc[match[1]] = match[2].trim();
  return acc;
}, {});

async function test() {
  const WHATSAPP_TOKEN = env.WHATSAPP_API_TOKEN;
  const PHONE_NUMBER_ID = env.WHATSAPP_PHONE_NUMBER_ID;

  console.log("Testing with PHONE_NUMBER_ID:", PHONE_NUMBER_ID);

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "919811606000",
    type: "text",
    text: { body: "Test message from API diagnostic script" }
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
