import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Productos from "./views/Productos";
import Carrito from "./views/Carrito";
import Login from "./views/Login";
import Registro from "./views/Register";
import ChatBubble from "./components/ChatBubble";
import PerfilUsuario from "./views/PerfilUsuario";
import AdminPanel from "./views/AdminPanel";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<div style={{ color: "white", padding: "40px" }}>Página no encontrada</div>} />
        </Routes>
        <ChatBubble />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;