
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>EZ logistics</title>
  <meta name="description" content="EZ logistics">
  <meta name="author" content="SitePoint">  
  <meta      name='viewport'      content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
  <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <script  src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <link rel="stylesheet" href=" https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  
  
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-purple.min.css">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.js"></script> 
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> 
    <script type="text/javascript" src="./qrcode.min.js"></script> 
    
    
    
<link rel="stylesheet" href="./styles.css">
<script src="./script.js"></script>
 
</head>

<body>
 
  <input type="hidden" id="idShipment" value="1510739632">
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">EZ logistics</span>
    </div>
    <!-- Tabs -->
    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
      <a href="#fixed-tab-1" class="mdl-layout__tab is-active">Admin</a>
      <a href="#fixed-tab-2" class="mdl-layout__tab">User</a>
      <a href="#fixed-tab-3" class="mdl-layout__tab" id="ops">Ops</a>
    </div>
  </header>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Title</span>
  </div>
  <main class="mdl-layout__content">
    <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
      <div class="page-content">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile ">
            <i class="glyphicon glyphicon-user"></i>
            <h3 style="margin:0;font-weight: normal; " onclick="getAllParticipant('exporter')">Exporters</h3>
             
            <a class="mdl-button mdl-js-button mdl-js-ripple-effect" 
            style="color:#fff;    margin-top: -20px; float: right;" onclick="addParticipant('exporter')" >    +Add  </a>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile" style=" background:#FF7F2A">
            <i class="glyphicon glyphicon-shopping-cart"></i>
            <h3 style="margin:0;font-weight: normal; " onclick="getAllParticipant('importer')">Importers</h3>
            <a class="mdl-button mdl-js-button mdl-js-ripple-effect" 
            style="color:#fff;    margin-top: -20px; float: right;" onclick="addParticipant('importer')" >    +Add  </a>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile" style=" background:#44ebad">
            <i class="glyphicon glyphicon-plane"></i>
            <h3 style="margin:0;font-weight: normal; " onclick="getAllParticipant('shipper')">Shippers</h3>
            <a class=" mdl-button mdl-js-button mdl-js-ripple-effect" 
            style="color:#fff;    margin-top: -20px; float: right;" onclick="addParticipant('shipper')" >    +Add  </a>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile" style=" background:#eb4444">
            <i class="glyphicon glyphicon-fire"></i>
            <h3 style="margin:0;font-weight: normal; " >Mock Temparature</h3>
            <a class=" mdl-button mdl-js-button mdl-js-ripple-effect" 
            style="color:#fff;    margin-top: -20px; float: right;" onclick="mockTempDialog()" >    +Add  </a>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile" style=" background:#b244eb">
            <i class="glyphicon glyphicon-pushpin"></i>
            <h3 style="margin:0;font-weight: normal; " >Mock Location</h3>
            <a class=" mdl-button mdl-js-button mdl-js-ripple-effect" 
            style="color:#fff;    margin-top: -20px; float: right;" onclick="mockLocationDialog()" >    +Add  </a>
        </div>
      
      </div>
    </section>
    <section class="mdl-layout__tab-panel" id="fixed-tab-2">
      <div class="page-content" id="userContent">

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile ">
            <i class="glyphicon glyphicon-user"></i>
            <h3 style="margin:0;font-weight: normal; ">Exporter</h3>
            <input class="form-control email" value="rxeon"  placeholder="Email">
            <input class="form-control password" value="rxeon"  placeholder="Password">
            <br>
            <a class="mdl-button mdl-js-button mdl-js-ripple-effect btn btn-flat btn-success" 
            style="color:#fff; width:100%;   margin-top: -20px; background:#8CC739 " onclick="login($(this),'exporter')"  >    Submit  </a>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile " style="background:#FF7F2A">
            <i class="glyphicon glyphicon-shopping-cart"></i>
            <h3 style="margin:0;font-weight: normal; ">Importer</h3>
            <input class="form-control email" placeholder="Email">
            <input class="form-control password" placeholder="Password">
            <br>
            <a class="mdl-button mdl-js-button mdl-js-ripple-effect btn btn-flat btn-success" 
            style="color:#fff; width:100%;   margin-top: -20px; background:#8CC739 " onclick="login($(this),'importer')" >    Submit  </a>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 bp-primary tile " style="background:#3f51b5">
            <i class="glyphicon glyphicon-plane"></i>
            <h3 style="margin:0;font-weight: normal; ">Shipper</h3>
            <input class="form-control email" placeholder="Email" value="shipper">
            <input class="form-control password" placeholder="Password"  value="shipper">
            <br>
            <a class="mdl-button mdl-js-button mdl-js-ripple-effect btn btn-flat btn-success" 
            style="color:#fff; width:100%;   margin-top: -20px; background:#8CC739 "  onclick="login($(this),'shipper')">    Submit  </a>
        </div>

        

      </div>
    </section>
    <section class="mdl-layout__tab-panel" id="fixed-tab-3">
      <div class="page-content" id="opsContent"><!-- Your content goes here --></div>
    </section>
  </main>
</div>
</body>
</html>

<div class="modal fade" tabindex="-1" role="dialog" id="modals">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary " id="dyn_header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modal_title">Modal title</h4>
      </div>
      <div class="modal-body" id="modal_body">
         
      </div>
      <div class="modal-footer" >
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <span id="modal_footer"></span>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->