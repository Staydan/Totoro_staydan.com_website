<style lang="stylus" scoped>
    .slider-nav
        position: fixed
        top: 5px
        left: 0
        text-align: center
        width: 100%;
        color: #fff
        font-size: 16px
        z-index: 25
        min-height: 30px
        vertical-align: middle
        .pre-ten
            margin-left: 10px
            float: left
            border: 1px solid #fff;
            border-radius: 10%;
            padding: 2px;
        .next-ten
            margin-right: 10px
            float: right
            border: 1px solid #fff;
            border-radius: 10%;
            padding: 2px;
    .swiper-container
        width: 100%
        height: 300px
        margin-left: auto
        margin-right: auto
        background: #000
    .swiper-slide
        background-size: 100%
        background-position: center
        background-repeat: no-repeat
        display: flex
        display: -webkit-flex
        background-color: #000
        vertical-align: middle
        justify-content: center
        align-items: center
        -webkit-justify-content: center
        -webkit-align-items: center
    .swiper-slide img
        position: relative
        max-width: 100%
        max-height: 100%
        height: auto
    .gallery-top
        height: 80%
        width: 100%
    .gallery-thumbs
        height: 20%
        box-sizing: border-box
        padding: 10px 0
    .gallery-thumbs .swiper-slide
        width: 25%
        height: 100%
        opacity: 0.4
    .gallery-thumbs .swiper-slide-active
        opacity: 1
    .preview-single
        position: fixed
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 30
        display: none
        background-color: #000
        color: #fff
        .show-original
            border: 2px solid #fff;
            border-radius: 10%;
            padding: 5px;
            font-size: 18px;
            position: absolute;
            bottom: 10px;
            left: 10px;
        img
            position: absolute
            margin: 0 auto
            width: 100%
            height: auto
            transform-origin: 50% 50%
            border: none

</style>

<template>
    <div class="slider-nav">
        <span class="pre-ten" v-on="click: slidesImages(true)">前十张</span>
        <span>{{activeIndex + 1}} / {{photoList.length}}</span>
        <span class="next-ten" v-on="click: slidesImages(false)">后十张</span>
    </div>
    <div class="preview-single"></div>
    <div class="back-btn" v-on="click: onBackEvent"><img src="../../res/images/back_arrow.png"></div>
    <div class="swiper-container gallery-top">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-repeat='photo : photoList'>
                <img  data-src="{{photo}}"  class="swiper-lazy">
                <div class="swiper-lazy-preloader"></div>
            </div>
            <!-- <div class="swiper-slide"  v-repeat='photo : photoList' style="background-image: url({{photo}})" data-path='{{photo}}'></div> -->
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-next swiper-button-white"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
    </div>
    <div class="swiper-container gallery-thumbs">
        <div class="swiper-wrapper">
            <div class="swiper-slide swiper-lazy" v-repeat='photo : photoList' style="background-image: url({{photo}})"></div>
        </div>
    </div>
