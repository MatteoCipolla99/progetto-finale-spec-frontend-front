import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SmartphoneDetail from "./components/SmartphoneDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smartphones/:id" element={<SmartphoneDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
