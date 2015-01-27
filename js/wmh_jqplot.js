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


var dataSet = [
    ['Trident','Internet Explorer 4.0','Win 95+','4','X'],
    ['Trident','Internet Explorer 5.0','Win 95+','5','C'],
    ['Trident','Internet Explorer 5.5','Win 95+','5.5','A'],
    ['Trident','Internet Explorer 6','Win 98+','6','A'],
    ['Trident','Internet Explorer 7','Win XP SP2+','7','A'],
    ['Trident','AOL browser (AOL desktop)','Win XP','6','A'],
    ['Gecko','Firefox 1.0','Win 98+ / OSX.2+','1.7','A'],
    ['Gecko','Firefox 1.5','Win 98+ / OSX.2+','1.8','A'],
    ['Gecko','Firefox 2.0','Win 98+ / OSX.2+','1.8','A'],
    ['Gecko','Firefox 3.0','Win 2k+ / OSX.3+','1.9','A'],
    ['Gecko','Camino 1.0','OSX.2+','1.8','A'],
    ['Gecko','Camino 1.5','OSX.3+','1.8','A'],
    ['Gecko','Netscape 7.2','Win 95+ / Mac OS 8.6-9.2','1.7','A'],
    ['Gecko','Netscape Browser 8','Win 98SE+','1.7','A'],
    ['Gecko','Netscape Navigator 9','Win 98+ / OSX.2+','1.8','A'],
    ['Gecko','Mozilla 1.0','Win 95+ / OSX.1+',1,'A'],
    ['Gecko','Mozilla 1.1','Win 95+ / OSX.1+',1.1,'A'],
    ['Gecko','Mozilla 1.2','Win 95+ / OSX.1+',1.2,'A'],
    ['Gecko','Mozilla 1.3','Win 95+ / OSX.1+',1.3,'A'],
    ['Gecko','Mozilla 1.4','Win 95+ / OSX.1+',1.4,'A'],
    ['Gecko','Mozilla 1.5','Win 95+ / OSX.1+',1.5,'A'],
    ['Gecko','Mozilla 1.6','Win 95+ / OSX.1+',1.6,'A'],
    ['Gecko','Mozilla 1.7','Win 98+ / OSX.1+',1.7,'A'],
    ['Gecko','Mozilla 1.8','Win 98+ / OSX.1+',1.8,'A'],
    ['Gecko','Seamonkey 1.1','Win 98+ / OSX.2+','1.8','A'],
    ['Gecko','Epiphany 2.20','Gnome','1.8','A'],
    ['Webkit','Safari 1.2','OSX.3','125.5','A'],
    ['Webkit','Safari 1.3','OSX.3','312.8','A'],
    ['Webkit','Safari 2.0','OSX.4+','419.3','A'],
    ['Webkit','Safari 3.0','OSX.4+','522.1','A'],
    ['Webkit','OmniWeb 5.5','OSX.4+','420','A'],
    ['Webkit','iPod Touch / iPhone','iPod','420.1','A'],
    ['Webkit','S60','S60','413','A'],
    ['Presto','Opera 7.0','Win 95+ / OSX.1+','-','A'],
    ['Presto','Opera 7.5','Win 95+ / OSX.2+','-','A'],
    ['Presto','Opera 8.0','Win 95+ / OSX.2+','-','A'],
    ['Presto','Opera 8.5','Win 95+ / OSX.2+','-','A'],
    ['Presto','Opera 9.0','Win 95+ / OSX.3+','-','A'],
    ['Presto','Opera 9.2','Win 88+ / OSX.3+','-','A'],
    ['Presto','Opera 9.5','Win 88+ / OSX.3+','-','A'],
    ['Presto','Opera for Wii','Wii','-','A'],
    ['Presto','Nokia N800','N800','-','A'],
    ['Presto','Nintendo DS browser','Nintendo DS','8.5','C/A<sup>1</sup>'],
    ['KHTML','Konqureror 3.1','KDE 3.1','3.1','C'],
    ['KHTML','Konqureror 3.3','KDE 3.3','3.3','A'],
    ['KHTML','Konqureror 3.5','KDE 3.5','3.5','A'],
    ['Tasman','Internet Explorer 4.5','Mac OS 8-9','-','X'],
    ['Tasman','Internet Explorer 5.1','Mac OS 7.6-9','1','C'],
    ['Tasman','Internet Explorer 5.2','Mac OS 8-X','1','C'],
    ['Misc','NetFront 3.1','Embedded devices','-','C'],
    ['Misc','NetFront 3.4','Embedded devices','-','A'],
    ['Misc','Dillo 0.8','Embedded devices','-','X'],
    ['Misc','Links','Text only','-','X'],
    ['Misc','Lynx','Text only','-','X'],
    ['Misc','IE Mobile','Windows Mobile 6','-','C'],
    ['Misc','PSP browser','PSP','-','C'],
    ['Other browsers','All others','-','-','U']
];

function renderTable() {
	$('#webmyhealth-chart').empty();
    $('#webmyhealth-chart').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example" style="max-width:600px"></table>' );
 
    $('#example').dataTable( {
        "data": data1,
        "columns": [
            { "title": "Date and Time" },
			{ "title": "Day" },
            { "title": "Value" },
            /*{ "title": "Platform" },
            { "title": "Version", "class": "center" },
            { "title": "Grade", "class": "center" }*/
        ],
		"ColReorder": {
            "Order": [0, 2, 1]
        },
    } ); 
};

function activate_chosen() {
    $(".chosen").chosen({disable_search_threshold: 10, width: "50%"});
	};


$(document).ready(function(){
    renderTree();
	activate_chosen();
	plot1 = renderGraph(graph.sensorlog_ids, false); 
	plot1 = listen_show_target(plot1);
	
	/*renderTable();*/
});

$(window).resize(function(){
	plot1.replot( {resetAxes: true } );
});
