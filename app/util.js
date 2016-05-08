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
    }
}

module.exports = util;
