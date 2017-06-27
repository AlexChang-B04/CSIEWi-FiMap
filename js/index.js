var signal_color = ["#FF0000", "#FF1100", "#FF2300", "#FF3400", "#FF4600", "#FF5700",
					"#FF6900", "#FF7B00", "#FF8C00", "#FF9E00", "#FFAF00", "#FFC100",
					"#FFD300", "#FFE400", "#FFF600", "#F7FF00", "#E5FF00", "#D4FF00",
					"#D4FF00", "#B0FF00", "#9FFF00", "#8DFF00", "#7CFF00", "#6AFF00",
					"#58FF00", "#47FF00", "#35FF00", "#24FF00", "#12FF00", "#00FF00"];
var f_id = 0;
var image_name = "";

function color_sigblock() {
	var blocks = document.getElementsByClassName("signal-block");
	var color_index = 0;
	for (var i = 0; i < blocks.length; i++) {
		var rssi = parseFloat(blocks[i].getAttribute("rssi"));
		if (rssi >= -40) {
			color_index = 29;
		} else if (rssi >= -70) {
			color_index = Math.floor(rssi + 70);
		}
		blocks[i].style.backgroundColor = signal_color[color_index];
	}
}

function move_blocks() {
	var width  = $(window).width();
	var left_offset = parseInt(document.getElementsByClassName("BC-mover")[0].getAttribute("left"));
	
	if (width >= 593) {
		$(".BC-mover").css({"left": ((width-593)/2+left_offset)+"px"});
	} else {
		$(".BC-mover").css({"left": left_offset+"px"});
	}
}

$(".f_btn").click(function() {
	f_id = $(this).attr("f_id");
	if (f_id > 0) { image_name = "src/img/map_" + (f_id%7) + ".jpg"; }
	else { image_name = "src/img/map_-1.jpg"; }

	$(".dropdown-disp").html($(this).text());
	$(".map-div").css("background-image", "url('" + image_name + "')");
	$.ajax({
		url: 'signal_block.php',
		type: 'GET',
		data: {
			"f_id": f_id
		},
		dataType: 'json',
		error: function(xhr) { console.log(xhr); },
		success: function(response) {
			console.log(response);
			var floor = response.floor;
			var sigblock = response.sigblock;
			var fixed_dev = response.fixed_dev;

			$(".BC-mover").attr("top", floor.t_off);
			$(".BC-mover").attr("left", floor.l_off);
			$(".BC-mover").css("top", floor.t_off + "px");
			$(".signal-block").remove();
			for (var i = 0; i < sigblock.length; i++) {
				jQuery('<div/>', {
					class: "signal-block",
					id: "sb_" + (sigblock[i].x_pos*17+sigblock[i].y_pos),
					style: "top:" + sigblock[i].x_pos*28.7 + "px;left:" + sigblock[i].y_pos*28.7 + "px;",
					"data-toggle": "popover",
					"data-placement": "top",
					"data-trigger": "hover",
					"data-html": "true",
					"data-content": '<span class="glyphicon glyphicon-signal"></span> RSSI: ' + 
									sigblock[i].rssi + 
									'  <span class="glyphicon glyphicon-transfer"></span> TxRate: ' + 
									sigblock[i].txrate + 
									"<br>Last Update: " + sigblock[i].update_time,
					"rssi": sigblock[i].rssi,
					"x_pos": sigblock[i].x_pos,
					"y_pos": sigblock[i].y_pos,
					"dynamic": 0
				}).appendTo(".block-container");
			}
			for (var i = 0; i < fixed_dev.length; i++) {
				var dev = $('#sb_'+(fixed_dev[i].x_pos*17+fixed_dev[i].y_pos));
				dev.css("border", "2px dashed red");
				dev.attr("dynamic", "1");
			}
			if (sigblock.length == 0) {
				for (var x = 0; x < floor.row_num; x++) {
					for (var y = 0; y < floor.col_num; y++)
					jQuery('<div/>', {
						class: "signal-block",
						id: "sb_" + (x*17+y),
						style: "top:" + x*28.7 + "px;left:" + y*28.7 + "px;",
						"data-toggle": "popover",
						"data-placement": "top",
						"data-trigger": "hover",
						"data-html": "true",
						"data-content": "RSSI: " + "<br>TxRate: ",
						"rssi": -70,
						"x_pos": x,
						"y_pos": y,
					}).appendTo(".block-container");
				}
			}
			color_sigblock();
			move_blocks();
			$('[data-toggle="popover"]').popover({container: "body"});
		}
	});
});

