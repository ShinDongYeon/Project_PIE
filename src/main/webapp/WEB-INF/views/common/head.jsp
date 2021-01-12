<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<title>PIE</title>

<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<!-- Font-Awesome CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">

<!-- StyleSheets -->
<link rel="stylesheet" type="text/css" href="/resources/css/commonStyle.css">
<link rel="stylesheet" type="text/css" href="/resources/css/mainTopStyle.css">

<!-- sweetAlert1,2 CDN -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<!-- Jquery CDN -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"
	integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
	crossorigin="anonymous"></script>
	
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.0/moment.min.js"></script>

<!-- ------------------------------------------------------------------ -->


<!-- Firebase 연동 -->
<script src="https://www.gstatic.com/firebasejs/7.2/firebase.js"></script>
<script>
	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	var firebaseConfig = {
	  apiKey: "AIzaSyCdHidf9NRo0bO3u_PkkvuDEITZSv6zD6U",
	  authDomain: "project-pie-1.firebaseapp.com",
	  databaseURL: "https://project-pie-1-default-rtdb.firebaseio.com/",
	  projectId: "project-pie-1",
	  storageBucket: "project-pie-1.appspot.com",
	  messagingSenderId: "915296979109",
	  appId: "1:915296979109:web:728d97cbf2fa188342654c",
	  measurementId: "G-KJHDHQ0QJC"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
</script>	