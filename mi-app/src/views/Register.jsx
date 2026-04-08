import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Registro() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!form.nombre || !form.email || !form.password || !form.confirmar) {
      setError("Debes completar todos los campos.");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    registrarUsuario({
      nombre: form.nombre,
      email: form.email,
      password: form.password,
    });

    setMensaje("Cuenta creada correctamente.");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Registrarse</h2>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="auth-input"
            value={form.nombre}
            onChange={handleChange}
          />

          <label className="auth-label">Correo</label>
          <input
            type="email"
            name="email"
            className="auth-input"
            value={form.email}
            onChange={handleChange}
          />

          <label className="auth-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
          />

          <label className="auth-label">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmar"
            className="auth-input"
            value={form.confirmar}
            onChange={handleChange}
          />

          {error && <p className="auth-error">{error}</p>}
          {mensaje && <p className="auth-success">{mensaje}</p>}

          <button type="submit" className="auth-submit">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;