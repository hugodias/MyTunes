app.controller('MainCtrl', ['$scope','songsService' ,function($scope, songsService) {
  var audio = new Audio();

  $scope.queue = [];
  $scope.trash = [];
  $scope.order = 'album'
  $scope.current_song = false;


  $scope.songs = songsService.get().songs;

  // Change to the next song when the current one finishes
  audio.addEventListener('ended', function () {
    $scope.nextSong();
   });

  $scope.setOrder = function(order){
    $scope.order = order;
  }

  $scope.findClick = function(q){
    $scope.query = q;
  }

  // Play the current song
  $scope.playSong = function(){
    audio.play();
  }

  // Stop current song
  $scope.stopSong = function(){
    audio.pause();
  }

  // Change to prev song. If is the first one jump to the last one
  $scope.prevSong = function(){
    var prev = ($scope.current_song - 1) >= 0 ? ($scope.current_song - 1) : ($scope.queue.length - 1);
    $scope.changeSong(prev);
  }

  // Change to next song. If is the last one jump to the first one
  $scope.nextSong = function(){
    var next = ($scope.current_song + 1) < $scope.queue.length ? ($scope.current_song + 1) : 0;
    $scope.changeSong(next);
  }

  // Change the song to the index passed in params (In queue list)
  $scope.changeSong = function(index){
    var song = $scope.queue[index];
    audio.src = song.file;
    audio.play();
    $scope.current_song = index;
  }

  // Remove song from queue
  $scope.removeQueue = function(index){

    // Remove from queue
    $scope.queue.splice(index,1);

    // In case the song is the current one, stop it
    if( $scope.current_song == index ){
      audio.src = '';
      audio.pause();
      // Reset current_song
      $scope.current_song = -1;
    } else {
      // If current song index > removed index we remove 1 index from queue to back 1 position
      if( $scope.current_song > index ) {
        $scope.current_song--;
      }
    }
  }

  // Start song from the list of songs
  $scope.startSong = function(song){

    // Insert the music in the queue
    $scope.queue.push(song);

    // Only play the song if the queue is empty
    if ($scope.current_song === false || $scope.current_song == -1) {
      audio.src = song.file;
      audio.play();
      $scope.current_song = ($scope.queue.length - 1);
    }
  }

}]);