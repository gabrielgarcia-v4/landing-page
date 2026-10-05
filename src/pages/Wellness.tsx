import Header from "@/components/Header";
import HeroWellness from "@/components/wellness/HeroWellness";
import Manifesto from "@/components/wellness/Manifesto";
import Pilares from "@/components/wellness/Pilares";
import Rituais from "@/components/wellness/Rituais";
import AguaPura from "@/components/wellness/AguaPura";
import ModelosWellness from "@/components/wellness/ModelosWellness";
import ComoComprar from "@/components/ComoComprar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/lib/usePageTitle";

// Versão wellness: mesmos componentes de base, tema de cores em .theme-wellness (index.css).
export default function Wellness() {
  usePageTitle("SPAs Jacuzzi® | Respire. Bem-estar total no seu espaço");
  return (
    <div className="theme-wellness">
      <Header />
      <main>
        <HeroWellness />
        <Manifesto />
        <Pilares />
        <Rituais />
        <AguaPura />
        <ModelosWellness />
        <ComoComprar />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
