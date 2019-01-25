$("document").ready(function () {
    carousel(2000)
    blinkPromo()
    slider(1000)
})

function carousel(delay) {
    let currentCarouselElement = 0
    let carousel__els = $(".carousel__el")
    let createBtn = function (i) {
        let btn = $('<div class="control__btn"></div>')
        btn.click(function () {
            let controlBtns = $(".carousel").find(".control__btn")
            carousel__els.eq(i).toggleClass("--active")
            btn.toggleClass("--active")
            carousel__els.eq(currentCarouselElement).toggleClass("--active")
            controlBtns.eq(currentCarouselElement).toggleClass("--active")
            $(".pagination__current").text("0" + (i + 1) + "/")
            currentCarouselElement = i
            clearTimeout(timerId);
            setTimer()
        });
        return btn
    }
    let renderBtns = function () {
        let btns_box = $(".carousel").find(".control__btns_box")
        carousel__els.each(function (i) {
            btns_box.append(createBtn(i))
        })
        $(".carousel").find(".control__btn").eq(0).toggleClass("--active")
        $(".pagination__all").text("0" + carousel__els.length)
    }
    let arrowsHandler = function () {
        let arrows = $(".carousel").find(".control__arrow")
        let btns = $(".carousel").find(".control__btn")
        arrows.eq(0).click(function () {
            if (currentCarouselElement >= carousel__els.length - 1) {
                currentCarouselElement = -1
            }
            btns.eq(currentCarouselElement + 1).click()
        })
        arrows.eq(0).contextmenu(function () {
            arrows.eq(1).click()
            return false
        })
        arrows.eq(1).click(function () {
            btns.eq(currentCarouselElement - 1).click()
        })
        arrows.eq(1).contextmenu(function () {
            arrows.eq(0).click()
            return false
        })
    }
    let timerId = null
    let slide = function () {
        $(".carousel").find(".control__arrow").eq(0).click()
    }
    let setTimer = function () {
        timerId = setTimeout(function () {
            slide()
        }, delay);
    }

    renderBtns()
    arrowsHandler()
    setTimer()
}


function slider(delay) {
    let currentSlide = 0
    let slider__els = $(".card_people")
    let createBtn = function (i) {
        let btn = $('<div class="control__btn"></div>')
        btn.click(function () {
            let controlBtns = $(".slider").find(".control__btn")
            btn.toggleClass("--active")
            controlBtns.eq(currentSlide).toggleClass("--active")
            scroll(i)
            currentSlide = i
            clearTimeout(timerId);
            setTimer()
        });
        return btn
    }
    let renderBtns = function () {
        let btns_box = $(".slider").find(".control__btns_box")
        slider__els.each(function (i) {
            btns_box.append(createBtn(i))
        })
        $(".slider").find(".control__btn").eq(0).toggleClass("--active")
    }
    let arrowsHandler = function () {
        let arrows = $(".slider").find(".control__arrow")
        let btns = $(".slider").find(".control__btn")
        arrows.eq(0).click(function () {
            if (currentSlide >= slider__els.length - 1) {
                currentSlide = -1
            }
            btns.eq(currentSlide + 1).click()
        })
        arrows.eq(0).contextmenu(function () {
            arrows.eq(1).click()
            return false
        })
        arrows.eq(1).click(function () {
            btns.eq(currentSlide - 1).click()
        })
        arrows.eq(1).contextmenu(function () {
            arrows.eq(0).click()
            return false
        })
    }
    let timerId = null
    let slide = function () {
        $(".slider").find(".control__arrow").eq(0).click()
    }
    let setTimer = function () {
        timerId = setTimeout(function () {
            slide()
        }, delay);
    }

    let scroll = function (index) {
        let content = $(".slider__content").eq(0)
        content.animate({
            scrollLeft: $(".card_people").eq(index)[0].scrollWidth * index
        }, 200);
    }

    renderBtns()
    arrowsHandler()
    setTimer()
}

function blinkPromo() {
    let delay = $(".promo").css("transition-duration")
    delay = delay.substr(0, delay.length - 1)
    delay *= 1000
    let setTimer = function () {
        setTimeout(function () {
            $(".promo").toggleClass("--blink")
            setTimer()
        }, delay);
    }
    setTimer()
}

//* init  Ya map*/

if ($("div").is("#map")) {
    var win_width = $(window).width();

    $(window).resize(function () {
        if ($(window).width() < win_width - 20 || $(window).width() > win_width + 20) {
            win_width = $(window).width();
            child1 = $("#map").children("ymaps").eq(0)
            child2 = child1.children("ymaps").eq(0)
            child1.css.width = "100%"
            child1.css.height = $("#map").height
            child2.css.width = "100%"
            child2.css.height = $("#map").height
        }
    });

    ymaps.ready(init);

    var myMap;

    color = getHexRGBColor(color);

    function init() {

        ymaps.geocode(adress).then(function (res) {
            myMap = new ymaps.Map("map", {
                center: [res.geoObjects.get(0).geometry.getCoordinates()[0], res.geoObjects.get(0).geometry.getCoordinates()[1]],
                zoom: 18
            });

            res.geoObjects.get(0).options.set({
                iconColor: '#' + color

            });
            myMap.geoObjects.add(res.geoObjects.get(0));
        });

    }
}

function getHexRGBColor(color) {
    color = color.replace(/\s/g, "");
    var aRGB = color.match(/(\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)$/i);

    if (aRGB) {
        color = '';
        for (var i = 1; i <= 3; i++) color += Math.round((aRGB[i][aRGB[i].length - 1] == "%" ? 2.55 : 1) * parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
    } else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');

    return color;
}
//* init  Ya map*/