import { Button } from "@/components/ui/button";

const steps = [
  { num: "01", icon: "🛒", title: "Escolha seu pacote", desc: "Selecione a quantidade de fotos que precisa" },
  { num: "02", icon: "📸", title: "Envie suas fotos", desc: "Você recebe um link exclusivo por e-mail para upload" },
  { num: "03", icon: "🤖", title: "IA faz a mágica", desc: "Nossa IA transforma cada foto com iluminação e estilo profissional" },
  { num: "04", icon: "📧", title: "Receba o resultado", desc: "Fotos prontas no seu e-mail em até 24h" },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16">
          Simples assim. 4 passos e suas fotos estão prontas.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step) => (
            <div key={step.num} className="text-center relative">
              <div className="font-playfair text-4xl font-bold text-primary mb-2">{step.num}</div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-playfair text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="#pacotes">
            <Button variant="gold-lg" size="xl">
              COMEÇAR AGORA →
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
