//This JS files contains the code to manage the Docker

var container_id="";
var container_image="";
var container_name="";

$(document).ready(function(){
	
//alert("Hello in");

	var sPageURL = window.location.search.substring(1);
	
	var sURLVariables = sPageURL.split('&');

	
	for (var i = 0; i < sURLVariables.length; i++)
	 {

		  var sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] == "cid")
			{	
				container_id=sParameterName[1];
				//alert(container_object);
			}
			if (sParameterName[0] == "image")
			{	
				container_image=sParameterName[1];
				//alert(container_object);
			}
			if (sParameterName[0] == "name")
			{	
				container_name=sParameterName[1];
				//alert(container_object);
			}		
 }
	
	
	if(container_id!=null && container_image!=null && container_name!=null  ){
		//alert("Got all values");
		
		getAllInfoContainer();
	}
	
	$("#_start_container_button").click(start_container);
	$("#_stop_container_button").click(stop_container);
	$("#_pause_container_button").click(pause_container);
	$("#_unpause_container_button").click(unpause_container);
	//$("#_delete_container_button").click(delete_container);
	$("#_kill_container_button").click(kill_container);
	
	$("#_refresh_button").click(refresh_page);
	
});




function getAllInfoContainer(){
	
	$("#_container_name").html(container_name);
	$("#_container_image").html(container_image);
	
	
	 $.ajax({
			url :rest_containers+"/"+container_id+"/json" ,
			dataType : "json",
			success :function(result) {
				getAllInfoContainerCallback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
				  }
		});
	
	
}

function getAllInfoContainerCallback(result){
	
	//alert(result);
	//Restart Count
	$("#_container_restart_count").html(result.RestartCount);
	$("#_container_container_driver").html(result.Driver);
	$("#_container_container_execdriver").html(result.ExecDriver);
	$("#_container_container_export").html("<a href=\""+rest_containers+"/"+container_id+"/export"+"\">Export Container</a>");
	$("#_container_container_archieve").html("<a href=\""+rest_containers+"/"+container_id+"/archive?path=/root"+"\">Download Archieve</a>");
	$("#_container_container_logs").html("<a href=\""+rest_containers+"/"+container_id+"/logs?stderr=1&stdout=1"+"\">Download Logs</a>");
	
	
	//State Information
	$("#_container_state").html(result.State.Status);
	$("#_container_running").html((result.State.Running) ? "Running":"Not Running");
	$("#_container_paused").html((result.State.Paused) ? "Paused":"Not Paused");
	$("#_container_restarting").html((result.State.Restarting) ? "Restarting":"Not Restarting");
	$("#_container_started_at").html(result.State.StartedAt);
	$("#_container_finished_at").html(result.State.FinishedAt);
	
setManageOption(result);
}


function start_container(){
	
//	alert("Hello");
	
	 $.ajax({
		 	method:"POST",
			url :rest_containers+"/"+container_id+"/start" ,
			dataType : "json",
			success :function(result) {
				start_container_callback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!'+"  "+rest_containers+"/"+container_id+"/start");
				  }
		});
}

function start_container_callback(result){
	
	//alert("Successfully Started the Container..");
	$("#message_modal_success_start").modal();
	//location.reload();

}

function setManageOption(result){
	
	
	if(result.State.Running)
		$( "#_start_container_button" ).toggleClass( "disabled" );
	
	if(result.State.Paused)
		$( "#_pause_container_button" ).toggleClass( "disabled" );
	
}


function stop_container(){
	
//	alert("Hello");
	
	 $.ajax({
		 	method:"POST",
			url :rest_containers+"/"+container_id+"/stop" ,
			dataType : "json",
			success :function(result) {
				stop_container_callback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!'+"  "+rest_containers+"/"+container_id+"/start");
				  }
		});
}

function stop_container_callback(result){
	
	//alert("Successfully Started the Container..");
	
	$("#message_modal_success_stop").modal();
}


function refresh_page(){
	location.reload();
}


function pause_container(){
	
//	alert("Hello");
	
	 $.ajax({
		 	method:"POST",
			url :rest_containers+"/"+container_id+"/pause" ,
			dataType : "json",
			success :function(result) {
				pause_container_callback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!'+"  "+rest_containers+"/"+container_id+"/pause");
				  }
		});
}


function pause_container_callback(result){
	
	//alert("Successfully Started the Container..");
	
	$("#message_modal_success_pause").modal();
}


function unpause_container(){
	
//	alert("Hello");
	
	 $.ajax({
		 	method:"POST",
			url :rest_containers+"/"+container_id+"/unpause" ,
			dataType : "json",
			success :function(result) {
				unpause_container_callback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!'+"  "+rest_containers+"/"+container_id+"/start");
				  }
		});
}


function unpause_container_callback(result){
	
	//alert("Successfully Started the Container..");
	
	$("#message_modal_success_unpause").modal();
}


function delete_container(){
	
//	alert("Hello");
	
	 $.ajax({
			url :rest_containers+"/"+container_id,
			type:"DELETE",
			//dataType : "json",
			success :function(result) {
				delete_container_callback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!'+"  "+rest_containers+"/"+container_id);
				  }
		});
}


function delete_container_callback(result){
	
	//alert("Successfully Started the Container..");
	
	//$("#message_modal_success_delete").modal();
	location.href="/container_management.html";
}

function kill_container(){
	
//	alert("Hello");
	
	 $.ajax({
		 	method:"POST",
			url :rest_containers+"/"+container_id+"/kill" ,
			dataType : "json",
			success :function(result) {
				kill_container_callback(result);		
			},
			 error: function(){
				    alert('Fail To Connect to the Docker API, Please try Again Later!!!'+"  "+rest_containers+"/"+container_id+"/start");
				  }
		});
}


function kill_container_callback(result){
	
	//alert("Successfully Started the Container..");
	
	$("#message_modal_success_kill").modal();
}



