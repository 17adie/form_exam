<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Accept: application/json");

require("../../lib/core.php");
require("../../functions/user.php");
require("../../functions/validations.php");

$params = $_POST['params']; // for client side

// $params = $_GET; // for api testing using postman

$fullName = $params['_fullName'];
$emailAddress = $params['_emailAddress'];
$mobileNumber = $params['_mobileNumber'];
$dateOfBirth = $params['_dateOfBirth'];
$gender = $params['_gender'];
$age = $params['_age'];

if (empty($fullName) || empty($emailAddress) || empty($mobileNumber) || empty($dateOfBirth) || empty($gender)) {
  echo json_encode(array(
    "message" => "Please fill out all required fields.",
    "status" => false,
  ));
} elseif (!Validations::isTextWithCommaAndPeriod($fullName)) {
  echo json_encode(array(
      "message" => "Text only and characters like comma and period are allowed in the full name field.",
      "status" => false,
  ));
} elseif (!Validations::isValidEmail($emailAddress)) {
  echo json_encode(array(
      "message" => "Invalid email format.",
      "status" => false,
  ));
} elseif (!Validations::isValidNumber($mobileNumber)) {
  echo json_encode(array(
      "message" => "Invalid contact number format, e.g. 09097762803",
      "status" => false,
  ));
} else {
  $data = add_user($fullName, $emailAddress, $mobileNumber, $dateOfBirth, $gender, $age);

  echo json_encode($data);
}






