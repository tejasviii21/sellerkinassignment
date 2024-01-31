const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.M0NGODB_URL, {
        dbName: "sellerkin"
    })
    console.log("Database connected");
}

module.exports = { connectDB };