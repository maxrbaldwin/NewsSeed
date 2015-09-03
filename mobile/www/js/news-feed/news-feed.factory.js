app.factory('FeedFactory', function($http){
  return {
    get: function() {
      return $http.get('http://localhost:5000/api/seeds');
    }
  };
});
