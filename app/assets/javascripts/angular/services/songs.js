'use strict';

app.factory('songsService',['$http', function ( $http) {

    // create an array as part of my catalogue
    this.songs = [];
    var that = this;

    function getSongs(){
      $http({method: 'GET', url: '/songs.json'}).
        success(function(data, status, headers, config) {
          that.songs.push(data);
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

        return that;
    }

    return {
      get: getSongs
    }

}]);


