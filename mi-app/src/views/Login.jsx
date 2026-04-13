import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import fondo from "../assets/HOME1.png";
import "../styles/Login.css";

function Login() {
  const { iniciarSesion } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Debes completar todos los campos.");
      return;
    }

    try {
      const user = await iniciarSesion(form.email, form.password);

      if (user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section
      className="login-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="login-overlay">
        <div className="login-card">
          <div className="login-header">
            <span className="login-badge">GameDrog</span>
            <h2>Iniciar sesión</h2>
            <p>Accede a tu cuenta para seguir comprando tus juegos favoritos.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group-auth">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group-auth">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="auth-btn">
              Iniciar sesión
            </button>
          </form>

          <p className="auth-footer">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;