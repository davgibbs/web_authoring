function renderGraphAjax(sensorlog_ids, from_date, to_date, owner_id) {
	var jsonurl = "./sensorlog" + sensorlog_ids[0] + ".json";
    var posting = $.post(jsonurl, 
        {"json": JSON.stringify(
            {"sensorlog_ids": sensorlog_ids, 'from_date': from_date, 'to_date': to_date, 'owner_id': owner_id}
			)}
		);

        posting.done(function( data ) {		
            var now = JSON.parse(data);
			
            var datapoints_array = now["results"][0]["datapoints_array"];
            var errors = now["results"][0]["errors"];
            var no_datapoints = now["results"][0]["no_datapoints"];
            var sensorlog_name_array = now["results"][0]["sensorlog_name_array"];


			$('#webmyhealth-chart').empty();
            $("#content").text(''); // just empty content?
			$("#content").append('<div id="sensorlog-name" style="left: 40px; width:930px;"></div>')
            $("#content").append('<div id="webmyhealth-chart" style="left: 40px; width:930px;"></div>')


			$("#sensorlog-name").empty();
            if (sensorlog_name_array.length == 1){
                $("#sensorlog-name").append(sensorlog_name_array[0][0]);
            }

            if (errors.length > 0){
//                $("#sensorlogs-detail-list").add("<div id=returned-errors></div>");
//                for (i = 0; i < errors.length; i++){
//                    $("#returned-errors").append("<p>" + errors[i] + "</p>");
//                }
                for (i = 0; i < errors.length; i++){
                    $("#content").append('<p style="position: absolute; left: 20px;">' + errors[i] + '</p>');
                }
            }
            else if(no_datapoints == true) {
                $("#content").append('<p style="position: absolute; left: 20px;">No datapoints available</p>');
            }

            else {

                my_series_names = []
                for (i = 0; i < sensorlog_name_array.length; i++) { 
                        my_series_names.push({ label: sensorlog_name_array[i][0], lineWidth:2, yaxis: sensorlog_name_array[i][1], highlighter: {formatString: "%s, %s" + sensorlog_name_array[i][2]}, markerOptions: { style:"filledCircle", size:5 },})
                    }

                var legend_flag = false;
                if (sensorlog_name_array.length > 1){
                    legend_flag = true;
                }

                my_axes = {xaxis:{renderer:$.jqplot.DateAxisRenderer}, }

                for (i = 0; i < sensorlog_name_array.length; i++) { 
                    my_axes[sensorlog_name_array[i][1]] = {label: sensorlog_name_array[i][2]};
                    }

                var my_options = {
                    axes: my_axes,
                    legend: { show: legend_flag, location: 'nw'},
                    highlighter: {show: true, sizeAdjust: 7.5 },
                    series: my_series_names
                };
                var plot1 = $.jqplot('webmyhealth-chart', datapoints_array, my_options);
                }

                // Update URL
                /*old_ids = self._get_qs_value(location.search.substring(1), 'sensorlog_ids')
                new_url = document.location.search.replace(old_ids, sensorlog_ids);
                window.history.pushState('','',new_url);*/

    });
};

function renderTree() {
	alert("here");
	// ajax demo
	/*$('#jstree_div').jstree({
		'json_data' : {
			'ajax' : {
				"url" : "./root.json",
				"dataType" : "json", // needed only if you do not supply JSON headers
				"success": function (data) {alert('hi guys');}
			}
		},
		'plugins': ["json_data", "themes", "ui"]
	});*/
};

function renderTree2() {
	// inline data demo
	$('#jstree_div').jstree({
		'core' : {
			'data' : [
				{ "text" : "Root node", "id":1, "children" : [
						{ "id":2, "text" : "Child node 1" },
						{ "id":3, "text" : "Child node 2" }
				]}
			]
		}
	});
};



$(document).ready(function(){
	renderTree2();
	renderGraphAjax(["1"], null, null, null);
});