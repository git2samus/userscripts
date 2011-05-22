// ==UserScript==
// @name           animefreak tracker
// @namespace      git2samus
// @include        http://www.animefreak.tv/tracker
// ==/UserScript==

var shows = [
    'X-Men',
    'Fairy Tail',
    'Deadman Wonderland',
    'The Money of Soul and Possibility Control',
    'Naruto Shippuuden',
    'Steins Gate',
    'Break Blade',
    'Lost Canvas',
];

var links = document.getElementById('primary').getElementsByTagName('a');
for (var i=0; i<links.length; i++) {
    var link = links[i];
    for (var j=0; j<shows.length; j++) {
        if (link.text.toLowerCase().indexOf(shows[j].toLowerCase()) >= 0) {
            link.style.fontWeight = 'bold';
            break;
        }
    }
}
