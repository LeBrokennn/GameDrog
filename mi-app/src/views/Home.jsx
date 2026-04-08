import fondo from "../assets/HOME1.png";
import "../styles/Home.css";

function Home() {
  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="home-overlay">
        <div className="home-content">
          <h1 className="home-title">Bienvenida a GameDrog 🎮</h1>
          <p className="home-subtitle">
            Tu tienda gamer favorita para consolas, juegos y periféricos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;