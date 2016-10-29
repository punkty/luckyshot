$(document).ready(function(){
    $("#show").on('click',function(){
        $(".pokemon").show();
    })
    $('.pokemon').click('click',function() {
        $(this).hide();
    })

});