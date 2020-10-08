require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// My routes
// const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

// DB Connected
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('DB Connected!')
}).catch(error => {
    console.log(error.message);
    console.log(`DB Disconnected!`)
})

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
// app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api/notes', noteRoutes);

// PORT
const port = process.env.PORT || 8000;

// Starting a Server
app.listen(port, () => {
    console.log(`The app is running at port ${port}`)
})