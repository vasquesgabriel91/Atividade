const logEvent = require("../services/LogService");

const AdminController = {
  // Criar novo usuário
  createAdmin: (req, res) => {
    const { name, email, password, role, birth_date } = req.body;

    if (!name || !email || !password || !role || !crm || !specialty || !presentation ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // AdminService.createAdmin(name, email, password, role, birth_date, (err, userId) => {
    //   if (err) return res.status(400).json({ error: err.message });

    //   logEvent(`Conta criada - Usuário ID: ${userId}`);
    //   res.status(201).json({ message: "Usuário criado com sucesso!", userId });
    // });
  }
};

module.exports = AdminController;

