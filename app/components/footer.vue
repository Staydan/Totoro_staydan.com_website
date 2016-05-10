<style lang="stylus">
    @import '../res/css/components/footer.styl'
</style>

<template>
    <footer class="footer clearfix" v-show="show">
        <div class="social-info">
            <a v-for="sns in socialAccount" href="{{sns.link}}" v-text="sns.name" class="sns-account"></a>
        </div>
        <div class="footer-separator"></div>
        <div>
            © 2012 - 2016 Staydan.com<span class="dot-separator">·</span><span class="pro-codename-version">Internal Codename: Totoro v3.0.2 16.05.10</span>
        </div>
    </footer>
</template>

<script>
    var consts = require('../libs/consts');
    module.exports = {
        props: ['show'],
        data: function () {
            return {
                socialAccount: consts.socialAccount
            }
        }
    }
</script>
