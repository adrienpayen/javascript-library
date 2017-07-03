(function($){

    $.fn.extend({

        slider: function(options) {

            //Settings list and the default values
            var defaults = {
                jsonData : {
                    url : false
                },
                jsonDataStruct : {
                    url : "url",
                    title : "title",
                    description : "description"
                },
                mainDiv : false,
                speed : 1500,
                interval: 4500,
                autoplay: true
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var that = this;
                var uuid = guid();

                if (!o.mainDiv) {
                    var mainDiv = "rail-" + uuid;
                }

                Slider.initialize(that, mainDiv, o.width);

                if (o.jsonData.url) {
                    $.ajax({
                        url: o.jsonData.url,
                        type: 'GET',

                        success : function(content) {

                            var parsedContent = JSON.parse(content);
                            parsedContent.forEach(function(element){
                                Slider.images.add(mainDiv,element, o.jsonDataStruct);
                            });
                        }
                    });
                }

var numberImg= 4;

                Slider.resize(mainDiv, numberImg);


                $(".next").on("click", function(){ Slider.nextStep(mainDiv, o.speed) });
                $(".previous").on("click", function(){ Slider.previousStep(mainDiv, o.speed) });
                $(".play").on("click", function(){ Slider.autoPlay(mainDiv, o.speed, o.interval) });
                $(".stop").on("click", function(){ Slider.stopAutoPlay() });
            });
        }
    });
})(jQuery);

/** MY SLIDER OBJECT **/
var Slider = {
    initialize: function(target, name) {
        $(target).append("<ul id='" + name + "' " +
            "style='padding:0; margin:0 0 0 -"+$(target).width()+"px; list-style-type: none; display:flex; height: 100%;'></ul>");
    },

    resize: function(target, numberElement) {
        $("#"+target).css('width', ($("#"+target).parent().width() * numberElement) + "px");

        // $(window).resize(function(){
        //
        //     $("#"+target).css('width', ($("#"+target).parent().width() * numberElement) + "px");
        // })
    },

    images : {
        add: function(target, content, struct) {
            $("#" + target).append(
                "<li style='width:100%; text-align: center;' id='"+guid()+"'>" +
                "<img src='"+content[struct.url]+"' style='width:100%; margin:auto;' alt='"+content[struct.description]+"'>" +
                "<div class='textSlider'>" + content[struct.description] +"</div>" +
                "</li>");
        }

    },

    nextStep: function(target, speed) {
        $("#"+target).animate({marginLeft:-($("#"+target).children().width())*2},speed,function(){
            $(this).css({marginLeft:"-"+$("#"+target).children().width()+"px"}).find("li:last").after($(this).find("li:first"));
        });
    },

    previousStep: function(target, speed) {
        $("#"+target).animate({marginLeft:0},speed,function(){
            $(this).css({marginLeft:"-"+$("#"+target).children().width()+"px"}).find("li:first").before($(this).find("li:last"));
        })
    },

    autoPlay: function(target, speed, interval) {
        Slider.nextStep(target, speed);
        myInterval = setInterval(function(){
            Slider.nextStep(target, speed)
        }, interval);
    },

    stopAutoPlay: function() {
        clearInterval(myInterval);
    },



};

/** Helpers Function **/
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x100)
            .toString(8)
            .substring(1);
    }

    return s4() + s4() + s4() + s4();
}

//
// function addImage(where, what) {
//     $(where).append("<li><img src='" + what['url'] + "' alt='" + what['title'] + "' style='width:" + windowsWidth +"px'></li>").width(windowsWidth*3);
// }
//
// function resizeSlideshow() {
//     $('#slideshow').width(windowsWidth);
//     $('#slideshow').height(slideshowHeight);
// }


// $("#slideshow #rail").css({marginLeft:-(window.innerWidth)});
//
//
// $('.suivant').on('click', function(){
//     $("#slideshow #rail").animate({marginLeft:-(window.innerWidth)},1500,function(){
//         $(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
//     })
// });
//
// $('.precedent').on('click', function(){
//     $("#slideshow #rail").animate({marginLeft:(window.innerWidth)},1500);
//
//     $("#slideshow #rail").find("li:first").before($("#slideshow #rail").find("li:last"));
// });
//
// $('.play').on('click', function(){
//     setInterval(function(){
//         $("#slideshow #rail").animate({marginLeft:-(window.innerWidth)},1500,function(){
//             $(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
//         })
//     }, 4500);
// });