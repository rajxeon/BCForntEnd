
var remoteBase="http://104.211.187.253:3000/api/";
var loader='<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/afb8cb36197347.5713616457ee5.gif" style=" margin: 0 auto; display: block; max-width:100% ">';
var loaderSmall='<img src="https://hackspk.com/trainer/nbalivemobile/process.gif" style=" margin: 0 auto; display: block; max-width:100%; width:24px">';

var userContentInit='';
var currentUser;
var lastArray=[];


$(document).ready(function(){
  
    //getGrower();
    userContentInit=$('#userContent').html();

    $('#modals').on('hidden.bs.modal', function () { 
        $('#dyn_header').show(); 
        $('#modal_footer').html('');
        $('#modal_title').html('');
      })
    
});

function getGrower(){
    url=remoteBase+"Grower"
    jQuery.get(url,{},function(data){  console.log(data);  });
}

function addParticipant(p_name){
    form='';
    form+='<div class="input-group"> \
            <span class="input-group-addon" ><i class="glyphicon glyphicon-envelope"></i></span> \
            <input type="text" class="form-control" placeholder="Email" id="ae_email"> \
        </div><br>';
    form+='<div class="input-group"> \
        <span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span> \
        <input type="password" class="form-control" placeholder="Password" id="ae_password"> \
    </div><br>';
    form+='<div class="input-group"> \
        <span class="input-group-addon" ><i class="glyphicon glyphicon-usd"></i></span> \
        <input type="number" class="form-control" value="2000" placeholder="Account Balance" id="ae_accountBalance"> \
    </div><br>';
    form+='<div class="input-group"> \
        <span class="input-group-addon" ><i class="glyphicon glyphicon-home"></i></span> \
        <input type="text" class="form-control" value="Hyderabad" placeholder="City" id="ae_city"> \
    </div><br>';
    form+='<div class="input-group"> \
        <span class="input-group-addon" ><i class="glyphicon glyphicon-globe"></i></span> \
        <input type="text" class="form-control" value="India" placeholder="Country" id="ae_country"> \
    </div><br>';
    form+='<div class="input-group"> \
        <span class="input-group-addon" ><i class="glyphicon glyphicon-road"></i></span> \
        <input type="text" class="form-control" value="MG Marg" placeholder="Street" id="ae_street"> \
    </div><br>';
    form+='<div class="input-group"> \
        <span class="input-group-addon" ><i class="glyphicon glyphicon-barcode"></i></span> \
        <input type="number" class="form-control" value="500031" placeholder="ZIP" id="ae_zip"> \
    </div><br>';

    

    $('#modal_title').html('').html("Add new "+p_name);
    $('#modal_body').html('').html(form);
    $('#modal_footer').html('').append("<button type=\"button\" class=\"btn btn-primary\" id='sv_btn' onclick='saveParticipant(\""+p_name+"\")'>Save changes</button>");
    $('#modals').modal("show");

}

function saveParticipant (p_name){    
    $('#sv_btn').html('Please wait..');
    email=$('#ae_email').val();
    password=$('#ae_password').val();
    accountBalance=$('#ae_accountBalance').val();
    city=$('#ae_city').val();
    country=$('#ae_country').val();
    street=$('#ae_street').val();
    zip=$('#ae_zip').val();

    url=getUrl(p_name);

    $.post(url,{email:email,password:password,accountBalance:accountBalance
        ,city:city,country:country,street:street,zip:zip
    },function(data){   
        if(data.email==email){ 
            $.notify( "Successfully added", { position: 'bottom left',className: 'success' } );
            $('#modals').modal("hide");
        }
        else{
            $.notify( "Error", { position: 'bottom left',className: 'error' } );
            
        }
    });
}

function login(self,p_name){
    url=getUrl(p_name);
    tile=$(self).closest('.tile');
    password=($(tile).find('.password').val());
    email=($(tile).find('.email').val());
    
     
    url+='?filter=%7B%22where%22%3A%20%7B%22and%22%3A%5B%7B%22password%22%3A%20%22'+password+'%22%7D%2C%7B%22email%22%3A%20%22'+email+'%22%7D%5D%7D%7D';
    $.get(url,function(data){
        if(data.length==0){
            $.notify( "Invalid Credentials", { position: 'bottom left',className: 'error' } );
            return;
        }else{
            currentUser=data[0];
            $.notify( "Welcome "+currentUser.email, { position: 'bottom left',className: 'success' } );
            currentUser=currentUser;
            show_userDashboard(p_name);
        }
        
        
    })
    
}

function show_userDashboard(p_name){
    document.getElementById("ops").click();
    getDashboard(p_name);
}

function goback(){
    html=lastArray.splice(-1,1);
    $('#opsContent').html(html);
}

function getCurrentTimeStamp(){
    return Math.floor(Date.now() / 1000);
}

function showAddressPicker(self){
     $('#modal_title').html('Select Pickup place');
     $('#modal_body').html('<iframe id="iframe" style="display: block; width: 100%; border: none; height: 340px;" src="./map.html"></iframe>');
     $('#modal_footer').html('<button type="button" class="btn btn-primary" onclick="savePickupAddress()">Save</button>');
     $('#modals').modal("show");
}
 
function showAddressPickerDelivery(self){
    $('#modal_title').html('Select Delivery address');
    $('#modal_body').html('<iframe id="iframe" style="display: block; width: 100%; border: none; height: 340px;" src="./map.html"></iframe>');
    $('#modal_footer').html('<button type="button" class="btn btn-primary" onclick="saveDeliveryAddress()">Save</button>');
    $('#modals').modal("show");
}

function savePickupAddress(){
    address=$('#iframe').contents().find('#us3-address').val()
    lat=$('#iframe').contents().find('#us3-lat').val()
    lon=$('#iframe').contents().find('#us3-lon').val()

    $('#NC_pickUpAddress').val(address);
    $('#NC_latitude').val(lat);
    $('#NC_longitude').val(lon);
    $('#modals').modal("hide");
}

