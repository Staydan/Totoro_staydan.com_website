<style lang="stylus">
    @import '../res/css/index.styl'
</style>

<template>
    <div class="home-container">
        <div class="header">
            Xiaodan's Everything
        </div>
        <div class="sd-logo-timestamp" v-bind:style="{opacity: sdLogoTimestampOpacity}">
            <svg id="sd-logo" width="500px" height="500px" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch -->
                <title>logo-1</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="logo-gif" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="logo-1" stroke="#979797" stroke-width="5.20833333">
                        <path d="M292.667637,111.07114 C281.433479,108.932621 269.838037,107.813421 257.981192,107.813421 C246.124347,107.813421 234.528905,108.932621 223.294748,111.07114 C244.579664,130.064667 257.981192,157.706431 257.981192,188.478289 C257.981192,245.756831 211.54776,292.190263 154.269219,292.190263 C123.49736,292.190263 95.8555963,278.788734 76.8620691,257.503818 C74.7235504,268.737976 73.6043504,280.333418 73.6043504,292.190263 C73.6043504,394.018781 156.152674,476.567105 257.981192,476.567105 C359.80971,476.567105 442.358034,394.018781 442.358034,292.190263 C442.358034,280.333418 441.238834,268.737976 439.100315,257.503818 C420.106788,278.788734 392.465024,292.190263 361.693166,292.190263 C304.414624,292.190263 257.981192,245.756831 257.981192,188.478289 C257.981192,157.706431 271.382721,130.064667 292.667637,111.07114 Z" id="脸蛋儿"></path>
                        <path d="M486.555022,134.139145 C457.04255,70.7941669 365.579918,24.625 257.322734,24.625 C145.832005,24.625 52.1540871,73.5934207 25.6129245,139.860517 C80.2785414,94.7994079 164.814942,65.8925273 259.691393,65.8925273 C350.488801,65.8925273 431.81615,92.3672409 486.555026,134.139153 Z" id="额头"></path>
                        <g id="鼻子" transform="translate(179.166667, 305.208333)">
                            <path d="M78.8145256,116.045719 C122.091646,116.045719 157.174683,90.2493676 157.174683,58.4279557 C157.174683,26.6065438 122.091646,0.810192615 78.8145256,0.810192615 C35.5374054,0.810192615 0.454367778,26.6065438 0.454367778,58.4279557 C0.454367778,90.2493676 35.5374054,116.045719 78.8145256,116.045719 Z" id="鼻骨架"></path>
                            <ellipse id="左鼻孔" cx="44.2438677" cy="58.4279557" rx="16.1329737" ry="20.7423947"></ellipse>
                            <ellipse id="右鼻孔" cx="113.385183" cy="58.4279557" rx="16.1329737" ry="20.7423947"></ellipse>
                        </g>
                        <g id="右眼" transform="translate(285.637719, 107.813421)">
                            <path d="M80.6648683,161.329737 C125.214845,161.329737 161.329737,125.214845 161.329737,80.6648683 C161.329737,36.1148917 125.214845,-5.68434189e-14 80.6648683,-5.68434189e-14 C36.1148917,-5.68434189e-14 0,36.1148917 0,80.6648683 C0,125.214845 36.1148917,161.329737 80.6648683,161.329737 Z" id="眼眶"></path>
                            <ellipse id="眼球" fill="#D8D8D8" cx="36.8753684" cy="59.9224736" rx="18.4376842" ry="18.4376842"></ellipse>
                        </g>
                        <g id="左眼" transform="translate(74.000000, 108.000000)">
                            <ellipse id="眼眶" cx="80.6648683" cy="80.6648683" rx="80.6648683" ry="80.6648683"></ellipse>
                            <ellipse id="眼球" fill="#D8D8D8" cx="124.454368" cy="59.9224736" rx="18.4376842" ry="18.4376842"></ellipse>
                        </g>
                    </g>
                </g>
            </svg>
            <div class="time-text" transition="fade">
                <div class="time-local-text" v-text="timeNow"></div>
                <pre>
                    <div class="time-color-text">background-color: <span v-text="timeColor"></span></div>
                </pre>
            </div>
        </div>
        <div class="separator" v-if="afterLogoAnim" transition="wipe-middle"></div>
        <div class="menus" v-show="afterLogoAnim" transition="wipe">
            <ul>
                <li><a href="http://blog.staydan.com" target="_blank">Blog</a></li>
                <li v-for="navItem in navs" v-on:click="searchTag=(searchTag==navItem?'':navItem)" v-text="navItem" :class="{'tagged': navItem==searchTag}"></li>
                <li><a href="http://blog.staydan.com/about/" target="_blank">About Me</a></li>
            </ul>
        </div>
        <sd-showcases v-show="afterLogoAnim" :active-tag.sync="searchTag" transition="wipe-top"></sd-showcases>
        <div class="footer" v-show="afterLogoAnim">© 2012 - 2016 Staydan.com<span class="footer-separator">·</span><span class="pro-codename-version">Internal Codename: Totoro v3.0.1</span></div>
    </div>
</template>

<script>
var tj = require('../libs/tj.js');
module.exports = {
    data: function () {
        return {
            navs: [
                'Game',
                'Tools',
                'Extension'
            ],
            searchTag: '',
            timeColor: '',
            timeNow: '',
            afterLogoAnim: false,
            sdLogoTimestampOpacity: 0
        }
    },
    ready: function () {
        tj.trackPageViewTJ(tj.pageLists.index);
        this.setAlarm();
    },
    methods: {
        updateNav: function (navItem) {
            if (this.searchTag === navItem) {
                this.searchTag = '';
            }
            else {
                this.searchTag === navItem;
            }
        },
        paddingZeroFront: function (value, length) {
            value = String(value);

            while (value.length < length) {
                value = '0' + value;
            }
            return value;
        },
        refreshLocalTime: function () {
            var date = new Date();

            this.timeNow = this.paddingZeroFront(date.getHours(), 2) + ':' + this.paddingZeroFront(date.getMinutes(), 2) + ':' + this.paddingZeroFront(date.getSeconds(), 2);
            this.updateFrontColor();
        },
        updateFrontColor: function () {
            this.timeColor = '#' + this.timeNow.replace(/\:/g, '');
            document.body.style.background = this.timeColor;
            var showcaseTags = document.querySelectorAll('.showcase-tag')
            for (var i = 0; i < showcaseTags.length; i++) {
                showcaseTags[i].style.color = this.timeColor;
            }
            // document.body.style.opacity = 0.75;
        },
        setAlarm: function () {
            var self = this;
            var timerAlarm = setInterval(this.refreshLocalTime, 500);
            setTimeout(function () {
                self.sdLogoTimestampOpacity = 1;
                new Vivus('sd-logo', {duration: 250, type: 'oneByOne'}, function () {
                        self.afterLogoAnim = true;
                    }
                );
            }, 1000);
        }
    },
    components: {
        sdShowcases: require('../components/showcases.vue')
    }
}
</script>
