export default function PrivacyPage() {
  return (
    <div className="px-6 py-10">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-3xl font-extrabold mb-6">Privacy Policy</h1>
        <div className="text-text-dim space-y-4 text-sm leading-relaxed">
          <p>Last updated: April 2026</p>
          <h2 className="text-lg font-bold text-text mt-8">1. Information We Collect</h2>
          <p>We collect information you provide when creating an account, purchasing tickets, or contacting us. This includes your name, email address, phone number, and payment information processed through Stripe.</p>
          <h2 className="text-lg font-bold text-text mt-8">2. How We Use Your Information</h2>
          <p>We use your information to process ticket purchases, deliver QR code tickets via email, communicate about events, and improve our platform.</p>
          <h2 className="text-lg font-bold text-text mt-8">3. Payment Processing</h2>
          <p>All payments are processed securely through Stripe. We do not store your credit card information on our servers.</p>
          <h2 className="text-lg font-bold text-text mt-8">4. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with event hosts for attendee management and with service providers who assist in operating our platform.</p>
          <h2 className="text-lg font-bold text-text mt-8">5. Contact Us</h2>
          <p>For questions about this policy, contact us at <a href="mailto:Pulsetixai@gmail.com" className="text-accent hover:underline">Pulsetixai@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
