const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();

const URI = process.env.MONGO_URL;

async function main(){
    await mongoose.connect(URI);
}

main().then(()=>console.log("DB Connected!")).catch((err)=>console.log(err));

module.exports = main();