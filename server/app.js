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
		dataObj.push({ "bla": "bla" })
		return res.json(dataObj);
	})
});

app.listen(port, error => {
	if (error) {
		console.log(`ERROR: ${error}`);
	}

	console.log(`SERVER STARTED ON PORT ${port}`)
})