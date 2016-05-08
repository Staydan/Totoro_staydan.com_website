<style lang="stylus" scoped>
    body
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif
        font-size: 14px
        color:#fff
        margin: 0
        padding: 0
        overflow: hidden
    .menu-container
        position: fixed
        bottom: 0
        left: 0;
        z-index: 10
        text-align: center
        width: 100%
        height: auto
    .menu-item
        float: left
        border: none
        min-width: 40%
        min-height: 80px
        border-radius: 10px
        vertical-align: middle
        justify-content: center
        -webkit-justify-content: center
        -webkit-align-items: center
        align-items: center
        display: flex
        display: -webkit-flex
        background-color: #fff
        opacity: .6
        color: #675456
        margin: 1% 5%
        box-sizing: border-box
    .menu-item a
        list-style: none
        color: #000
        font-size: 18px
    .wedding-header
        position: fixed
        top: 0
        left: 0;
        z-index: 10
        width: 100%
        color: #8C5A58
        height: 140px
        line-height: 60px
        font-size: 30px
        text-align: center
        padding-top: 6%
    .wedding-header .love
        color: #B6A4A3
        font-size: 45px
        margin: 0 3%
    .intro-hotel
        position: fixed
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 30
        display: none
        background-color: #f29ec2
        color: #fff
        overflow-y: scroll
        .section-part
            background-color: #fff
            opacity: .8
            border-radius: 10px
            width: 90%
            height: auto
            margin: 0 auto
        p
            justify-content: center
            -webkit-justify-content: center
            -webkit-align-items: center
            align-items: center
            font-size: 30px
            text-align: left
            margin: 20px auto
            display: flex
            display: -webkit-flex
            line-height: 40px
            font-size: 16px
            padding: 5px
            .label
                flex: 1
                color: #d95d93
                text-align: center
            .value
                flex: 3
                color: #d95d93
            &.info
                color: #d95d93

    .seats-arrange
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 30
        color: #fff
        display: none
        overflow-y: scroll
        background-color: #f29ec2
        overflow-x: hidden
        ul
            margin: 10px
            margin-top: 20px
            li
                border-radius: 5px
                padding: 10px
                margin: 10px 0
                background-color: #fff
                color: #d95d93
                &.highlight
                    color: #fff
                    background-color: #d95d93
                .table-no
                    font-size: 16px
                    margin: 10px 5px
                .table-info
                    font-size: 16px
                    margin: 10px 0
    .back-btn
        position: fixed
        bottom: 10px
        right: 10px
        z-index: 50
        img
            width: 35px
            height: 35px
.full-screen-placeholder
    position: absolute
    top: 0
    left: 0
    min-width: 100%
    min-height: 100%
    overflow: hidden
</style>

<template>
    <div>
        <div class="wedding-header">
            <span class="love">❤</span>我们结婚啦<span class="love">❤</span>
            <p>诸梦丹 & 蔡艳文</p>
        </div>
        <ul class="menu-container">
            <li class="menu-item even" v-on="click: showSeats">
                <a href="javascript:;">座位表</a>
            </li>
            <li class="menu-item" v-on="click: showHotel">
                <a href="javascript:;">
                    <p>酒席安排</p><p style="font-size: 16px;">10.18 11:30</p>
                </a>
            </li>
            <li class='menu-item {{$index % 2 ? "" : "even"}}' v-repeat='item: menuList'>
                <a href="{{item.link}}">{{item.name}}</a>
            </li>
        </ul>
        <div class="back-btn" v-on="click: onBackEvent"><img src="../../res/images/back_arrow.png"></div>
        <div class="seats-arrange">
            <ul>
                <li v-repeat="item: seatsList" class='{{$index % 2 ? "highlight": ""}}'>
                    <span class="table-no">{{item.tableNo}}</span>
                    <span class="table-info">{{item.tableInfo}}</span>
                </li>
            </ul>
        </div>
        <div class="intro-hotel">
            <div class="section-part">
                <p>
                    <span class="label">时间</span>
                    <span class="value">2015年10月18日 上午11:30</span>
                </p>
                <p>
                    <span class="label">地址</span>
                    <span class="value">上海市浦东新区川周公路2685号（近S20申江路出口200m处）</span>
                </p>
                <p>
                    <span class="label">自驾</span>
                    <span class="value">经由S20从申江路出口下高速，沿申江路往南200米左转即可</span>
                </p>
                <p class="info">女方宾客可搭乘统一大巴前往，请联系新郎或新娘</p>
            </div>
        </div>
    </div>
    <img src="http://7xnd7i.com1.z0.glb.clouddn.com/sm_AO7A0164.jpg" class="full-screen-placeholder">
</template>
<script>
    var weddingStore = require('./../../models/weddingStore');
    // jQuery.support.cors = true;

    module.exports = {
        data: function () {
            return {
                menuList: weddingStore.fetchMenu(),
                seatsList: weddingStore.fetchSeats()
            }
        },
        ready: function () {
            this.init();
        },
        methods: {
            showSeats: function () {
                $('.seats-arrange').show();
                $('.back-btn').show();
            },
            showHotel: function () {
                $('.intro-hotel').show();
                $('.back-btn').show();
            },
            onBackEvent: function () {
                $('.intro-hotel, .seats-arrange').hide();
                $('.back-btn').hide();
            },
            init: function () {
                $('.back-btn').hide();
                $.ajax({
                    url: 'http://www.staydan.com/api/api.php/top20List',
                    method: 'get',
                    dataType: 'json',
                    crossDomain: true,
                    success: function (res) {
                        console.log(res);
                    }
                });
            }
        }
    };

</script>
