const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) acc[match[1]] = match[2];
  return acc;
}, {});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function setup() {
  const { data, error } = await supabase.storage.getBucket('inventory');
  if (error) {
    console.log('Bucket not found, creating...');
    const { data: createData, error: createError } = await supabase.storage.createBucket('inventory', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    });
    if (createError) console.error('Error creating bucket:', createError);
    else console.log('Bucket created:', createData);
  } else {
    console.log('Bucket exists:', data.name);
  }
}

setup();
