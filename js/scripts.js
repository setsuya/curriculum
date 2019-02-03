$(document).ready(function(){
    window.current_language = "";

    $("#lang_pt, #lang_en, #lang_es, #lang_ja").on("show.bs.collapse hide.bs.collapse", function(){
        $(this).prev().find(".fas").toggleClass("fa-angle-right fa-angle-down");
    });

    unscrambleData();
    checkLanguage();
    animateBars();
});

function unscrambleData(){
    scrambled_phone = $(".scrambled_phone").text().split(":");
    scrambled_email = $(".scrambled_email").text().split("/").reverse();

    unscrambled_phone = "";
    unscrambled_email = "";

    for(number in scrambled_phone){
        unscrambled_phone += Math.sqrt(scrambled_phone[number]);
    }

    unscrambled_phone = unscrambled_phone.slice(0, 5) + "-" + unscrambled_phone.slice(5);
    unscrambled_email = scrambled_email[0] + "@" + scrambled_email[1] + "." + scrambled_email[2];

    $(".scrambled_phone").text(unscrambled_phone);
    $(".scrambled_email").attr("href", "mailto:" + unscrambled_email).text(unscrambled_email);
}

function checkLanguage(){
    if(current_language === ""){
        if(navigator.language.includes("pt")){
            current_language = "pt";
        }else{
            current_language = "en";
        }
    }

    translatePage();
}

function changeLanguage(){
    if(current_language == "en"){
        current_language = "pt";
    }else{
        current_language = "en";
    }

    translatePage();
}

function translatePage(){
    for(prop in languages[current_language]){
        $("." + prop).html(languages[current_language][prop]);
    }
}

function animateBars(){
    $(".progress-bar[data-width]").each(function(){
        //console.log($(this).attr("data-width"));
        $(this).animate({"width": $(this).attr("data-width") + "%"}, 1000, "linear");
    });
}
