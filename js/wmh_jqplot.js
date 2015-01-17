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
    });
};

function renderGraph(sensorlog_ids, show_target) {
	if (sensorlog_ids[0] == "2" && show_target){
		data = [data1, data1_target];
		names = ["Daily Steps", "Daily Steps Target"];
		y_label = "m2";
	}
	else if (sensorlog_ids[0] == "3" && show_target){
		data = [data2, data2_target];
		names = ["Daily Active Minutes", "Daily Active Minutes Target"];
		y_label = "kll";
	}
	else if (sensorlog_ids[0] == "2"){
		data = [data1];
		names = ["Daily Steps"];
		y_label = "m2";
	}
	else if(sensorlog_ids[0] == "3"){
		data = [data2];
		names = ["Daily Active Minutes"];
		y_label = "kll";
	}

	my_axes = {xaxis: { renderer:$.jqplot.DateAxisRenderer, label: "Date"},
	           yaxis: { label: y_label,
                       }}

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


function listen_show_target(plot1) {
	$('input:checkbox').change(function(){
		if($(this).is(':checked')){
			graph.show_target = true;
			plot1 = renderGraph(graph.sensorlog_ids, graph.show_target);
		}
		else{
			graph.show_target = false;
			plot1 = renderGraph(graph.sensorlog_ids, graph.show_target);
		}
	});
}

$(document).ready(function(){
    renderTree();
	plot1 = renderGraph(graph.sensorlog_ids, false);
	listen_show_target(plot1);
});

$(window).resize(function(){
	plot1.replot( {resetAxes: true } );
});

