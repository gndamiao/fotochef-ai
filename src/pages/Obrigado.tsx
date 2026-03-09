import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const timeline = [
  { icon: "✅", title: "Pagamento confirmado", time: "Agora mesmo", status: "done" },
  { icon: "📧", title: "E-mail com link de upload", time: "Chegando em breve", status: "active" },
  { icon: "📸", title: "Você envia suas fotos", time: "Após receber o link", status: "pending" },
  { icon: "🤖", title: "IA processa suas fotos", time: "Em até 24h", status: "pending" },
  { icon: "🎉", title: "Fotos prontas no e-mail", time: "Após processamento", status: "pending" },
];

const Obrigado = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status") || "approved";
  const token = searchParams.get("token") || "";
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (status !== "approved" || !token) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate(`/status?token=${encodeURIComponent(token)}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, token, navigate]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-4 py-4">
        <a href="/" className="font-playfair text-xl">
          <span className="font-bold text-primary">Foto</span>
          <span className="italic text-foreground">Chef</span>
        </a>
      </header>

      <div className="max-w-xl mx-auto px-4 py-16">
        {status === "failed" && (
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="font-playfair text-2xl font-bold text-destructive mb-3">
              Pagamento não realizado
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Houve um problema com o pagamento. Você pode tentar novamente.
            </p>
            <a href="/#pacotes" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold text-sm inline-block">
              Tentar novamente
            </a>
          </div>
        )}

        {status === "pending" && (
          <div className="text-center">
            <div className="text-5xl mb-4">⏳</div>
            <h1 className="font-playfair text-2xl font-bold mb-3">Pagamento em análise</h1>
            <p className="text-muted-foreground text-sm">
              Seu pagamento está sendo processado. Você receberá uma confirmação por e-mail assim que for aprovado.
            </p>
          </div>
        )}

        {status === "approved" && (
          <>
            <div className="text-center mb-12">
              <div className="text-5xl mb-4 animate-pulse-slow">🎊</div>
              <p className="text-primary text-xs tracking-wider uppercase mb-2">Pagamento confirmado</p>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-3">
                Bem-vindo ao FotoChef!
              </h1>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Você receberá em breve um e-mail com um link exclusivo para enviar suas fotos. Fique de olho na caixa de entrada!
              </p>
            </div>

            {/* Timeline */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

              {timeline.map((step, i) => (
                <div key={i} className="relative mb-8 last:mb-0">
                  <div
                    className={`absolute left-[-20px] w-6 h-6 rounded flex items-center justify-center text-xs ${
                      step.status === "done"
                        ? "bg-green-600"
                        : step.status === "active"
                        ? "bg-primary border border-primary"
                        : "bg-secondary border border-border"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-sm font-bold ${step.status === "active" ? "text-primary" : "text-foreground"}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-xs">
                Dúvidas? Escreva para <span className="text-primary">contato@fotochef.com.br</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Obrigado;
