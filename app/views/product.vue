<style lang="stylus">
    @import '../res/css/product.styl'
</style>

<template>
    <section class="product-container">
        <div class="header-title">
            <div class="home-btn" v-link="{path: '/home'}"><img src="../res/images/home.png"></div>
            <div v-text="product.name"></div>
        </div>
        <div class="separator"></div>
        <div class="slick-slider" v-if="product.preImgs && product.preImgs.length > 0">
            <div v-for="img in product.preImgs" class="product-img">
                <img v-bind:src="img">
            </div>
        </div>
        <div class="product-install">
            <div class="product-play-btn" v-if="!tagIndexOf('Chrome Extension')" v-on:click="redirectOut(product.link)">试玩 · Play</div>
            <div class="product-instal-btn" v-if="tagIndexOf('Chrome Extension')" v-on:click="installChromeExtension(product.link)">添加到Chrome</div>
            <div class="product-install-tip" v-if="tagIndexOf('Chrome Extension')">点击后将弹对话框，确认后直接安装</div>
        </div>
        <div class="product-intro">
            <div class="product-install-other-ways" v-if="tagIndexOf('Chrome Extension')">
                <div class="title-label">当然，还有一些方式</div>
                <div class="product-tools">
                    <a href="{{product.link}}" class="product-instal-webstore" target="_blank">
                        <img src="../res/images/chrome_store.png" v-on:click="redirectOut(product.link)">
                    </a>
                    <a href="{{product.pkg}}" target="_blank" class="product-install-crx">
                        <img src="../res/images/download_crx.svg" class="svg">
                    </a>
                    <a href="{{product.repo}}" target="_blank" class="product-install-github">
                        <img src="../res/images/github.svg" class="svg">
                    </a>
                </div>
            </div>
            <div class="title-label">你想要了解的详情</div>
            <div class="product-rich-desc" v-html="product.richDesc"></div>
        </div>
        <sd-footer :show.sync="true"></sd-footer>
    </section>
</template>

<script>
    var productStore = require('../models/productStore');
    var util = require('../libs/util');
    var $ = require('jquery');
    var tj = require('../libs/tj.js');
    var slick = require('slick-carousel');
    module.exports = {
        data: function () {
            return {
                entryStamp: 0,
                product: false
            }
        },
        ready: function () {
            tj.trackPageViewTJ(tj.pageLists.product);
            util.replaceImgWithSvg();
            this.product = productStore.fetchProductByKey(this.$route.params.name);
            this.init();
        },
        methods: {
            tagIndexOf: function (key) {
                return this.product && this.product.tag.indexOf(key) !== -1;
            },
            redirectOut: function (link) {
                tj.trackEventTJ(tj.category.product, 'redirectOut');
                window.open(link, '_blank');
            },
            downloadPkg: function (pkgPath) {
                tj.trackEventTJ(tj.category.product, 'downloadPkg');
                window.open(pkgPath, '_blank');
            },
            installChromeExtension: function (extensionLink) {
                var nowStamp = new Date().getTime();
                tj.trackEventTJ(
                    tj.category.product,
                    'installChromeExt',
                    'clickedAfterStay',
                    new Date().getTime() - this.entryStamp
                );

                chrome.webstore.install(
                    extensionLink,
                    function (result) {
                        tj.trackEventTJ(
                            tj.category.product,
                            'installChromeExt',
                            'timeCostInMs_success',
                            new Date().getTime() - nowStamp
                        );
                    },
                    function (error) {
                        tj.trackEventTJ(
                            tj.category.product,
                            'installChromeExt',
                            'timeCostInMs_fail',
                            new Date().getTime() - nowStamp
                        );
                    }
                )
            },
            initChromeExtensionHeadLink: function () {
                var isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
                if (isChrome && this.product.tag.join().toLowerCase().indexOf('chrome') !== -1) {
                    var head  = document.getElementsByTagName('head')[0];
                    var linkNode = document.createElement('link');

                    linkNode.rel  = 'chrome-webstore-item';
                    linkNode.href = this.product.link;
                    head.appendChild(linkNode);
                }
            },
            init: function () {
                var self = this;
                this.initChromeExtensionHeadLink();
                setTimeout(function () {
                    self.sdLogoTimestampOpacity = 1;
                    $('.slick-slider').slick({
                        autoplay: true,
                        autoplaySpeed: 5000,
                        dots: true,
                        dotsClass: 'slick-dots'
                    });
                }, 1000);
            }
        },
        components: {
            sdFooter: require('../components/footer.vue')
        }
    };
</script>
