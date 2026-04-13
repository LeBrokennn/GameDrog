import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import fondo from "../assets/HOME1.png";
import "../styles/Register.css";

function Register() {
  const { registrarUsuario } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!form.nombre || !form.email || !form.password || !form.confirmar) {
      setError("Debes completar todos los campos.");
      return;
    }

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await registrarUsuario({
        nombre: form.nombre,
        email: form.email,
        password: form.password,
      });

      setMensaje("Cuenta creada correctamente.");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section
      className="register-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="register-overlay">
        <div className="register-card">
          <div className="register-header">
            <span className="register-badge">GameDrog</span>
            <h2>Crear cuenta</h2>
            <p>Únete a la tienda y descubre tus próximos juegos favoritos.</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group-register">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="input-group-register">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group-register">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Crea una contraseña"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group-register">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmar"
                placeholder="Repite tu contraseña"
                value={form.confirmar}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-text">{error}</p>}
            {mensaje && <p className="success-text">{mensaje}</p>}

            <button type="submit" className="auth-btn">
              Registrarse
            </button>
          </form>

          <p className="auth-footer">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;