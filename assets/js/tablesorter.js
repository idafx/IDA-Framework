$(document).ready(function() {

  $('table.sortable').each(function() {

    var $table = $(this);

    $('th', $table).each(function(column) {

      if ($(this).is('.sort-alpha')) {

        $(this).addClass('clickable').hover(function() {

          $(this).addClass('hover');

        }, function() {

          $(this).removeClass('hover');

        }).click(function() {

          var rows = $table.find('tbody > tr').get();

          rows.sort(function(a, b) {

            var keyA = $(a).children('td').eq(column).text()
                                                      .toUpperCase();

            var keyB = $(b).children('td').eq(column).text()
                                                      .toUpperCase();

            if (keyA < keyB) return -1;

            if (keyA > keyB) return 1;

            return 0;

          });

          $.each(rows, function(index, row) {

            $table.children('tbody').append(row);

          });

        });

      }

    });

  });

});