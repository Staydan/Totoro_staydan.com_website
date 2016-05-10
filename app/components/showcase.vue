<style lang="stylus">
    @import '../res/css/components/showcase.styl'
</style>

<template>
    <div class="showcase-item-content">
        <div class="showcase-item-square" :class="{'hovering': hovering}" v-on:mouseover="hovering = true" v-on:mouseleave="hovering = false">
            <div class="showcase-meta" transition="wipe-bottom" :class="{'wipe-bottom-enter': hovering, 'wipe-bottom-leave': !hovering}">
                <div class="showcase-meta-name">
                    <a href="javascript:;" v-on:click="seeProdcutDetail(detailData)"  target="_blank">
                        <div v-text="detailData.name"></div>
                    </a>
                    <div class="icon-op">
                        <img src="../res/images/download_crx.svg" class="svg icon" v-on:click="seeProdcutDetail(detailData)" v-if="isChrome && detailData.tag.indexOf('Chrome Extension') !== -1">
                        <img src="../res/images/clip.png" class="icon" v-on:click="seeProdcutDetail(detailData)" v-if="detailData.tag.indexOf('Chrome Extension') === -1">
                    </div>
                </div>
                <div class="showcase-meta-desc" v-text="detailData.desc"></div>
                <div class="showcase-meta-tools" v-if="isChrome && detailData.tag.indexOf('Chrome Extension') !== -1">
                    <button class="btn install-btn" id="baiduhui-install-button" v-on:click="installChromeExtension(detailData.link)">Add to Chrome</button>
                </div>
            </div>
            <img v-bind:src="detailData.coverImg" class="cover-img" alt="{{detailData.name}}">
        </div>
        <div class="showcase-tags">
            <span v-for="tag in detailData.tag" v-text="tag" class="showcase-tag"></span>
        </div>
    </div>
</template>

<script>
    var tj = require('../libs/tj.js');
    module.exports = {
        props: ['detailData'],
        data: function () {
            return {
                entryStamp: 0,
                hovering: false,
                isChrome: /chrom(e|ium)/.test(navigator.userAgent.toLowerCase())
            }
        },
        ready: function () {
            this.entryStamp = new Date().getTime();
        },
        methods: {
            seeProdcutDetail: function (product) {
                tj.trackEventTJ(tj.category.index, 'seeProdcutDetail');
                clearInterval(window.timerAlarm);
                document.body.style.background = 'none';
                if (product.key === 'xd.blog') {
                    window.open(product.link, '_blank');
                }
                else {
                    window.location.href = '/#!/product/' + product.key;
                }
            },
            downloadPkg: function (pkgPath) {
                tj.trackEventTJ(tj.category.index, 'downloadPkg');
                window.open(pkgPath, '_blank');
            },
            installChromeExtension: function (extensionLink) {
                var nowStamp = new Date().getTime();
                tj.trackEventTJ(
                    tj.category.index,
                    'installChromeExt',
                    'clickedAfterStay',
                    new Date().getTime() - this.entryStamp
                );

                chrome.webstore.install(
                    extensionLink,
                    function (result) {
                        tj.trackEventTJ(
                            tj.category.index,
                            'installChromeExt',
                            'timeCostInMs_success',
                            new Date().getTime() - nowStamp
                        );
                    },
                    function (error) {
                        tj.trackEventTJ(
                            tj.category.index,
                            'installChromeExt',
                            'timeCostInMs_fail',
                            new Date().getTime() - nowStamp
                        );
                    }
                )
            },
            checkAndSetButton: function() {
                if (isChrome) {
                    if (typeof chrome !== 'undefined' && typeof chrome.app !== 'undefined' && chrome.app.isInstalled) {
                        extInstallBtnEl.hide();
                    }
                }
                else {
                    extInstallBtnEl.html('Only for Chrome').attr('disabled',true);
                }
            }
        }
    };
</script>
