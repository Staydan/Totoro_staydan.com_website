<style lang="stylus">
    @import '../../res/css/user/resetPwd.styl'
</style>

<template>
    <header class="header clearfix">
        <span class="title">{{brandName}} • </span><span class="page-title">{{pageTitle}}</span>{{$route.path}}
        <div class="header-divider"></div>
    </header>
    <section class="main clearfix">
        <aside class="pull-left register-steps">
            <div class="content"></div>
        </aside>
        <section class="pull-right register-form">
            <div class="content">
                <div class="row register-item">
                    <input class="edit" type="text" placeholder="输入新密码">
                </div>
                <div class="row register-item">
                    <input class="edit" type="text" placeholder="确认该密码">
                </div>
                <div class="pwd-difficulty"></div>
                <div class="pwd-difficulty-mask"></div>
                <div class="row register-item">
                    <a v-link="#!/user/reset-pwd" class="btn btn-primary">点击重置</a>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                brandName: 'Staydan.com'
            }
        }
    };
</script>
