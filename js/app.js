$(window).ready(function(){

    $('#slideshow').slider({
        'jsonData' : {
            "url" : "https://www.skrzypczyk.fr/slideshow.php"
        },
        'jsonDataStruct' : {
            "url" : "url",
            "title" : "title",
            "description" : "desc"
        },
        'autoplay' : false,
        'speed' : 1000,
        'interval' : 3000
    });

    // var slideShowDivId = "#rail";
    // var url = "https://www.skrzypczyk.fr/slideshow.php";
    // var slideshowHeight = 500;
    // var windowsWidth = window.innerWidth;
    //
    // $.ajax({
    //     url: url,
    //     type: 'GET',
    //
    //     success : function(content) {
    //         var parsedContent = JSON.parse(content);
    //
    //         resizeSlideshow();
    //         parsedContent.forEach(function(element){
    //             addImage(slideShowDivId,element);
    //         });
    //
    //
    //         $("#slideshow #rail").css({marginLeft:-(window.innerWidth)});
    //
    //
    //         $('.suivant').on('click', function(){
    //             $("#slideshow #rail").animate({marginLeft:-(window.innerWidth)},1500,function(){
    //                 $(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
    //             })
    //         });
    //
    //         $('.precedent').on('click', function(){
    //             $("#slideshow #rail").animate({marginLeft:(window.innerWidth)},1500);
    //
    //             $("#slideshow #rail").find("li:first").before($("#slideshow #rail").find("li:last"));
    //         });
    //
    //         $('.play').on('click', function(){
    //             setInterval(function(){
    //                 $("#slideshow #rail").animate({marginLeft:-(window.innerWidth)},1500,function(){
    //                     $(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
    //                 })
    //             }, 4500);
    //         });
    //     }
    // });
    //
    // function addImage(where, what) {
    //     $(where).append("<li><img src='" + what['url'] + "' alt='" + what['title'] + "' style='width:" + windowsWidth +"px'></li>").width(windowsWidth*3);
    // }
    //
    // function resizeSlideshow() {
    //     $('#slideshow').width(windowsWidth);
    //     $('#slideshow').height(slideshowHeight);
    // }
    //
    // function autoPlay(){
    //
    // }
});

