const stats = [
  { value: "200+", label: "restaurantes atendidos" },
  { value: "4.800+", label: "fotos entregues" },
  { value: "24h", label: "tempo médio de entrega" },
  { value: "4.9★", label: "avaliação média" },
];

const ProofStrip = () => {
  return (
    <section className="bg-card border-y border-border py-12">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-muted-foreground text-sm mb-8">
          Restaurantes que já transformaram seu cardápio:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-playfair text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
