<?php
use Lcobucci\JWT\Builder; // https://github.com/lcobucci/jwt
require "vendor/autoload.php";

//$app = new \Slim\App;
//use Psr\Http\Message\ServerRequestInterface;
//use Psr\Http\Message\ResponseInterface;
//$app->get('/hello/{name}', function (ServerRequestInterface $request, ResponseInterface $response, array $args) {
//	return $response->write("Hello " . $args['name']);
//});
//$app->run();

$headers = [
	"Access-Control-Allow-Origin" => "*",
	"Access-Control-Allow-Credentials" => "true",
	"Access-Control-Allow-Headers" => "Accept, Origin, Content-Type, Cache-Control, Key, X-Requested-With",
	"Access-Control-Allow-Methods" => "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD",
	"Content-type" => "application/json; charset=UTF-8",
	"Connection" => "close",
	"Access-Control-Request-Headers" => "Expiry",
];

$http_response_code = 200;
$path = !empty($_GET["path"]) ? $_GET["path"] : "index";
$request = join("/"
	,array_filter(
		explode("/"
			, explode("?"
				, mb_substr($_SERVER["REQUEST_URI"]
					, 1
					, null
				)
			)[0]
		)
		, function ($value) {
			return !empty($value);
		}
	)
);

$path = explode('/', $request);
$method = $_SERVER["REQUEST_METHOD"];
$date = (new DateTime)->format(DateTime::RFC850);
$api = [
	"code"=> 200,
	"data"=> [],
	"date"=> $date,
	"identity"=> "index",
	"message"=> "OK",
	"method"=> $method,
	"status"=> "success",
	"version_actual"=> "1.0.0",
	"version_sender"=> "1.0.0",
];
$api["input"] = $input = json_decode(file_get_contents("php://input"));
$api["error"] = null;

$ajax = [];
if (function_exists('apache_request_headers')) {
	$ajax = apache_request_headers();
} else {
	function parseRequestHeaders() {
		$headers = array();
		foreach($_SERVER as $key => $value) {
			if (substr($key, 0, 5) <> 'HTTP_') {
				continue;
			}
			$header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
			$headers[$header] = $value;
		}
		return $headers;
	}
	$ajax = parseRequestHeaders();
}

$lng = $ajax["accept-language"] ?? $ajax["Accept-Language"] ?? "ru";

// echo json_encode($lng);
// die("");





