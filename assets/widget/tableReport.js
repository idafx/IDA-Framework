jQuery.fn.extend({

    tableReport: function(vars){
        var defaults = {
            dataset: null,
            geo: 0,
            ent: 0,
            value: "actual",
            version: "actual",
            display: "amt",
            y1: null,
            y2: null,
            m1: null,
            m2: null,
            level: 5,
            series: null, //eg: year | month | quarter
            decimal:3,
            target: null
        };

        vars = $.extend(defaults, vars);

        if(vars.dataset==null)
        {
            this.append("Error: report dataset parameter invalid")
            return
        }

        if(vars.series==null)
        {
            this.append("Error: report dataset parameter invalid")
            return
        }
        if(vars.target==null)
        {
            this.append("Error: report target selector parameter invalid")
            return
        }
        $.ajax({
            type: "GET",
            url: baseURL + "mapping/content" ,
            data: vars,
            success: function(data){
                $(vars.target).html(data)
            }
        })
    }

})