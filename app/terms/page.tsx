export const metadata = {
  title: "Terms of Service | The Car Planet",
  description: "Terms of Service for The Car Planet",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] border border-[#2A2A2A] p-8 md:p-12">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-8 uppercase tracking-tighter border-b border-[#2A2A2A] pb-6">Terms of Service</h1>
        
        <div className="space-y-8 font-body-md text-on-surface-variant leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">1. Acceptance of Terms</h2>
            <p>By accessing and using the website of The Car Planet, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">2. Vehicle Information & Pricing</h2>
            <p>While we make every effort to ensure the accuracy of the information on our website, errors may occur. The Car Planet is not responsible for typographical errors, pricing errors, or omissions regarding vehicle specifications, availability, or prices. All prices and specifications are subject to change without notice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">3. Test Drives and Valuations</h2>
            <p>Submitting a request for a test drive or vehicle valuation through our website does not guarantee an appointment or an exact offer. Our team will contact you to confirm details, availability, and final scheduling.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">4. Intellectual Property</h2>
            <p>The site and its original content, features, and functionality are owned by The Car Planet and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-headline-sm text-white uppercase tracking-wider">5. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
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