</template>
<script>
    var util = require('../../util');
    var weddingStore = require('./../../models/weddingStore');
    var galleryTop;
    var galleryThumbs;

    module.exports = {
        data: function () {
            return {
                brandName: 'Staydan.com',
                photoList: weddingStore.fetchImages(),
                activeIndex: 0
            }
        },
        ready: function () {
            this.init();
        },
        methods: {
            onBackEvent: function () {
                router.go('#!/wedding/home');
            },
            slidesImages: function (preFlag) {
                if (preFlag) {
                    this.$data.activeIndex -= 10;
                } else {
                    this.$data.activeIndex += 10;
                }
                galleryTop.slideTo(this.$data.activeIndex);
                galleryThumbs.slideTo(this.$data.activeIndex);
            },
            init: function () {
                var self = this;
                galleryTop = new Swiper('.gallery-top', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    spaceBetween: 10,
                    preloadImages: false,
                    lazyLoading: true
                });
                galleryThumbs = new Swiper('.gallery-thumbs', {
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                });

                galleryTop.on('onSlideChangeEnd', function () {
                    self.$data.activeIndex = galleryTop.activeIndex;
                });

                if (this.$route.params && this.$route.params.index) {
                    galleryTop.slideTo(this.$route.params.index);
                    galleryThumbs.slideTo(this.$route.params.index);
                }

                galleryTop.params.control = galleryThumbs;
                galleryThumbs.params.control = galleryTop;

                $('.preview-single').click(function () {
                    $imgPreviewWrapper.hide();
                    $imgPreviewWrapper.empty();
                    $('body, .preview-single').css('overflow-y', 'inherit');
                });

                $('.swiper-slide').on('click', 'img', function(e) {
                    var startFirst = {};
                    var movingPos = {};
                    var startSecond = {};
                    var startDistance = null;
                    var scaleFactor = 1;    // 缩放系数
                    var lastScale = 1;      // 最近一次的缩放系数
                    var deltaX = 0;
                    var deltaY = 0;
                    var lastDeltaX = 0;
                    var lastDeltaY = 0;
                    var touchCenter = false;    // 2指触控时的中心点位置
                    var translated = false;     // 是否有缩放移动变化
                    var SCALE_FACTOR_MAX = 3;   // 最大缩放系数
                    var SCALE_FACTOR_MIN = 0.8; // 最小缩放系数

                    $imgPreviewWrapper = $('.preview-single');
                    $imgPreviewWrapper.show();

                    // Disable the scroll event on body element
                    $('body, .preview-single').css('overflow-y', 'hidden');

                    $previewImgEle = $('<img>').attr('src', $(this).attr('src'))
                                                .addClass('preview-img')
                                                .attr('alt', '商品介绍');
                    $imgPreviewWrapper.append($previewImgEle);

                    // 使图片完整显示
                    fullInView = function (imgTarget) {

                        var widthScale = $(window).width() / imgTarget.width();
                        var heightScale = $(window).height() / imgTarget.height();

                        lastScale = Math.min(widthScale, heightScale);
                        lastDeltaX = ($(window).width() - imgTarget.width()) * 0.5;
                        lastDeltaY = ($(window).height() - imgTarget.height()) * 0.5;

                        var transCssStr = 'translate3d(' + lastDeltaX + 'px, ' + lastDeltaY + 'px, 0) scale(' + lastScale + ')';
                        imgTarget.css({
                            transform: transCssStr,
                            '-webkit-transform': transCssStr
                        });
                    }
                    fullInView($previewImgEle);

                    var previewTouchStart = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        translated = false;
                        if (e.currentTarget.className !== 'preview-img') {
                            return false;
                        }
                        startFirst.x = e.touches[0].pageX;
                        startFirst.y = e.touches[0].pageY;
                        movingPos.x = e.touches[0].pageX;
                        movingPos.y = e.touches[0].pageY;
                        if (e.touches.length >= 2) {
                            touchCenter = false;
                            startSecond.x = e.touches[1].pageX;
                            startSecond.y = e.touches[1].pageY;
                            startDistance = util.getDistance(startFirst.x, startFirst.y, startSecond.x, startSecond.y);
                        }
                    }

                    var previewTouchMove = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.currentTarget.className !== 'preview-img') {
                            return false;
                        }

                        // 多点触控时，只接受处理最多2个触点
                        var movePointFirst = e.touches[0];
                        console.log(lastScale);
                        if (e.touches.length >= 2) {
                            var movePointSecond = e.touches[1];
                            var moveDistance = util.getDistance(movePointFirst.pageX, movePointFirst.pageY, movePointSecond.pageX, movePointSecond.pageY);
                            if (scaleFactor >= SCALE_FACTOR_MIN && scaleFactor <= SCALE_FACTOR_MAX) {
                                translated = true;

                                scaleFactor = (startDistance ? moveDistance / startDistance : 1) * lastScale;

                                if (scaleFactor < SCALE_FACTOR_MIN) {
                                    scaleFactor = SCALE_FACTOR_MIN;
                                } else if (scaleFactor > SCALE_FACTOR_MAX) {
                                    scaleFactor = SCALE_FACTOR_MAX;
                                }

                                touchCenter = touchCenter || {x: (movePointFirst.pageX + movePointSecond.pageX) / 2, y: (movePointFirst.pageY + movePointSecond.pageY) / 2};
                                var widthFactor = (touchCenter.x - $(this).offset().left) / $(this).width() * 100 +  '%';
                                var heightFactor = (touchCenter.y - $(this).offset().top) / $(this).height() * 100 +  '%';
                                console.log(widthFactor + ' ' + heightFactor);
                                deltaX = lastDeltaX;
                                deltaY = lastDeltaY;

                                var transCssStr = 'translate3d(' + deltaX + 'px, ' + deltaY + 'px, 0) scale(' + scaleFactor + ')';
                                $(this).css({
                                    // 'transform-origin': widthFactor + ' ' + heightFactor,
                                    'transform': transCssStr,
                                    '-webkit-transform': transCssStr
                                });
                            }
                        } else {
                            deltaX = movePointFirst.pageX - movingPos.x + lastDeltaX;
                            deltaY = movePointFirst.pageY - movingPos.y + lastDeltaY;
                            // 发生位移与否
                            translated = (deltaX - lastDeltaX !== 0 || deltaY - lastDeltaY !== 0);
                            touchCenter = false;
                            var transCssStr = 'translate3d(' + deltaX + 'px, ' + deltaY + 'px, 0) scale(' + scaleFactor + ')';
                            $(this).css({
                                transition: 'none',
                                transform: transCssStr,
                                '-webkit-transform': transCssStr
                            });
                        }
                    }

                    var previewTouchEnd = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.currentTarget.className !== 'preview-img') {
                            return false;
                        }

                        if (e.touches.length === 1) {
                            // 双指缩放后，释放一手指，另一个不离开屏幕时，重置第一点的位置，避免单指移动图片时跳位置
                            movingPos.x = e.touches[0].pageX;
                            movingPos.y = e.touches[0].pageY;
                        }
                            // alert('translated : ' + translated);
                        if (!translated) {
                            $imgPreviewWrapper.hide();
                            $imgPreviewWrapper.empty();
                            $('body, .preview-single').css('overflow-y', 'inherit');
                        }
                        lastScale = scaleFactor;
                        lastDeltaX = deltaX;
                        lastDeltaY = deltaY;

                        // 避免图片浮层过早隐藏
                        if (e.touches.length === 0) {
                            translated = false;
                        }
                    }

                    Zepto('img.preview-img').on({'touchstart': previewTouchStart});
                    Zepto('img.preview-img').on({'touchmove': previewTouchMove});
                    Zepto('img.preview-img').on({'touchend': previewTouchEnd});
                    Zepto('.show-original').on('tap', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        Zepto('img.preview-img').attr('src', $(this).data('url').replace('_sm.png', '.png'));
                    })
                });
            }
        }
    };

</script>
