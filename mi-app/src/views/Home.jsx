import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fondo from "../assets/HOME1.png";
import juego6 from "../assets/juego6.png";
import juego2 from "../assets/juego2.png";
import juego3 from "../assets/juego3.png";
import "../styles/Home.css";

function Home() {
  const imagenes = [juego6, juego2, juego3];
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
    <section
      className="home-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="home-overlay">
        <div className="home-layout">
          <div className="home-left">
            <span className="home-badge">GameDrog Store</span>

            <h1 className="home-title">
              Bienvenido a <span>GameDrog</span>
            </h1>

            <p className="home-subtitle">
              Encuentra productos gamer, consolas y accesorios para mejorar tu
              experiencia. Descubre tus juegos favoritos y prepárate para vivir
              una experiencia única.
            </p>

            <div className="home-actions">
              <Link to="/productos" className="btn-comprar">
                Comprar ahora
              </Link>
            </div>
          </div>

          <div className="home-right">
            <img
              src={imagenes[indiceActual]}
              alt="producto destacado"
              className="imagen-slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;