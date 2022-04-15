require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected to Mongoose'))
    .on('error', (err) => console.log(err))

module.exports = mongoose;