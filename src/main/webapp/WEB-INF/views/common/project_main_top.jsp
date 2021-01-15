<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>Top</title>	
	
	<style type="text/css">
	/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  vertical-align:middle;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

p {
	margin:0px;
	display:inline-block;
	font-size:15px;
	font-weight:bold;
}
	</style>
</head>
<body>
	<!-- Top Menu -->
	<div class="top-menu">
		<!-- Logo -->
		<div class="logo-box">
			<a href="main.pie">
				<img src="/resources/img/pie_logo_letter.png" alt="PIE logo" class="logo">
			</a>
		</div>
		
		<div class="navbar">
		<label class="switch">
  		<input type="checkbox" >
  		<span class="slider round" id="onoff"></span>
		</label>
		<p>Dark</p>
		<p style="display:none; color:#31353d">Light</p>
			<a class="nav-link">
				<i class="fas fa-bars" onclick="collapseSidebar()"></i>
			</a>
		</div>
	</div>
</body>
</html>