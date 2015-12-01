//This JS files contains the code to manage the Docker


$(document).ready(function(){

	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
		
	for (var i = 0; i < sURLVariables.length; i++)
	{
		  var sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] == "nid")
			{	
				network_id=sParameterName[1];
				
			}
			
			if (sParameterName[0] == "name")
			{	
				network_name=sParameterName[1];
				//alert(image_name);
			}		
 	}
	
	
	if(network_id!=null ){
		//alert("Got all values");
		
		getAllInfoNetwork();
	}
	
	//$("#_remove_image_button").click(remove_image);	
	//$("#_history_image_button").click(history_image);	
	//$("#_tag_image_button").click(tag_image);	
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
}


function history_image(){
	var formedURL = common_image+"ubuntu/history";
	//alert(formedURL);
	$.ajax({
		url : formedURL,
		dataType : "json",
		
		success:function(result){
			//alert(result);
			$("#_image_created").html(result[0].Created);		
			$("#_image_createdBy").html(result[0].CreatedBy);		
			$("#_image_tags").html(result[0].Tags);		
			$("#_image_size").html(result[0].Size);		
			$("#_image_comment").html(result[0].Comment);		
		},
		error:function(){
			alert('Fail To connect to the Docker API, Please try Again Later!!!');
		}
	});
}


function tag_image(){

//	alert(image_id);
	
	var formedURL = common_image+"centos/tag?repo=myrestcentos&force=0&tag=v33"
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

function remove_image(){


	var formedURL = common_image+image_id+"?force=1";
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
}*/

function getAllInfoNetwork(){
	//$("#_network_name").html(network_name);
	//$("#_container_image").html(container_image);
	var formedURL = rest_list_networks+"/"+network_id;
	//alert(formedURL);
	 $.ajax({
			url : formedURL,
			dataType : "json",
			success :function(result) {
				//alert(result);
				getAllInfoNetworkCallback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
				  }
		});
}

function getAllInfoNetworkCallback(result){
	
	//alert(result);
	//Restart Count
	$("#_network_name").html(result.Name);
	$("#_scope_name").html(result.Scope);
	$("#_driver_name").html(result.Driver);
	$("#_subnet").html(result.IPAM.Config[0].Subnet);
	$("#_gateway").html(result.IPAM.Config[0].Gateway);
	
	
	
	//State Information
	/*$("#_container_state").html(result.State.Status);
	$("#_container_running").html((result.State.Running) ? "Running":"Not Running");
	$("#_container_paused").html((result.State.Paused) ? "Paused":"Not Paused");
	$("#_container_restarting").html((result.State.Restarting) ? "Restarting":"Not Restarting");
	$("#_container_started_at").html(result.State.StartedAt);
	$("#_container_finished_at").html(result.State.FinishedAt);*/
}








