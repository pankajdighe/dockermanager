//This JS files contains the code to manage the Docker

$(document).ready(function(){
	
//alert("Hello in");
	//Call the getContainerInfo()
	getContainerInfo();
	
	
	
	$("#_button_create_conainer").click(create_container);
	
});

function getContainerInfo(){
	/**/
		//Ajax request to Docker API, we are using REST End point /containers/json?all=1
				 $.ajax({
				url :rest_list_containers ,
				dataType : "json",
				success :function(result) {
					getContainerInfoCallback(result);		
				},
				 error: function(){
					    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
					  }
			});
			
}

//This function Invoked after Successful Docker Info Call
function getContainerInfoCallback(result){	
	//alert(result.ID);
	
				//Now Set the Values
				if(result!=null){
					
					//alert(result.length);
					//alert(result);
					$.each( result, function( key, value ) {
						//  alert( key + ": " + value.Names[0] );
					var container_template=$("#container_template").html()
						.replace(new RegExp("{{container_number}}","g"),key)  
						.replace(new RegExp("{{container_url}}","g"),"single_container_management.html?cid="+value.Id+"&image="+value.Image+"&name="+value.Names[0])
						.replace(new RegExp("{{container_name}}","g"),value.Names[0]);

						$("#_show_container").append(container_template);

						
						});
					//	$("#_docker_ID").html(result.ID);
						//$("#_docker_no_of_containers").html(result.Containers);
						//$("#_docker_no_of_images").html(result.Images)
				
				}
	
}


function create_container(){
	/**/
		//Ajax request to Docker API, we are using REST End point /containers/json?all=1
				/* $.ajax({
				url :rest_list_containers ,
				dataType : "json",
				success :function(result) {
					getContainerInfoCallback(result);		
				},
				 error: function(){
					    alert('Fail To Connect to the Docker API, Please try Again Later!!!');
					  }
			});*/
			var image=$("#select_image").val();
			var image_name=$("#image_name").val();
			var command_array;
			
			//alert(image+ "  "+command);
			
			
			if(image_name){
			
			//command_array=command.split(",");
			
			
			
				//if(command_array.length>0){
				
						/*	  var data=new Object();
						 data.Image=image;
						 data.AttachStdin=false;
						 data.AttachStdout=true;
						 data.AttachStderr=true;
						 data.Tty=true;
						 data.Cmd=command_array;
						 data.OpenStdin=true;
						 data.StdinOnce=false;*/
				
					/*	$.ajax({
						type:"POST",
						url :rest_containers+"/create" ,
						dataType : "json",
						contentType:"application/json",
						//data:data,
						 crossDomain: true,
						data:{"Image":image,"Cmd":["/bin/bash", "-c", "tail -f /var/log/dmesg"]},
						success :function(result) {
							getCreateContainerInfoCallback(result);		
						},
						 error: function(){
								alert('Fail To Connect to the Docker API, Please try Again Later!!!');
							  }
					});*/
					
					/*$.post(rest_containers+"/create",
						{
							"Image": "ubuntu",
							"Cmd":["/bin/bash", "-c", "tail -f /var/log/dmesg"]
						},
						function(data, status){
							alert("Data: " + data + "\nStatus: " + status);
						});*/
						
						
					    	$.ajax({
						type:"POST",
						url :rest_create_container_url+"?url=http://"+ip_address+"&port="+port+"&image="+image+"&image_name="+image_name,
						//dataType : "json",
						//contentType:"application/json",
						//data:data,
						// crossDomain: true,
						//data:{"Image":image,"Cmd":["/bin/bash", "-c", "tail -f /var/log/dmesg"]},
						success :function(result) {
							getCreateContainerInfoCallback(result);		
						},
						 error: function(){
						 location.reload();
								//alert('Fail To Connect to the Docker API, Please try Again Later!!!');
							  }
					});
				
				
				//}
				
			}
			//alert(command_array.length);
			
			
			
			
}


function getCreateContainerInfoCallback(result){
//alert("Container Created Successfully!!!");
location.reload();
}










