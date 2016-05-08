<style lang="stylus">
    @import '../res/css/components/showcases.styl'
</style>

<template>
    <ul class="showcases-container">
        <li v-for="showcase in showcases | searchByTag activeTag" class="showcase-item">
            <sd-showcase :detail-data.sync="showcase"></sd-showcase>
        </li>
    </ul>
</template>

<script>
    var tj = require('../libs/tj.js');
    module.exports = {
        props: ['activeTag'],
        data: function () {
            return {
                showcases: [
                    {
                        name: 'Xiaodan\'s Everything',
                        link: 'http://blog.staydan.com',
                        desc: 'Bloggggggg....',
                        coverImg: 'http://staydan.com/sweet/homePage/img/blog.png',
                        tag: ['blog']
                    },
                    {
                        name: '利器 · 灵感生成器 New Tab',
                        link: 'https://chrome.google.com/webstore/detail/lidppokaooioojchghdjekhcgdjkkohe',
                        desc: '汲取了这些优秀创造者的经典语录，让你在浏览其它网页时总能先驻足停留在新建标签页中，阅读与体会，从这些语录中找寻属于你的利器',
                        coverImg: 'http://staydan.com/sweet/homePage/img/liqi.newtab-ad.png',
                        tag: ['Chrome Extension', 'Open Source'],
                        pkg: 'http://staydan.com/sweet/static/pkg/liqi.io/liqi.ideapump.newtab_v1.0.1.crx'
                    },
                    {
                        name: '百度惠：专业推荐优惠',
                        link: 'https://chrome.google.com/webstore/detail/blcmlhpbpimcnifnkgkfjhhmoolbidik',
                        desc: '便捷浏览百度惠推荐的商品和活动，即时推送更新优惠内容',
                        coverImg: 'http://staydan.com/sweet/homePage/img/baiduhui-ad.png',
                        tag: ['Chrome Extension', 'Open Source'],
                        pkg: 'http://staydan.com/sweet/static/pkg/magnet/Magnet-baiduhui-chrome-extension_v1.0.12.crx'
                    },
                    {
                        name: 'Tinning',
                        link: 'https://chrome.google.com/webstore/detail/moemebbgcnbmdpnjiaijefhoahhikmec',
                        desc: 'A simple extension for Google Chrome allows the user to store all the tab in the current window to this extension. They can re-open them when they want to visit later',
                        coverImg: 'http://staydan.com/sweet/homePage/img/tinning-ad.png',
                        tag: ['Chrome Extension', 'Open Source'],
                        pkg: 'http://staydan.com/sweet/static/pkg/tinning/Tinning_release_1.0.2.crx'
                    },
                    {
                        name: 'Escape Moe',
                        link: 'http://www.staydan.com/game/escapeMoe',
                        desc: 'Alpha version game',
                        coverImg: 'http://staydan.com/sweet/homePage/img/escape-moe.png',
                        tag: ['Game', 'Open Source']
                    },
                    {
                        name: 'Memory Matching Card',
                        link: 'http://www.staydan.com/game/memorycard',
                        desc: 'Just for fun',
                        coverImg: 'http://staydan.com/sweet/homePage/img/memory-card.png',
                        tag: ['Game', 'Open Source']
                    },
                    {
                        name: '2048 By Canvas',
                        link: 'http://game2048.staydan.com',
                        desc: 'Try to make a high score to beat me',
                        coverImg: 'http://staydan.com/sweet/homePage/img/2048.png',
                        tag: ['Game', 'Open Source']
                    },
                    {
                        name: 'Table Air Hockey',
                        link: 'http://www.staydan.com/game/pingpang',
                        desc: 'The first HTML5 game when I learn this',
                        coverImg: 'http://staydan.com/sweet/homePage/img/pingpang.png',
                        tag: ['Game', 'Open Source']
                    },
                    {
                        name: 'Sort Algorithm Graphic',
                        link: 'http://sort-graphic.staydan.com/',
                        desc: 'Data Visualization for Sort algorithm',
                        coverImg: 'http://staydan.com/sweet/homePage/img/sort-graphic.png',
                        tag: ['Tools', 'Data Visualization']
                    }
                ]
            }
        },
        components: {
            sdShowcase: require('./showcase.vue')
        },
        ready: function () {
            this.initChromeExtensionHeadLink();
        },
        filters: {
            searchByTag: function (items) {
                var newItems = [];
                if (this.activeTag === '') {
                    newItems = items;
                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var tags = items[i].tag.join().toLowerCase();
                        if (tags.indexOf(this.activeTag.toLowerCase()) !== -1) {
                            newItems.push(items[i]);
                        }
                    }
                }
                tj.trackEventTJ(tj.category.index, 'searchByTag');
                return newItems;
            }
        },
        methods: {
            initChromeExtensionHeadLink: function () {
                var isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
                if (isChrome) {
                    for (var i = 0; i < this.showcases.length; i++) {
                        var showcase = this.showcases[i];
                        if (showcase.tag.join().toLowerCase().indexOf('chrome') !== -1) {
                            var head  = document.getElementsByTagName('head')[0];
                            var linkNode = document.createElement('link');

                            linkNode.rel  = 'chrome-webstore-item';
                            linkNode.href = showcase.link;
                            head.appendChild(linkNode);
                        }
                    }
                }
            }
        }
    };
</script>
