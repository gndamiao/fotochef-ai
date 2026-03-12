import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PACOTES } from "@/lib/config";

const PricingSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ nome: "", email: "", restaurante: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (pacoteId: string) => {
    if (!form.nome || !form.email || !form.restaurante) return;
    setLoading(true);
    try {
      const res = await fetch("/api/criar-pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacote: pacoteId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro no servidor");
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("URL de checkout não retornada");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pacotes" className="py-20 md:py-28 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          Escolha seu pacote e transforme seu cardápio hoje
        </h2>
        <p className="text-center text-muted-foreground mb-14">
          Sem mensalidade. Pague uma vez, receba suas fotos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACOTES.map((pacote) => (
            <div
              key={pacote.id}
              className={`rounded-xl p-6 border transition-all duration-300 ${
                pacote.destaque
                  ? "border-primary bg-[hsl(37,20%,5%)] shadow-lg shadow-primary/10"
                  : "border-border bg-secondary"
              }`}
            >
              {pacote.destaque && (
                <div className="text-xs font-bold text-primary mb-3 tracking-wider">
                  ⭐ MAIS POPULAR
                </div>
              )}
              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                {pacote.nome}
              </div>
              <div className="font-playfair text-4xl font-bold text-foreground mb-1">
                R${pacote.preco}
              </div>
              <div className="text-primary text-sm font-bold mb-3">
                {pacote.fotos} fotos profissionais
              </div>
              <p className="text-muted-foreground text-sm mb-4">{pacote.descricao}</p>
              <ul className="space-y-2 mb-6">
                {pacote.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {expandedId === pacote.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Nome do restaurante"
                    value={form.restaurante}
                    onChange={(e) => setForm({ ...form, restaurante: e.target.value })}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button
                    variant="gold"
                    className="w-full"
                    disabled={loading || !form.nome || !form.email || !form.restaurante}
                    onClick={() => handleSubmit(pacote.id)}
                  >
                    {loading ? "Processando..." : "Pagar agora →"}
                  </Button>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="w-full text-muted-foreground text-xs hover:text-foreground transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <Button
                  variant={pacote.destaque ? "gold" : "gold-outline"}
                  className="w-full"
                  onClick={() => setExpandedId(pacote.id)}
                >
                  Contratar agora →
                </Button>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          🛡️ 7 dias de garantia. Se não gostar, devolvemos seu dinheiro. Sem perguntas.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
