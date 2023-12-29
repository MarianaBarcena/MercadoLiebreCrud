const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    const productosVisitados = products.filter((a) => a.category === "visited");
    const productosSale = products.filter((a) => a.category === "in-sale");
    return res.render("index", {
      productosVisitados,
      productosSale,
      toThousand,
    });
  },
  search: (req, res) => {
    const { keywords } = req.query;

    const ProductosFiltrados = products.filter((losProductos) => {
      return losProductos.name.toLowerCase().includes(keywords.toLowerCase());
    });

    console.log(ProductosFiltrados);
    return res.render("results", { ProductosFiltrados, keywords, toThousand });
  },
};

module.exports = controller;
