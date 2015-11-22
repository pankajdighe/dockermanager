//This JS files contains the code to manage the Docker



$(document).ready(function(){
	
//	alert("Hello in");
	//Call the getDockerInfo()
	getDockerInfo();
	
});

function getDockerInfo(){
	/**/
		//Ajax request to Docker API, we are using REST End point /info
				 $.ajax({
				url :rest_info ,
				dataType : "json",
				success :function(result) {
					getDockerInfoCallback(result);		
				},
				 error: function(){
					    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
					  }
			});
			
}


//This function Invoked after Successful Docker Info Call
function getDockerInfoCallback(result){	
	//alert(result.ID);
	
	//Now Set the Values
	if(result!=null){
		
			$("#_docker_ID").html(result.ID);
			$("#_docker_no_of_containers").html(result.Containers);
			$("#_docker_no_of_images").html(result.Images)
	
	}
	
}














