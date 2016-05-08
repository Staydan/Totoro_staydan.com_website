<style lang="stylus" scoped>
    html, body
        position: relative
        height: 100%
    body
        // background: #000
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif
        font-size: 14px
        color:#000
        margin: 0
        padding: 0
    .gallary-container
        width: 100%
        overflow: scroll
        height: 100%
        display: flex
        ul
            flex: 1
    .gallary-item
        position: relative
        display: flex
        justify-content: center
        align-items: center
        float: left
        max-width: 100%
        max-height: 100%
        margin: 5px
        img
            position: relative
            max-width: 100%
            max-height: 100%
            vertical-align: middle
</style>

<template>
    <div class="back-btn" v-link="home"><img src="../../res/images/back_arrow.png"></div>
    <div class="gallary-container">
        <ul>
            <li class="gallary-item" v-repeat='photo : photoList' v-show="isNumOne($index, 0)" v-on="click: jumpToPhoto($index)">
                <img data-original="{{photo}}">
            </li>
        </ul>
        <ul>
            <li class="gallary-item" v-repeat='photo : photoList' v-show="isNumOne($index, 1)" v-on="click: jumpToPhoto($index)">
                <img data-original="{{photo}}">
            </li>
        </ul>
        <ul>
            <li class="gallary-item" v-repeat='photo : photoList' v-show="isNumOne($index, 2)" v-on="click: jumpToPhoto($index)">
                <img data-original="{{photo}}">
            </li>
        </ul>
    </div>
</template>
<script>
    var weddingStore = require('./../../models/weddingStore');
    module.exports = {
        data: function () {
            return {
                photoList: weddingStore.fetchImages()
            }
        },
        ready: function () {
            this.init();
        },
        methods: {
            isNumOne: function (index, factor) {
                return index % 3 === factor;
            },
            jumpToPhoto: function (index) {
                this.$route.router.go('#!/wedding/photo/' + index);
            },
            init: function () {
                $("img").lazyload();
            }
        }
    };

</script>
