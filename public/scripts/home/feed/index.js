var feed = (function(){
	var module = {
		init: function() {
			this.getRecentSeeds()
				.done(function(seeds){
					console.log(seeds);
				}).fail(function(err){
					console.log(err);
				});
		},
		getRecentSeeds: function() {
			var settings = {
				url: '/api/seeds/recent',
				method: 'GET',
				dataType: 'JSON'
			}
			
			return $.ajax(settings)
		}
	}

	return module;
})();