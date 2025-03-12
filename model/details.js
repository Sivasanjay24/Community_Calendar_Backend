const mdb = require('mongoose');
const DetailsSchema = mdb.Schema
({
    Title : String,
    Date : Date, 
    Description : String,
    // Category : String
})
const Datamodel = mdb.model('detail', DetailsSchema);
module.exports = Datamodel;