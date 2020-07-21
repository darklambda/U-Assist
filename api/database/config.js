const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        console.log('>>> Connecting to the DB...')
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('>>> DB online');

    } catch (error) {
        console.log('>>> ', error);
    }
}

module.exports = {
    dbConnection
}