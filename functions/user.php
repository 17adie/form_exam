<?php

function add_user($fullName, $emailAddress, $mobileNumber, $dateOfBirth, $gender, $age){

  $query = "INSERT 
            INTO `users` (`fullName`, `emailAddress`, `mobileNumber`, `dateOfBirth`, `gender`, `age`) 
            VALUES (:fullName, :emailAddress, :mobileNumber, :dateOfBirth, :gender, :age)
          ";
  try{
    $db = getConnection();
    $statement = $db->prepare($query);
    $arr = array(
      ":fullName" => $fullName,
      ":emailAddress" => $emailAddress,
      ":mobileNumber" => $mobileNumber,
      ":dateOfBirth" => $dateOfBirth,
      ":gender" => $gender,
      ":age" => $age,
  );

    if($statement->execute($arr)){

        $data = array(
          "message" => "New user has been added successfully.",
          "status" => true,
        );

      return $data;
    } else {
      $data = array(
        "message" => "Error: Please try again",
        "status" => false,
      );

      return $data;
    }

  } catch(PDOException $e){
    echo '{"error":{"text" ' . __FUNCTION__ . ':' . $e->getMessage() . '}}';
  }

}
?>