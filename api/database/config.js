const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('>>> DB online');

    } catch (error) {
        console.log(error);
        throw new Error('An error ocurred while initializing the database');
    }
}

module.exports = {
    dbConnection
}