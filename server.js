const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.get('/', (req, res) => {
    res.write('Hello\nFinally');
    res.end();
});

const db = config.get('mongoURI');
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(`MongoDB connection error: ${err}`));

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`Listening on ${port}`));
