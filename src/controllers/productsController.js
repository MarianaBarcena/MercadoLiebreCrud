const fs = require('fs');
const path = require('path');
const subirProducto = require('../data/nuevoProd');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

escribirJSON = (productos) => {
	fs.writeFileSync(`./src/data/productsDataBase.json`, JSON.stringify(productos,null,3), 'utf-8')
   return null
}

const controller = {
	// todos los productos
	index: (req, res) => {

		res.render("products",{products,toThousand})
	},

//detalle del producto
	detail: (req, res) => {
		const {id} = req.params
		
		const producto = products.find(product => product.id == id)
			
			return res.render("detail", {producto,toThousand})
		},

//creador de producto	
create: (req, res) => {
		

		return res.render("product-create-form")
		
	},
	
	// Store de create
	store: (req, res) => {
		
		const {name,price,discount,category,description} = req.body
		const mainImage = req.file;
		
		
		const NuevoProducto = new subirProducto(name, price, discount, category, description, mainImage)

		products.push(NuevoProducto);

		escribirJSON(products)
		

		return res.redirect("/")
	},
	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params
	
		const producto = products.find(product => product.id ==id)

		return res.render("product-edit-form",{producto})
	},
	// Update 
	update: (req, res) => {
		const {id} = req.params
		const {name,price,discount,category,description} = req.body
		const imagen = req.file

		const productoEditado = products.map(producto =>{
			if(producto.id == id){
(imagen && fs.existsSync('public/images/products/' + producto.image)) && fs.unlinkSync('public/images/products/' + producto.image)
			producto.name = name.trim()
			producto.price = +price
			producto.discount = +discount.trim() <= 100? +discount.trim(): 0;
			producto.category = category
			producto.description = description.trim()
			producto.image= imagen ? imagen.filename : producto.image
			
		} 
		return producto
	})
		
	escribirJSON(productoEditado)

	return res.redirect("/")
	},
	// Delete de 1 prodct
	destroy : (req, res) => {
		const {id} = req.params
		const DeleteImage= products.find(a=> a.id == id)
	fs.existsSync("public/images/products/" + DeleteImage.image) && fs.unlinkSync("public/images/products/" + DeleteImage.image)
	
		const Borrado = products.filter(prod => prod.id != id)
		const JsonModificado = JSON.stringify(Borrado,null,3)
	
		fs.writeFileSync(`./src/data/productsDataBase.json`, JsonModificado, 'utf-8')
	
	return res.redirect("/")
		}
	};

module.exports = controller;