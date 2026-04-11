import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
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
  const [cargando, setCargando] = useState(false);

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
    setCargando(true);

    if (!form.nombre || !form.email || !form.password || !form.confirmar) {
      setError("Debes completar todos los campos.");
      setCargando(false);
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setCargando(false);
      return;
    }

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      setCargando(false);
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
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Crear cuenta</h2>
        <p>Regístrate para comenzar a comprar</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmar"
            placeholder="Confirmar contraseña"
            value={form.confirmar}
            onChange={handleChange}
          />

          {error && <p className="error-text">{error}</p>}
          {mensaje && <p className="success-text">{mensaje}</p>}

          <button type="submit" className="register-submit" disabled={cargando}>
            {cargando ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="register-extra">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;