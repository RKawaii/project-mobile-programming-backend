const express = require('express');
const app = express();
const PORT = 5000;

const morgan = require('morgan');
const morganMode = 'dev';
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const Route = require('./routes');

console.log(`app run on ${process.env.NODE_ENV} mode`);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
	console.log(`morgan is running on ${morganMode}`);
	app.use(morgan(morganMode));
}

app.use('/api', Route);
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
