


$(document).ready(function(){
	//Call the getContainerInfo()
	getVersionInfo();
	
});


function getVersionInfo()
{
	$.ajax({
		url:get_version,
		dataType:"json",
		success:function(result){
			$("#_version_id").html(result.Version);
			$("#_api_version").html(result.ApiVersion);
			$("#_gitcommit").html(result.GitCommit);
			$("#_go_version").html(result.GoVersion);
			$("#_os_name").html(result.Os);
			$("#_architechture_name").html(result.Arch);
			$("#_kernel_version").html(result.KernelVersion);
			$("#_build_time").html(result.BuildTime);
			
		},
		error:function(){
			alert('Fail To Connect to the Docker API, Please try Again Later!!!');
		}
	});


}


