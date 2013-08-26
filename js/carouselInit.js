//carousel

var Carousel = function(onSelected) {

    this.onSelected = onSelected;

};

Carousel.prototype.init = function() {

    var that = this;

    $(".gallery-bg ul").carouFredSel({
        next: {button: $(".gallery-bg .arrow.right")},
        prev: {button: $(".gallery-bg .arrow.left")},
        circular: true,
        infinite: true,
        auto: {
            play: false
        },
        items: {
            visible: 3,
            start: "odd"
        },
        scroll: {
            items: 1,
            onBefore: function(data) {
                var placeholder = data.items.visible.eq(1).find('img').attr('alt');
                data.items.visible.removeClass("active");
                data.items.visible.eq(1).addClass("active");
                that.onSelected(placeholder);
            }
        }
    });

}

