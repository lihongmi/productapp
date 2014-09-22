

$(function(){
$(".delProduct").click(function(){
    var currentDel=$(this);
    var dataId=$(this).attr("dataId");
     if(confirm("您确认是否删除")){
           $.ajax({
	url:'/product/del',
                         type:'post',
                         data:{id:dataId},
                        success:function(data){
                              var obj=JSON.parse(data);
                            if(obj.isok==1){
                                  currentDel.closest("tr").remove();		
                                 alert("删除成功");
                            }else{

                              alert("删除失败");
                            }
                        }
           }); 
     }
});
});
