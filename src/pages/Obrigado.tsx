import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const timeline = [
  { icon: "✅", title: "Pagamento confirmado", time: "Agora mesmo", status: "done" },
  { icon: "📧", title: "E-mail com link de upload", time: "Chegando em breve", status: "active" },
  { icon: "📸", title: "Você envia suas fotos", time: "Após receber o link", status: "pending" },
  { icon: "🤖", title: "IA processa suas fotos", time: "Em até 24h", status: "pending" },
  { icon: "🎉", title: "Fotos prontas no e-mail", time: "Após processamento", status: "pending" },
];

const motivosFalha = [
  "Saldo insuficiente no cartão",
  "Dados do cartão digitados incorretamente",
  "Cartão não habilitado para compras online",
  "Limite de compras atingido",
];

const Obrigado = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mpStatus = searchParams.get("collection_status") || searchParams.get("status") || "approved";
  const status = mpStatus === "null" ? "approved" : mpStatus;
  const token = searchParams.get("payment_id") || searchParams.get("token") || "";
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
          <span className="font-bold text-primary">Belo</span>
          <span className="italic text-foreground">Prato</span>
        </a>
      </header>

      <div className="max-w-xl mx-auto px-4 py-16">

        {/* ── FALHA ── */}
        {status === "failed" && (
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="font-playfair text-2xl font-bold text-destructive mb-3">
              Pagamento não realizado
            </h1>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              Não conseguimos processar seu pagamento. Isso pode ter acontecido por alguns motivos:
            </p>

            <div className="bg-secondary border border-border rounded-xl p-5 mb-8 text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-mono">
                Possíveis causas
              </p>
              <ul className="space-y-2">
                {motivosFalha.map((motivo) => (
                  <li key={motivo} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive flex-shrink-0 mt-0.5">·</span>
                    {motivo}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/#pacotes"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-sm inline-block mb-4"
            >
              Tentar novamente →
            </a>
            <p className="text-muted-foreground text-xs">
              Problema persistindo?{" "}
              <a href="mailto:contato@beloprato.com" className="text-primary underline">
                Fale conosco
              </a>
            </p>
          </div>
        )}

        {/* ── PENDENTE ── */}
        {status === "pending" && (
          <div className="text-center">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-primary text-xs tracking-wider uppercase mb-2 font-mono">
              Aguardando confirmação
            </p>
            <h1 className="font-playfair text-2xl font-bold mb-3">
              Seu pagamento está sendo processado
            </h1>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              Pagamentos via boleto ou Pix podem levar até <strong className="text-foreground">2 dias úteis</strong> para serem confirmados pelo banco.
            </p>

            <div className="bg-secondary border border-border rounded-xl p-5 mb-8 text-left space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg flex-shrink-0">1.</span>
                <div>
                  <p className="text-sm text-foreground font-bold mb-0.5">Pague o boleto ou Pix</p>
                  <p className="text-xs text-muted-foreground">Verifique seu e-mail ou o app do Mercado Pago para acessar o código.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg flex-shrink-0">2.</span>
                <div>
                  <p className="text-sm text-foreground font-bold mb-0.5">Aguarde a confirmação</p>
                  <p className="text-xs text-muted-foreground">Assim que o banco confirmar, você receberá um e-mail com o link para enviar suas fotos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-lg flex-shrink-0">3.</span>
                <div>
                  <p className="text-sm text-foreground font-bold mb-0.5">Envie suas fotos</p>
                  <p className="text-xs text-muted-foreground">O link chegará automaticamente após a confirmação. Não é necessário fazer nada agora.</p>
                </div>
          </div>
            </div>

            <p className="text-muted-foreground text-xs">
              Dúvidas?{" "}
              <a href="mailto:contato@beloprato.com" className="text-primary underline">
                contato@beloprato.com
              </a>
            </p>
          </div>
        )}

        {/* ── APROVADO ── */}
        {status === "approved" && (
          <>
            <div className="text-center mb-12">
              <div className="text-5xl mb-4 animate-pulse-slow">🎊</div>
              <p className="text-primary text-xs tracking-wider uppercase mb-2">Pagamento confirmado</p>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-3">
                Bem-vindo ao Belo Prato!
              </h1>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                Você receberá em breve um e-mail com um link exclusivo para enviar suas fotos. Fique de olho na caixa de entrada!
              </p>
              {token && countdown > 0 && (
                <p className="text-primary text-sm font-bold animate-pulse">
                  Redirecionando em {countdown}...
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="relative pl-8">
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
                Dúvidas? Escreva para{" "}
                <span className="text-primary">contato@beloprato.com.br</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Obrigado;