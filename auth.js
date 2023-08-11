const { db } = require("./firebase-config");
const { storage } = require("firebase-admin");
const bcrypt = require("bcrypt");
const { uuidv4 } = require("@firebase/util");
const privateKey = "wumpafruit69";
const jwt = require("jsonwebtoken");

const validateTokenAndGetUser = (token) => {
  try {
    const id = jwt.verify(token, privateKey);

    return id;
  } catch (err) {
    console.log(err);
    return "token-error";
  }
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminSnapshot = await db
      .ref("admin")
      .orderByChild("username")
      .equalTo(username)
      .once("value");
    const adminData = adminSnapshot.val();

    if (!adminData) {
      return res.status(200).json({ error: "Invalid username" });
    }

    const adminKey = Object.keys(adminData)[0];
    const admin = adminData[adminKey];

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(200).json({ error: "Invalid password" });
    }

    const token = jwt.sign(admin.id, privateKey);

    res.status(200).json({ message: "login-success", token: token });
  } catch (err) {}
};

const createAdmin = async () => {
  const username = "admin";
  const password = "DgGroup1111";
  const id = uuidv4();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = {
    username: username,
    password: hashedPassword,
    id: id,
  };

  await db.ref("admin").push(admin);
};

const komercijalistaLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const komercijalistiSnapshot = await db
      .ref("komercijalisti")
      .orderByChild("username")
      .equalTo(username)
      .once("value");
    const komercijalistiData = komercijalistiSnapshot.val();

    if (!komercijalistiData) {
      return res.status(200).json({ error: "Invalid username" });
    }

    const komercijalisti = Object.values(komercijalistiData);
    const matchingKomercijalista = komercijalisti.find(
      (komercijalista) => komercijalista.password === password
    );

    if (!matchingKomercijalista) {
      return res.status(200).json({ error: "Invalid password" });
    }

    const token = jwt.sign(matchingKomercijalista.id, privateKey);

    res.status(200).json({ message: "login-success", token: token });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { validateTokenAndGetUser, adminLogin, komercijalistaLogin };
