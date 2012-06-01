/*!
 * jQuery Blogger Item Navigation 1.0
 * http://modification-blog.blogspot.com/
 * Copyright 2012, Blogger Tune-Up
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: Mon May 28 14:54:29 2012 -0500
 */
var JudNav = {};
function ambilJudNav(a) {
    for (var i = 0; i < a.feed.entry.length; i++) {
        var b = a.feed.entry[i];
        var c = "";
        for (var k = 0; k < b.link.length; k++) {
            if (b.link[k].rel == 'alternate') {
                c = b.link[k].href;
                break
            }
        }
        if (c != "") JudNav[c] = b.title.$t
    }
}
document.write('<script type="text/javascript" src="http://' + window.location.hostname + '/feeds/posts/summary?redirect=false&max-results=500&alt=json-in-script&callback=ambilJudNav"></' + 'script>');
function JudulURL(a) {
    var b = a.match(/\/([^\/_]+)(_.*)?\.html/);
    if (b) {
        b = b[1].replace(/-/g, " ");
        b = b[0].toUpperCase() + b.slice(1);
        if (b.length > 28) b = b.replace(/ [^ ]+$/, "...")
    }
    return b
}
$(window).load(function () {
    window.setTimeout(function () {
        var a = $("a.blog-pager-newer-link").attr("href");
        if (a) {
            var b = JudNav[a];
            if (!b) b = JudulURL(a);
            if (b) $("a.blog-pager-newer-link").html(b)
        }
        a = $("a.blog-pager-older-link").attr("href");
        if (a) {
            var b = JudNav[a];
            if (!b) b = JudulURL(a);
            if (b) $("a.blog-pager-older-link").html(b)
        }
    }, 500)
});