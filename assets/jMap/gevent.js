jQuery(document).ready(function(){
    jQuery('#map1, #map2').jmap('init',{
        'mapType':G_HYBRID_MAP,
        'mapCenter':[37.4419, -122.1419]
    },
    function (map, element, options){
        GEvent.addListener(map, "moveend", function(){

            // We don't need to use the internal Mapifies.getCenter here, as we have direct access to the map object.
            var mapCenter = map.getCenter();
            jQuery('.position-value').text(mapCenter.y + ',' + mapCenter.x);

            jQuery('#map1').jmap('SearchAddress', {
                'query': new GLatLng(mapCenter.y, mapCenter.x),
                'returnType':'getLocations'
            }, function(result, options){
                var valid = Mapifies.SearchCode(result.Status.code);
                if (valid.success) {
                    var output = ['<ul>'];
                    jQuery.each(result.Placemark, function(i, point){
                        output.push('<li>' + point.address + '</li>');
                    });
                    output.push('</ul>');
                    jQuery('.address-value').html(output.join(''));
                }
            });
        });
    });
});
