const fs = require('fs')
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const path = require('path')
const csv = require('csv-parser')

const connectDB = require('./connect').connectDB
const hLaboradasModel = require('./models')


const app = express()
connectDB()

// Middleware que activa subir archivos
app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000

app.get('/', (_req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/data', async (_, res)=>{
    const data = await hLaboradasModel.find()
    res.json(data)
})

app.post('/files', (req, res)=>{
    
    var dataSave = []
    //subir archivo
    const csvImport = req.files.csvImport
    const route = './files/' + csvImport.name
    csvImport.mv(route)

    //leer csv 
    let data = []
    fs.createReadStream(route)
    .pipe(csv())
    .on("data", datos => data.push(datos))
    .on("end", ()=> {
        //recorre el array de objetos de las lineas de texto del csv
        data.map(item =>{
            //tma los valores de cada objeto en el array
            const dataItems = Object.values(item)
            //recorre los valores de los objetos en el array
            dataItems.map(valuesArray =>{
                //divide en un array cada texto separado por ;
                const datas = valuesArray.split(';')
                let HLaboradas = {
                    Cedula : datas[0],
                    Codigo_SAE : datas[1],
                    Nombre_completo : datas[2],
                    Concepto11 : datas[3],
                    Concepto9  : datas[4],
                    Concepto10 : datas[5],
                    Concepto5 : datas[6],
                    Concepto6 : datas[7],
                    Concepto7 : datas[8],
                    Concepto8 : datas[9],
                    Concepto12 : datas[10],   
                    Concepto13 : datas[11]        
                }
                dataSave.push(HLaboradas)
            })
        })
        console.log(dataSave);
        /*dataSave.map(item =>{
            const persona = new hLaboradasModel(item)
            hLaboradasModel.save().then((a, err) =>{
                console.log(a);
            })
        })
       */
    })
    res.end()
})

app.listen(PORT, ()=>{
    console.log("Servidor ejecutado en el puerto " + PORT)
})