switch ($request) {
	default:
		$http_response_code = 404; // Not Found
		$api["error"] = [
			"code" => 404,
			"message" => "Not Found",
			"type" => "ServerException",
			"url" => "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5",
		];
		break;
	case "index":
		$api["identity"] = "index";
		$api["data"] = [
			"first_name" => "Anton",
			"last_name" => "Trofimenko",
			"email" => "at@mail.ru",
			"session_id" => "djbncdslkjdnlfkjhlkdjhcdfklhjk",
		];
		break;
	case "account/signin":
		$api["identity"] = "account/signin";
		switch ($method) {
			case "POST":
				$api["data"] = [
					"fullName" => "Anton Trofimenko",
					"email" => "at@mail.ru",
					"accessToken" => "djbncdslkjdnlfkjhlkdjhcdfklhjk",
				];
				break;
			default:
				$http_response_code = 400; // Bad Request
				$api["status"] = "error";
				$api["error"] = [
					"code" => 400,
					"message" => "Bad Request",
					"type" => "ServerException",
					"url" => "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1",
				];
				break;
		}
	break;
	case "user_register":
		$api["identity"] = "user_register";
		switch ($method) {
			case "POST":
				$api["data"] = [
					"fullName" => "Anton Trofimenko",
					"email" => "at@mail.ru",
					"accessToken" => "djbncdslkjdnlfkjhlkdjhcdfklhjk",
				];
				break;
			default:
				$http_response_code = 400; // Bad Request
				$api["error"] = [
					"code" => 400,
					"message" => "Bad Request",
					"type" => "ServerException",
					"url" => "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1",
				];
				break;
		}
		break;
	case "quiz":
		$api["identity"] = "quiz";
		//
		$input["accessToken"] = "SDJVKN7X34C373I7X3I7GHXCGI677X7857GHX478GHX487"; // @todo debug
		//

		//$ajax["accept-language"];

		if (empty($input["accessToken"])) {

			$http_response_code = 401; // Unauthorized

			$api["message"] = "Unauthorized";
			$api["status"] = "error";
			$api["error"] = [
				"code" => 401,
				"message" => "Unauthorized",
				"description" => "You are not authorized",
				"type" => "ServerException",
				"url" => "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2",
			];

			switch($lng) {
				case "ru":
					$api["error"]["description"] = "Авторизация не удалась";
					break;
				case "ua":
					$api["error"]["description"] = "Авторизацiя не вийшла";
                	break;
			}

		} else {
			$api["data"] = [
				[
					"quizId" => "js-beginner",
					"name" => "JavaScript Beginner",
					"isPassed" => false,
					"pointsReceived" => 0,
					"pointsTotal" => 0,
					"timeSpentTotal" => 0,
				],
				[
					"quizId" => "php-beginner",
					"name" => "PHP Beginner",
					"isPassed" => true,
					"pointsReceived" => 100,
					"pointsTotal" => 0,
					"timeSpentTotal" => 681441,
				],
				[
					"quizId" => "python-beginner",
					"name" => "Python Beginner",
					"isPassed" => true,
					"pointsReceived" => 64,
					"pointsTotal" => 0,
					"timeSpentTotal" => 623441,
				],
				[
					"quizId" => "ruby-beginner",
					"name" => "Ruby Beginner",
					"isPassed" => true,
					"pointsReceived" => 21,
					"pointsTotal" => 0,
					"timeSpentTotal" => 3476883,
				],
				[
					"quizId" => "coffe-beginner",
					"name" => "CoffeeScript Beginner",
					"isPassed" => false,
					"pointsReceived" => 0,
					"pointsTotal" => 0,
					"timeSpentTotal" => 0,
				],
			];
		}
		break;
	case "quiz_start":
		$api["identity"] = "quiz_start";
		//
		if ($method !== "POST") {
			$http_response_code = 501; // Not implemented
			$headers["Access-Control-Allow-Methods"] = join(", ", ["POST"]);
			$api["error"] = [
				"code" => 501,
				"description" => "Method (".$method.") is not allowed resource",
				"message" => "Not Implemented",
				"type" => "ServerException",
				"url" => "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2",
			];
		} else {
			$http_response_code = 201; // Created
			$api["data"] = "OK";
		}
		break;
	case "answer_get":
		$api["identity"] = "answer_get";
		//
		if ($method !== "GET") {
			$http_response_code = 501; // Not implemented
			$headers["Access-Control-Allow-Methods"] = join(", ", ["GET"]);
			$api["error"] = [
				"code" => 501,
				"description" => "Method (".$method.") is not allowed resource",
				"message" => "Not Implemented",
				"type" => "ServerException",
				"url" => "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2",
			];
		} else {
			$api["data"] = [
				"answerId" => "HMAC234MD",
				"question" => "Qustion text",
				"answers" => [
					"1). answer correct",
					"2). answer wrong",
					"3). answer wrong",
					"4). answer correct",
				],
				"answerMultiple" => true,
//				"answerCorrect" => [1, 4],
				"score" => 5,
			];
		}
		break;
	case "answer_send":
		$api["identity"] = "answer_send";
		//
		if ($method !== "POST") {
			$http_response_code = 501; // Not implemented
			$headers["Access-Control-Allow-Methods"] = join(", ", ["POST"]);
			$api["error"] = [
				"code" => 501,
				"description" => "Method (".$method.") is not allowed resource",
				"message" => "Not Implemented",
				"type" => "ServerException",
				"url" => "http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2",
			];
		} else {
			$http_response_code = 201; // Created
			$api["data"] = "OK";
		}
		break;
}
//
$api["code"] = $http_response_code;
$body = json_encode($api);
http_response_code($http_response_code);
foreach ($headers as $key => $value) {
	header($key.": ".$value);
}
ob_start();
ob_start("ob_gzhandler");
echo $body;
ob_end_flush();
header("Content-Length: ".ob_get_length());
header("Accept-Ranges: bytes");
ob_end_flush();
ob_end_flush();
