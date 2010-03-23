jQuery.rss = function(vars) {
    vars = jQuery.extend({

        url: null,
        target: null

    }, vars)

    if(vars.url==null)
    {
        this.append("Error: RSS url parameter invalid")
        return
    }

    if(vars.target==null)
    {
        this.append("Error: report target selector parameter invalid")
        return
    }

    $.getFeed({
        
        url: vars.url,
        success: function(feed) {
            var html = "<h2><a href="+ feed.link + ">" + feed.title + "</a></h2>";
            for(var i = 0; i < feed.items.length && i < 5; i++) {
                var item = feed.items[i];
                html += "<h3><a href=" + item.link + ">" + item.title + "</a></h3>";
                html += "<span class=updated>" + item.updated + "</span>";
                html += "<p>"+ item.description + "</p>";
            }
            $(vars.target).html(html);
        }
    })
}
