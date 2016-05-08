<style lang="stylus">
  // @import '../res/css/index.styl'
</style>

<template>
  <header class="header-bar clearfix">
      <!-- span.title {{brandName}} • -->
      <div class="logo-wrapper">
          <img src="../res/images/logo.png" class="logo-header" v-on="mouseover: menuStatus = true">
          <div class="page-title" v-text="pageTitle"></div>
      </div>
      <!-- div.header-divider -->
      <nav class="nav-bar" v-show="menuStatus" v-transition="toggle-menu" v-on="mouseleave: menuStatus = false">
        <ul>
          <li>
            <a href="" v-link="/">HOME</a>
          </li>
          <li>
            <a href="" v-link="/mine">MINE</a>
          </li>
          <li>
            <a href="" v-link="/about">ABOUT</a>
          </li>
          <li>
            <a href="" v-link="/game">GAME</a>
          </li>
          <li>
            <a href="" v-link="/blog">BLOG</a>
          </li>
        </ul>
      </nav>
      <div class="web-menu" v-on="mouseleave: accountMenuStatus = false">
        <div class="web-menu-btn" v-on="mouseover: accountMenuStatus = true">
          Account
        </div>
        <nav v-show="accountMenuStatus" v-transition="toggle-menu">
          <ul class="menu-list">
            <li>
              <a href="" v-link="/user/register">注册</a>
            </li>
            <li>
              <a href="" v-link="/user/active-welcome">激活成功</a>
            </li>
            <li>
              <a href="" v-link="/user/login">登录</a>
            </li>
            <li>
              <a href="" v-link="/user/reset-pwd">重置密码</a>
            </li>
          </ul>
        </nav>
      </div>
  </header>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                menuStatus: false,
                accountMenuStatus: false,
                brandName: 'Staydan',
                pageTitle: 'Home'
            }
        },
        components: {

        },

    }
</script>
