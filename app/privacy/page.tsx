export const metadata = {
  title: "Privacy Policy | The Car Planet",
  description: "Privacy Policy for The Car Planet",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] border border-[#2A2A2A] p-8 md:p-12">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-8 uppercase tracking-tighter border-b border-[#2A2A2A] pb-6">Privacy Policy</h1>
        
        <div className="space-y-8 font-body-md text-on-surface-variant leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">1. Information We Collect</h2>
            <p>At The Car Planet, we collect personal information that you provide to us directly, such as when you fill out a form to book a test drive, request a valuation, or contact us. This may include your name, phone number, email address, and details about your vehicle.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and respond to your inquiries (e.g., test drives, car valuations).</li>
              <li>Communicate with you regarding our inventory, services, and special offers.</li>
              <li>Improve our website and customer service experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">3. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">4. Security of Your Information</h2>
            <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our site.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
            <p className="text-white">
              The Car Planet<br />
              G-34, NDM-1, Netaji Subhash Place<br />
              Delhi - 110034<br />
              Phone: +91 98116 06000<br />
              Email: carplanett@hotmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
