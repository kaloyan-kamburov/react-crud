const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const port = 8080;

const app = express();

const db = 'db.json';

app.use(bodyParser.json());
app.use(cors());

app.get('/permissions', (req, res, next) => {
	res.json({
		permissions: [
			'CREATE',
			'READ',
			'UPDATE',
			'DELETE'
		]
	});

	// res.send(undefined);
});

app.get('/products', (req, res, next) => {
	fs.readFile(db, (error, data) => {
		if (error) {
			return res.json({
				error
			});
		}
		let dataObj = JSON.parse(data);
		return res.json(dataObj);
	})
});

app.post('/addProduct', (req, res, next) => {
	fs.readFile(db, (error, data) => {
		if (error) {
			return res.json({
				error
			});
		}
		let dataObj = JSON.parse(data);		

		if (dataObj.some(product => product.name.toLowerCase() === req.body.name.toLowerCase())) {
			return res.json({
				success: false,
				msg: 'Product name exists!'
			})
		} else {
			dataObj.push(req.body);
			fs.writeFile(db, JSON.stringify(dataObj), (error) => {
				if (error) {
					return res.json({
						success: false,
						msg: 'Error occured while adding product',
						error
					})
				}
	
				return res.json({
					success: true,
					msg: 'Product added!',
					product: req.body
				})
			})
		}

		
	})
});

app.put('/updateProduct', (req, res, next) => {
	fs.readFile(db, (error, data) => {
		if (error) {
			return res.json({
				error
			});
		}
		let dataObj = JSON.parse(data);		

		if (dataObj[req.body.index].name !== req.body.name && dataObj.some(product => product.name.toLowerCase() === req.body.name.toLowerCase())) {
			return res.json({
				success: false,
				msg: 'Product name exists!'
			})
		} else {
			dataObj[req.body.index] = {
				name: req.body.name,
				price: req.body.price,
				currency: req.body.currency
			}
			fs.writeFile(db, JSON.stringify(dataObj), (error) => {
				if (error) {
					return res.json({
						success: false,
						msg: 'Error occured while updating product',
						error
					})
				}
	
				return res.json({
					success: true,
					msg: 'Product updated!',
					product: req.body
				})
			})
		}

		
	})
});


app.listen(port, error => {
	if (error) {
		console.log(`ERROR: ${error}`);
	}

	console.log(`SERVER STARTED ON PORT ${port}`)
})