import Hero from "./components/Hero";
import ProductDescription from "./sections/ProductDescription";
import CaseStudy from "./sections/CaseStudy";
import Features from "./sections/Features";
import Specifications from "./sections/Specifications";
import DarkBand from "./sections/DarkBand";
import Faq from "./sections/Faq";
import CtaBand from "./sections/CtaBand";
import ContactForm from "./sections/ContactForm";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-bg font-sans text-foreground antialiased selection:bg-brand-blue selection:text-white">
      <Hero />
      <main>
        <ProductDescription />
        <CaseStudy />
        <Features />
        <Specifications />
        <DarkBand />
        <Faq />
        <CtaBand />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
