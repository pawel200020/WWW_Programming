$(function() {
    $("#reader").load("js/read.php");
    $('.content').hide();
    var $elms = '.cpu, .motherboards, .gpu';

    $(document).on('click', $elms, function() {
        var $content = $(this).children('.content');
        $content.stop(1, 1).slideToggle(600);
    });
    // var items = ['breakfast', 'lunch', 'dinner'];

    // $('.breakfast').on("hover", function(event) {
    //     if (event.type == "mouseenter") {
    //         console.log("entered");
    //     } else if (event.type == "mouseleave") {
    //         $(this).find('.dropfcnt').hide('blind', function() {
    //             $('.actionfcnt').hide();
    //         });
    //     }
    // });

    // $(items).each(function() {




    //     var sel = this;



    //     $(".top_level").on("hover", function(event) {
    //         if (event.type == "mouseenter") {
    //             $('.' + sel).parent().slideDown(400);
    //             $('.' + sel).siblings(':not(.' + sel + ')').hide();
    //         } else if (event.type == "mouseleave") {
    //             $(this).find('.dropfcnt').hide('blind', function() {
    //                 $('.actionfcnt').hide();
    //             });
    //         }
    //     });

    //     $('#' + sel).hover(function() {
    //         $('.' + sel).parent().slideDown(400);
    //         $('.' + sel).siblings(':not(.' + sel + ')').hide();
    //     }, function() {
    //         $('.' + sel).parent().slideUp(400);
    //         //$('.' + sel).siblings(':not(.' + sel + ')').show();
    //     });

    // });
});