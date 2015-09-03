app.controller('NewsFeedCtrl', function($scope, FeedFactory) {
  $scope.feed = {};

  FeedFactory.get().then(function(docs) {
      $scope.feed.original = docs.data;
      $scope.stories = docs.data;
    });

  $scope.storyClick = function(storyIndex) {
    $scope.stories = $scope.stories[storyIndex].stories;
  };

  $scope.resetFeed = function() {
    $scope.stories = $scope.feed.original;
  };
});
