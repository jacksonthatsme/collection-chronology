$( document ).ready(function() {

function addPlaylists(data) {
  // process the data into years
  for (var i=0; i<data.length; i++) {
    var playlist = data[i];
  }
}
function buildPlaylists(data) {
  for (var i=0; i<data.length; i++) {
    var playlistRow = $('<div>').addClass('playlist-row');
    var playlist = data[i];
    var art = $('<img>').addClass('album-art').attr('src', playlist['icon']);
    playlistRow.append(art);
    playlistRow.appendTo($('#wrapper'));
  }
};

function loadPlaylists(page) {
      var playlistCount = 0;
      $.getJSON('/playlists/s15438980/'+page, function(a) {
        if (a.length > 0) {
          // loaded some albums
          addPlaylists(a);
          // update the ui
          playlistCount += a.length
          $('#loading').text('Loading '+playlistCount+' Jams');
          // go look for some more
          loadPlaylists(page+1);
          // looks like there's nothing left to load
          buildPlaylists(a);
        }
      })
    }

loadPlaylists(0);

});