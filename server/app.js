const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8080;

const app = express();

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

app.listen(port, error => {
	if (error) {
		console.log(`ERROR: ${error}`);
	}

	console.log(`SERVER STARTED ON PORT ${port}`)
})