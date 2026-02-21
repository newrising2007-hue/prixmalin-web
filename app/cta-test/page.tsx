import AffiliateButton from "@/components/AffiliateButton";

export default function CtaTestPage() {
  return (
    <main className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Test bouton affilié</h1>

      <AffiliateButton
        url="https://www.amazon.ca/dp/B07X6HDSDY"
        label="Acheter sur Amazon"
      />
    </main>
  );
}
