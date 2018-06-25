<html>
        <head>
    
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 10px; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src=
    "http://maps.googleapis.com/maps/api/js?key=AIzaSyB1tbIAqN0XqcgTR1-FxYoVTVq6Is6lD98&sensor=false">
    </script>
    <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
    <script type="text/javascript">

      var locations = [];

      $(document).ready(function(){ 
        url="http://104.211.187.253:3000/api/Shipment/"+'<?php echo $_GET["shipmentId"] ?>';

        $.get(url,function(data){
          $(data.locationReadings).each(function(i,v){
            temp=['loan '+(i+1),v.lat,v.lon,'address '+(i+1)];
            locations.push(temp);
            
          });
          console.log(locations);
          initialize();
        })
         
      })
    
     
      function initialize() {
    
        if(locations.length>0){
          lat=locations[0][1];
          lon=locations[0][2];
        }
        else{
          lat=17.384877135227068;
          lon=78.48459714813225;
        }

        var myOptions = {
          center: new google.maps.LatLng(lat, lon),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    
        };
        var map = new google.maps.Map(document.getElementById("default"),
            myOptions);
    
        setMarkers(map,locations)
    
      } 
      function setMarkers(map,locations){
    
          var marker, i
    
    for (i = 0; i < locations.length; i++)
     {  
    
     var loan = locations[i][0]
     var lat = locations[i][1]
     var long = locations[i][2]
     var add =  locations[i][3]
    
     latlngset = new google.maps.LatLng(lat, long);
    
      var marker = new google.maps.Marker({  
              map: map, title: loan , position: latlngset  
            });
            map.setCenter(marker.getPosition())
    
    
            var content = "Loan Number: " + loan +  '</h3>' + "Address: " + add     
    
      var infowindow = new google.maps.InfoWindow()
    
    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
            return function() {
               infowindow.setContent(content);
               infowindow.open(map,marker);
            };
        })(marker,content,infowindow)); 
    
      }
      }
     
      </script>
     </head>
     <body >
      <div id="default" style="width:100%; height:100%"></div>
     </body>
      </html>
    