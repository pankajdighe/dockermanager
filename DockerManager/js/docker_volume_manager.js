	

$(document).ready(function(){
	//alert("volume");
	//Call the getContainerInfo()
	getVolumesInfo();
	
});

function getVolumesInfo()
{
	//Ajax request to Docker API, we are using REST End point /images/json?all=1
	 $.ajax({
				url :rest_list_volumes,
				dataType : "json",
				success :function(result) {
					//Now Set the Values

					if(result!=null){
 

						$.each( result.Volumes, function( key, value ) {
						

						var volume_template=$("#volume_template").html()
						.replace(new RegExp("{{volume_number}}","g"),key)
						.replace(new RegExp("{{volume_name}}","g"),value.Name);
						//.replace(new RegExp("{{volume_url}}","g"),"single_volume_management.html?iid="+value.Id);
						
						
						$("#_show_volumes").append(volume_template);						
						});
					}		
				},
				 error: function(){
					    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
					  }
			});
}