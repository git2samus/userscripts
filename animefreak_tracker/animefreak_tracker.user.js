// ==UserScript==
// @name           animefreak tracker
// @namespace      git2samus
// @include        http://www.animefreak.tv/tracker
// ==/UserScript==

var shows = [
    'X-Men',
    'Fairy Tail',
    'Deadman Wonderland',
    '\\[C\\] The Money of Soul and Possibility Control',
    'Naruto Shippuuden',
    'Steins Gate',
];
var shows_re = new RegExp('(' + shows.join('|') + ') Episode \\d+');

var links = document.getElementById('primary').getElementsByTagName('a');
for (var i=0; i<links.length; i++) {
    var link = links[i];
    if (shows_re.test(link.text))
        link.style.fontWeight = 'bold';
}
