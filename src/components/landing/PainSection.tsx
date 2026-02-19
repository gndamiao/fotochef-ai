import { Button } from "@/components/ui/button";

const dores = [
  "Fotos tiradas com celular sem iluminação",
  "Cardápio do iFood e Google Maps com imagens desbotadas",
  "Fotógrafo profissional cobra R$2.000+ e demora semanas",
  "Cliente vai no concorrente só pela foto do prato",
  "Você sabe que o prato é bom, mas a foto não convence ninguém",
];

const PainSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[800px] mx-auto px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight mb-8">
          Você sabe que sua comida é boa. O problema é que as fotos não mostram isso.
        </h2>

        <p className="text-muted-foreground text-center text-base leading-relaxed mb-10 max-w-[600px] mx-auto">
          Seu cliente abre o Google Maps, vê uma foto escura e sem apelo do seu prato — e vai no concorrente. Não porque a comida dele é melhor. Mas porque a <strong className="text-foreground">FOTO</strong> dele vende mais.
        </p>

        <div className="space-y-4 mb-10">
          {dores.map((dor) => (
            <div key={dor} className="flex items-start gap-3">
              <span className="text-destructive text-lg flex-shrink-0">❌</span>
              <span className="text-muted-foreground">{dor}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-foreground text-lg font-playfair italic mb-8">
          E se você pudesse ter fotos profissionais hoje, por menos de R$10 por imagem?
        </p>

        <div className="text-center">
          <a href="#como-funciona">
            <Button variant="gold-outline" size="lg">
              Ver como funciona ↓
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
