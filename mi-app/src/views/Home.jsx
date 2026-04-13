import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fondo from "../assets/HOME1.png";
import juego4 from "../assets/juego4.png";
import juego5 from "../assets/juego5.png";
import juego6 from "../assets/juego6.png";
import "../styles/Home.css";

const imagenes = [juego5, juego4, juego6];

function Home() {
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section
      className="home-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="home-overlay">
        <div className="home-content">
          <div className="home-texto">
            <span className="home-badge">GameDrog Store</span>

            <h1 className="home-title">
              Bienvenida a <span>GameDrog</span>
            </h1>

            <p className="home-subtitle">
              Encuentra productos gamer, consolas y accesorios para mejorar tu
              experiencia. Descubre tus juegos favoritos y prepárate para vivir
              una experiencia única.
            </p>

            <Link to="/productos" className="btn-comprar">
              Comprar ahora
            </Link>
          </div>

          <div className="home-imagen">
            <img
              src={imagenes[indiceActual]}
              alt="Juego destacado"
              className="imagen-slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home; 