var express = require('express');
var router = express.Router();
var path=require('path');
var fs=require('fs');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable');


require("../config/db");
var Product=require("../model/Product");

/* GET users listing. */
router.get('/add', function(req, res) {
   res.render("product/add",{});
});




router.post('/add',multipartMiddleware, function(req, res) {

    //console.log('body=%j', req.body);
    //console.log('file=%j', req.files);
//save images
var forms = Object.keys(req.files);


    forms.forEach(function(form) {
        var filepath = req.files[form].path;
      
       fs.readFile(filepath, function(err, data){
          var fileName=req.files[form].name;
            var destPath=path.resolve('__dirname','../public/images/upload')+'/'+fileName;

            fs.writeFile(destPath, data, function(err){
               ;
            })

	 var productName=req.body.productName;
	 var js=req.body.jieshao;
	 var price=req.body.price;
             
	var product=new Product({
		productName:productName,
		jieshao:js,
		price:price,
		imageUrl:fileName,
		createTime:Date.now()
	});
	product.save(function(err){
	     ;
	});

        });
    });
    res.send('{"isok":0}');
});







router.get('/list', function(req, res) {
                  //一页有多少条
                  var pageSize=5;
                  //一共有多少条
                var totalSize=1;
                  //一共有多少页

var    pageNumber=Math.ceil(totalSize/pageSize)
                 //当前请求的是第几页
               var currentPage=1;
                     //

	Product.find(function(err,products){
	    res.render("product/list",{products:products});
	});
});

router.get('/detail', function(req, res) {
	var id=req.query.id;
	Product.findOne({_id:id},function(err,product){
	    res.render("product/detail",{product:product});
	});
	
});


router.post('/del', function(req, res) {
	var id=req.body.id;
console.log(id);
	Product.remove({_id:id},function(err,product){
	        res.send('{"isok":1}');
	});

});


module.exports = router;
