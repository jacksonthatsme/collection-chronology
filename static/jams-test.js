$( document ).ready(function() {

function addPlaylists(data) {
  // process the data into years
  for (var i=0; i<data.length; i++) {
    var playlist = data[i];
  }
}
function timeFromSecs(seconds)
{
    return(
    Math.floor(((seconds/3600)%1)*60)+'.'+
    Math.round(((seconds/60)%1)*60));
}
function buildPlaylists(data) {
  for (var i=0; i<data.length; i++) {
    //make li.playlist
    var playlistLi = $('<li>').addClass('playlist');
    // set variable playlist as data
    var playlist = data[i];
    // set variable cover as data "Icon"
    var cover = $('<img>').addClass('cover').attr('src', playlist.icon400);
    // Add to li.playlist
    playlistLi.append(cover);
    // Define table
    var table = $('<table>').addClass('list');
    // Add tracks function
    function addTracks(tracks){
      console.log(tracks.length);
        // Define track as data
        var track = playlist.tracks[i];
        // Define table row
        var tr = $('<tr>').addClass('track-listing');
        // define td.count
        var trackCount = $('<td>').addClass('count');
        // define td.listing
        var trackListing = $('<td>').addClass('listing');
        // define td.duration
        var trackDuration = $('<td>').addClass('duration');
        // define listing
        var listing = '<em>' + track.name + '</em>' + ' &#151; ' + track.artist;
        //define duration
        var duration = timeFromSecs(track.duration);
        // add td.count to tr
        tr.append(trackCount);
        //add listing to track listing
        trackListing.append(listing);
        trackDuration.append(duration);
        tr.append(trackListing);
        tr.append(trackDuration);
        tr.appendTo(table);
    }
    $.each(playlist.tracks, function(b, a){
      addTracks(a)
    });
    // Add table to li.playlist
    playlistLi.append(table);
    // define clearfix
    var clear = $('<div>').addClass('clear');
    // Add clearfix
    playlistLi.append(clear);
    // Add li.playlist to ul.playlist
    playlistLi.appendTo($('ul.playlists'));
  }
};
function buildIndex(data){
  for (var i=0; i<data.length; i++) {
    var playlist = data[i];
    //define index li
    var indexLi = $('<li>');
    var linkDown = $('<a>').attr('href', '#' + playlist.name.replace(/\s/g, ''));
    var listName = playlist.name;
    linkDown.append(listName);
    indexLi.append(linkDown);
    indexLi.appendTo($('.index-list ul'));
  }
}
function loadPlaylists(page) {
      var playlistCount = 0;
      $.getJSON('/playlists/s5315988/'+page, function(a) {
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
          buildIndex(a);
        }
      })
    }

loadPlaylists(0);

});
