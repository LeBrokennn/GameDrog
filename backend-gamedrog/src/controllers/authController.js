const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

async function register(req, res) {
  try {
    const { nombre, email, password } = req.body || {};

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "nombre, email y password son requeridos" });
    }

    const exists = await authModel.findByEmail(email);
    if (exists) {
      return res.status(409).json({ error: "usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authModel.createUser({
      nombre,
      email,
      password: hashedPassword,
      rol: "cliente",
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({ error: "error al registrar usuario" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "email y password requeridos" });
    }

    const u = await authModel.findByEmail(email);

    if (!u) {
      return res.status(401).json({ error: "credenciales inválidas" });
    }

    const passwordValida = await bcrypt.compare(password, u.password);

    if (!passwordValida) {
      return res.status(401).json({ error: "credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: u.id,
        email: u.email,
        rol: u.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      usuario: {
        id: u.id,
        nombre: u.nombre,
        email: u.email,
        rol: u.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "error al iniciar sesión" });
  }
}

module.exports = { register, login };