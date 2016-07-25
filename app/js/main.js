$(document).ready(function(){


	var fav_ico 	= "",
		desc  		= "", 
		url 		= "",
		key 		= "",
		cat 		= "",
		result 		= "",
		$data 		= {};

	$('#results').hide();
	$('#add-fav').hide();
	$('#add').removeClass('on');



	/*******************************
	General
	********************************/

	//Scroll
	$('a[href^="#"]').click(function(){

		var target = $(this).attr("href");

		$('html, body').animate({
			scrollTop:$(target).offset().top
		}, 'slow');

		return false;
	});

	//Show / Hide form
	$('#add').on('click', function(e){

		e.preventDefault();

		toggleForm();

	});


	/*******************************
	Request
	********************************/

	//Post favorite
	$('#add-fav').on('submit', function(e){

		e.preventDefault();
		errorRemover();

		//Input values
		url = $("#add-fav input[name=fav-url]").val(),
		key = $("#add-fav input[name=fav-keyword]").val(),
		cat = $("#add-fav #category").val();

		if( url.length === 0 ){

			$('.error-field').html("Le champ url doit être rempli !").addClass('error');
		}
		else{

			getMetaDescription(url)

			fav_ico = url + "/favicon.ico";
			desc = result;

			checkIfExist();
		}
	});

	//Get fav by category
	$('#card-menu .card a, #results #cat-column a').on('click', function(e){

		e.preventDefault();

		$('#card-menu .card a, #results #cat-column a').removeClass('active');
		$(this).addClass('active');

		var key = $(this).attr('href');

		$('#results #cat-column a').find('key').addClass('active');

		$data = {

			"category": key
		}

		//Get fav list from category
		getFav();
	});
 
	//Search fav by keywords
	$('#search').on('submit', function(e){

		e.preventDefault();

		var key = $('#search #research').val();

		$data = {

			"word": key
		}

		//Get fav list from category
		searchFav();
	});

	//Count fav by category
	$('#card-menu .card a').hover(function(e){

		e.preventDefault();

		var key = $(this).attr('href');
		//console.log(key);

		$data = {

			"value": key
		}

		//Get fav count from category
		countFav();
	});
	

	/*******************************
	Functions
	********************************/

	function toggleForm(){

		if( $('#add').hasClass('on') ){

			$('#add-fav').slideUp();
			$('#add').removeClass('on');
		}
		else{

			$('#add-fav').slideDown();
			$('#add').addClass('on');	
		}
	}


	//Post new fav
	function postFav(){

		$data = {

			"address"		: url,
			"keywords"		: key,
			"category"		: cat,
			"favicon"		: fav_ico,
			"description"	: desc
		}

		$.ajax({

				url		: "app/serveur/postfav.php",
				type	: "POST",
				data	: $data,
			})
			.done(function(response){

				errorRemover();
				$('.error-field').html("Site enregistré !").addClass('complete');
				//console.log(response);
			})
			.fail(function(error){

				console.log(error);
			});
	}

	//Get fav from category
	function getFav(){

		$.ajax({
			url		: "app/serveur/getfav.php",
			type	: "GET",
			data	: $data,
		})
		.done(function(response){

			$('#card-menu').hide();
			$('#results').show();
			$('#result-link').html(response); 
		})
		.fail(function(error){

			console.log(error);
		});		
	}

	//Get fav from category
	function countFav(){

		$.ajax({
			url		: "app/serveur/countfav.php",
			type	: "GET",
			data	: $data,
		})
		.done(function(response){

			$('.card-item p').html(response);
		})
		.fail(function(error){

			console.log(error);
		});		
	}

	//Check if new adress already exist
	function checkIfExist(){

		$data = {

			"adress" : url,
		}

		$.ajax({
			url 	: "app/serveur/checkfav.php",
			type	: "GET",
			data	: $data,
			success : function(response){
				if(response == 'true'){

					$('.error-field').append("Le site est déjà enregistré").addClass('error'); 
					//console.log(response);
				}
				else{

					postFav();
				}	
			}
		})
		.fail(function(error){

			console.log(error);
		});		
	}

	//Search fav with keyword
	function searchFav(){

		$.ajax({
			url		: "app/serveur/searchfav.php",
			type	: "GET",
			data	: $data,
		})
		.done(function(response){

			$('#card-menu').hide();
			$('#cat-column').hide();
			$('#results').show();
			$('#result-link').html(response); 
		})
		.fail(function(error){

			console.log(error);
		});		
	}


	//Remove error-field class
	function errorRemover(){
		$('.error-field').append('').removeClass('complete, error');

	}

	//Get description from site
	function getMetaDescription(adress){

		var site = 'http://'+ adress;

		$data = {

			"metaUrl" : site,
		}

		$.ajax({

			url 		: "app/serveur/getmeta.php",
			type 		: "GET",
			data 		: $data,
			success 	: function(response){
				return response;
				result = response;
				console.log(response);
			}
		})
		.fail(function(error){

			console.log(error);
		});
	}


	/*******************************
	Add into bdd
	********************************/
	var storeAS = [];

	function artstationFullFill(){

		$.get("../../artstation.js", function(data){
			storeAS = data.push();
			console.log(storeAS);
		});


	}

	artstationFullFill();

});