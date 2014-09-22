var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema = new Schema({
    productName:  String,
    jieshao: String,
    price:   Number,
    imageUrl:String,
    createTime:Date
});
var Product = mongoose.model('Product', productSchema);
module.exports=Product;
