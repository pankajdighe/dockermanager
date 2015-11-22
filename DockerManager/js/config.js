//This is Docker Configuration

var ip_address="";
var port="";
var ip_url="http://"+ip_address+":"+port;
var rest_list_containers=ip_url+"/containers/json?all=1";
var rest_info=ip_url+"/info";
var rest_containers=ip_url+"/containers";