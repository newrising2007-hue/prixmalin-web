import Link from "next/link";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  note?: string;
};

export default function AffiliateCtaBlock({
  title = "Cartes cadeaux et abonnements gaming",
  subtitle = "Offres utiles, navigation rapide, liens traçables.",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  note = "Certains liens peuvent être affiliés (sans surcoût).",
}: Props) {
  return (
    <section className="bg-gray-100 rounded-2xl p-6 text-center space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={primaryHref}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          {primaryLabel}
        </Link>

        <Link
          href={secondaryHref}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          {secondaryLabel}
        </Link>
      </div>

      <p className="text-xs text-gray-500">{note}</p>

    </section>
  );
}