$("#refresh_btn").click(function() {
	if (f_id !== 0)	{
		$.ajax({
			url: 'signal_block.php',
			type: 'GET',
			data: {
				"f_id": f_id
			},
			dataType: 'json',
			error: function(xhr) { console.log(xhr); },
			success: function(response) {
				console.log(response);
				var floor = response.floor;
				var sigblock = response.sigblock;
				var fixed_dev = response.fixed_dev;

				$(".signal-block").remove();
				for (var i = 0; i < sigblock.length; i++) {
					jQuery('<div/>', {
						class: "signal-block",
						id: "sb_" + (sigblock[i].x_pos*17+sigblock[i].y_pos),
						style: "top:" + sigblock[i].x_pos*28.7 + "px;left:" + sigblock[i].y_pos*28.7 + "px;",
						"data-toggle": "popover",
						"data-placement": "top",
						"data-trigger": "hover",
						"data-html": "true",
						"data-content": '<span class="glyphicon glyphicon-signal"></span> RSSI: ' + 
										sigblock[i].rssi + 
										'  <span class="glyphicon glyphicon-transfer"></span> TxRate: ' + 
										sigblock[i].txrate + 
										"<br>Last Update: " + sigblock[i].update_time,
						"rssi": sigblock[i].rssi,
						"x_pos": sigblock[i].x_pos,
						"y_pos": sigblock[i].y_pos,
						"dynamic": 0
					}).appendTo(".block-container");
				}
				for (var i = 0; i < fixed_dev.length; i++) {
					var dev = $('#sb_'+(fixed_dev[i].x_pos*17+fixed_dev[i].y_pos));
					dev.css("border", "2px dashed red");
					dev.attr("dynamic", "1");
				}
				if (sigblock.length == 0) {
					for (var x = 0; x < floor.row_num; x++) {
						for (var y = 0; y < floor.col_num; y++)
						jQuery('<div/>', {
							class: "signal-block",
							id: "sb_" + (x*17+y),
							style: "top:" + x*28.7 + "px;left:" + y*28.7 + "px;",
							"data-toggle": "popover",
							"data-placement": "top",
							"data-trigger": "hover",
							"data-html": "true",
							"data-content": "RSSI: " + "<br>TxRate: ",
							"rssi": -70,
							"x_pos": x,
							"y_pos": y,
						}).appendTo(".block-container");
					}
				}
				color_sigblock();
				$('[data-toggle="popover"]').popover({container: "body"});
			}
		});
	}
});

$("#scroll_btn1").click(function() {
	$("html, body").clearQueue().animate({ scrollTop: $("#hid_btn").offset().top - 20 }, 300);
});

$("#scroll_btn2").click(function() {
	$("html, body").clearQueue().animate({ scrollTop: 0 }, 300);
});

$("#hid_btn").click(function() {
	var x_pos = $(this).attr("x_pos");
	var y_pos = $(this).attr("y_pos");
	console.log(f_id, x_pos, y_pos)

	$.ajax({
		url: 'signal_block.php',
		type: 'GET',
		data: {
			"f_id": f_id,
			"x_pos": x_pos,
			"y_pos": y_pos,
			"active": true
		},
		dataType: 'json',
		error: function(xhr) { console.log(xhr); },
		success: function(response) {
			console.log(response);
			var rssi = [];
			var label = [];
			for (var i = 0; i < response.rssi.length && i < 120; i++) {
				rssi[i] = -parseInt(response.rssi[i].rssi);
				label[i] = i;
			}
			console.log(rssi);
			$('<h1>', {
				"text": "Recent 120 Signal Record",
				"align": "center"
			}).appendTo(".chart-title");
			//Get context with jQuery - using jQuery's .get() method.
			var ctx = $("#myChart").get(0).getContext("2d");
			//This will get the first returned node in the jQuery collection.
			var myNewChart = new Chart(ctx);
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: label,
					datasets: [{
						backgroundColor: 'rgba(200, 0, 0, 0.1)',
						borderColor: 'rgba(200, 0, 0, 0.5)',
						borderWidth: 1,
						pointBackgroundColor: '#FF0000',
						pointBorderColor: '#FFFFFF',	
						lineBorderColor: 'rgba(255, 0, 0, 1)',
						lineBackgroundColor: 'rgba(255, 0, 0, 1)',
						label: 'RSSI',
						data: rssi
					}]
				},
				option: {
				}
			});
			/*
			var ctx = document.getElementById("myChart");
			var myLineChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: label,
					datasets: [{
						color:"#F7464A",
						label: "RSSI",
						data: rssi
			        }]
			    },
			    options: {}
			});
			*/
			$("#chart-title").text("Recent 120 Signal Record");
			$("#chart-subtitle").text("at ( " + x_pos + ", " + y_pos + " ) of " + $(".dropdown-disp").text());
			$("html, body").clearQueue().animate({ scrollTop: $(".chart-row").offset().top - 50 }, 300);
		}
	});
});

$(document).on("click", ".signal-block", function(event) {
	var x_pos = $(this).attr("x_pos");
	var y_pos = $(this).attr("y_pos");
	var dynamic = $(this).attr("dynamic");

	$.ajax({
		url: 'signal_block.php',
		type: 'GET',
		data: {
			"f_id": f_id, "x_pos": x_pos, "y_pos": y_pos
		},
		dataType: 'json',
		error: function(xhr) { console.log(xhr); },
		success: function(response) {
			console.log(response);
			var history = response.history;

			$(".block-history").remove();
			$("#hid_btn").css("visibility", "hidden");
			for (var i = 0; i < history.length; i++) {
				var rssi = parseFloat(history[i].rssi);
				var color_index = 0;
				if (rssi >= -40) { color_index = 29; }
				else if (rssi >= -70) { color_index = Math.floor(rssi+70); }

				var tmp_tr = $('<tr>', { "class": "block-history" });

				var no_td = $('<td>', { "text": i }).appendTo(tmp_tr);
				var rssi_td = $('<td>', {
					"text": history[i].rssi,
					"style": "background-color:" + signal_color[color_index],
				}).appendTo(tmp_tr);
				var time_td = $('<td>', { "text": history[i].log_time, }).appendTo(tmp_tr);

				tmp_tr.appendTo(".table");
				if (dynamic == 1) {
					$("#hid_btn").css("visibility", "visible");
					$("#hid_btn").attr("x_pos", x_pos);
					$("#hid_btn").attr("y_pos", y_pos);
				}
			}
			//$("html, body").clearQueue().animate({ scrollTop: $("#hid_btn").offset().top }, 300);
		}
	});
});

$(window).resize(function() {
	move_blocks();
});

$(document).ready(function(){
    
});