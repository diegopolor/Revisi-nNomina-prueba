const Model = require('mongoose').model
const Schema = require('mongoose').Schema

const hLaboradas = Schema({
    Cedula : "Number",
    Codigo_SAE : "Number",
    Nombre_completo : "String",
    Concepto11 : Schema.Types.Decimal128,
    Concepto9  : Schema.Types.Decimal128,
    Concepto10 : Schema.Types.Decimal128,
    Concepto5 : Schema.Types.Decimal128,
    Concepto6 : Schema.Types.Decimal128,
    Concepto7 : Schema.Types.Decimal128,
    Concepto8 : Schema.Types.Decimal128,
    Concepto12 : Schema.Types.Decimal128,  
    Concepto13 : Schema.Types.Decimal128  
})

const hLaboradasModel = Model('persona', hLaboradas)
module.exports = hLaboradasModel