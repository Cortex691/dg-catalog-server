const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const { adminLogin, komercijalistaLogin } = require("./auth");
const {
  addBrand,
  getBrands,
  addProduct,
  getProducts,
  deleteImage,
  updateProduct,
  deleteProduct,
  addKomercijalista,
  getKomercijaliste,
  editKomercijalista,
  deleteKomercijalsita,
  addObjekat,
  getObjekti,
  editObjekat,
  deleteObjekat,
  getOrders,
  changeOrderActivity,
} = require("./provider");
const {
  getKomercijalista,
  getAllBrands,
  getKomercijalistaProducts,
  getKomercijalistaProduct,
  sendOrder,
  getKomercijalistaOrders,
  getKomercijalistaById,
  getKomercijalistaOrdersById,
  getObjekatById,
  getOrdersByObjekat,
} = require("./komercijalista");
const {
  getGostBrands,
  getGostProducts,
  getGostProductById,
} = require("./gost");

dotenv.config({ path: "./.env" });

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", adminLogin);

app.post("/provider/add-brand", addBrand);

app.get("/provider/get-brands", getBrands);

app.post("/provider/add-product", addProduct);

app.get("/provider/get-products", getProducts);

app.post("/provider/delete-image", deleteImage);

app.post("/provider/update-product", updateProduct);

app.post("/provider/delete-product", deleteProduct);

app.post("/provider/add-komercijalista", addKomercijalista);

app.get("/provider/get-komercijaliste", getKomercijaliste);

app.post("/provider/edit-komercijalista", editKomercijalista);

app.post("/provider/delete-komercijalista", deleteKomercijalsita);

app.post("/provider/add-objekat", addObjekat);

app.get("/provider/get-objekti", getObjekti);

app.post("/provider/edit-objekat", editObjekat);

app.post("/provider/delete-objekat", deleteObjekat);

app.get("/provider/get-orders", getOrders);

app.post("/provider/change-order-activity", changeOrderActivity);

// KOMERCIJALISTI

app.post("/komercijalista/login", komercijalistaLogin);

app.post("/komercijalista/get-data", getKomercijalista);

app.post("/komercijalista/get-brands", getAllBrands);

app.post("/komercijalista/get-products", getKomercijalistaProducts);

app.post("/komercijalista/getartikal", getKomercijalistaProduct);

app.post("/komercijalista/send-order", sendOrder);

app.post("/komercijalista/get-orders", getKomercijalistaOrders);

app.post("/komercijalista/get-komercijalista-by-id", getKomercijalistaById);

app.post("/komercijalista/get-orders-by-id", getKomercijalistaOrdersById);

app.post("/komercijalista/get-objekat-by-id", getObjekatById);

app.post("/komercijalista/get-orders-by-objekat", getOrdersByObjekat);

// GOST

app.get("/gost/get-brands", getGostBrands);

app.post("/gost/get-products", getGostProducts);

app.post("/gost/get-product", getGostProductById);

const port = process.env.PORT || 9001;
app.listen(3001, () => {
  console.log("App is running on port", port);
});
