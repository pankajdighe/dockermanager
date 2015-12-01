//This is Docker Configuration



var ip_address=localStorage.getItem("ip_address");
var port=localStorage.getItem("port");
var ip_url="http://"+ip_address+":"+port;

var rest_info=ip_url+"/info";

var rest_list_containers=ip_url+"/containers/json?all=1";
var rest_list_images=ip_url+"/images/json?all=0";
var rest_list_volumes=ip_url+"/volumes";
var rest_list_networks=ip_url+"/networks";
var get_version=ip_url+"/version";

var rest_containers=ip_url+"/containers";
var rest_images=ip_url+"/images";
