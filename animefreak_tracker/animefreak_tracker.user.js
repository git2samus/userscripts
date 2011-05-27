// ==UserScript==
// @name           animefreak tracker
// @namespace      git2samus
// @include        http://www.animefreak.tv/tracker*
// ==/UserScript==

function mytest(e) { alert('a'); e.preventDefault(); }

function get_shows() {
    return [
        'X-Men',
        'Fairy Tail',
        'Deadman Wonderland',
        'The Money of Soul and Possibility Control',
        'Naruto Shippuuden',
        'Steins Gate',
        'Break Blade',
        'Lost Canvas',
    ];
}

function update_table(container) {
    var shows = get_shows();

    var tableHTML = '<tr><th>Highlighted Shows</th></tr>';
    for (var j=0; j<shows.length; j++)
        tableHTML += '<tr><td><a href="#">' + shows[j] + '</a></td></tr>';

    container.innerHTML = '<table>' + tableHTML + '</table>';
    // container.innerHTML += '<a id="add_show" href="#">Add show...</a>';
    var add_show = document.createElement('a');
    add_show.innerHTML = 'Add show...';
    add_show.href = '#';
    add_show.addEventListener('click', mytest, false);
    container.appendChild(add_show);
}

function highlight_links() {
    var shows = get_shows();

    var links = document.getElementById('primary').getElementsByTagName('a');
    for (var i=0; i<links.length; i++) {
        for (var j=0; j<shows.length; j++) {
            if (links[i].text.toLowerCase().indexOf(shows[j].toLowerCase()) >= 0) {
                links[i].style.fontWeight = 'bold';
                break;
            }
        }
    }
}

var container = document.createElement('div');
var rsidebar = document.evaluate('//div[@class="rsidebar"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
rsidebar.insertBefore(container, rsidebar.firstElementChild);

update_table(container);
highlight_links();
