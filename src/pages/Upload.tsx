import { useState, useEffect, useRef, useCallback } from "react";

type Estado = "validando" | "invalido" | "pronto" | "enviando" | "sucesso" | "erro";

const Upload = () => {
  const [estado, setEstado] = useState<Estado>("validando");
  const [token, setToken] = useState("");
  const [qtd, setQtd] = useState(5);
  const [fotos, setFotos] = useState<File[]>([]);
  const [progresso, setProgresso] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const pacoteNome = qtd >= 30 ? "Premium" : qtd >= 15 ? "Profissional" : "Básico";

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const t = params.get("token");
  if (!t) {
    setEstado("invalido");
    return;
  }
  setToken(t);

  fetch(`/api/orderinfo?token=${t}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error || !data.photos_qty) {
        setEstado("invalido");
        return;
      }
      if (data.status !== "waiting_upload") {
        setEstado("invalido");
        return;
      }
      setQtd(data.photos_qty);
      setEstado("pronto");
    })
    .catch(() => setEstado("invalido"));
}, []);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type) && f.size <= 10 * 1024 * 1024
    );
    setFotos((prev) => {
      const combined = [...prev, ...valid];
      return combined.slice(0, qtd);
    });
  }, [qtd]);

  const removePhoto = (index: number) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setEstado("enviando");
    setProgresso(0);
    const interval = setInterval(() => {
      setProgresso((p) => Math.min(p + 2, 88));
    }, 100);

    try {
      const fotosBase64 = await Promise.all(
        fotos.map(
          (f) =>
            new Promise<{ base64: string; nome: string }>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve({ base64: reader.result as string, nome: f.name });
              reader.readAsDataURL(f);
            })
        )
      );

      const uploadUrl = import.meta.env.VITE_N8N_UPLOAD_URL;
      if (uploadUrl) {
        await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, fotos: fotosBase64 }),
        });
      }

      clearInterval(interval);
      setProgresso(100);
      setTimeout(() => setEstado("sucesso"), 500);
    } catch {
      clearInterval(interval);
      setEstado("erro");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-4 py-4 flex items-center justify-between">
        <a href="/" className="font-playfair text-xl">
          <span className="font-bold text-primary">Belo</span>
          <span className="italic text-foreground">Prato</span>
        </a>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Sistema ativo
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {estado === "validando" && (
          <div className="text-center py-20">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-muted-foreground">Validando link...</p>
          </div>
        )}

        {estado === "invalido" && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="font-playfair text-2xl font-bold mb-2">Link inválido</h2>
            <p className="text-muted-foreground">Este link de upload não é válido ou já expirou.</p>
          </div>
        )}

        {estado === "pronto" && (
          <>
            <div className="text-center mb-8">
              <p className="text-primary text-xs tracking-wider uppercase mb-2">Passo 2 de 4</p>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-3">
                Envie suas fotos e aguarde a <em className="text-primary">mágica</em>
              </h1>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Selecione as fotos dos seus pratos. Nossa IA vai transformá-las em imagens profissionais.
              </p>
            </div>

            {/* Package bar */}
            <div className="flex items-center justify-between bg-secondary rounded-lg p-4 mb-6 border border-border">
              <span className="text-sm text-muted-foreground">Pacote {pacoteNome}</span>
              <span className="font-playfair text-2xl font-bold text-primary">{qtd} fotos</span>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {["📱 Use boa iluminação", "🍽️ Centralize o prato", "📐 Foto horizontal", "🚫 Sem filtros"].map((tip) => (
                <div key={tip} className="bg-secondary rounded-md p-3 text-xs text-muted-foreground border border-border">
                  {tip}
                </div>
              ))}
            </div>

            {/* Dropzone */}
            <div
              className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary/50 transition-colors mb-6"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            >
              <div className="text-4xl mb-3">📷</div>
              <p className="text-foreground text-sm mb-1">Arraste suas fotos aqui</p>
              <p className="text-muted-foreground text-xs">ou clique para selecionar · JPEG, PNG, WebP até 10MB</p>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {fotos.length >= qtd && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive text-center mb-6">
                Limite de {qtd} fotos atingido
              </div>
            )}

            {/* Preview grid */}
            {fotos.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-6">
                {fotos.map((foto, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img
                      src={URL.createObjectURL(foto)}
                      alt={foto.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-background/80 rounded-full text-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={fotos.length === 0}
              className={`w-full py-4 rounded-lg font-bold text-sm transition-all ${
                fotos.length > 0
                  ? "bg-primary text-primary-foreground hover:bg-accent shadow-lg shadow-primary/20"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              }`}
            >
              {fotos.length === 0
                ? "Selecione ao menos 1 foto"
                : `Enviar ${fotos.length} foto(s) para processamento`}
            </button>
          </>
        )}

        {estado === "enviando" && (
          <div className="text-center py-20">
            <div className="animate-spin text-4xl mb-4">🤖</div>
            <h2 className="font-playfair text-2xl font-bold mb-4">Enviando suas fotos...</h2>
            <div className="w-full bg-secondary rounded-full h-3 mb-2 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
            <p className="text-muted-foreground text-sm">{progresso}%</p>
          </div>
        )}

        {estado === "sucesso" && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-playfair text-2xl font-bold mb-3">Fotos enviadas com sucesso!</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Nossa IA já começou a processar. Você receberá as fotos profissionais no seu e-mail em até 24h.
            </p>
            <a href="/" className="text-primary text-sm hover:underline">← Voltar ao início</a>
          </div>
        )}

        {estado === "erro" && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="font-playfair text-2xl font-bold mb-3 text-destructive">Erro no envio</h2>
            <p className="text-muted-foreground text-sm mb-6">Algo deu errado. Tente novamente.</p>
            <button
              onClick={() => setEstado("pronto")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold text-sm"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
