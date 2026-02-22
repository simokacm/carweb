export default function Privacy() {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
              <p>We collect personal information that you provide to us, such as your name, email address, phone number, and driving license details when you make a booking or create an account.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p>We use your information to process your bookings, communicate with you about your reservations, and improve our services. We share necessary details with the rental agency you choose.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Cookies</h2>
              <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Third-Party Links</h2>
              <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these external websites.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">7. Changes to This Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</p>
            </section>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-400">
            Last updated: October 2023
          </div>
        </div>
      </div>
    </div>
  );
}
