<?php

session_start();

function return_floor_sigblock($f_id) {
	require_once ("dblink.php");

	if( is_numeric($f_id) && intval($f_id) < 16 ) {
		$sql_cmd = "select * from floor where f_id=" . $f_id;
		$sql_result = $db->query($sql_cmd) or die();
		$floor = $sql_result->fetchall()[0];

		$sql_cmd = "select x_pos, y_pos, rssi, txrate, update_time from sigblock where f_id=" . $f_id;
		$sql_result = $db->query($sql_cmd) or die();
		$sigblock = $sql_result->fetchall();

		$sql_cmd = "select x_pos, y_pos from fix_signal_device where f_id=" . $f_id;
		$sql_result = $db->query($sql_cmd) or die();
		$fixed_dev = $sql_result->fetchall();

		$response = array(
			"mode" => "success",
			"msg" => "data transfer success: f_id(" . $f_id . ")",
			"floor" => $floor,
			"sigblock" => $sigblock,
			"fixed_dev" => $fixed_dev
		);
	} else {
		$response = array(
			"mode" => "error",
			"msg" => "ERROR: f_id (" . $f_id . ") is not a legal format!!"
		);
	}

	echo json_encode($response);
}

function return_sigblock_history($f_id, $x_pos, $y_pos) {
	require_once ("dblink.php");

	if( is_numeric($f_id) && intval($f_id) < 16 && is_numeric($x_pos) && is_numeric($y_pos)) {
		$sql_cmd = "select rssi, log_time from sigblock_history where f_id=" . $f_id . " and x_pos=" . $x_pos . " and y_pos=" . $y_pos . " order by log_time DESC limit 12";
		$sql_result = $db->query($sql_cmd) or die();
		$history = $sql_result->fetchall();

		$response = array(
			"mode" => "success",
			"msg" => "data transfer success",
			"history" => $history
		);
	} else {
		$response = array(
			"mode" => "error",
			"msg" => "ERROR: not legal format!!"
		);
	}

	echo json_encode($response);
}

function return_fixed_history($f_id, $x_pos, $y_pos) {
	require_once ("dblink.php");

	if( is_numeric($f_id) && intval($f_id) < 16 && is_numeric($x_pos) && is_numeric($y_pos)) {
		$sql_cmd = "select rssi from fix_signal_log where f_id=" . $f_id . " and x_pos=" . $x_pos . " and y_pos=" . $y_pos . " order by log_time DESC limit 120";
		$sql_result = $db->query($sql_cmd) or die();
		$result = $sql_result->fetchall();
		$response = array(
			"mode" => "success",
			"msg" => "data transfer success",
			"rssi" => $result
		);
	} else {
		$response = array(
			"mode" => "error",
			"msg" => "ERROR: not legal format!!"
		);
	}

	echo json_encode($response);
}

?>

<?php

if ( isset($_GET["x_pos"]) && isset($_GET["y_pos"]) ) {
	$f_id = $_GET["f_id"];
	$x_pos = $_GET["x_pos"];
	$y_pos = $_GET["y_pos"];
	if ( isset($_GET["active"]) ) { return_fixed_history($f_id, $x_pos, $y_pos); }
	else { return_sigblock_history($f_id, $x_pos, $y_pos); }
} else if ( isset($_GET["f_id"]) ) {
	$f_id = $_GET["f_id"];
	return_floor_sigblock($f_id);
}

?>