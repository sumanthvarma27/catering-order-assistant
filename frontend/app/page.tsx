'use client';

import MenuSummary from "../components/MenuSummary";

const RoyalChatInterface = () => {
  return (
    <div className="p-4 text-gray-500">
      Chat interface component is not available — placeholder.
    </div>
  );
};

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfaf5] via-[#faf2e6] to-[#f7ebd7] p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-heading text-copper font-bold tracking-tight mb-2">
          Royal Catering Assistant
        </h1>
        <p className="text-gray-600 text-sm">
          Chat with our AI assistant and review your final catering selections.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white/80 rounded-3xl border border-amber-100 shadow-royal p-4">
          <RoyalChatInterface />
        </section>

        <section className="bg-white/80 rounded-3xl border border-amber-100 shadow-royal p-4 flex flex-col justify-between">
          <MenuSummary />
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Royal Biryani House — Catering Division
      </footer>
    </div>
  );
}
