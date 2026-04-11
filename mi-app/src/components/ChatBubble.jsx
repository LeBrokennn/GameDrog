import { useState } from "react";
import "../styles/ChatBubble.css";

function ChatBubble() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="chat-widget">
      {abierto && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Soporte GameDrog</span>
            <button onClick={() => setAbierto(false)}>×</button>
          </div>

          <div className="chat-body">
            <p>👋 Hola, ¿en qué te podemos ayudar?</p>
            <p>Puedes revisar productos, ofertas o tu carrito.</p>
          </div>

          <div className="chat-footer">
            <input type="text" placeholder="Escribe un mensaje..." />
            <button>Enviar</button>
          </div>
        </div>
      )}

      <button className="chat-bubble" onClick={() => setAbierto(!abierto)}>
        💬
      </button>
    </div>
  );
}

export default ChatBubble;