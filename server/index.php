<?php
$path = !empty($_GET["path"]) ? $_GET["path"] : "index";
$api = [
	"identity" => "index",
	"version_sender" => "1.0.0",
	"version_actual" => "1.0.0",
	"data" => [],
	"date" => "Thu, 31 Dec 2015 12:00:00 +0000",
	"code" => 200,
	"message" => "OK",
	"status" => "success"
];
switch ($path) {
	case "index":
		$api["data"] = [
			"first_name" => "Anton",
			"last_name"  => "Trofimenko",
			"email"      => "at@mail.ru",
			"session_id" => "djbncdslkjdnlfkjhlkdjhcdfklhjk",
		];
		break;
}
//
$body = json_encode($api);
$headers = [
	"Access-Control-Allow-Origin: *",
	"Access-Control-Allow-Credentials: true",
	"Access-Control-Allow-Headers: Accept, Origin, Content-Type, Cache-Control, Key, X-Requested-With",
	"Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD",
	"Content-type: application/json; charset=UTF-8",
	"Connection: close",
	"Status: 200 OK",
	"Access-Control-Request-Headers: Expiry",
];
foreach ($headers as $header) {
	header($header);
}
ob_start();
ob_start("ob_gzhandler");
echo $body;
ob_end_flush();
header("Content-Length: ".ob_get_length());
header("Accept-Ranges: bytes");
ob_end_flush();
ob_end_flush();
