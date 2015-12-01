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
	
	$("#_remove_network_button").click(remove_network);	
	$("#_connect_container_to_network").click(connect_container_to_network);	
	$("#_disconnect_container_to_network").click(disconnect_container_to_network);	
	//$("#_search_term_button").click(search_term);	
	
});

/*function search_term()
{
	var formedURL = common_image+"search?term="+search_term;
	//alert(formedURL);
	$.ajax({
		url : formedURL,
		dataType : "json",
		
		success:function(result){
			//alert(result);
			
		},
		error:function(){
			alert('Fail To connect to the Docker API, Please try Again Later!!!');
		}
	});
}*/


function disconnect_container_to_network(){
	var formedURL = rest_list_networks+"/"+container_id+"/disconnect";
	//alert(formedURL);
	$.ajax({
		method:"POST",
		url : formedURL,
		dataType : "json",
		
		success:function(result){
			alert(result);
			
		},
		error:function(){
			alert('Fail To connect to the Docker API, Please try Again Later!!!');
		}
	});
}


function connect_container_to_network(){

//	alert(image_id);
	
	var formedURL = rest_list_networks+"/"+container_id+"/connect";
	alert(formedURL);
	$.ajax({
		method:"POST",
		url : formedURL,
		dataType : "json",
		
		success:function(result){
			alert(result);
		},
		error:function(){
			alert('Fail To connect to the Docker API, Please try Again Later!!!');
		}
	});
}

function remove_network(){

	var formedURL = rest_list_networks+"/"+container_id;
	alert(formedURL);
	$.ajax({
		url : formedURL,
		data: {'_method': 'delete'},
		
		success:function(result){
			alert("deleted");
		},
		error:function(){
			alert('Fail To connect to the Docker API, Please try Again Later!!!');
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








