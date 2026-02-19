import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="font-playfair text-2xl tracking-tight">
          <span className="font-bold text-primary">Foto</span>
          <span className="italic text-foreground">Chef</span>
        </a>
        <a href="#pacotes">
          <Button variant="gold" size="sm">Ver preços</Button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
