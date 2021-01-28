const bcrypt = require('bcryptjs');

function encryptionPwd(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

function checkPwd(pwdInput, pwdDb) {
  const hasil = bcrypt.compareSync(pwdInput, pwdDb);

  return hasil;
}
module.exports = { encryptionPwd, checkPwd }