<?php

class Validations {
  public static function isTextWithCommaAndPeriod($inputString) {
    // text only and characters like comma and period are allowed
    // numbers not allowed
    $pattern = '/^[.,a-zA-Z\s]+$/';
    return preg_match($pattern, $inputString);
  }

  public static function isValidEmail($email) {
    // valid email
    $emailRegex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
    return preg_match($emailRegex, $email);
  }

  public static function isValidNumber($number) {
    // valid contact number e.g. 09097762803
    $contactNumberRegex = '/^0\d{10}$/';
    return preg_match($contactNumberRegex, $number);
  }
}


?>
