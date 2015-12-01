	
$(document).ready(function(){
	
	//Call the getContainerInfo()
	getImagesInfo();
	
});

function getImagesInfo()
{
	//Ajax request to Docker API, we are using REST End point /images/json?all=1
	 $.ajax({
				url :rest_list_images,
				dataType : "json",
				success :function(result) {
					//Now Set the Values

					if(result!=null){
						//alert(result);
						$.each( result, function( key, value ) {
						var image_template=$("#image_template").html()
						.replace(new RegExp("{{image_number}}","g"),key)
						.replace(new RegExp("{{image_name}}","g"),value.RepoTags[0])
						.replace(new RegExp("{{image_url}}","g"),"single_image_management.html?iid="+value.Id+"&name="+value.RepoTags[0]);
						
						
						$("#_show_images").append(image_template);						
						});
					}		
				},
				 error: function(){
					    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
					  }
			});
}