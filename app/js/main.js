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
	$('#back-top').hide();
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

	//Scroll to top button
	$(window).scroll(function(e){

		if ($(this).scrollTop() > 1) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});


	/*******************************
	Request
	********************************/

	//Post favorite
	$('#add-fav').on('submit', function(e){

		e.preventDefault();
		errorRemover();
		//addContent();

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

		$('#results #cat-column').find('a[href=key]').addClass('active');

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

		//Get fav list from keywords
		searchFav();
	});

	//Count fav by category
	$('#card-menu .card a').hover(function(e){

		e.preventDefault();

		var key = $(this).attr('href');

		$data = {

			"value": key
		}

		//Get fav count from category
		countFav();
	});
	

	/*******************************
	Functions
	********************************/

	//Show-Hide form
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
			$('#paginate').show();
			pagination(20, '.result-card');
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
			$('#paginate').show();
			pagination(20, '.result-card');
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
	/*function getMetaDescription(adress){

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
	*/

	/*******************************
	Add into bdd
	********************************/
	var storeAS = [];

	function addContent(){

		/*$.getScript("app/js/deviant.js", function(data){
			storeAS.push(data);
		});*/

		for( i = 0; i < storeAS.length; i++){

		 	url 	= storeAS[i],
			key 	= "deviantart, art, artiste, 3d, 2d, photography",
			cat 	= "deviant-art",
			fav_ico = "http://www.deviantart.com/favicon.ico",
			desc	= "deviant-art";

			postFav();
		}
	}


	/*******************************
	Pagination
	********************************/
	function pagination(nPerPage, divSelect){

		//Init
		var nElement = $(divSelect).length,
			nPage 	 = Math.ceil(nElement / nPerPage), 
			pageLoad = 1;

		$('#paginate ul').empty();
		
		$(divSelect).each(function(index){

			if(index < nPerPage){

				$(divSelect).eq(index).show();
			}
			else{

				$(divSelect).eq(index).hide();
			}
		});

		//Reset
		function reset(){

			if(nPage < 2){

				$('#paginate').hide();
			}
			else if(pageLoad === nPage){

				$('#paginate .next-page .fa').hide();
			}
			else{

				$('#paginate .next-page .fa').show();
			}

			if(pageLoad === 1){

				$('#paginate .prev-page .fa').hide();
			}
			else{

				$('#paginate .prev-page .fa').show();
			}

			$('#paginate ul li').removeClass('selected');
			$('#paginate ul li').eq(pageLoad - 1).addClass('selected');
		}

		//Generate pagination
		for(i = 1; i <= nPage; i++){

			$('#paginate .numbers').append('<li>' + i + '</li>');
		}

		//Change on click
		$('#paginate ul li').click(function(){

			if($(this).index() + 1 != pageLoad){

				pageLoad = $(this).index() + 1;
				$(divSelect).hide();

				$(divSelect).each(function(i){

					if(i >= ( (pageLoad * nPerPage) - nPerPage) && i < (pageLoad * nPerPage) ){

						$(this).show();
					}
				});

				reset();
			}
		});

		//On click
		//Next
		$('#paginate .next-page').click(function(){

			if(pageLoad < nPage){

				pageLoad += 1;
				console.log(pageLoad);
				$(divSelect).hide();
				//calcPages(0);

				$(divSelect).each(function(i){

					if( i >= ( (pageLoad * nPerPage) -  nPerPage) && i < (pageLoad * nPerPage) ){

						$(this).show();

					}
				});
				reset();
			}
		});

		//Previous
		$('#paginate .prev-page').click(function(){

			if(pageLoad - 1 >= 1){

				pageLoad -= 1;
				console.log(pageLoad);
				$(divSelect).hide();
				//calcPages(1);

				$(divSelect).each(function(i){

					if( i >= ( (pageLoad * nPerPage) -  nPerPage) && i < (pageLoad * nPerPage) ){

						$(this).show();

					}
				});

				reset();
			}
		});

		reset();
	}

});