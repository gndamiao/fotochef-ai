const depoimentos = [
  {
    texto: "Meu delivery no iFood cresceu 40% depois que troquei as fotos. As pessoas pedem sem nem perguntar o preço.",
    nome: "Carlos M.",
    local: "Hamburgueria Artesanal, BH",
  },
  {
    texto: "Gastei R$197 e em 1 semana já tinha recuperado com os pedidos novos. Melhor investimento que fiz pro restaurante.",
    nome: "Ana Paula R.",
    local: "Restaurante Mediterrâneo, SP",
  },
  {
    texto: "Eu achei que era golpe. Mas as fotos chegaram em menos de 24h e ficaram incríveis. Coloquei no cardápio digital e os comentários mudaram.",
    nome: "Roberto S.",
    local: "Pizzaria da Família, RJ",
  },
  {
    texto: "Atualizar as fotos do Google Maps foi a melhor coisa que fiz. Minha nota subiu de 3.8 pra 4.6 em dois meses.",
    nome: "Fernanda L.",
    local: "Café & Bistrô, Curitiba",
  },
  {
    texto: "Nunca imaginei que uma foto pudesse fazer tanta diferença. Meu prato de camarão virou o mais pedido depois da nova foto.",
    nome: "João Vitor A.",
    local: "Frutos do Mar do João, Recife",
  },
  {
    texto: "Tentei contratar fotógrafo e o orçamento foi R$1.800. Com o FotoChef paguei R$97 e o resultado foi equivalente.",
    nome: "Mariana C.",
    local: "Sushi Bar Hikari, Porto Alegre",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          O que donos de restaurante dizem depois de usar o FotoChef
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {depoimentos.map((dep) => (
            <div
              key={dep.nome}
              className="bg-secondary rounded-lg p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="text-primary text-sm mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                "{dep.texto}"
              </p>
              <div>
                <div className="text-foreground text-sm font-bold">{dep.nome}</div>
                <div className="text-muted-foreground text-xs">{dep.local}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
