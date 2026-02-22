export default function Terms() {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Terms & Conditions</h1>
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using Cardnd, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Role of Cardnd</h2>
              <p>Cardnd acts as an intermediary platform connecting customers with car rental agencies. We do not own or operate any vehicles. The rental contract is directly between the customer and the rental agency.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Booking and Payments</h2>
              <p>Bookings made through our platform are subject to availability. Prices are displayed in Moroccan Dirhams (MAD). We may require a partial or full payment online to secure your reservation.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Cancellation Policy</h2>
              <p>Cancellations are subject to the specific policy of the rental agency. Generally, free cancellation is available up to 48 hours before the scheduled pickup time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Driver Requirements</h2>
              <p>Drivers must meet the minimum age and license requirements specified by the rental agency. Typically, this includes being at least 21 years old and holding a valid driving license for at least one year.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
              <p>Cardnd is not liable for any accidents, damages, or disputes arising from the rental agreement between the customer and the agency.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">7. Governing Law</h2>
              <p>These terms are governed by the laws of the Kingdom of Morocco. Any disputes shall be subject to the exclusive jurisdiction of the courts in Casablanca.</p>
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
