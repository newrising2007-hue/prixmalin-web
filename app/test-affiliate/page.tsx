import { buildAmazonLink } from "@/lib/affiliate";

export default function TestAffiliatePage() {
  const url = buildAmazonLink(
    "https://www.amazon.ca/dp/B07X6HDSDY"
  );

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Affiliate Test</h1>

      <a
        href={url}
        className="text-blue-600 underline"
        target="_blank"
      >
        Ouvrir Amazon
      </a>

      <pre className="mt-4 bg-black/5 p-4 rounded">
        {url}
      </pre>
    </main>
  );
}
