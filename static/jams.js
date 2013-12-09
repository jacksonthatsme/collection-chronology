$( document ).ready(function() {

function addAlbums(data) {
  // process the data into years
  for (var i=0; i<data.length; i++) {
    var album = data[i];
  }
}
function buildPlaylists(data) {
  for (var i=0; i<data.length; i++) {
    var playlistRow = $('<div>').addClass('playlist-row');
    var album = data[i];
    var art = $('<img>').addClass('album-art').attr('src', album['icon']);
    playlistRow.append(art);
    playlistRow.appendTo($('#wrapper'));
  }
};

function loadNextAlbums(page) {
      var albumCount = 0;
      $.getJSON('/albums/s15438980/'+page, function(a) {
        if (a.length > 0) {
          // loaded some albums
          addAlbums(a);
          // update the ui
          albumCount += a.length
          $('#loading').text('Loaded '+albumCount+' albums...');
          // go look for some more
          loadNextAlbums(page+1);
          // looks like there's nothing left to load
          buildPlaylists(a);
        }
      })
    }

loadNextAlbums(0);

});