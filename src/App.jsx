import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SmartphoneDetail from "./components/SmartphoneDetail";
import NavBar from "./components/NavBar";
import Compare from "./pages/Compare";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smartphones/:id" element={<SmartphoneDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
