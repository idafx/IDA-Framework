jQuery.fn.extend({

    mapping: function(vars){

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
            level: 2,
            series: "year",
            decimal:3,
            target: null
        };

        vars = $.extend(defaults, vars);

        if(vars.dataset==null)
        {
            this.append("Error: Map dataset parameter invalid")
            return
        }
        if(vars.geo==null)
        {
            this.append("Error: Map geography parameter invalid")
            return
        }
        if(vars.target==null)
        {
            this.append("Error: Map target selector parameter invalid")
            return
        }
        var mapp = $(vars.target);

        $.getJSON( baseURL+"mapping/markers" , vars, function(data) {

            mapp.jmap("init", {
                "mapType":  G_HYBRID_MAP,
                "mapCenter":[data.mapcenter.latitude, data.mapcenter.longitude],
                "mapZoom":  Number(data.mapcenter.zoom),
                "mapShowjMapsIcon": false
            })

            //            var map = new GMap2(document.getElementById("mapp"));
            //            map.setCenter(new GLatLng(data.mapcenter.latitude, data.mapcenter.latitude), data.mapcenter.zoom);
            //            map.setUIToDefault();

            //mapp.jmap('CreateMarkerManager', {'markerManager':'MarkerManager'});

            $.each(data.markers, function(i, item) {

                mapp.jmap('AddMarker', {
                    'pointLatLng': [item.latitude, item.longitude],
                    'pointHTML': item.name+": double click marker to load",
                    'pointMinZoom': 1
                }
                ,

                function (mapp, marker, options){

                    GEvent.addListener(mapp, "click", function(){

                        vars.geo = item.id

                        $.get( baseURL+"mapping/content" , vars, function(data) {

                            marker.pointHTML = data


                        }, "html")

                    //mapp.MarkerManager.refresh()
                    })
                })
            })
        })
    }
})