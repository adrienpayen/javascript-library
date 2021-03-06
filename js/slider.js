(function($) {

    $.fn.extend({

        slider: function(options) {

            //Settings list and the default values
            var defaults = {
                jsonData: {
                    url: false
                },
                jsonDataStruct: {
                    url: "url",
                    title: "title",
                    description: "description"
                },
                mainDiv: false,
                speed: 1500,
                interval: 4500,
                autoplay: true
            };
            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var that = this;
                var uuid = guid();
                var nbImg = 1;


                if (!o.mainDiv) {
                    var mainDiv = "rail-" + uuid;
                }

                Slider.initialize(that, mainDiv, o.width);


                if (o.jsonData.url) {
                    var ajax = $.ajax({
                        url: o.jsonData.url,
                        type: 'GET',

                        success: function(content) {
                            var parsedContent = JSON.parse(content);

                            parsedContent.forEach(function(element) {
                                Slider.images.add(mainDiv, element, o.jsonDataStruct, nbImg);
                                nbImg++;
                            });


                            nbImg = parsedContent.length;

                            Slider.resize(mainDiv, nbImg);

                            console.log(

                            );

                            $(".next").on("click", function() {
                                Slider.nextStep(mainDiv, o.speed, nbImg)
                            });
                            $(".previous").on("click", function() {
                                Slider.previousStep(mainDiv, o.speed, nbImg)
                            });
                            $(".play").on("click", function() {
                                Slider.autoPlay(mainDiv, o.speed, o.interval)
                            });
                            $(".stop").on("click", function() {
                                Slider.stopAutoPlay()
                            });
                            $(".next").on("click", function() {
                                $(".textSlider").slideDown()
                            });
                            $(".autoPlayHover").ready(function() {

                                var $on = 'section';
                                $($on).css({
                                    'background': 'none',
                                    'border': 'none',
                                    'box-shadow': 'none'
                                });

                                $("#autoPlayHover").click(function(){
                                    if($(this).prop("checked") == true){
                                        Slider.autoPlay(mainDiv, o.speed, o.interval)

                                        $(".sliderNav").hover(function(){Slider.stopAutoPlay()}, function(){
                                            Slider.autoPlay(mainDiv, o.speed, o.interval)
                                        });
                                    } else if ($(this).prop("checked") == false){

                                         Slider.stopAutoPlay() // annule l'action du lien

                                    }
                                });
                            });


                            $('.sliderPuces span').on("click", function() {
                                Slider.puceSlide(mainDiv, o.speed, $(this).data('target'), nbImg)
                            })

                        }
                    });
                }
            });
        }
    });
})(jQuery);


/** MY SLIDER OBJECT **/
var Slider = {
    initialize: function(target, name) {
        $(target).append("<ul id='" + name + "' " +
            "style='padding:0; margin:0 0 0 -100%; list-style-type: none; display:flex; height: 100%;'></ul>");
    },

    resize: function(target, numberElement) {
        $("#" + target).css('width', (100 * numberElement) + "%");
    },

    images: {
        add: function(target, content, struct, id) {
            if (id == '2') {
                $("#" + target).append(
                    "<li id='" + guid() + "' class='active' data-id='" + id + "'>" +
                    "<img src='" + content[struct.url] + "' style='width:100%; margin:auto;' alt='" + content[struct.description] + "'>" +
                    "<div class='textSlider'><p class='contentTextSlider'><h2 class='title'>" + content[struct.title] + "</h2>" + content[struct.description] + "</p></div>" +
                    "</li>");
                $('.sliderPuces').append("<span class='active' data-target='" + id + "'></span>");
            } else {
                $("#" + target).append(
                    "<li id='" + guid() + "' data-id='" + id + "'>" +
                    "<img src='" + content[struct.url] + "' style='width:100%; margin:auto;' alt='" + content[struct.description] + "'>" +
                    "<div class='textSlider'><p class='contentTextSlider'><h2 class='title'>" + content[struct.title] + "</h2>" + content[struct.description] + "</p></div>" +
                    "</li>");
                $('.sliderPuces').append("<span data-target='" + id + "'></span>");
            }
        }

    },

    nextStep: function(target, speed, nbImg) {
        var idActive = $("li.active").removeClass("active").data('id');
        $("span[data-target=" + idActive + "]").removeClass("active");

        if (idActive == nbImg) {
            idActive = 1;
        } else {
            idActive++;
        }

        $("li[data-id=" + idActive + "]").addClass("active");
        $("span[data-target=" + idActive + "]").addClass("active");
        $("#" + target).animate({
            marginLeft: -($("#" + target).children().width()) * 2
        }, speed, function() {
            $(this).css({
                marginLeft: "-" + $("#" + target).children().width() + "px"
            }).find("li:last").after($(this).find("li:first"));
        });
    },

    previousStep: function(target, speed, nbImg) {
        var idActive = $("li.active").removeClass("active").data('id');
        $("span[data-target=" + idActive + "]").removeClass("active");

        if (idActive == 1) {
            idActive = nbImg;
        } else {
            idActive--;
        }

        $("li[data-id=" + idActive + "]").addClass("active");
        $("span[data-target=" + idActive + "]").addClass("active");

        $("#" + target).animate({
            marginLeft: 0
        }, speed, function() {
            $(this).css({
                marginLeft: "-100%"
            }).find("li:first").before($(this).find("li:last"));
        })
    },

    autoPlay: function(target, speed, interval) {
        Slider.nextStep(target, speed);
        myInterval = setInterval(function() {
            Slider.nextStep(target, speed)
        }, interval);
    },

    stopAutoPlay: function() {
        clearInterval(myInterval);
    },

    puceSlide: function(target, speed, data, nbImg) {
        $("span.active").removeClass("active");
        $("span[data-target=" + data + "]").addClass("active");

        var idActive = $("li.active").data('id');

        if (idActive < data) {
            var space = data - idActive;

            $("li.active").removeClass('active');
            $("li[data-id=" + data + "]").addClass('active');

            $("#" + target).animate({
                marginLeft: (-100 * (1 + space)) + "%"
            }, speed, function() {

                for (var i = 0; i < space; i++) {
                    $("#" + target).find("li:last").after($(this).find("li:first"));
                }

                $("#" + target).css({
                    marginLeft: "-100%"
                });
            });
        } else if (idActive > data) {
            var space = idActive - data;

            $("li.active").removeClass('active');
            $("li[data-id=" + data + "]").addClass('active');

            $("#" + target).animate({
                marginLeft: (100 * (space - 1)) + "%"
            }, speed, function() {
                for (var i = 0; i < space; i++) {
                    $("#" + target).find("li:first").before($(this).find("li:last"));
                }
                $(this).css({
                    marginLeft: "-100%"
                });
            });
        }
    }
};

// run the currently selected effect

/** Helpers Function **/
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x100)
            .toString(8)
            .substring(1);
    }

    return s4() + s4() + s4() + s4();
}