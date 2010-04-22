/**
 * jQuery Delay - A delay function
 * Copyright (c) 2009 Clint Helfers - chelfers(at)gmail(dot)com | http://blindsignals.com
 * Dual licensed under MIT and GPL.
 * Date: 7/01/2009
 * @author Clint Helfers
 * @version 1.0.0
 *
 * http://blindsignals.com/index.php/2009/07/jquery-delay/
 */


$.fn.delay = function( time, name ) {

    return this.queue( ( name || "fx" ), function() {
        var self = this;
        setTimeout(function() { $.dequeue(self); } , time );
    } );

};

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
                html += '<div class="rss-news-new" style="visiblity:hidden">'
                html += "<h3><a href=" + item.link + ">" + item.title + "</a></h3>";
                html += "<span class=updated>" + item.updated + "</span>";
                html += "<p>"+ item.description + "</p>";
                html += '</div>';
            }
            
            $(vars.target).html(html)//.fadeIn('slow')
            $(vars.target+ ' .rss-news-new').each(function() {
                $(this).delay(1000).fadeIn('slow')

            })
            
            
        }
    })
}
