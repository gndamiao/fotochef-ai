import { useState } from "react";
import { Button } from "@/components/ui/button";

const CHEF_IMG = "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=1200";

const faqs = [
  {
    q: "As fotos vão parecer com o prato real?",
    a: "Sim. A IA mantém todos os ingredientes e apenas melhora iluminação, cores e composição.",
  },
  {
    q: "Em quanto tempo recebo as fotos?",
    a: "Em até 24 horas após o envio das suas fotos originais.",
  },
  {
    q: "Que tipo de foto devo enviar?",
    a: "Qualquer foto tirada com celular. Quanto melhor a iluminação, melhor o resultado.",
  },
  {
    q: "Posso usar no Google Maps, iFood e Instagram?",
    a: "Sim. Você recebe em alta resolução com direito de uso comercial completo.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Você tem 7 dias de garantia total. Devolvemos 100% do valor sem perguntas.",
  },
];

const ClosingSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Final CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: `url(${CHEF_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background" />
        <div className="relative z-10 max-w-[700px] mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Cada dia com foto ruim é um cliente que vai pro concorrente.
          </h2>
          <p className="text-muted-foreground text-base mb-10">
            Mais de 200 restaurantes já transformaram seu cardápio. Quanto tempo você vai esperar?
          </p>
          <a href="#pacotes">
            <Button variant="gold-lg" size="xl">
              QUERO COMEÇAR AGORA →
            </Button>
          </a>
          <p className="text-muted-foreground text-xs mt-4">
            ✓ Entrega em 24h &nbsp;&nbsp; ✓ 7 dias de garantia &nbsp;&nbsp; ✓ Pagamento seguro
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center mb-12">
            Dúvidas frequentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-foreground text-sm font-medium">{faq.q}</span>
                  <span className="text-muted-foreground text-lg ml-4">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="font-playfair text-xl">
            <span className="font-bold text-primary">Belo</span>
            <span className="italic text-foreground">Prato</span>
          </a>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Política de privacidade</span>
            <span>·</span>
            <span>Termos de uso</span>
            <span>·</span>
            <span>contato@beloprato.com.br</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 Belo Prato. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default ClosingSection;