function saveDeliveryAddress(){
    address=$('#iframe').contents().find('#us3-address').val()
    lat=$('#iframe').contents().find('#us3-lat').val()
    lon=$('#iframe').contents().find('#us3-lon').val()

    $('#NC_deliveryAddress').val(address);
    $('#NC_latitude_delivery').val(lat);
    $('#NC_longitude_delivery').val(lon);
    $('#modals').modal("hide");
}

function newContract(self){
    //push the html to the lastArray
    lastArray.push($(self).parent().html());
    //Generate the new contract form
    html='';
    html+='<button onclick="goback()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--mini-fab" style="bottom: 40px; position: fixed; right: 20px; z-index: 1000;"> <i class="glyphicon glyphicon-triangle-left" style="font-size: 17px; margin-left: -3px;"></i> </button>';
    html+='<div class="container"><h5>+ New Contract</h5>';
    html+='<div class="input-group"> <span class="input-group-addon hibe"> <i class="glyphicon glyphicon-asterisk"> </i> ID</span> <input type="text" id="NC_contractId" value="'+getCurrentTimeStamp()+'" readonly class="form-control" placeholder="Username" aria-describedby="basic-addon1"> </div>';
    html+='<br>';
    html+='<div class="input-group"> <span class="input-group-addon hibe"> <i class="glyphicon glyphicon-road"> </i> Exporter</span> <input type="text" id="NC_exporterId" value="'+currentUser.email+'" readonly class="form-control" placeholder="Username" aria-describedby="basic-addon1"> </div>';
    html+='<br>';
    html+='<div class="input-group"> <div class="input-group-btn"> <button type="button" class="btn btn-info dropdown-toggle hibe" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Importers <span class="caret"></span></button> <ul class="dropdown-menu" id="importerList"> </ul> </div> <input type="text" class="form-control" id="NC_importerId" aria-label="Importer Id"></div>';
    html+='<br>';
    html+='<div class="input-group"><span class="input-group-addon hibe"> <i class="glyphicon glyphicon-dashboard"> </i> Type</span><select class="form-control" id="NC_type">\
    <option>FLUIDS</option>\
    <option>PARCEL</option>\
    <option>RAW</option>\
    <option>CONSTRUCTION</option>\
    <option>OTHERS</option>\
    </select></div>';
    html+='<br>';
    html+='<div class="input-group"> <span class="input-group-addon hibe"> <i class="glyphicon glyphicon-plus-sign"> </i> Quantity</span> <input type="text" id="NC_unitCount"  class="form-control" placeholder="Unit quantity" > </div>';
    html+='<br>';
    html+='<div class="input-group"> <span class="input-group-addon hibe"><i class="glyphicon glyphicon-usd"> </i> Price</span> <input type="number" id="NC_unitPrice"   class="form-control" placeholder="Price"   > </div>';
    html+='<input type="hidden" id="NC_latitude" />';
    html+='<input type="hidden" id="NC_longitude" />';
    html+='<br>';
    html+='<div class="input-group"> <span class="input-group-addon hibe">\
                <i class="glyphicon glyphicon-briefcase"> </i> Pick Up</span> \
                    <input onfocus="showAddressPicker($(this))" type="text" id="NC_pickUpAddress"   class="form-control" placeholder="PickUp Address"   >\
                </div>';
    
    html+='<input type="hidden" id="NC_latitude_delivery" />';
    html+='<input type="hidden" id="NC_longitude_delivery" />';
    html+='<br>';
    html+='<div class="input-group"> <span class="input-group-addon hibe">\
                <i class="glyphicon glyphicon-plane"> </i> Delivery</span> \
                    <input onfocus="showAddressPickerDelivery($(this))" type="text" id="NC_deliveryAddress"   class="form-control" placeholder="PickUp Address"   >\
                </div>'; 
    html+='<br>';
    html+='<div class="input-group"> <span class="input-group-addon hibe"><i class="glyphicon glyphicon-calendar"> </i> Delivery</span> <input type="date" id="NC_arrivalDateTime"   class="form-control" placeholder="Arrival Date"   > </div>';
    html+='<br><div><input class="form-control" placeholder="Optional Description" id="NC_description"> </div>';
    html+='</div>';
    html+='<button class="btn btn-success btn-flat btn-md btn-block" style="margin: 17px 5%; width: 90%;" onclick="new_contract_submit($(this))">Submit</button>';
    

    //get available importers
    url=getUrl('importer');
    $.get(url,function(data){
        temp='';
        $(data).each(function(i,v){
            temp+='<li><a onclick="$(\'#NC_importerId\').val($(this).text())">'+v.email+'</a></li>';            
        });
        $('#importerList').html(temp);
        
    });
    
    $('#opsContent').html(html);

}

function show_contract_details(self){
    $('.drawer').hide(300);
    $(self).parent().find('.drawer').slideToggle();
}

function showMarkerInMap(lat,lon){
    $('#modal_title').html('Select Pickup place');
    $('#modal_body').html('<iframe id="iframe" style="display: block; width: 100%; border: none; height: 340px;" src="./map.html"></iframe>');
    $('#modals').modal("show");
    
    setTimeout(function() { $("#iframe").prop('contentWindow').initMap(lat,lon); console.log("getting map"); }, 3000);
}

