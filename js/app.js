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
    })
});

