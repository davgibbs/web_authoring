var graph = {
	sensorlog_ids: ["2"],
	show_target: false,
}

function renderTree() {
	$('#jstree_div').jstree(	
        tree_data
	);
	// Listen for event: tree changing
	$('#jstree_div').on("changed.jstree", function (e, data) {
	   graph.sensorlog_ids = data.selected;
	   plot1 = renderGraph(graph.sensorlog_ids, graph.show_target);
	   show_stat_text();
    });
};

function renderGraph(sensorlog_ids, show_target) {
	if (sensorlog_ids[0] == "2" && show_target){
		data = [data1, data1_target];
		names = ["Daily Steps", "Daily Steps Target"];
		y_label = "steps";
	}
	else if (sensorlog_ids[0] == "3" && show_target){
		data = [data2, data2_target];
		names = ["Daily Active Minutes", "Daily Active Minutes Target"];
		y_label = "mins";
	}
	else if (sensorlog_ids[0] == "2"){
		data = [data1];
		names = ["Daily Steps"];
		y_label = "steps";
	}
	else if(sensorlog_ids[0] == "3"){
		data = [data2];
		names = ["Daily Active Minutes"];
		y_label = "mins";
	}

	my_axes = {xaxis: { renderer:$.jqplot.DateAxisRenderer, label: "Date"},
	           yaxis: { label: y_label,}}

	var wmh_series = new Array();
    for (i = 0; i < names.length; i++) { 
		wmh_series.push({label: names[i],
						   lineWidth:2, 
						   markerOptions: { style:"filledCircle", size:5 },
						   highlighter: {formatString: "%s, %s" + y_label}
						   });
	}
	
	var my_options = {
		axes: my_axes,
		legend: { show: true, location: 'nw'},
		highlighter: {show: true, sizeAdjust: 7.5 },
		series: wmh_series
	};
							
	$('#webmyhealth-chart').empty();
	var plot1 = $.jqplot('webmyhealth-chart', data, my_options);

	return plot1;
};

function calculate_stat() {
	    var total = 0;
	    var reached_target = 0;
        for (i = 0; i < data[0].length; i++) {
			if ( data[0][i][1] >= data[1][i][1] ) {
				reached_target += 1;
			}
			total += 1;
		}

		percentage = reached_target / total * 100.0;
		return percentage + "%";
	};

function show_stat_text() {
	if(graph.show_target == true){
	    $('#stat_text').text('You have reached your target ' + calculate_stat() +  ' of days');
	}
	else {	
	    $('#stat_text').empty();
	}
};

function listen_show_target(plot1) {
	$('input:checkbox').change(function(){
		if($(this).is(':checked')){
			graph.show_target = true;
			plot1 = renderGraph(graph.sensorlog_ids, graph.show_target);
			show_stat_text();
		}
		else{
			graph.show_target = false;
			plot1 = renderGraph(graph.sensorlog_ids, graph.show_target);
			show_stat_text();
		}
	});
	return plot1
}

$(document).ready(function(){
    renderTree();
	plot1 = renderGraph(graph.sensorlog_ids, false);
	plot1 = listen_show_target(plot1);
});

$(window).resize(function(){
	plot1.replot( {resetAxes: true } );
});