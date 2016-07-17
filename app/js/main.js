$(document).ready(function(){


	var favicon 	= "",
		description = "", 
		$data 		= {}; 

	$('#results').hide();


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

	/*******************************
	Request
	********************************/


	//Count number of fav in each category
	function countFav(){

		var categoryList = [],
			favCount = [],
			key;

		$('#card-menu .card a').each(function(){

			categoryList.push( $(this).attr('href') );
			//console.log(categoryList);

			//key = $(this).attr('href');
		});

		for ( i = 0; i < categoryList.length; i++){
				
			key = categoryList[i];
			$data = {

				"value" : key
			}

			$.ajax({
				url   	: "app/serveur/countfav.php",
				type	: "GET",
				data	: $data,
			})
			.done(function(response){

				$('.card-item').html(response);

				favCount.push(response); 
			})
			.fail(function(error){

				console.log(error);
			});		
		};


		for( i= 0; i < favCount.length; i++){

			$('.card').find('.card-item').append(favCount[i]);
		}
	}

	countFav();

	//Post favorite
	$('#add-fav').on('submit', function(e){

		e.preventDefault();
		errorRemover();

		//Input values
		var url = $("#add-fav input[name=fav-url]").val(),
			key = $("#add-fav input[name=fav-keyword]").val(),
			cat = $("#add-fav #category").val();

		if( url.length === 0 ){

			$('.error-field').html("Le champ url doit être rempli !").addClass('error');
		}

		else if( cat.length === 0 ){
			
			$('.error-field').html("Le champ category doit être rempli !").addClass('error');
		}

		else{

			fav_ico = url + "/favicon.ico";
			desc= getMetaDescription(url);
			$data = {

				"address"		: url,
				"keywords"		: key,
				"category"		: cat,
				"favicon"		: fav_ico,
				"description"	: desc
			}

			//Post favorite site
			postFav();
		}
	});

	//Get fav by category
	$('#card-menu .card a, #results #cat-column a').on('click', function(e){

		e.preventDefault();

		$('#card-menu .card a, #results #cat-column a').removeClass('active');
		$(this).addClass('active');

		var key = $(this).attr('href');

		$data = {

			"category": key
		}

		//Get fav list from category
		getFav();
	});
	

	/*******************************
	Functions
	********************************/

	//Post new fav
	function postFav(){
		$.ajax({

				url		: "app/serveur/postfav.php",
				type	: "POST",
				data	: $data,
				success	: function(data){

					console.log(data);
				}

			})
			.done(function(response){

				errorRemover();
				$('.error-field').html("Site enregistré !").addClass('complete');
				console.log(response);
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

	//Count fav from category
	function getCount(){

		$.ajax({
			url   	: "app/serveur/countfav.php",
			type	: "GET",
			data	: $data,
		})
		.done(function(response){

			favCount.push(response); 
		})
		.fail(function(error){

			console.log(error);
		});		
	}

	//Check if new adress already exist
	function checkIfExist(){

		$.ajax({
			url 	: "app/serveur/getfav.php",
			type	: "GET",
			data	: $data,
		})
		.done(function(){

			$('.error-field').html("response").addClass('error'); 
		})
		.fail(function(error){

			console.log(error);
		});		
	}

	//Remove error-field class
	function errorRemover(){
		$('.error-field').removeClass('complete, error');
	}

	//Get description from site
	function getMetaDescription(adress){

		$.get('http://'+ adress, 
			function(data){
				$(data).find('meta[name=description]').attr("content");
				return data;
			});
	}

});