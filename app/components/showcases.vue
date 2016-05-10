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
    var consts = require('../libs/consts.js');
    module.exports = {
        props: ['activeTag'],
        data: function () {
            return {
                showcases: consts.showcases
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
