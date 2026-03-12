const semItems = [
  "Fotos amadoras no cardápio",
  "Cliente desiste só de ver a foto",
  "Fotógrafo cobra R$1.500 a R$3.000",
  "Espera de semanas pelo resultado",
  "Nota baixa no Google Maps",
];

const comItems = [
  "Fotos profissionais em até 24h",
  "Cliente compra pela foto antes de perguntar o preço",
  "A partir de R$97 por pacote completo",
  "Resultado entregue no e-mail",
  "Mais avaliações positivas e nota mais alta",
];

const Comparison = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sem */}
          <div className="rounded-xl p-8 border border-destructive/20" style={{ background: "hsl(0, 30%, 4%)" }}>
            <div className="text-4xl mb-4">❌</div>
            <h3 className="font-playfair text-xl font-bold mb-6 text-destructive">Sem Belo Prato</h3>
            <ul className="space-y-3">
              {semItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive flex-shrink-0">❌</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Com */}
          <div className="rounded-xl p-8 border border-green-600/20" style={{ background: "hsl(120, 30%, 4%)" }}>
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-playfair text-xl font-bold mb-6 text-green-500">Com Belo Prato</h3>
            <ul className="space-y-3">
              {comItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
