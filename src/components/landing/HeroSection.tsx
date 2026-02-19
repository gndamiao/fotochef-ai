import { Button } from "@/components/ui/button";

const IMAGES = {
  restaurante: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
  hamburger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: `url(${IMAGES.restaurante})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      <div className="relative z-10 max-w-[700px] mx-auto px-4 text-center py-20">
        {/* Badge */}
        <div className="inline-block mb-8 px-5 py-2 border border-primary/40 rounded-full text-sm text-primary tracking-wider">
          ✦ Mais de 200 restaurantes atendidos ✦
        </div>

        {/* H1 */}
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-[64px] leading-[1.1] font-black mb-6">
          Seus pratos merecem fotos que fazem o cliente{" "}
          <em className="text-primary">salivar</em>{" "}
          antes de sentar à mesa
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base max-w-[500px] mx-auto mb-8 leading-relaxed">
          Transformamos qualquer foto amadora do seu cardápio em imagem profissional com IA. Em até 24h. Sem fotógrafo. Sem estúdio. Sem enrolação.
        </p>

        {/* Social proof strip */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-10 text-sm">
          <div className="text-center">
            <div className="text-primary">⭐⭐⭐⭐⭐</div>
            <div className="text-muted-foreground mt-1">200+ restaurantes</div>
          </div>
          <div className="text-center">
            <div className="text-xl">📸</div>
            <div className="text-muted-foreground mt-1">24h de entrega</div>
          </div>
          <div className="text-center">
            <div className="text-xl">💰</div>
            <div className="text-muted-foreground mt-1">A partir de R$97</div>
          </div>
        </div>

        {/* CTA */}
        <a href="#pacotes">
          <Button variant="gold-lg" size="xl" className="w-full sm:w-auto">
            QUERO FOTOS PROFISSIONAIS AGORA →
          </Button>
        </a>

        <p className="text-muted-foreground text-xs mt-4">
          7 dias de garantia · Pagamento seguro · Resultado garantido
        </p>

        {/* Before/After */}
        <div className="grid grid-cols-2 gap-4 mt-12">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={IMAGES.hamburger}
              alt="Hambúrguer antes"
              className="w-full aspect-[4/3] object-cover saturate-[0.4] brightness-[0.6]"
            />
            <span className="absolute top-3 left-3 bg-destructive/80 text-foreground text-xs font-bold px-3 py-1 rounded">
              ANTES
            </span>
          </div>
          <div className="relative rounded-lg overflow-hidden border border-primary/30">
            <img
              src={IMAGES.hamburger}
              alt="Hambúrguer depois"
              className="w-full aspect-[4/3] object-cover"
            />
            <span className="absolute top-3 left-3 bg-green-600/80 text-foreground text-xs font-bold px-3 py-1 rounded">
              DEPOIS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
