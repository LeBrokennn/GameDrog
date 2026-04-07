import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Productos from "./views/Productos";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";
import Carrito from "./views/Carrito";
import "./App.css"; // 👈 IMPORTANTE

function App() {
  return (
    <AppProvider>
      <div className="App"> {/* 👈 AGREGA ESTO */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;