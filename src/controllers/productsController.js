const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('products',  {products});
	},

	detail: (req, res) => {
		res.render('detail')
	},

	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log(req.file);

		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: req.file.filename
		};
		
			products.push(newProduct);
			const jsonProducts = JSON.stringify(products);
			fs.writeFileSync(productsFilePath, jsonProducts, 'utf-8');
			
			res.render('index')

	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
		res.render('product-edit-form', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;