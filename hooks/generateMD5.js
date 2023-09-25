const crypto = require("crypto");

function generateMD5Hash(password) {
  const md5Hash = crypto.createHash("md5").update(password).digest("hex");
  return md5Hash;
}

function generatePassword(inputString) {
  const firstLetter = inputString.split(" ")[0];
  const RandNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const password = firstLetter + RandNumber;
  return password;
}

function GenerateUserID(inputString) {
  const firstLetter = inputString.split(" ")[0][0];
  const RandNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const userId = firstLetter + RandNumber;
  return userId;
}

module.exports = { generateMD5Hash, generatePassword, GenerateUserID };
