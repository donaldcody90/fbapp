<!DOCTYPE html>
<html lang="en" ng-app="myApp">

  <head>
    <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Feedback Application</title>
          <!-- Bootstrap -->
          <link href="css/bootstrap.min.css" rel="stylesheet">
          <link href="css/custom.css" rel="stylesheet">
          <link href="css/toaster.css" rel="stylesheet">
                <style>
                  a {
                  color: orange;
                  }
                </style>
                <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
                <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                <!--[if lt IE 9]><link href= "css/bootstrap-theme.css"rel= "stylesheet" >
				<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
				<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
				<![endif]-->
              </head>

	<body ng-cloak="">
		<div class="navbar" role="navigation">
		  <div class="container">
			<div class="row">	
				<div class="logo">
				  <a href="#"><img src="images/logo.jpg" alt="UCP of Central Arizona"/></a>
				</div>
			
			</div>
		  </div>
		</div>
	
		  <div class="container" style="margin-top:20px;">
			 <div data-ng-view="" id="ng-view" class="slide-animation"></div>
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
  <script src="app/app.js"></script>
  <script src="app/data.js"></script>
  <script src="app/directives.js"></script>
  <script src="app/authCtrl.js"></script>
</html>

