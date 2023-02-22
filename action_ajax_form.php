<?php

if (isset($_POST["name"])) { 
    $result = 'name';
    echo json_encode($result); 
}

?>