function showProfile(e_name,id){

    html='';
    html+='<div class="row"><div style="background:url(\'https://image.flaticon.com/sprites/new_packs/163800-kids-avatars.png\');\
    height: 100px; width: 100px; background-color: #84fa8d; border-radius: 100%; display: block; \
    margin: 0 auto; background-position: '+((Math.floor(Math.random() * (3 ))*-140)-20 )+'px '+(Math.floor(Math.random() * (3 ))*-135 )+'px; background-size: 422px;\
    "></div><div id="profile_info"><hr>'+loaderSmall+'</div> </div>';
   
    $('#modal_title').parent().hide(0);
    $('#modal_body').html('').html(html);     
    $('#modals').modal("show");
 
 
    $.get(getUrl(id)+'/'+e_name,function(data){
        console.log(data);
        htmls='';
        htmls+='<h5 style="text-align:center;color: #6a6a6a;">'+data.$class.split('.')[(data.$class.split('.').length)-1]  +'</h5>';
        htmls+='<p  style="text-align:center">'+data.email+'</p>';
        htmls+='<div style="background:url(\'https://i.stack.imgur.com/0UqQu.png\');\
        height: 40px; width: 200px; margin: 0 auto; margin-top: -20px; background-position-y: '+(Math.floor(Math.random() * (5 ))*-45 )+'px;\
        "></div>';
        htmls+='<hr><div class="row" style="width: 70%; margin: 0 auto;">';
        htmls+='<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 smTest">\
        <i class="glyphicon glyphicon-thumbs-up" onclick="$(this).toggleClass(\'bgBlue\');"></i><br>\
        '+Math.floor(Math.random() * (150 ))+'\
        </div>';
        htmls+='<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 smTest">\
        <i class="glyphicon glyphicon-usd"></i><br>\
        '+data.accountBalance+'\
        </div>';
        htmls+='<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 smTest">\
        <i class="glyphicon glyphicon-thumbs-down" onclick="$(this).toggleClass(\'bgBlue\');"></i><br>\
        '+Math.floor(Math.random() * (50 ))+'\
        </div></div><hr>';
        htmls+='<div style="padding:0 20px"><div><b>Email:</b> '+data.email+'</div>';
        htmls+='<div><b>City:</b> '+data.city+'</div>';
        htmls+='<div><b>Country:</b> '+data.country+'</div>';
        htmls+='<div><b>Street:</b> '+data.street+'</div>';
        htmls+='<div><b>Zip:</b> '+data.zip+'</div>'; 
        htmls+='</div></div>';
        $('#profile_info').html(htmls);
    })
}

function displayContracts(self){
    //push the html to the lastArray
    if(self)  lastArray.push($(self).parent().html());
    //Generate the new contract form
    html='';
    html+='<button onclick="goback()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--mini-fab" style="bottom: 40px; position: fixed; right: 20px; z-index: 1000;"> <i class="glyphicon glyphicon-triangle-left" style="font-size: 17px; margin-left: -3px;"></i> </button>';
     
    html+='<div class="container"><h5> <i class="glyphicon glyphicon-gift" style="font-size:inherit"></i> All Contracts</h5><div id="selfClass">';
    url=getUrl('contract')+'?filter=%7B%22where%22%3A%20%7B%22grower%22%3A%20%20%22resource%3Aorg.acme.shipping.perishable.Grower%23'+currentUser.email+'%22%7D%7D';
    
    temp='';
    $.get(url,function(data){ 
        $(data).each(function(i,v){ 
           
           
            temp+='<div  class="tile" style="background:#b552ff;width: 110%; margin: 10px -5%; box-shadow: 0px 3px 13px 1px rgba(0,0,0,0.5);">';
            temp+='<div onclick="show_contract_details($(this))">';
            temp+='<b>To:</b>'+v.importer.split('#')[1];
            temp+='<button style="float: right;" class="btn btn-flat btn-xs '+(v.status=="OPEN"?"btn-success":"btn-warning")+'">'+v.status+'</button>';
            temp+='<br><b>Arrival:</b>'+v.arrivalDateTime;
            temp+='<br><b>Unit Price:</b> $'+v.unitPrice;
            temp+='<br><b>Pickup:</b> '+v.pickUpAddress;
            temp+='<br><b>Delivery:</b>'+v.DeliveryAddress;
            temp+='<br><b>Type:</b>'+v.type;
            temp+='<br><b>Units:</b>'+((v.unitCount)?Number(v.unitCount):1);            
            temp+='<br><b>Description:</b>'+v.description;
            temp+='</div>';
            temp+='<div class="drawer"><h5 style="margin: 0; font-size:12px">Contract Details</h5><hr style="margin:3px">';
            temp+='<button class="btn btn-info btn-xs btn-flat" onclick="showMarkerInMap(\''+v.pickUpLat+'\',\''+v.pickUpLon+'\')">Show Pickup</button>';
            temp+='<button class="btn btn-warning btn-xs btn-flat pull-right" onclick="showMarkerInMap(\''+v.DeliveryLat+'\',\''+v.DeliveryLon+'\')">Show Destination</button>';
              
            temp+='<hr><table  class=" table table-striped"><thead style="    background-color: #f199ad;"><tr>  <th>#</th>  <th>Price</th>  <th>Exporter</th>  <th>Time</th> <th>Award</th></tr></thead><tbody>';
            if(!v.bids){temp+='No bids';}
            $(v.bids).each(function(x,y){
                if(true)  { 
                    temp+='<tr>';
                    temp+='<td> '+(x+1)+'</td>';
                    temp+='<td>$ '+y.split("::")[0]+'</td>';
                    temp+='<td><a href="#" onclick="showProfile(\''+y.split("::")[1]+'\',\'shipper\')">'+y.split("::")[1]+'</a></td>';
                    temp+='<td>'+(new Date(Number(y.split("::")[2])).toISOString().slice(0, 19))+'</td>';
                    temp+='<td >';
                    if(v.status=="OPEN"){
                        temp+='<button onclick="awardContract(\''+y.split("::")[0]+'\',\''+y.split("::")[1]+'\',\''+v.contractId+'\',$(this),'+((v.unitCount)?Number(v.unitCount):1)+',\''+v.importer.split('#')[1]+'\')" class="btn btn-xs btn-success btn-flat">Award</button>';
                        }
                    try{
                        if(v.shipper.split('#')[1]==y.split("::")[1]){
                            temp+='<button class="btn btn-xs btn-danger btn-flat">Awarded</button>';
                            }
                    }
                    catch(e){
                        
                    }
                
                        
                    temp+='</td>';
                    temp+='</tr>';  
                } 
               
            });
            temp+='</tbody></table>';
             
            
            
            temp+='</div>';
            temp+='</div>';
            
        })
        $('#selfClass').html(temp); 
    })
    
    html+='</div></div>';
    
    $('#opsContent').html(html);
    
    
}

