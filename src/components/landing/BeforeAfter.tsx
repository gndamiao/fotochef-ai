import { Button } from "@/components/ui/button";

const pairs = [
  {
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    legenda: "Pizza Margherita — Restaurante Don Carlo, SP",
  },
  {
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    legenda: "Pasta Carbonara — Trattoria Bella, RJ",
  },
  {
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    legenda: "Sushi Premium — Hikari Sushi Bar, POA",
  },
  {
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    legenda: "Bife Ancho — Parrilla Sur, Curitiba",
  },
  {
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    legenda: "Salada Tropical — Bistrô Verde, BH",
  },
  {
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
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
                    src={pair.img}
                    alt="Antes"
                    className="w-full aspect-square object-cover saturate-[0.4] brightness-[0.65]"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-destructive/80 text-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                    ANTES
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-primary/30">
                  <img
                    src={pair.img}
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
