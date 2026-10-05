import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Modelos from "@/components/Modelos";
import Numeros from "@/components/Numeros";
import Tecnologia from "@/components/Tecnologia";
import Experiencia from "@/components/Experiencia";
import ComoComprar from "@/components/ComoComprar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/lib/usePageTitle";

export default function Classica() {
  usePageTitle("SPAs Jacuzzi® | Bem-estar e luxo no seu espaço");
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Modelos />
        <Numeros />
        <Tecnologia />
        <Experiencia />
        <ComoComprar />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
