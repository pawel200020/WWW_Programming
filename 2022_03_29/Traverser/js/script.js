$(document).ready(function() {
    $("#reader").load("js/read.php");
    $(document).on('click', '#flip', function() {
        $("#panel").slideDown("slow");
    });
});