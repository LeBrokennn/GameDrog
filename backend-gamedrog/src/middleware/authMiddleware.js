function requireAuth(_req, _res, next) {
  // Placeholder: aquí iría JWT/session.
  next();
}

module.exports = { requireAuth };