function awardContract(shippingCost,shipperId,contractId,self,unitCount,importerId){
    $(self).html('Please wait');
    url=getUrl('AwardContract');
    $.post(url,{shipper:shipperId,contract:'org.acme.shipping.perishable.Contract#'+contractId,shippingCost:shippingCost},function(data){
		console.log(data);
        if(contractId.indexOf(data.contract)){
            $.notify( "Successfully awarded", { position: 'bottom left',className: 'success' } );
            $(self).html('Awarded').removeClass('btn-success').addClass('btn-warning');            
            setTimeout(function() { 
                displayContracts(); 
                addNewShipment(unitCount,contractId,shipperId,importerId); }, 1000); 
        }
        
    });

    
}

function addNewShipment(unitCount=0,contractId,shipperId,importerId){
    //Create the shipment also here
    $.notify( "Creating new Shipment", { position: 'bottom left',className: 'info' } );
    shipMntId=Math.floor(Date.now() / 1000)
    $.post(getUrl('Shipment'),{
         shipmentId:shipMntId,
         status:'CREATED',
         unitCount:unitCount,
         contract:'org.acme.shipping.perishable.Contract#'+contractId,
         grower:currentUser.email,
         shipper:shipperId,
         importer:importerId
     },function(data){
         if(data.shipmentId==shipMntId){
             $.notify( "New Shipment Created", { position: 'bottom left',className: 'success' } );
         }
         console.log(data);
     });
}

function filterContracts(self){
    filter=$(self).attr('data-filter');
    clas='filter_'+filter;
    $('.tile').hide();
    $('.tile').each(function(i,v){
        if($(v).find('.'+clas).text().toLowerCase().indexOf($(self).val().toLowerCase())>=0){
            $(v).show();
        }
    });
}


