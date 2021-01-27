const bcrypt = require('bcryptjs')

const hashing = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash
}

const compare = (inputPassword, passwordDb) => {
    const hasil = bcrypt.compareSync(inputPassword, passwordDb)
    return hasil
}

module.exports = { hashing, compare }