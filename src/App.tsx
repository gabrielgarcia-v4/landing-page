import { BrowserRouter, Route, Routes } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import HoverEffects from "@/components/HoverEffects";
import Classica from "@/pages/Classica";
import Wellness from "@/pages/Wellness";

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Classica />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="*" element={<Classica />} />
        </Routes>
        <HoverEffects />
      </SmoothScroll>
    </BrowserRouter>
  );
}
