//This JS files contains the code to manage the Docker
$(document).ready(function(){
	//Call the getDockerInfo()
	getDockerInfo();
});

function getDockerInfo(){
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
	//Now Set the Values
	if(result!=null){
		$("#_docker_ID").html(result.ID);
		$("#_docker_no_of_containers").html(result.Containers);
		$("#_docker_no_of_images").html(result.Images);
		$("#_docker_memory_limit").html((result.MemoryLimit.true) ? "Support":"No Support");
		$("#_docker_swap_limit").html((result.SwapLimit.true) ? "Support":"No Support");
		$("#_docker_completely_fair_scheduler").html((result.CpuCfsPeriod.true) ? "Support":"No Support");
		$("#_docker_ipv4_forwarding").html((result.IPv4Forwarding.true) ? "Enable":"Disable");
		$("#_docker_bridge-nf-call-iptables").html((result.BridgeNfIptables.true) ? "Enable":"Disable");
		$("#_docker_debug_mode").html((result.Debug.true) ? "Enable":"Disable");
		$("#_docker_file_descriptors").html(result.NFd);
		$("#_docker_oom_kill_disable").html((result.OomKillDisable.true) ? "Support":"No Support");
		$("#_docker_goroutines").html(result.NGoroutines);
		$("#_docker_execution_driver").html(result.ExecutionDriver);
		$("#_docker_logging_driver").html(result.LoggingDriver);
		$("#_docker_kernel_version").html(result.KernelVersion)
		$("#_docker_os").html(result.OperatingSystem);
		$("#_docker_index_server_address").html(result.IndexServerAddress);
		$("#_docker_no_of_cpu").html(result.NCPU);
		$("#_docker_total_memory").html(result.MemTotal);
		$("#_docker_server_version").html(result.ServerVersion);
	}
}
