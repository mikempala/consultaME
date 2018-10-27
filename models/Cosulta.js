const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultaSchema = new Schema({
   appointment_id:{
       type: Object_id
   },
    tratamiento:{
        type: String
   },
    observaciones:{
        type: String
   }
});

module.exports = mongoose.model("Consulta", userSchema);