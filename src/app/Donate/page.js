import Image from 'next/image';

export default function DonatePage() {
  return (
    // min-h-screen and justify-center ensures the entire box is vertically and horizontally centered
    <div className="min-h-screen bg-stone-50 py-12 px-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4 text-center">Support Our Mission</h1>
          <p className="text-stone-700 italic text-center">"Preserving the past to empower the future."</p>
        </div>

        {/* Main Content Container - Changed to flex-col for centering */}
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md border border-stone-200 w-full">
          
          {/* Section 1: Bank Details - Text Aligned Center */}
          <div className="space-y-6 w-full text-center mb-10">
            <h2 className="text-2xl font-bold text-stone-900 border-b pb-2">Bank Transfer</h2>
            <div className="space-y-4 text-stone-800">
              <div>
                <p className="text-sm uppercase text-stone-500 font-semibold tracking-wider">Account Name : Agni Pradeep</p>
                <p className="text-lg"></p>
              </div>
              <div>
                <p className="text-sm uppercase text-stone-500 font-semibold tracking-wider">Account Number : 4376101009181</p>
                <p className="text-lg font-mono"></p>
              </div>
              <div>
                <p className="text-sm uppercase text-stone-500 font-semibold tracking-wider">Bank & Branch : Canara Bank, Guindy</p>
                <p className="text-lg"></p>
              </div>
              <div>
                <p className="text-sm uppercase text-stone-500 font-semibold tracking-wider">IFSC Code : CNRB0008444</p>
                <p className="text-lg font-mono text-center"></p>
              </div>
            </div>
          </div>

          {/* Divider line for visual clarity */}
          <div className="w-full border-t border-stone-100 mb-10"></div>








          {/* Section 2: QR Code - Centered */}
          <div className="flex flex-col items-center justify-center bg-stone-50 rounded-lg p-8 border-2 border-dashed border-stone-300 w-full max-w-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-4 text-center">Scan to Pay (UPI)</h3>
           <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-md">
      <img 
        src="/Donation-qr.jpg" 
        alt="Donation QR Code" 
        style={{ display: 'block', margin: '0 auto', width: '280px', height: '280px' }}
        className="rounded-md"
      />
            </div>
            <p className="text-sm text-stone-500 text-center">
              Scan using Google Pay, PhonePe, or any UPI app.
            </p>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-stone-500 text-sm">
          <p>Please share a screenshot of the transaction with us for an acknowledgment receipt.</p>
        </div>
      </div>
    </div>
  );
}