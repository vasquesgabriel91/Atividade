const bcrypt = require("bcryptjs");
const UserService = require("../services/UserService");
const Auth = require("../config/auth");
const logEvent = require("../services/LogService");

const AuthController = {
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      logEvent(`Falha no login - e-mail e senha não informados.`);
      return res
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios." });
    }

    UserService.getUserByEmail(email, (err, user) => {
      if (err || !user) {
        logEvent(`Falha no login - Email: ${email}`);
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          logEvent(`Falha no login - Senha incorreta para o email: ${email}`);
          return res.status(401).json({ error: "Credenciais inválidas." });
        }

        const token = Auth.generateToken(user);
        logEvent(`Login bem-sucedido - Usuário: ${email}`);
        res.json({ message: "Login realizado com sucesso.", token });
      });
    });
  },
};

module.exports = AuthController;
