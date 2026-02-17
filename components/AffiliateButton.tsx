type Props = {
  href: string;
  label?: string;
  className?: string;
};

export default function AffiliateButton({
  href,
  label = "Voir l’offre",
  className = "",
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored"
      className={`inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg shadow transition-colors duration-200 ${className}`}
    >
      {label}
    </a>
  );
}
