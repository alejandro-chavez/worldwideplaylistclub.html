<?php

if(isset($_POST['submit'])) {

	  $s1 = $_POST['song1'];
    $a1 = $_POST['artist1'];
    $s2= $_POST['song2'] ;
    $a2= $_POST['artist2'] ;
    $s3 = $_POST['song3'] ;
    $a3 = $_POST['artist3'] ;
    $s4 = $_POST['song4'] ;
    $a4= $_POST['artist4'] ;
    $s5= $_POST['song5'] ;
    $a5 = $_POST['artist5'] ;
    $s6 = $_POST['song6'] ;
    $a6   = $_POST['artist6'] ;
    $s7  = $_POST['song7'] ;
    $a7 = $_POST['artist7'] ;
    $s8  = $_POST['song8'] ;
    $a8 = $_POST['artist8'] ;
    $s9  = $_POST['song9'] ;
    $a9   = $_POST['artist9'] ;
		$s10 = $_POST['song10'];
    $a10 = $_POST['artist10'];
} 

    $playlist = array(
		array("$s1,$a1"),
		array("$s2,$a2"),
		array("$s3,$a3"),
		array("$s4,$a4"),
		array("$s5,$a5"),
		array("$s6,$a6"),
		array("$s7,$a7"),
		array("$s8,$a8"),
		array("$s9,$a9"),
		array("$s10,$a10"),
	  );

	 echo $playlist; ?>

		</body>
		</html>
