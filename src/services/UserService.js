const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const UserRepository = require("../repository/UserRepository");

const UserService = {
  // Criar novo usuário com hash de senha
  createUser: (name, email, password, role, birth_date,callback) => {
    UserModel.findByEmail(email, (err, user) => {
      if (err) return callback(err);
      if (user) return callback(new Error("E-mail já cadastrado."));

      //validação da email
      if (!UserRepository.validateEmail(email)) {
        return callback(
          new Error(
            "E-mail inválido. O e-mail não atende os parâmetros neccessários"
          )
        );
      }

      //validação da senha
      if (!UserRepository.validatePassword(password)) {
        return callback(
          new Error(
            "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
          )
        );
      }
    
       //validação da data de aniversário
      const birthDateValidation = UserRepository.validateAndFormatBirthDate(birth_date);
      if (birthDateValidation.error){
        return callback(new Error(birthDateValidation.error));
      }
 
      // Hash da senha antes de salvar
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);

        UserModel.create(name, email, hashedPassword, role,  birthDateValidation.formattedDate, callback);
      });
    });
  },

  // Buscar usuário por e-mail
  getUserByEmail: (email, callback) => {
    UserModel.findByEmail(email, callback);
  },

  // Buscar usuário por ID
  getUserById: (id, callback) => {
    UserModel.findById(id, (err, user) => {
      if (err) return callback(err);
      if (!user) return callback(new Error("Usuário não encontrado."));
      callback(null, user);
    });
  },

  // Atualizar dados do usuário
  updateUser: (id, name, email, callback) => {
    UserModel.update(id, name, email, (err, changes) => {
      if (err) return callback(err);
      if (changes === 0)
        return callback(new Error("Usuário não encontrado ou sem alterações."));
      callback(null, "Usuário atualizado com sucesso.");
    });
  },
  
  updatePassword: (id, newPassword, callback) => {
    UserModel.updatePassword(id, newPassword, (err, changes) => {
      if (err) return callback(err);
      if (changes === 0) return callback(new Error("Usuário não encontrado."));
      callback(null, "Senha atualizada com sucesso.");
    });
  },

  // Deletar usuário
  deleteUser: (id, callback) => {
    UserModel.delete(id, (err, changes) => {
      if (err) return callback(err);
      if (changes === 0) return callback(new Error("Usuário não encontrado."));
      callback(null, "Usuário excluído com sucesso.");
    });
  },

  // Listar todos os usuários
  listUsers: (callback) => {
    UserModel.findAll(callback);
  },
};

module.exports = UserService;
