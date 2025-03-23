import { motion } from "framer-motion";

const Faq = () => {
  return (
    <div>
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our blockchain ticketing
              platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                q: "What makes NFT tickets better than traditional tickets?",
                a: "NFT tickets provide unmatched security through blockchain verification, eliminating counterfeiting. They also enable royalties for event organizers on resales and remain as digital collectibles after the event.",
              },
              {
                q: "Do I need cryptocurrency to purchase tickets?",
                a: "Yes, you'll need ETH in your digital wallet to purchase tickets. We support popular wallets like MetaMask, Coinbase Wallet, and WalletConnect.",
              },
              {
                q: "How do I verify my ticket at the event?",
                a: "Each NFT ticket contains a unique QR code that can be scanned at the venue entrance. Simply present your digital wallet app with the NFT ticket for verification.",
              },
              {
                q: "Can I transfer or resell my ticket?",
                a: "Yes, you can transfer your NFT ticket to another wallet or resell it on our marketplace. A percentage of resales goes back to event organizers as royalties.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="mb-6 bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faq
