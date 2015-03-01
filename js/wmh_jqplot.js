var display = {
	sensorlog_ids: ["2"],
	show_target: false,
	display_type: "graph",
}

function renderTree() {
	$('#jstree_div').jstree(	
        tree_data
	);
	// Listen for event: tree changing
	$('#jstree_div').on("changed.jstree", function (e, data) {
	   display.sensorlog_ids = data.selected;
	   plot1 = render_display();
	   show_stat_text();
    });
};

function get_display_data(sensorlog_ids, show_target) {
	if (sensorlog_ids[0] == "2" && show_target){
		data = [data_steps, data_steps_target];
		names = ["Daily Steps", "Daily Steps Target"];
		y_label = "steps";
	}
	else if (sensorlog_ids[0] == "3" && show_target){
		data = [data_active, data_active_target];
		names = ["Daily Active Minutes", "Daily Active Minutes Target"];
		y_label = "mins";
	}
	else if (sensorlog_ids[0] == "2"){
		data = [data_steps];
		names = ["Daily Steps"];
		y_label = "steps";
	}
	else if(sensorlog_ids[0] == "3"){
		data = [data_active];
		names = ["Daily Active Minutes"];
		y_label = "mins";
	}
	
	return [data, names, y_label]
}

function renderGraph(sensorlog_ids, show_target) {
    returned_array = get_display_data(sensorlog_ids, show_target);
	data = returned_array[0];
	names = returned_array[1];
	y_label = returned_array[2];

	my_axes = {xaxis: { renderer:$.jqplot.DateAxisRenderer, label: "Date"},
	           yaxis: { label: y_label, padMin: 0, tickOptions: {formatString: "%'d"} }}
			   
			   

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

		percentage = Math.round(reached_target / total * 100.0);
		return percentage + "%";
	};

function show_stat_text() {
	if(display.show_target == true){
	    $('#stat_text').text('You have reached your target ' + calculate_stat() +  ' of days');
	}
	else {	
	    $('#stat_text').empty();
	}
};

function listen_show_target(plot1) {
	$('#show_target_checkbox:input:checkbox').change(function(){
		if($(this).is(':checked')){
			display.show_target = true;
			plot1 = render_display();
			show_stat_text();
		}
		else{
			display.show_target = false;
			plot1 = render_display();
			show_stat_text();
		}
	});
	return plot1
};

function listen_change_display_type(plot1) {
	$('#display_type_select').change(function(){
		if($(this).val() == "table"){
			display.display_type = "table";
			plot1 = renderTable(display.sensorlog_ids, display.show_target);
		}
		else{
			display.display_type = "graph";
			plot1 = renderGraph(display.sensorlog_ids, display.show_target);
		}
	});
	return plot1
};

function get_day_of_week(date_str) {
	var weekday = new Array(7);
	weekday[0]=  "Sun";
	weekday[1] = "Mon";
	weekday[2] = "Tue";
	weekday[3] = "Wed";
	weekday[4] = "Thu";
	weekday[5] = "Fri";
	weekday[6] = "Sat";
	
	milliseconds_since_epoch = Date.parse(date_str);
	date = new Date(milliseconds_since_epoch);
    return weekday[date.getDay()];
}

function renderTable(sensorlog_ids, show_target) {
	returned_array = get_display_data(sensorlog_ids, show_target);
	data = returned_array[0];
	names = returned_array[1];
	y_label = returned_array[2];
	// Table Headers
	$('#webmyhealth-chart').empty();
    $('#webmyhealth-chart').html( '<div id="my-table-div"></div>' );
    $('#my-table-div').append( '<table id="my-table"></table>' );
	if(names.length > 1) {
		$('#my-table').html( '<thead><tr><th>Date</th><th>Day</th><th>' + names[0] + '</th><th>' + names[1] + '</th></tr></thead>' );
		}
	else{
		$('#my-table').html( '<thead><tr><th>Date</th><th>Day</th><th>' + names[0] + '</th></tr></thead>' );
		}
	// Table Body
	$('#my-table').append( '<tbody>' );      
	if (data.length > 1){
		for (i = 0; i < data[0].length; i++){
			$('#my-table').append('<tr><td>' + data[0][i][0] + '</td><td>' + get_day_of_week(data[0][i][0]) + '</td><td class="value-cell">' + data[0][i][1].toLocaleString() + '</td><td class="value-cell">' + data[1][i][1].toLocaleString() + '</td><tr>');
			}
		}
	else {
		for (i = 0; i < data[0].length; i++){
			$('#my-table').append('<tr><td>' + data[0][i][0] + '</td><td>' + get_day_of_week(data[0][i][0]) + '</td><td class="value-cell">' + data[0][i][1].toLocaleString() + '</td><tr>');
			}
		}
	$('#my-table').append( '</tbody>' );
	
    $("#my-table").tablesorter({
	    // Initially sort on the first column, order descending
		sortList: [[0,1]]
	});
};

function render_display() {
    if (display.display_type == "table") {
		plot1 = renderTable(display.sensorlog_ids, display.show_target);
	}
	else {
	    plot1 = renderGraph(display.sensorlog_ids, display.show_target);
	}
	return plot1;
		
};

function activate_chosen() {
    $(".chosen").chosen({disable_search_threshold: 10, width: "50%"});
	};

function show_tooltip() {
	$(this).tooltip({});
	};

$(document).ready(function(){
    renderTree();
	activate_chosen();
	// Return the plot to allow resizing of the graph
	plot1 = renderGraph(display.sensorlog_ids, display.show_target); 
	plot1 = listen_show_target(plot1);
	plot1 = listen_change_display_type(plot1);
});

$(window).resize(function(){
	if (display.display_type == "graph") {
	    plot1.replot( {resetAxes: true } );
	}
});
