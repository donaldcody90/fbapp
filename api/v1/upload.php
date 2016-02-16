<?php
	$filename = $_FILES['file']['name'];
	$destination = '../../attachs/' . $filename;
	move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );
?>