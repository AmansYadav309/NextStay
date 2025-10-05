const mongoose = require("mongoose");
const listing = require("../models/listing");
const initdata = require("./data.js");



main().then((res)=>{
    console.log("connected sussefully")
})
.catch(err => {console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

const initDB= async  () =>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj ,  owner :"689df8520845da55e5c1c2a0" }))
    await listing.insertMany(initdata.data);
    console.log("db initialized");
}
initDB();