function listContract(self){
    //push the html to the lastArray
    lastArray.push($(self).parent().html());
    //Generate the new contract form
    html='';
    html+='<button onclick="goback()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--mini-fab" style="bottom: 40px; position: fixed; right: 20px; z-index: 1000;"> <i class="glyphicon glyphicon-triangle-left" style="font-size: 17px; margin-left: -3px;"></i> </button>';
     
    html+='<div class="container"><h5>Open Contracts</h5>';
    html+='<div class="input-group">\
        <div class="input-group-btn">\
        <button type="button" class="btn btn-default dropdown-toggle btn-success" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="glyphicon glyphicon-filter"></i> Filter <span class="caret"></span></button>\
            <ul class="dropdown-menu">\
                <li><a onclick="$(this).closest(\'.input-group\').find(\'input\').attr(\'placeholder\',\'Filter by Delivery address\').attr(\'data-filter\',\'delivery\')"  >Delivery</a></li>\
                <li><a onclick="$(this).closest(\'.input-group\').find(\'input\').attr(\'placeholder\',\'Filter by Pickup address\').attr(\'data-filter\',\'pickup\')" > Pickup</a></li> \
                <li><a onclick="$(this).closest(\'.input-group\').find(\'input\').attr(\'placeholder\',\'Filter by Exporter\').attr(\'data-filter\',\'exporter\')" > Exporter</a></li> \
                <li><a onclick="$(this).closest(\'.input-group\').find(\'input\').attr(\'placeholder\',\'Filter by Importer\').attr(\'data-filter\',\'importer\')" > Importer</a></li> \
            </ul>\
        </div>\
        <input onkeyUp="filterContracts($(this))" type="text" class="form-control" data-filter="delivery" placeholder="Filter by Delivery address">\
    </div><div id="selfClass">';
    url=getUrl('contract')+'?filter=%7B%22where%22%3A%20%7B%22status%22%3A%20%20%22OPEN%22%7D%7D';
    temp='';
    $.get(url,function(data){       
        
        $(data).each(function(i,v){
            
            temp+='<div  class="tile" style="background:#529fff;width: 110%; margin: 10px -5%; box-shadow: 0px 3px 13px 1px rgba(0,0,0,0.5);">';
            temp+='<div onclick="show_contract_details($(this))">';
            temp+='<b>To:</b><a href="#" class="filter_importer" onclick="showProfile(\''+v.importer.split('#')[1]+'\',\'importer\')">'+v.importer.split('#')[1]+"</a>";
            temp+='<br><b>From:</b><span class="filter_exporter">'+v.grower.split('#')[1]+"</span>";
            temp+='<button style="float: right;" class="btn btn-flat btn-xs '+(v.status=="OPEN"?"btn-success":"btn-warning")+'">'+v.status+'</button>';
            temp+='<br><b>Arrival:</b>'+v.arrivalDateTime;
            temp+='<br><b>Unit Price:</b> $'+v.unitPrice;
            temp+='<br><b>Pickup:</b> <span class="filter_pickup">'+v.pickUpAddress+"</span>";
            temp+='<br><b>Delivery:</b> <span class="filter_delivery">'+v.DeliveryAddress+"</span>";
            temp+='<br><b>Type:</b>'+v.type;
            temp+='<br><b>Units:</b>'+v.unitCount;
            temp+='<br><b>Description:</b>'+v.description;
            temp+='</div>';
            temp+='<div class="drawer"><h5 style="margin: 0; font-size:12px">Contract Details</h5><hr style="margin:3px">';
            temp+='<button class="btn btn-info btn-xs btn-flat" onclick="showMarkerInMap(\''+v.pickUpLat+'\',\''+v.pickUpLon+'\')">Show Pickup</button>';
            temp+='<button class="btn btn-warning btn-xs btn-flat pull-right" onclick="showMarkerInMap(\''+v.DeliveryLat+'\',\''+v.DeliveryLon+'\')">Show Destination</button>';
            temp+='<h5><i class="glyphicon glyphicon-screenshot" style="    font-size: inherit;"> </i> All bids</h5>';
            classId=makeid();
            temp+='<table id="'+classId+'" class=" table table-striped"><thead style="    background-color: #cb99f1;"><tr>  <th>#</th>  <th>Price</th>  <th>Exporter</th>  <th>Time</th></tr></thead><tbody>';
            if(!v.bids){temp+='No bids';}
            $(v.bids).each(function(x,y){ 
                if(true)  { 
                temp+='<tr>';
                temp+='<td> '+(x+1)+'</td>';
                temp+='<td>$ '+y.split("::")[0]+'</td>';
                temp+='<td onclick="showProfile(\''+y.split("::")[1]+'\',\'shipper\')">'+y.split("::")[1]+'</td>';
                temp+='<td>'+(new Date(Number(y.split("::")[2])).toISOString().slice(0, 19))+'</td>';
                temp+='</tr>';  
                }
            });
            temp+='</tbody></table>';
            temp+='<hr><button onclick="placeBid(\''+v.contractId+'\',\''+classId+'\')" class=" btn btn-flat btn-sm  '+(v.status=="OPEN"?"btn-success":"btn-warning")+'">'+'<i style="font-size: inherit;" class="glyphicon glyphicon-pushpin"></i> Place BID'+'</button>';
            temp+='</div>';
            temp+='</div>';
        })
        $('#selfClass').html(temp); 
    }) 
    html+='</div></div>'; 
    $('#opsContent').html(html); 
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

function placeBid(contractId,classId){
    shipper=currentUser.email;
    
    form='';
    form+='<div class="input-group">\
                <span class="input-group-addon" id="basic-addon1">$</span>\
                <input type="number" class="form-control" id="bid_price" placeholder="Bid Price" aria-describedby="basic-addon1">\
            </div>';
    
    $('#modal_title').html('').html("<i class='glyphicon glyphicon-pushpin'> </i> Place Bid ");
    $('#modal_body').html('').html(form); 
    $('#modal_footer').html('').append("<button type=\"button\" class=\"btn btn-info\" id='sv_btn' onclick='placeBidRequest(\""+shipper+"\",\""+contractId+"\",$(this),\""+classId+"\")'>Place Bid</button>");
    $('#modals').modal("show");
}

function placeBidRequest(shipper,contractId,self,classId){
    
    $(self).text('Please wait..');
	
	contractId='org.acme.shipping.perishable.Contract#'+contractId;
	 
    $.post(getUrl('placebid'),{
        contract:contractId,
        shipper:shipper,
        bidvalue:$('#bid_price').val()
        },function(data){
			console.log(data);
            if(data.contract==contractId){
                $.notify( "Bid placed successfully", { position: 'bottom left',className: 'success' } );
                $('#modals').modal("hide");
                $('#'+classId).find('tbody').append('<tr>  <td>'+($('#'+classId).find('tbody').find('tr').length+1)+'</td> <td>$ '+$('#bid_price').val()+'</td> <td>'+shipper+'</td> <td>'+new Date().toISOString().slice(0, 19)+'</td> </tr>');
            }
            
    });
}
 
function new_contract_submit(self){
    $(self).html('Please wait..');
    url=getUrl('contract');
    
        $.post(url,{
            contractId:$('#NC_contractId').val(),
            grower:$('#NC_exporterId').val(),
            importer:$('#NC_importerId').val(),
            arrivalDateTime:$('#NC_arrivalDateTime').val(),
            unitPrice:$('#NC_unitPrice').val(),

            type:$('#NC_type').val(),
            description:$('#NC_description').val(),
            unitCount:$('#NC_unitCount').val(),
            
            pickUpLat:$('#NC_latitude').val(),
            pickUpLon:$('#NC_longitude').val(),
            DeliveryLat:$('#NC_latitude_delivery').val(),
            DeliveryLon:$('#NC_longitude_delivery').val(),

            minTemperature:10,
            maxTemperature:30,
            minPenaltyFactor:1,
            maxPenaltyFactor:1,
            pickUpAddress:$('#NC_pickUpAddress').val(),
            DeliveryAddress:$('#NC_deliveryAddress').val(),
            status:'OPEN'

            
        },function(data){
               if(data.contractId==$('#NC_contractId').val()){
                $(self).html('Saved');
                $.notify( "New contract added", { position: 'bottom left',className: 'success' } );
               }
        });
}

function getDashboard(p_name){
    //html='<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--mini-fab" style="bottom: 40px; position: fixed; left: 10px; "> <i class="glyphicon glyphicon-triangle-left" style="font-size: 17px; margin-left: -3px;"></i> </button>';
    html='';

    switch(p_name){
        case 'exporter':
            html+='<div>';
            html+='<div class="col-lg-2 col-md-4 col-sm-6 col-xs-6 dashTile" onclick="newContract($(this))">\
            <i style="    font-size: 540%;" class="glyphicon glyphicon-briefcase"></i><br><br>\
            <span style="    font-size: 20px;"  >New Contract</span>\
            </div>';

            html+='<div class="col-lg-2 col-md-4 col-sm-6 col-xs-6 dashTile" style="background:#8CC739" onclick="displayContracts($(this))">\
            <i style="    font-size: 540%;" class="glyphicon glyphicon-globe"></i><br><br>\
            <span style="    font-size: 20px;">Track Contract</span>\
            </div>';

            html+='<div class="col-lg-2 col-md-4 col-sm-6 col-xs-6 dashTile" style="background:#FF7F2A" onclick="getShipments($(this))">\
            <i style="    font-size: 540%;" class="glyphicon glyphicon-send"></i><br><br>\
            <span style="    font-size: 20px;" >Shipments</span>\
            </div>';
            html+='</div>';
            break;
        case 'shipper':
            html+='<div>';
            html+='<div class="col-lg-2 col-md-4 col-sm-6 col-xs-6 dashTile" onclick="listContract($(this))">\
            <i style="    font-size: 540%;" class="glyphicon glyphicon-tasks"></i><br><br>\
            <span style="    font-size: 20px;"  >List Contract</span>\
            </div>'; 

            html+='<div class="col-lg-2 col-md-4 col-sm-6 col-xs-6 dashTile" style="background:#FF7F2A" onclick="getShipments($(this))">\
            <i style="    font-size: 540%;" class="glyphicon glyphicon-send"></i><br><br>\
            <span style="    font-size: 20px;" >Shipments</span>\ 
            </div>';
            html+='</div>';
            break;
        case 'importer':
            html+='<div class="col-lg-2 col-md-4 col-sm-6 col-xs-6 dashTile" style="background:#FF7F2A" onclick="getShipments($(this))">\
            <i style="    font-size: 540%;" class="glyphicon glyphicon-send"></i><br><br>\
            <span style="    font-size: 20px;" >Shipments</span>\
            </div>';
            html+='</div>';
            break;
    }


    $('#opsContent').html(html);
} 

function mockTempDialog(){
    form='';
    

    form+='<div class="input-group">\
        <div class="input-group-btn">\
        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shipment <span class="caret"></span></button>\
        <ul class="dropdown-menu" id="dm"></ul></div><input type="text" id="sid" class="form-control" aria-label="..."></div>';

    form+='<br><div class="input-group">\
            <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-fire"></i> </span>\
            <input type="number" class="form-control" id="sidTemp" placeholder="Temparature" >\
        </div>';
    
    form+='<br><div class="input-group">\
        <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-time"></i> </span>\
        <input type="text" class="form-control" readonly value="'+(new Date())+'" >\
    </div>';

    $('#modal_title').html('').html("Simulate mock temparature");
    $('#modal_body').html('').html(form);
    $('#modal_footer').html('').append("<button type=\"button\" class=\"btn btn-primary\" onclick='mockTemp($(this))' >Save changes</button>");
    $('#modals').modal("show");

    $.get(getUrl('shipment'),function(data){
        temp='';
        $(data).each(function(i,v){
            temp+='<li><a href="#" onclick="$(\'#sid\').val(\''+v.shipmentId+'\')">'+v.shipmentId+'</a></li>';            
        });
        $('#dm').html(temp);
    });
}

function mockLocationDialog(){
    form='';
    

    form+='<div class="input-group">\
        <div class="input-group-btn">\
        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shipment <span class="caret"></span></button>\
        <ul class="dropdown-menu" id="dmml"></ul></div><input type="text" id="sidml" class="form-control" aria-label="..."></div>';

    $('#modal_title').html('Select Pickup place');
    $('#modal_body').html(form+'<iframe id="iframe" style="display: block; width: 100%; border: none; height: 340px;" src="./map.html"></iframe>');
    $('#modal_footer').html('<button type="button" class="btn btn-primary" onclick="saveMockLocation($(this))">Save</button>');
    $('#modals').modal("show");

     
    $.get(getUrl('shipment'),function(data){
        temp='';
        $(data).each(function(i,v){
            temp+='<li><a href="#" onclick="$(\'#sidml\').val(\''+v.shipmentId+'\')">'+v.shipmentId+'</a></li>';            
        });
        $('#dmml').html(temp);
    });
}

function saveMockLocation(self){
    $(self).html('Please wait..');
    shipmentId=$('#sidml').val();
    address=$('#iframe').contents().find('#us3-address').val()
    lat=$('#iframe').contents().find('#us3-lat').val()
    lon=$('#iframe').contents().find('#us3-lon').val()

    $.post(getUrl('lr'),{
        lat:lat,
        lon:lon,
        shipment:'org.acme.shipping.perishable.Shipment#'+shipmentId
    },function(data){
        if(data.shipment=='org.acme.shipping.perishable.Shipment#'+shipmentId){
            $.notify( "Successfully added", { position: 'bottom left',className: 'success' } );
            $('#modals').modal("hide");
        }
    })
    
}

function mockTemp(self){
    $(self).html('Please wait..');

    shipmentId=$('#sid').val();
    temp=$('#sidTemp').val();

    $.post(getUrl('tr'),{
        centigrade:temp,
        shipment:'org.acme.shipping.perishable.Shipment#'+shipmentId
    },function(data){
        if(data.shipment=='org.acme.shipping.perishable.Shipment#'+shipmentId){
            $.notify( "Successfully added", { position: 'bottom left',className: 'success' } );
            $('#modals').modal("hide");
        }
    });
}

function getShipments(self){
       
    url=getUrl('shipment')+'?filter=%7B%22where%22%3A%20%7B%22'+currentUser.$class.split('.')[(currentUser.$class.split('.').length-1)].toLowerCase()+'%22%3A%20%20%22resource%3Aorg.acme.shipping.perishable.'+currentUser.$class.split('.')[(currentUser.$class.split('.').length-1)]+'%23'+currentUser.email+'%22%7D%7D'
    $('#opsContent').html(loader);

    if(self){
        //push the html to the lastArray
        lastArray.push($(self).parent().html());
    }
    
    //Generate the new contract form
    html='';
    html+='<button onclick="goback()" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--mini-fab" style="bottom: 40px; position: fixed; right: 20px; z-index: 1000;"> <i class="glyphicon glyphicon-triangle-left" style="font-size: 17px; margin-left: -3px;"></i> </button>';
    html+='<div class="container"><h5> <i class="glyphicon glyphicon-send"></i> Available Shipments</h5>';
     
    $.get(url,function(data){
        userType=currentUser.$class.split('.')[currentUser.$class.split('.').length-1].toLowerCase();
        $(data).each(function(i,v){
            html+='<div  class="tile" style="width: 110%; margin: 10px -5%; box-shadow: 0px 3px 13px 1px rgba(0,0,0,0.5);"><div onclick="$(\'#idShipment\').val('+v.shipmentId+');$(\'.innerDiv\').slideUp(100);$(this).next().slideToggle(100);">';
            
            html+='<div class="pull-right">';
            html+='<button style="vertical-align: top;" class="btn btn-xs btn-flat ';
            if(v.status=='CREATED') html+='btn-danger';
            if(v.status=='IN_TRANSIT') html+='btn-warning';
            if(v.status=='ARRIVED') html+='btn-success';
            html+=' ">'+v.status+'</button>';
            //html+='<img src="https://www.qrstuff.com/images/default_qrcode.png"  style="height: 100px; margin: 10px; margin-top: -1px;    border-radius: 10px;">';
            html+='<div id="'+makeid()+'" class="qrs" data-shipmentId="'+v.shipmentId+'" style="padding:10px;width:100px; height:100px; background:#fff;     display: inline-block;margin: 10px;margin-top: -1px;border-radius: 10px;"><br><br>'+loaderSmall+'</div>';            
            html+='</div>';

            html+='<b>ID: </b>'+v.shipmentId;
            html+='<br><b>Contract ID: </b>'+v.contract.split('#')[1];            
            if(userType=='shipper'){
                html+='<br><b>Importer: </b>'+v.importer.split('#')[1];
                html+='<br><b>Exporter: </b>'+v.grower.split('#')[1];
            }
            if(userType=='grower'){
                html+='<br><b>Importer: </b>'+v.importer.split('#')[1];
                html+='<br><b>Shipper: </b>'+v.shipper.split('#')[1];   
            }
            if(userType=='importer'){
                html+='<br><b>Exporter: </b>'+v.grower.split('#')[1];
                html+='<br><b>Shipper: </b>'+v.shipper.split('#')[1];   
            }

            html+='</div><div class="innerDiv" ><h5 style="color:#666">Select operations</h5>';
            html+='<button  onclick="temparatureStatDialog()" class="btn btn-success btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-fire"></i> Temparature Stats</button>';
            html+='<button onclick="locationStatDialog(\''+v.shipmentId+'\')" class="btn btn-info btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-globe"></i> Location Stats</button>'; 
            html+='<button onclick="getShowLatLon(\''+v.contract.split('#')[1]+'\',\'destination\')" class="btn btn-primary btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-pushpin"></i> Destination Address</button>'; 
            html+='<button onclick="getShowLatLon(\''+v.contract.split('#')[1]+'\',\'source\')" class="btn btn-warning btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-pushpin"></i> Pickup Address</button>'; 
            
            if(userType=='shipper'){
                if(v.status=='CREATED')
                html+='<button onclick="markShipmentStarted(\''+v.shipmentId+'\',$(this))" class="btn btn-danger btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-thumbs-up"></i> Mark as Started</button>'; 
                else{
                    html+='<button disabled onclick="markShipmentStarted(\''+v.shipmentId+'\',$(this))" class="btn btn-disabled btn-danger btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-thumbs-up"></i> Mark as Started</button>'; 
                }
            }
            
            
            if(userType=='importer'){
                if(v.status=='ARRIVED')    
                    html+='<button disabled class="btn btn-disabled btn-danger btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-thumbs-up"></i> Mark as Received</button>'; 
                else{
                    html+='<button onclick="markShipmentArrived(\''+v.shipmentId+'\',$(this))" class="btn btn-danger btn-sm btn-flat btn-block"> <i style="font-size:inherit" class="glyphicon glyphicon-thumbs-up"></i> Mark as Received</button>'; 
                }
            }
             
            html+='a</div>';
             
            html+='</div>';
        });
        $('#opsContent').html(html);
        generateQRcode();
    });
}

function  generateQRcode(){
    $('.qrs').each(function(i,v){
        shipmentId=$(v).attr('data-shipmentId');
        $(this).html('');
        url="http://dinajpurbandhu.org/demo/bc/user_zone.php?id="+shipmentId;
        new QRCode(document.getElementById($(v).attr('id')), url); 
        $(this).on("click",function(){window.open(url, "_blank") });
    })
}
function markShipmentArrived(shipmentId,self){
    $(self).html('Please wait..');
    $.post(getUrl('sr'),{shipment:'org.acme.shipping.perishable.Shipment#'+shipmentId},function(data){
        if(data.shipment=='org.acme.shipping.perishable.Shipment#'+shipmentId){ 
            $.notify( "Successfully changed", { position: 'bottom left',className: 'success' } );
            getShipments();
            
        }
    })
}

function markShipmentStarted(shipmentId,self){
    $(self).html('Please wait..');
    $.post(getUrl('ss'),{shipment:'org.acme.shipping.perishable.Shipment#'+shipmentId},function(data){
		console.log(data);
        if(data.shipment=='org.acme.shipping.perishable.Shipment#'+shipmentId){ 
            $.notify( "Successfully changed", { position: 'bottom left',className: 'success' } );
            getShipments();
            
        }
    })
}

function temparatureStatDialog(){
    $('#modal_title').html('').html("Temparature History");
    $('#modal_body').html('').html('  <div>Temparature Chart</div> <div id="linechart_core">'+loaderSmall+'</div>');
    $('#modals').modal("show");

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.load('current', {
        callback: function () {
 
            shipmentId=$('#idShipment').val();
            url=getUrl('Shipment')+'/'+shipmentId;
            $.get(url,function(data1){
                array=[];
                $(data1.temperatureReadings).each(function(i,v){
                    year=v.timestamp.split('T')[0].split('-')[0]
                    month=v.timestamp.split('T')[0].split('-')[1]
                    day=v.timestamp.split('T')[0].split('-')[2]
                    hour=v.timestamp.split('T')[1].split(':')[0]
                    min=v.timestamp.split('T')[1].split(':')[1]
                    sec=v.timestamp.split('T')[1].split(':')[2].split('.')[0]
                    date=new Date(year, month, day, hour, min, sec);  
                    temp=[date,v.centigrade];
                    array.push(temp);
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
    
}

function locationStatDialog(shipmentId){
    
    $('#modal_title').html('Location history');
    $('#modal_body').html('<iframe id="iframe" style="display: block; width: 100%; border: none; height: 340px;" src="./map_path.php?shipmentId='+shipmentId+'"></iframe>');
    $('#modals').modal("show");
}

function drawBasic(shipmentId='1510581083') {

            shipmentId=$('#idShipment').val();
            url=getUrl('Shipment')+'/'+shipmentId;
            $.get(url,function(data){
                array=[];
                $(data.temperatureReadings).each(function(i,v){
                    
                   
                   
                });
                

                var data = new google.visualization.DataTable();
                data.addColumn('number', 'X');
                data.addColumn('number', '');
          
                data.addRows(array );
      
                 
          
                var options = {
                  hAxis: {
                    title: 'Time'
                  },
                  vAxis: {
                    title: 'Temparature'
                  }
                };
          
                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
          
                chart.draw(data, options);
            })

          
        }

function getShowLatLon(contractId,source='destination'){
    url=getUrl('contract')+'/'+contractId;
    
    $.get(url,function(data){
        if(source=='destination'){
            lat=data.DeliveryLat;
            lon=data.DeliveryLon;
            $('#modal_title').html('Destination address');
            showMarkerInMap(lat,lon);
        }
        else{
            $('#modal_title').html('Pickup address');
            lat=data.pickUpLat;
            lon=data.pickUpLon;
            showMarkerInMap(lat,lon);
        }

        
    })
    

}

function show_map(){
    $('#opsContent').html('<iframe id="myiframe" src="./map.html"></iframe>');
}

function getUrl(p_name){
    p_name=p_name.toLowerCase();
    url='';
    if(p_name=='exporter'){ url=remoteBase+"Grower"; }
    if(p_name=='importer'){ url=remoteBase+"Importer";}
    if(p_name=='shipper'){ url=remoteBase+"Shipper";}
    if(p_name=='contract'){ url=remoteBase+"Contract";}
    if(p_name=='placebid'){ url=remoteBase+"PlaceBid";}
    if(p_name=='awardcontract'){ url=remoteBase+"AwardContract";}
    if(p_name=='shipment'){ url=remoteBase+"Shipment";}
    if(p_name=='tr'){ url=remoteBase+"TemperatureReading";}
    if(p_name=='temperaturereading'){ url=remoteBase+"TemperatureReading";}
    if(p_name=='lr'){ url=remoteBase+"LocationReading";}
    if(p_name=='locationreading'){ url=remoteBase+"LocationReading";}
    if(p_name=='startshipment'){ url=remoteBase+"StartShipment";}
    if(p_name=='ss'){ url=remoteBase+"StartShipment";}
    if(p_name=='shipmentreceived'){ url=remoteBase+"ShipmentReceived";}
    if(p_name=='sr'){ url=remoteBase+"ShipmentReceived";}
    
    
    return url;
}

function deleteParticipant(p_name,p_email,self){
    $(self).html(loaderSmall); 
    url=getUrl(p_name);
    url+='/'+p_email;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(data, textStatus, xhr) {
             
            if(xhr.status==204){
                $.notify( "Successfully deleted", { position: 'bottom left',className: 'success' } );
                getAllParticipant(p_name);
           }
       }
    });
}

function updateBalence(self,p_name,p_email){
    url=getUrl(p_name)+'/'+p_email;
    newBalence=($(self).prev().val());
    $(self).html(loaderSmall+' Processing');
    if(newBalence<0){newBalence=-newBalence}

    $.get(url,function(data){ 
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "PUT",
            "headers": {
              "content-type": "application/x-www-form-urlencoded",
              "cache-control": "no-cache",
              "postman-token": "2c391592-dc65-ff4a-c4d0-38e8d79a1bba"
            },
            "data": {
              "accountBalance": newBalence,
              "country": data.country,
              "email": data.email,
              "password": data.password, 
              "city":data.city, 
              "street": data.street,
              "zip": data.zip
            }
          }
          
          $.ajax(settings).done(function (response,textStatus, xhr) {
                if(xhr.status==200){
                    $.notify( "Successfully updated", { position: 'bottom left',className: 'success' } );
                    $(self).html('Update balance');
                                      
            }
          });
        
        
         
    })
    

}

function makeCard(p_name,p_email,p_body,balance){
    html='<div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width: 100%;">'
    html+='<div class="mdl-card__title" style="color: #fff; text-shadow: 1px 1px #000; background: url(https://getmdl.io/assets/demos/welcome_card.jpg) center / cover;">'
    html+='<h2 class="mdl-card__title-text">'+p_email+'</h2>'
    html+='</div>'
    html+='<div class="mdl-card__supporting-text">' +p_body
    html+='</div>'
    html+='<div class="mdl-card__actions mdl-card--border"><input style="width: 40%; float: left; margin-right:10px" type="number" value="'+balance+'" class="form-control">'
    html+='<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" \
    onclick="updateBalence($(this),\''+p_name+'\',\''+p_email+'\')">'
    html+='Update balance'
    html+='</a>'
    html+='</div>'
    html+='<div class="mdl-card__menu">'
    html+='<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="deleteParticipant(\''+p_name+'\',\''+p_email+'\',$(this))">'
    html+='<i class="material-icons">delete</i>'
    html+='</button>'
    html+='</div>'
    html+='</div><br>'

    return html;
}

function getAllParticipant(p_name){
   
    document.getElementById("ops").click();
    $('#opsContent').html(loader);

    url=getUrl(p_name);

    $.get(url,function(data){
        console.log(data);
         
        html='';
        $(data).each(function(i,v){
            body=(v.city)?v.city+',':'';
            body+=(v.country)?v.country+',':''
            body+=(v.street)?v.street+',':''
            body+=(v.zip)?v.zip+',':'';
            html+='<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'+makeCard(p_name,v.email,body,v.accountBalance)+'</div>';
        })
        $('#opsContent').html(html);
    })


}