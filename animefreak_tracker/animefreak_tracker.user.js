// ==UserScript==
// @name           animefreak tracker
// @namespace      git2samus
// @include        http://www.animefreak.tv/tracker*
// ==/UserScript==

var safeJSON = {
    parse: function(data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    }
}

function get_shows() {
    var shows = safeJSON.parse(localStorage.getItem('af_tracker'));

    if (shows instanceof Array)
        return shows;

    return [];

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

function add_show(e) {
    var new_show = prompt('Add show');

    if (new_show !== null) {
        var shows = get_shows();
        shows.push(new_show);
        localStorage.setItem('af_tracker', JSON.stringify(shows));
    }

    e.preventDefault();
}

function update_table(container) {
    var shows = get_shows();

    var tableHTML = '<tr><th>Highlighted Shows</th></tr>';
    for (var j=0; j<shows.length; j++)
        tableHTML += '<tr><td><a href="#">' + shows[j] + '</a></td></tr>';

    container.innerHTML = '<table>' + tableHTML + '</table>';

    // container.innerHTML += '<a id="add_show" href="#">Add show...</a>';
    var add_show_link = document.createElement('a');
    add_show_link.innerHTML = 'Add show...';
    add_show_link.href = '#';
    add_show_link.addEventListener('click', add_show, false);
    container.appendChild(add_show_link);
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
