<?php
	session_start ();
	require_once ("dblink.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<?php include_once("header.php"); ?>
</head>

<body>
	<!-- menu -->
	<?php require("menu.php") ?>

	<div class="map-div">
		<div class="BC-mover">
			<div class="block-container" style="border: 1px solid black;">
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-sm-1 col-sm-offset-2">
				<button class="btn btn-default" id="hid_btn" style="visibility: hidden;">Chart</button>
			</div>
			<div class="col-sm-1">
				<button class="btn btn-default" id="scroll_btn1">More History</button>
			</div>
			<div class="col-sm-1 col-sm-offset-3">
				<button class="btn btn-default" id="refresh_btn">Refresh</button>
			</div>
			<div class="col-sm-4 btn-group dropup">
				<button class="btn btn-default dropdown-disp">Floor and Network</button>
				<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">
					<span class="caret"></span>
					<span class="sr-only">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu" role="menu">
					<li><a class="f_btn" f_id="-1" href="#">B1 csie</a></li>
					<li><a class="f_btn" f_id="-2" href="#">B1 csie-5G</a></li>
<?php for ($i = 1; $i < 7; $i++) { ?>
					<li><a class="f_btn" f_id="<?=$i?>"><?=$i?>F csie</a></li>
					<li><a class="f_btn" f_id="<?=$i+7?>" href="#"><?=$i?>F csie-5G</a></li>
<?php } ?>
				</ul>
			</div>
		</div>
		<hr>	<!-- DIVIDE -->
		<div class="row" style="height: 500px;">
			<div class="col-sm-8 col-sm-offset-2">
				<table class="table">
					<tr>
						<th>#</th>
						<th>RSSI</th>
						<th>Timestamp</th>
					</tr>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-4 col-sm-offset-8">
				<button class="btn btn-default" id="scroll_btn2">Back to Map</button>
			</div>
		</div>
		<hr style="margin-bottom: 10px;">	<!-- DIVIDE -->
		<div class="row chart-row">
			<div class="col-sm-12">
				<h2 id="chart-title" align="center"></h2>
				<h6 id="chart-subtitle" align="center"></h6>
			</div>
			<div class="col-sm-12">
				<canvas id="myChart"></canvas>
			</div>
		</div>
	</div>

	<!-- footer -->

	<!-- javascript -->
	<?php include_once("include_js.php") ?>
	<script src="js/index.js"></script>
</body>
	
</html>
