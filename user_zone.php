<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Tracking</title>
  <meta name="description" content="Tracking">
  <meta name="author" content="">
  <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>  

  <link rel="stylesheet" href=" https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 
</head>
<script>
 //1511173052
    var id='<?php echo $_GET['id'];?>';
	console.log(222);
    url='http://104.211.187.253:3000/api/Shipment?filter=%7B%22where%22%3A%20%7B%22shipmentId%22%3A%20%20%22'+id+'%22%7D%7D';
     console.log(url);
    $(document).ready(function(){
        
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.load('current', {
        callback: function () {
 
            shipmentId=$('#idShipment').val();
             
            $.get(url,function(data1){
                data1=data1[0];
                
                array=[];
                $(data1.temperatureReadings).each(function(i,v){
                    if(i%2==0){
                        year=v.timestamp.split('T')[0].split('-')[0]
                        month=v.timestamp.split('T')[0].split('-')[1]
                        day=v.timestamp.split('T')[0].split('-')[2]
                        hour=v.timestamp.split('T')[1].split(':')[0]
                        min=v.timestamp.split('T')[1].split(':')[1]
                        sec=v.timestamp.split('T')[1].split(':')[2].split('.')[0]
                        date=new Date(year, month, day, hour, min, sec);  
                        temp=[date,v.centigrade];
                        array.push(temp);
                    }
                   
                })

                var data = new google.visualization.DataTable();
                data.addColumn('datetime', 'Dato');
                data.addColumn('number', 'Centigrade'); 
                data.addRows(array);
                var tickMarks = [];
                for (var i = 0; i < data.getNumberOfRows(); i++) {
                  tickMarks.push(data.getValue(i, 0));
                } 
                var options = {
                    chart: {
                      title: 'Anbefalede og nuværende ugepriser',
                      subtitle: 'Blå: Anbefalede priser, Rød: Nuværende priser'
                    },
                    legend: { position:'none' },
                    width: '100%',
                    pointSize: 10,
                    explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
                    hAxis: {
                      format: '',
                      ticks: tickMarks
                    }
                  };
                  $('#linechart_core').html('');
                  chart = new google.visualization.LineChart(document.getElementById('linechart_core'));
                  chart.draw(data, options); 
            })
            
        },
        packages: ['corechart', 'line']
      });
          
      });
</script>
<body style="    background: #072b32;    color: #fff;">
<div class="container">
    <div class="col-sm-12 col-xs-12">
        <h3>Temparature History</h3>
        <div id="linechart_core"></div>
    </div>
    
    <div class="col-sm-12 col-xs-12">
        <hr style="margin:2px">
        <h3>Location History</h3>
        <iframe id="iframe" style="display: block; width: 100%; border: none; height: 340px;" src="./map_path.php?shipmentId=<?php echo $_GET['id'];?>"></iframe>
    </div>
    
    
</div>

</body>
</html>

