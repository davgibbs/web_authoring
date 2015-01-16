function renderTree() {
	$('#jstree_div').jstree(	
        tree_data
	);
	// Listen for event: tree changing
	$('#jstree_div').on("changed.jstree", function (e, data) {
	   plot1 = renderGraph(data.selected);
    });
};

function renderGraph(sensorlog_ids, show_target) {
	if (sensorlog_ids[0] == "2" && show_target){
		data = [data1, data1_target];
		name = "Daily Steps";
		y_label = "m2";
	}
	else if (sensorlog_ids[0] == "2"){
		data = [data1];
		name = "Daily Steps";
		y_label = "m2";
	}
	else if(sensorlog_ids[0] == "3"){
		data = [data2]; /* [data, data2] */
		name = "Daily Active Minutes";
		y_label = "kll";
	}

	my_axes = {xaxis: { renderer:$.jqplot.DateAxisRenderer, label: "Date"},
	           yaxis: { label: y_label,
                       }}

	my_series_names = {label: "this here",
					   lineWidth:2, 
					   markerOptions: { style:"filledCircle", size:5 },
                       highlighter: {formatString: "%s, %s" + y_label}
					   }
	
	var my_options = {
		axes: my_axes,
		legend: { show: true, location: 'nw'},
		highlighter: {show: true, sizeAdjust: 7.5 },
		series: [my_series_names]
	};
							
	$('#webmyhealth-chart').empty();
	var plot1 = $.jqplot('webmyhealth-chart', data, my_options);

	return plot1;
};


function listen_show_target(plot1) {
	$('input:checkbox').change(function(){
		if($(this).is(':checked')){
			plot1 = renderGraph(["2"], true);
		}
	});
	return plot1
}

$(document).ready(function(){
    renderTree();
	plot1 = renderGraph(["2"], false);
	plot1 = listen_show_target(plot1);
});

$(window).resize(function(){
	plot1.replot( {resetAxes: true } );
});

