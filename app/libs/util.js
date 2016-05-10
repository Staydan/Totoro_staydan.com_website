var util = {
   /**
     * 根据from和to的坐标，获取距离
     * from和to均为直角坐标系2维坐标（公式：取两点之间的直线距离）
     *
     * @param {number} frx from.lat
     * @param {number} fry from.lng
     * @param {number} tox to.lat
     * @param {number} toy to.lng
     *
     * @return {number}
     */
    getDistance: function(frx, fry, tox, toy) {
        if (!frx || !frx || !tox || !toy) {
            return -1;
        }
        var disx = tox - frx;
        var disy = toy - fry;
        var dist = Math.pow(disx * disx + disy * disy, 0.5);
        return dist;
    },
    paddingZeroFront: function (value, length) {
        value = String(value);

        while (value.length < length) {
            value = '0' + value;
        }
        return value;
    },
    getLocalTime: function () {
        var date = new Date();

        return this.paddingZeroFront(date.getHours(), 2)
            + ':' + this.paddingZeroFront(date.getMinutes(), 2)
            + ':' + this.paddingZeroFront(date.getSeconds(), 2);
    },
    /*
     * Replace all SVG images with inline SVG
     */
    replaceImgWithSvg: function () {
        $('img.svg').each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    }
};

module.exports = util;
