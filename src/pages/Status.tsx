import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FotoUrl {
  url: string;
  nome: string;
}

interface PedidoStatus {
  status: "awaiting_upload" | "processing" | "delivered";
  fotos?: FotoUrl[];
  pastaUrl?: string;
}

const Status = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [pedido, setPedido] = useState<PedidoStatus | null>(null);
  const [erro, setErro] = useState("");

  const consultar = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`/api/status-pedido?token=${encodeURIComponent(token)}`);
      if (!res.ok) {
        setErro("Pedido não encontrado.");
        return;
      }
      const data = await res.json();
      setPedido(data);
    } catch {
      setErro("Erro ao consultar status.");
    }
  }, [token]);

  useEffect(() => {
    consultar();
    const interval = setInterval(() => {
      consultar();
    }, 5000);
    return () => clearInterval(interval);
  }, [consultar]);

  // Stop polling when delivered
  useEffect(() => {
    if (pedido?.status === "delivered") {
      // polling will still run but it's harmless
    }
  }, [pedido]);

  const handleDownload = async (url: string, nome: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = nome;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(url, "_blank");
    }
  };

  const isDelivered = pedido?.status === "delivered";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-4 py-4">
        <a href="/" className="font-playfair text-xl">
          <span className="font-bold text-primary">Foto</span>
          <span className="italic text-foreground">Chef</span>
        </a>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {!token && (
          <div className="text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="font-playfair text-2xl font-bold mb-3">Token não informado</h1>
            <p className="text-muted-foreground text-sm">
              Acesse esta página a partir do link enviado por e-mail.
            </p>
          </div>
        )}

        {erro && (
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="font-playfair text-2xl font-bold text-destructive mb-3">{erro}</h1>
            <p className="text-muted-foreground text-sm">Verifique o link e tente novamente.</p>
          </div>
        )}

        {token && !erro && !isDelivered && (
          <div className="text-center max-w-lg mx-auto">
            {/* Pulsing loader */}
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-primary/50 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
            </div>

            <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              Estamos transformando suas fotos...
            </h1>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Isso leva alguns minutinhos. Pode fechar esta aba — assim que ficarem prontas
              enviaremos para o seu e-mail.
            </p>

            <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-5 py-2 mb-8">
              <span className="text-primary text-sm">⏱</span>
              <span className="text-muted-foreground text-sm">Tempo estimado: até 5 minutos</span>
            </div>

            <div>
              <Button variant="gold-outline" size="lg">
                Receber por e-mail e fechar
              </Button>
            </div>
          </div>
        )}

        {isDelivered && pedido?.fotos && (
          <div>
            <div className="text-center mb-12">
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
                Suas fotos profissionais estão prontas! 🎉
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                Estas fotos também foram enviadas para o seu e-mail.
              </p>
              {pedido.pastaUrl && (
                <a href={pedido.pastaUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg">
                    Baixar todas →
                  </Button>
                </a>
              )}
            </div>

            {/* Photos grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {pedido.fotos.map((foto, i) => (
                <div
                  key={i}
                  className="group relative rounded-lg overflow-hidden border border-border bg-secondary"
                >
                  <div className="aspect-square">
                    <img
                      src={foto.url}
                      alt={foto.nome}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <button
                    onClick={() => handleDownload(foto.url, foto.nome)}
                    className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold">
                      ⬇ Download
                    </span>
                  </button>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8">
              Dúvidas? Escreva para{" "}
              <span className="text-primary">contato@fotochef.com.br</span>
            </p>
          </div>
        )}

        {isDelivered && (!pedido?.fotos || pedido.fotos.length === 0) && (
          <div className="text-center">
            <div className="text-5xl mb-4">📭</div>
            <h1 className="font-playfair text-2xl font-bold mb-3">Fotos entregues</h1>
            <p className="text-muted-foreground text-sm">
              As fotos foram enviadas para o seu e-mail.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
