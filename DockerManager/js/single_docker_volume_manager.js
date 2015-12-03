//This JS files contains the code to manage the Docker



$(document).ready(function(){

	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
		
	for (var i = 0; i < sURLVariables.length; i++)
	{
		  var sParameterName = sURLVariables[i].split('=');

			
			if (sParameterName[0] == "vol_name")
			{	
				volume_name=sParameterName[1];
				//alert(image_name);
			}		
 	}
	
	
	if(volume_name!=null ){
		getAllInfoVolume();
	}
	
	$("#_remove_volume_button").click(remove_volume);	
	$("#_connect_container_to_network").click(connect_container_to_network);	
	$("#_disconnect_container_to_network").click(disconnect_container_to_network);	
	//$("#_search_term_button").click(search_term);	
	
});


function remove_volume(){

	var ip="http://52.34.147.69";
	var port_number=5555;

	var formedURL = 'http://d00567e9.ngrok.io/delete-volume?url='+ip+'&port='+port+'&volume_name='+volume_name;
	alert(formedURL);	
		
	 $.ajax({
			url :  formedURL,
			type:"POST",
			success :function(result) {
				alert("Volume Successfully deleted.");
				location.href="/Users/Hardik/GitHub/dockermanager/DockerManager/pages/volume_management.html";
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!'+"  "+rest_containers+"/"+container_id);
				  }
		});
}

function getAllInfoVolume(){
	//$("#_network_name").html(network_name);
	//$("#_container_image").html(container_image);
	var formedURL = rest_list_volumes+"/"+volume_name;
	//alert(formedURL);
	 $.ajax({
			url : formedURL,
			dataType : "json",
			success :function(result) {
				//alert(result);
				getAllInfoVolumeCallback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
				  }
		});
}

function getAllInfoVolumeCallback(result){
	
	//alert(result);
	//Restart Count
	$("#_volume_name").html(result.Name);
	$("#_driver_name").html(result.Driver);
	$("#_mountpoint_name").html(result.Mountpoint);
	
	
	
	
	//State Information
	/*$("#_container_state").html(result.State.Status);
	$("#_container_running").html((result.State.Running) ? "Running":"Not Running");
	$("#_container_paused").html((result.State.Paused) ? "Paused":"Not Paused");
	$("#_container_restarting").html((result.State.Restarting) ? "Restarting":"Not Restarting");
	$("#_container_started_at").html(result.State.StartedAt);
	$("#_container_finished_at").html(result.State.FinishedAt);*/
}








