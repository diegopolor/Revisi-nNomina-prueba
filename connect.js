const mongoose = require('mongoose')
const URI = 
"mongodb://localhost:27017"


const connectDB = async() =>{
    try{
        await mongoose.connect(URI)
        console.log(
            "Conectado a la base de datos ✔" 
        );
    }catch(err){
        console.log(
            "No se ha podido conectar a la base datos ❌" 
        );
    }
} 

const closeDB = async()=>{
   try{
        await mongoose.connection.close()
   }catch(err){
        console.log(
            "No se ha podido cerrar la conexión a la base de datos ❌" 
            .red
        );
   }
}

module.exports = { connectDB, closeDB }