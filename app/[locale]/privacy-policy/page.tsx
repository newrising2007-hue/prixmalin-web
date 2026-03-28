export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-800 bg-white shadow-sm my-10 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4 text-green-700">Politique de confidentialité / Privacy Policy</h1>
      <p className="mb-4"><strong>Dernière mise à jour / Last Updated: 27 mars 2026</strong></p>

      <p className="mb-6">
        PrixMalin.ca et l'application mobile PrixMalin respectent votre vie privée. Ce document explique quelles données sont collectées et comment elles sont utilisées.<br /><br />
        <em>PrixMalin.ca and the PrixMalin mobile app respect your privacy. This document explains what data is collected and how it is used.</em>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">1. Données collectées / Data Collected</h2>
      <p className="mb-3"><strong>Localisation GPS</strong> — L'application mobile demande votre position pour afficher les commerces et restaurants près de vous. Cette donnée n'est jamais stockée sur nos serveurs et n'est utilisée qu'en temps réel lors de votre recherche.</p>
      <p className="mb-3"><em>The mobile app requests your location to display nearby businesses and restaurants. This data is never stored on our servers and is only used in real time during your search.</em></p>

      <p className="mb-3"><strong>Recherches récentes</strong> — Vos dernières recherches sont sauvegardées localement sur votre appareil uniquement (AsyncStorage). Elles ne sont jamais transmises à nos serveurs.</p>
      <p className="mb-6"><em>Your recent searches are saved locally on your device only (AsyncStorage). They are never transmitted to our servers.</em></p>

      <h2 className="text-xl font-semibold mt-8 mb-4">2. Données NON collectées / Data NOT Collected</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Aucun compte utilisateur requis / No user account required</li>
        <li>Aucune donnée personnelle identifiable / No personally identifiable information</li>
        <li>Aucune donnée vendue à des tiers / No data sold to third parties</li>
        <li>Aucun suivi publicitaire / No advertising tracking</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">3. Divulgation d'affiliation / Affiliate Disclosure</h2>
      <p className="mb-6">
        PrixMalin.ca participe à des programmes d'affiliation (Amazon Associates, FlexOffers). Si vous cliquez sur un lien et effectuez un achat, nous pouvons recevoir une commission sans frais supplémentaires pour vous.<br /><br />
        <em>PrixMalin.ca participates in affiliate programs (Amazon Associates, FlexOffers). If you click a link and make a purchase, we may earn a commission at no extra cost to you.</em>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies et analytique / Cookies & Analytics</h2>
      <p className="mb-6">
        Le site web utilise des cookies standards et Google Analytics pour analyser le trafic et améliorer l'expérience utilisateur. Aucune information personnelle identifiable n'est partagée avec des tiers.<br /><br />
        <em>The website uses standard cookies and Google Analytics to analyze traffic and improve user experience. No personally identifiable information is shared with third parties.</em>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">5. Rétention des données / Data Retention</h2>
      <p className="mb-6">
        Nous ne stockons aucune donnée personnelle sur nos serveurs. Les données de localisation sont utilisées uniquement en temps réel et immédiatement supprimées. Les recherches récentes sont stockées localement sur votre appareil et peuvent être effacées à tout moment via les paramètres de l'application.<br /><br />
        <em>We do not store any personal data on our servers. Location data is used only in real time and immediately discarded. Recent searches are stored locally on your device and can be cleared at any time through the app settings.</em>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">6. Suppression des données / Data Deletion</h2>
      <p className="mb-6">
        Puisque nous ne collectons aucune donnée personnelle identifiable, il n'existe aucune donnée à supprimer sur nos serveurs. Pour effacer vos recherches récentes, désinstallez simplement l'application ou videz le cache dans les paramètres de votre appareil. Pour toute demande, contactez-nous à info@prixmalin.ca.<br /><br />
        <em>Since we do not collect any personally identifiable data, there is no data to delete from our servers. To clear your recent searches, simply uninstall the app or clear the cache in your device settings. For any request, contact us at info@prixmalin.ca.</em>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">7. Partage avec des tiers / Third-Party Sharing</h2>
      <p className="mb-6">
        Aucune donnée personnelle n'est vendue, louée ou partagée avec des tiers, à l'exception de Google Analytics (trafic web anonymisé). Les liens d'affiliation (Amazon Associates, FlexOffers) peuvent déposer leurs propres cookies lors d'un clic — consultez leurs politiques respectives.<br /><br />
        <em>No personal data is sold, rented, or shared with third parties, except Google Analytics (anonymized web traffic). Affiliate links (Amazon Associates, FlexOffers) may set their own cookies upon click — please refer to their respective policies.</em>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact</h2>
      <p className="mb-6">
        Pour toute question concernant cette politique / For any questions regarding this policy:<br />
        <strong>Email:</strong> <a href="mailto:info@prixmalin.ca" className="text-green-700 hover:underline">info@prixmalin.ca</a>
      </p>

      <a href="/" className="text-green-700 hover:underline">← Retour à l'accueil / Back to Home</a>
    </div>
  );
}
