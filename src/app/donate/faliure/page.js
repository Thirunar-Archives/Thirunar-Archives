export default function FailPage() {
  return (
    <div className="container py-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: 700 }}>
        <h3 className="mb-3">Payment Failed / Cancelled</h3>
        <p className="mb-1">Your payment was not completed.</p>
        <p className="mt-3">Please try again or contact support.</p>
      </div>
    </div>
  );
}
