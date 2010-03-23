(function($){
    $.fn.DynamicDropDown = function() {
        this.change(function(){
            var child = $(this).attr('child');
            var child_id = '#'+child
            $(child_id).replaceWith('<span id='+child+'>loading</span>');
            var level = $(this).attr('level')
            var upperLevel = '.pr'+ (++level)
            $(upperLevel).replaceWith('')
            $.get(
                $().baseURL ()+'elementAjax/subelement',
                {
                    parent_id:$(this).val(),
                    target:child,
                    dataset:$(this).attr('dataset'),
                    dimension:$(this).attr('dimension'),
                    level:level
                },
                function(data){
                    $(this).attr('name', '')
                    $(child_id).replaceWith(data)
                    $(child_id).val(0)
                    $(child_id).DynamicDropDown()
                }
                ,
                'html'
                )
        })
    }
})(jQuery);