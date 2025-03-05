const mongoose = require('mongoose')

const connectionString = process.env.DBSTRINGCONNECTION

mongoose.connect(connectionString).then(res => {
    console.log("MongoDB connted to our Server!");
    
}).catch( err => {
    console.log("Failed to connect to Database");
    console.log(err); 
})