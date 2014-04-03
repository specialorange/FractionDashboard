/* --------------------------------------------------------	
	Portfolio 
   --------------------------------------------------------	*/	

   (function() {

		$(window).load(function(){

			// container
			var $container = $('#portfolio-items');

			//basic hash trunk
			var trunk = "../about.html";

			//if there is a slash in the hash
			var fullHash = window.location.hash;
			var slashPosition = fullHash.indexOf("/");
			var hashAfterSlash = "";
			var trunkHash = fullHash;
			if (slashPosition > 0) {
				hashAfterSlash = fullHash.substr(slashPosition+1);
				trunkHash = fullHash.substr(0,slashPosition);
			}


			function filter_projects(tag, pageHash)
			{
			  // filter projects
			  $container.isotope({ filter: tag });
			  
			  // clear active class
			  $('#portfolio-filter li.active').removeClass('active');
			  
			  // add active class to filter selector
			  $('#portfolio-filter').find("[data-filter='" + tag + "']").parent().addClass('active');
			  
			  // update location hash
				window.location.hash=pageHash+"/"+tag.replace('.','').replace("*","");
			}

			if ($container.length) { //if it's > 0 this will be true 

				// convert data-tags to classes
				$('.project').each(function(){
					$this = $(this);
					var tags = $this.data('tags');
					if (tags) {
						var classes = tags.split(',');
						for (var i = classes.length - 1; i >= 0; i--) {
							$this.addClass(classes[i]);
						};
					}
				})

				// initialize isotope
				$container.isotope({
				  // options...
				  itemSelector : '.project',
				  layoutMode   : 'fitRows'
				});

				// filter items
				$('#portfolio-filter li a').click(function(){
					var selector = $(this).attr('data-filter');
					filter_projects(selector, trunk);
					return false; //similar(?) to event.preventDefault?
				});

				// filter tags if location.hash is available. e.g. http://example.com/work.html#design will filter projects within this category
				// hash != trunk
				var resultOfHashLogicFunTimes = "";

				if (fullHash!=trunk) { //this means we should filter the url
					//is the currentHash valid?
					
					// 		check that it starts with ../about.html
					if (trunkHash==trunk) {
						resultOfHashLogicFunTimes = hashAfterSlash;
					//		check whether it has a '/'
						//if so, is the part after the slash valid (you can get the data-filter attr off of your #p-filter li a)

						var $isThereADataFilterByThatName = $("#portfolio-filter li a[data-filter='."+resultOfHashLogicFunTimes+"']");

						if ( $isThereADataFilterByThatName.length > 0) {
							//if so, pass that thing into this filter
							filter_projects( '.' + resultOfHashLogicFunTimes, trunk);
						}
						// else replace the garbage hash with ../about.html and pass "all" into filter
						else {
							window.location.hash = trunk;
						}
					}
				} else {
					//This means the url is like trunck, and we shouldn't filter
					//forcing a filter just because I can't find out why it is filtering
					// $('#portfolio-filter').find("[data-filter='*']").click();
				}
			}
		})

	})();

