$("document").ready(function () {
    carousel(3000)
})

function carousel(delay) {
    this.currentCarouselElement = 0
    this.carousel__els = $(".carousel__el")
    this.createBtn = function (i) {
        let btn = $('<div class="control__btn"></div>')
        btn.click(function () {
            carousel__els.eq(i).toggleClass("--active")
            btn.toggleClass("--active")
            carousel__els.eq(currentCarouselElement).toggleClass("--active")
            $(".control__btn").eq(currentCarouselElement).toggleClass("--active")
            $(".pagination__current").text("0" + (i + 1) + "/")
            currentCarouselElement = i
            clearTimeout(timerId);
            setTimer()
            blinkPromo(500)
        });
        return btn
    }
    this.renderBtns = function () {
        let btns_box = $(".control__btns_box")
        carousel__els.each(function (i) {
            btns_box.append(createBtn(i))
        })
        $(".control__btn").eq(0).toggleClass("--active")
        $(".pagination__all").text("0" + carousel__els.length)
    }
    this.arrowsHandler = function () {
        let arrows = $(".control__arrow")
        let btns = $(".control__btn")
        arrows.eq(0).click(function () {
            if (currentCarouselElement >= carousel__els.length - 1) {
                currentCarouselElement = -1
            }
            btns.eq(currentCarouselElement + 1).click()
        })
        arrows.eq(1).click(function () {
            btns.eq(currentCarouselElement - 1).click()
        })
    }
    this.timerId = null
    this.slide = function () {
        $(".control__arrow").eq(0).click()
    }
    this.setTimer = function () {
        timerId = setTimeout(function () {
            slide()
        }, delay);
    }

    renderBtns()
    arrowsHandler()
    setTimer()
}

function blinkPromo(delay) {
    $(".promo").toggleClass("--blink")
    setTimeout(function () {
        $(".promo").toggleClass("--blink")
    }, delay);
}