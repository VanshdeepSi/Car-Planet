# Admin Dashboard Implementation Plan

This plan outlines the creation of an admin portal specifically designed for easily uploading cars to the inventory.

## Goal
Build a secure, easy-to-use Admin Dashboard (`/admin`) using the Kinetic Noir (Stitch) aesthetic. It will allow authorized personnel to upload new vehicle details and images directly into the live inventory.

## Proposed Changes

### 1. `app/admin/page.tsx`
- **Authentication UI**: A simple PIN-entry screen to protect the admin area from public users.
- **Upload Form UI**: A sleek, dark-themed form matching the site's aesthetic.
  - Fields: Make, Model, Year, Price, Mileage, Fuel Type, Transmission, Condition, Color.
  - Media: Multiple image upload support with preview thumbnails.
- **State Management**: Handling form state, loading indicators, and success/error messages.

### 2. `app/api/admin/upload/route.ts`
- **New API Endpoint**: A Next.js route handler to securely process form submissions.
- **Image Storage**: Uploads selected images to the Supabase `inventory` storage bucket (which I have successfully provisioned).
- **Database Insertion**: Saves the vehicle details and the generated public image URLs directly to the Supabase `cars` table.

## User Review Required

> [!IMPORTANT]
> **Admin PIN**: To keep it extremely simple for your father, I propose using a **4-digit PIN** to access the page instead of a complex login system. I will set the default PIN to `8888`. Does this work for you, or would you prefer a different PIN?

## Verification Plan

### Manual Verification
1. Navigate to `/admin`.
2. Enter the PIN.
3. Fill out the car details and upload sample images.
4. Verify that the form submits successfully.
5. Check the homepage and `/inventory` page to confirm the new car appears immediately with its images.
