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
	   /^plot1 = renderGraph(graph.sensorlog_ids, graph.show_target);*/
	   show_stat_text();
    });
};

function get_graph_data(sensorlog_ids, show_target) {
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
	
	return [data, names, y_label]
}

function renderGraph(sensorlog_ids, show_target) {
    returned_array = get_graph_data(sensorlog_ids, show_target);
	data = returned_array[0];
	names = returned_array[1];
	y_label = returned_array[2];

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
	$('#show_target_checkbox:input:checkbox').change(function(){
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
};



function renderTable(sensorlog_ids, show_target) {
	returned_array = get_graph_data(sensorlog_ids, show_target);
	data = returned_array[0];
	names = returned_array[1];
	y_label = returned_array[2];
	
	$('#webmyhealth-chart').empty();
    $('#webmyhealth-chart').html( '<table id="my-table"></table>' );
    $('#my-table').html( '<thead><tr><th>Date and Time</th><th>' + names[0] + ' (' + y_label + ')' + '</th></tr></thead>' );
	$('#my-table').append( '<tbody>' );
	for (i = 0; i < data[0].length; i++){
		$('#my-table').append('<tr><td>' + data[0][i][0] + '</td><td>' + data[0][i][1] + '</td><tr>');
		}
	$('#my-table').append( '</tbody>' );
	
    $("#my-table").tablesorter({
		 dateFormat : "yyyy-mm-dd", // ?? set the default date format
		 
		  headers: {
             0: { sorter: "shortDate" }, //, dateFormat will parsed as the default above)
          },
		 
	    // Initially sort on the first column, order descending
		sortList: [[0,1]]
	});
};

function activate_chosen() {
    $(".chosen").chosen({disable_search_threshold: 10, width: "50%"});
	};


$(document).ready(function(){
    renderTree();
	activate_chosen();
	/*plot1 = renderGraph(graph.sensorlog_ids, false); 
	plot1 = listen_show_target(plot1);*/
	
	renderTable(graph.sensorlog_ids, false);
});

$(window).resize(function(){
	plot1.replot( {resetAxes: true } );
});
