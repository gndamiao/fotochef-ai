import { Button } from "@/components/ui/button";

const pairs = [
  {
    antes: "/images/BeloPrato01_Antes.jpeg",
    depois: "/images/BeloPrato01_Depois.jpeg",
    legenda: "Pizza Margherita — Restaurante Don Carlo, SP",
  },
  {
    antes: "/images/BeloPrato02_Antes.webp",
    depois: "/images/BeloPrato02_Depois.jpeg",
    legenda: "Pasta Carbonara — Trattoria Bella, RJ",
  },
  {
    antes: "/images/BeloPrato03_Antes.webp",
    depois: "/images/BeloPrato03_Depois.png",
    legenda: "Sushi Premium — Hikari Sushi Bar, POA",
  },
  {
    antes: "/images/BeloPrato04_Antes.jpeg",
    depois: "/images/BeloPrato04_Depois.jpeg",
    legenda: "Bife Ancho — Parrilla Sur, Curitiba",
  },
  {
    antes: "/images/BeloPrato05_Antes.jpeg",
    depois: "/images/BeloPrato05_Depois.jpeg",
    legenda: "Salada Tropical — Bistrô Verde, BH",
  },
  {
    antes: "/images/BeloPrato06_Antes.jpeg",
    depois: "/images/BeloPrato06_Depois.jpeg",
    legenda: "Petit Gâteau — Confeitaria Doce Flor, SP",
  },
];

const BeforeAfter = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          Veja a transformação com seus próprios olhos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pairs.map((pair) => (
            <div key={pair.legenda}>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={pair.antes}
                    alt="Antes"
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-destructive/80 text-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                    ANTES
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-primary/30">
                  <img
                    src={pair.depois}
                    alt="Depois"
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-green-600/80 text-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                    DEPOIS ✓
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-2 text-center">{pair.legenda}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#pacotes">
            <Button variant="gold-lg" size="xl">
              QUERO TRANSFORMAR MEUS PRATOS →
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
