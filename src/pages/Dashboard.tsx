import { useState } from "react";
import { Button } from "@/components/ui/button";

type StatusType = "aguardando_upload" | "processando" | "entregue";

interface PedidoData {
  status: StatusType;
  restaurante: string;
  pacote: string;
  qtdFotos: number;
  criadoEm: string;
}

const statusMap: Record<StatusType, { label: string; icon: string; color: string; progresso: number }> = {
  aguardando_upload: { label: "Aguardando suas fotos", icon: "📸", color: "hsl(45, 80%, 50%)", progresso: 25 },
  processando: { label: "IA processando", icon: "🤖", color: "hsl(210, 80%, 55%)", progresso: 70 },
  entregue: { label: "Fotos entregues!", icon: "✅", color: "hsl(120, 60%, 45%)", progresso: 100 },
};

const Dashboard = () => {
  const [tokenInput, setTokenInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pedido, setPedido] = useState<PedidoData | null>(null);
  const [erro, setErro] = useState("");

  const consultar = async () => {
    if (!tokenInput.trim()) return;
    setLoading(true);
    setErro("");
    setPedido(null);

    try {
      const res = await fetch(`/api/status-pedido?token=${encodeURIComponent(tokenInput)}`);
      if (!res.ok) {
        setErro("Pedido não encontrado. Verifique o token.");
        return;
      }
      const data = await res.json();
      setPedido(data);
    } catch {
      setErro("Erro ao consultar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const info = pedido ? statusMap[pedido.status] || statusMap.aguardando_upload : null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-4 py-4 flex items-center justify-between">
        <a href="/" className="font-playfair text-xl">
          <span className="font-bold text-primary">Belo</span>
          <span className="italic text-foreground">Prato</span>
        </a>
        <a href="/#pacotes">
          <Button variant="gold-outline" size="sm">Novo pedido</Button>
        </a>
      </header>

      <div className="max-w-xl mx-auto px-4 py-16">
        <h1 className="font-playfair text-3xl font-bold text-center mb-8">Status do pedido</h1>

        {/* Search */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Cole seu token aqui..."
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && consultar()}
            className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button variant="gold" onClick={consultar} disabled={loading}>
            {loading ? "..." : "Consultar"}
          </Button>
        </div>

        {erro && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center text-sm text-destructive mb-8">
            {erro}
          </div>
        )}

        {pedido && info && (
          <div className="space-y-6">
            {/* Status card */}
            <div className="rounded-xl p-6 bg-secondary border-2" style={{ borderColor: info.color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{info.icon}</span>
                <div>
                  <div className="text-xs text-muted-foreground">Status atual</div>
                  <div className="font-bold text-lg" style={{ color: info.color }}>{info.label}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${info.progresso}%`, backgroundColor: info.color }}
                />
              </div>
              <p className="text-right text-xs text-muted-foreground mt-1">{info.progresso}%</p>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between gap-2 text-center">
              {(["aguardando_upload", "processando", "entregue"] as StatusType[]).map((s, i) => {
                const sm = statusMap[s];
                const isComplete = info.progresso >= sm.progresso;
                return (
                  <div key={s} className="flex-1">
                    <div className={`text-2xl mb-1 ${isComplete ? "" : "opacity-30"}`}>{sm.icon}</div>
                    <div className={`text-[10px] ${isComplete ? "text-foreground" : "text-muted-foreground"}`}>
                      {sm.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Details card */}
            <div className="bg-secondary rounded-lg p-5 border border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Restaurante</span>
                <span className="text-foreground">{pedido.restaurante}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pacote</span>
                <span className="text-foreground">{pedido.pacote}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fotos</span>
                <span className="text-foreground">{pedido.qtdFotos}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Data do pedido</span>
                <span className="text-foreground">
                  {new Date(pedido.criadoEm).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Precisa de ajuda? <span className="text-primary">contato@beloprato.com.br</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
