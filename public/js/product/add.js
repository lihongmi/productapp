

$(function(){



  $("#btnAddProduct").click(function(){
       $("#productForm").ajaxSubmit({
                        type:'post',
                        url:'/product/add',
                        success:function(data){
                              var obj=JSON.parse(data);
                            if(obj.isok==1){
                                  $("#productForm :text").val("");
                                  alert("add product ok");
                                  location.href="/product/list";
                            }else{

                              alert("add product bu ok");
                            }
                        }
       });
  });
});
