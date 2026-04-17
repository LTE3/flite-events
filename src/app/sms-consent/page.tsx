export default function SmsConsentPage() {
  return (
    <div className="px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">SMS Consent</h1>
        <div className="text-text-dim space-y-4 text-sm leading-relaxed">
          <p>Last updated: April 2026</p>
          <h2 className="text-lg font-bold text-text mt-8">SMS Communications</h2>
          <p>By providing your phone number and opting in, you consent to receive SMS messages from PulseTix related to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ticket confirmations and QR codes</li>
            <li>Event reminders and updates</li>
            <li>Promoter notifications</li>
          </ul>
          <h2 className="text-lg font-bold text-text mt-8">Opting Out</h2>
          <p>You can opt out at any time by replying STOP to any message. Message and data rates may apply. Message frequency varies.</p>
          <h2 className="text-lg font-bold text-text mt-8">Contact</h2>
          <p>For help, reply HELP or email <a href="mailto:Pulsetixai@gmail.com" className="text-accent hover:underline">Pulsetixai@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
