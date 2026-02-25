import Image from "next/image"
import { Deal } from "@/types/deal"

type Props = {
  deal: Deal
}

export default function DealCard({ deal }: Props) {
  return (
    <article className="rounded-2xl border bg-white/90 p-4 shadow-sm shadow-blue-500/10 transition-shadow hover:shadow-md hover:shadow-blue-500/20">
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={deal.image}
          alt={deal.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain"
          priority={false}
        />
      </div>

      <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug">
        {deal.title}
      </h3>

      <div className="mb-4 flex items-end justify-between gap-3">
        <p className="text-xl font-bold text-green-700">
          {deal.price.toFixed(2)} {deal.currency}
        </p>

        <span className="rounded-full border px-2 py-1 text-xs text-gray-600">
          {deal.platform}
        </span>
      </div>

      <a
        href={deal.affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="block w-full rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-green-500/20 transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-green-700 hover:shadow-green-500/40"
        aria-label={`Voir l’offre: ${deal.title}`}
      >
        Voir l’offre
      </a>

      <p className="mt-3 text-xs text-gray-500">
        Lien affilié : PrixMalin peut recevoir une commission, sans coût
        supplémentaire pour vous.
      </p>
    </article>
  )
}
