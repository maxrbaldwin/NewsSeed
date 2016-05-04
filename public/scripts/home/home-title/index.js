var homeTitle = (function(){
	
	var module = {
		animationSpeed: 500,
		currentIndex: 0,
		titles: [
			'Be Well Informed',
			'The News Without The Ads',
			'Get The Whole Story',
			'More Than Breaking News'
		],
		init: function() {
			var self = this;

			this.setSubTitle();
			
			$('.statement').fadeIn(this.animationSpeed, function(){
				setInterval(function(){
					self.changeSubTitle();
				}, 4000);
			});
		},
		getRandomTitle: function() {
			if(this.currentIndex > this.titles.length) {
				this.currentIndex = 0;
			}
			this.currentIndex++
			return this.titles[this.currentIndex];
	
		},
		setSubTitle: function() {
			var subTitle = this.getRandomTitle();

			$('.sub-title').html('<h2>' + subTitle + '</h2>')
		},
		changeSubTitle: function() {
			var self = this;

			$('.sub-title').fadeOut(this.animationSpeed, function(){
				self.setSubTitle();
			}).fadeIn(this.animationSpeed);
		}
	}

	return module;
})();