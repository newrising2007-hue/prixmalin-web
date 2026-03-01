import { redirect } from "next/navigation";
if (process.env.NODE_ENV !== "development") redirect("/");

export default function EnvCheckPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Env check</h1>

      <pre className="mt-4 rounded-lg bg-black/5 p-4">
        {process.env.NEXT_PUBLIC_AMAZON_TAG ?? "MISSING"}
      </pre>
    </main>
  );
}
