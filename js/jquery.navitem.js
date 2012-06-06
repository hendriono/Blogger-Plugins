/*!
 * jQuery Blogger Item Navigation 1.0
 * http://modification-blog.blogspot.com/
 * Copyleft 2012, Blogger Tune-Up
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: Mon May 28 14:54:29 2012 -0500
 */
var JudNav = {};
//Fungsi pengambilan judul artikel melalui feed
function ambilJudNav(json) {
    for (var i = 0; i < json.feed.entry.length; i++) {
        var judul = json.feed.entry[i];
        var data = "";
        for (var k = 0; k < judul.link.length; k++) {
            if (judul.link[k].rel == 'alternate') {
                data = judul.link[k].href;
                break
            }
        }
        if (data != "") JudNav[data] = judul.title.$t
    }
}
//Fungsi penulisan sekumpulan judul feed dengan mengambilnya dari fungsi sebelumnya 'ambilJudNav'
document.write('<script type="text/javascript" src="http://' + window.location.hostname + '/feeds/posts/summary?redirect=false&max-results=500&alt=json-in-script&callback=ambilJudNav"></' + 'script>');
//Fungsi Pengambilan Anchor, Pengecekan URL dan Penggantian beberapa simbol
function JudulURL(anchor) {
    var linkurl = anchor.match(/\/([^\/_]+)(_.*)?\.html/);
    if (linkurl) {
        linkurl = linkurl[1].replace(/-/g, " ");
        linkurl = linkurl[0].toUpperCase() + linkurl.slice(1);
        if (linkurl.length > 28) linkurl = linkurl.replace(/ [^ ]+$/, "...")
    }
    return linkurl
}
//Mengganti 'Posting Lama' dan 'Posting Lebih Baru' dengan fungsi jQuery saat halaman di-load
$(window).load(function () {
    window.setTimeout(function () {
        var anchor = $("a.blog-pager-newer-link").attr("href");
        if (anchor) {
            var judul = JudNav[anchor];
            if (!judul) judul = JudulURL(anchor);
            if (judul) $("a.blog-pager-newer-link").html(judul)
        }
		anchor = $("a.blog-pager-older-link").attr("href");
        if (anchor) {
            var judul = JudNav[anchor];
            if (!judul) judul = JudulURL(anchor);
            if (judul) $("a.blog-pager-older-link").html(judul)
        }
    }, 500)
});