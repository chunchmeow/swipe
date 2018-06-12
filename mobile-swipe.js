(function ($) {
    function swipeListener(el, callback) {
        var swipeDetector = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 100, // required min distance traveled to be considered swipe
        restraint = 250, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 400, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { };

        swipeDetector.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0];
            swipedir = 'none',
            dist = 0,
            startX = touchobj.pageX,
            startY = touchobj.pageY,
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault();
        }, false);

        swipeDetector.addEventListener('touchmove', function (e) {
            e.preventDefault() // prevent scrolling when inside DIV
        }, false);

        swipeDetector.addEventListener('touchend', function (e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            if (elapsedTime <= allowedTime) { // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                    var selected = '.os-product-image-list';
                    if (distX < 0) { // left
                        if (document.querySelector(selected + " .active").nextElementSibling != null) {
                            document.querySelector(selected + " .active").nextElementSibling.children[0].click();
                        } else {
                            document.querySelector(selected).firstElementChild.children[0].click();
                        }

                    }
                    else { // right
                        if (document.querySelector(selected + " .active").previousElementSibling != null) {
                            document.querySelector(selected + " .active").previousElementSibling.children[0].click();
                        } else {
                            document.querySelector(selected).lastElementChild.children[0].click();
                        }
                    }
                }
            }
            handleswipe(swipedir);
            e.preventDefault();
        }, false);
    }
    if ( $.onestop.common.isTouchDevice() && $(window).width() <= 550) {
        var el = document.getElementById('zoom_id');
        swipeListener(el, function (swipedir) {        });
    }
})(jQuery);