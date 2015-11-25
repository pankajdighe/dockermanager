	
$(document).ready(function(){
		//alert("network");
	//Call the getContainerInfo()
	getNetworksInfo();
	
});

function getNetworksInfo()
{
	//Ajax request to Docker API, we are using REST End point /images/json?all=1
	 $.ajax({
				url :rest_list_networks,
				dataType : "json",
				success :function(result) {
					//Now Set the Values


					if(result!=null){
						//alert(result);
						$.each( result, function( key, value ) {
						var network_template=$("#network_template").html()
						.replace(new RegExp("{{network_number}}","g"),key)
						.replace(new RegExp("{{network_name}}","g"),value.Scope);
//						.replace(new RegExp("{{network_url}}","g"),"single_network_management.html?iid="+value.Id);
						
						
						$("#_show_network").append(network_template);						
						});
					}		
				},
				 error: function(){
					    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
					  }
			});
}