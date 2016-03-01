<!DOCTYPE html>
<html lang="en" ng-app="fbApp">

  <head>
    <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Feedback Application</title>
          <!-- Bootstrap -->
          <link href="css/bootstrap.min.css" rel="stylesheet">
          <link href="css/custom.css" rel="stylesheet">
          <link href="css/toaster.css" rel="stylesheet">
          <link href="css/angular-bootstrap-lightbox.css" rel="stylesheet">

                <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
                <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                <!--[if lt IE 9]><link href= "css/bootstrap-theme.css"rel= "stylesheet" >
				<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
				<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
				<![endif]-->
              </head>

	<body ng-cloak="">
		<div class="header">
		  <div class="container">
  			<div class="row">	
  				<div class="logo">
  				  <a href="#"><img src="images/logo.jpg" alt="UCP of Central Arizona"/></a>
  				</div>
          <div ng-if="authenticated" class="pro-box " ng-show="role && backend" ng-controller="authCtrl as vm">
          <!-- code to render a large video block-->
          <p>{{name}} - <a ng-click="logout();">Logout</a></p>
         </div>
  			   
  			</div>
		  </div>
		</div>


    <div class="container" ng-if="authenticated" ng-show="role && backend" >

      <div class="row">
        <div class="admin_menu">
            <ul>
                <li><a href="#admin/dashboard"><img src="images/dashboard.png" />Dashboard</a></li>
                <li><a href="#admin/fblist"><img src="images/notification.png" />Feedback</a></li>
                <li><a href="#admin/users"><img src="images/admin.png" />Admin</a></li>
                <li class="setting"><a href="#admin/settings"><img src="images/setting.png" /></a></li>
            </ul>
        </div>
      </div>  
    </div>
  
	
		  <div class="container">
			 <div data-ng-view="" id="ng-view" class="slide-animation" autoscroll="enableAutoScroll"></div>

		  </div>
      <div class="container">
          <div class="row">
              <div class="footer">
                  <p>Copyright 2016  |  Powered by <a href="http://westarinfo.com/" target="_blank">Westar Info</a></p>
              </div>
          </div>
      </div>
    </body>
  <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
  <!-- Libs -->
  <script src="js/angular.min.js"></script>
  <script src="js/angular-route.min.js"></script>
  <script src="js/angular-animate.min.js" ></script>
  
  <script src="js/toaster.js"></script>
  <script src="js/ng-file-upload-shim.min.js"></script> <!-- for no html5 browsers support -->
  <script src="js/ng-file-upload.min.js"></script>

    <script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.6.0.js"></script>

  <script src="app/app.js"></script>
  <script src="app/data.js"></script>
  <script src="app/directives.js"></script>
  <script src="app/authCtrl.js"></script>
  <script src="app/dashboardCtrl.js"></script>
  <script src="app/frontendCtrl.js"></script>
  <script src="app/allfbCtrl.js"></script>
  <script src="app/fblistCtrl.js"></script>
  <script src="app/fbdetailCtrl.js"></script>
  <script src="app/usersCtrl.js"></script>
  <script src="app/groupsCtrl.js"></script>
</html>

