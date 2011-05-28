// ==UserScript==
// @name           animefreak tracker
// @namespace      git2samus
// @include        http://www.animefreak.tv/tracker*
// ==/UserScript==

// http://www.jslab.dk/library/Array.unique
Array.prototype.unique = function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++) {
            // If this[i] is found later in the array
            if (this[i] === this[j])
                j = ++i;
        }
        a.push(this[i]);
    }
    return a;
};

// http://www.reddit.com/r/javascript/comments/hl695/how_can_i_use_localstorage_with_arrays_and_objects/c1wa8je?context=1
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
        return shows.sort();

    return [];
}

function add_show(e) {
    var new_show = prompt('Add show:');
    if (new_show !== null) {
        var shows = get_shows();
        shows.push(new_show);
        shows = shows.unique();

        localStorage.setItem('af_tracker', JSON.stringify(shows));
        update_table();
    }

    e.preventDefault();
}

function edit_show(e) {
    var old_show = e.target.text;

    var new_show = prompt('Edit show:', old_show);
    if (new_show !== null) {
        var shows = get_shows();

        var a = [];
        for (var i=0; i<shows.length; i++) {
            var show = shows[i];
            if (show == old_show) {
                if (new_show) {
                    a.push(new_show);
                }
            } else {
                a.push(show);
            }
        }

        localStorage.setItem('af_tracker', JSON.stringify(a));
        update_table();
    }

    e.preventDefault();
}

function highlight_links(shows) {
    var links = document.getElementById('primary').getElementsByTagName('a');
    for (var i=0; i<links.length; i++) {
        var link = links[i];
        var match = false;
        for (var j=0; j<shows.length; j++) {
            var show = shows[j];
            if (link.text.toLowerCase().indexOf(show.toLowerCase()) >= 0) {
                match = true;
            }
        }
        if (match) {
            link.style.fontWeight = 'bold';
        } else {
            link.style.fontWeight = '';
        }
    }
}

function update_table() {
    var shows = get_shows();

    var tableHTML = '<tr><th>Highlighted Shows</th></tr>';
    for (var j=0; j<shows.length; j++)
        tableHTML += '<tr><td><a href="#">' + shows[j] + '</a></td></tr>';

    var container = document.getElementById('highlight_shows');
    container.innerHTML = '<table>' + tableHTML + '</table>';

    var links = container.getElementsByTagName('a');
    for (var i=0; i<links.length; i++) {
        var link = links[i];
        link.addEventListener('click', edit_show, false);
    }

    var add_show_link = document.createElement('a');
    add_show_link.innerHTML = 'Add show...';
    add_show_link.href = '#';
    add_show_link.addEventListener('click', add_show, false);
    container.appendChild(add_show_link);

    highlight_links(shows);
}

// init
var container = document.createElement('div');
container.id = 'highlight_shows';

var rsidebar = document.evaluate('//div[@class="rsidebar"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
rsidebar.insertBefore(container, rsidebar.firstElementChild);

update_table();
