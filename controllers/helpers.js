const bcrypt = require('bcryptjs');

const helpers = {};

//Cifrado de contraseña
helpers.encryptPassword = async (contrasena) => {
  //Salt es la constante que la funcion bcrypt cifra en un rango de 10 caracteres
  const salt = await bcrypt.genSalt(10);
  //Hash es la constante que guarda la contraseña ya incriptada y se retorna
  const hash = await bcrypt.hash(contrasena, salt);
  return hash;
};
//Decifrado de Contraseña
helpers.matchPassword = async (contrasena, savedPassword) => {
  try {
    return await bcrypt.compare(contrasena, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;
