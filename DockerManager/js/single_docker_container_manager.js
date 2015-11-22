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
	
	
	//State Information
	$("#_container_state").html(result.State.Status);
	$("#_container_running").html((result.State.Running) ? "Running":"Not Running");
	$("#_container_paused").html((result.State.Paused) ? "Paused":"Not Paused");
	$("#_container_restarting").html((result.State.Restarting) ? "Restarting":"Not Restarting");
	$("#_container_started_at").html(result.State.StartedAt);
	$("#_container_finished_at").html(result.State.FinishedAt);
	
}








