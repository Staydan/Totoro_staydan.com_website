<style lang="stylus">
    @import '../../res/css/user/register.styl'
</style>

<template>
    <header class="header clearfix">
        <span class="title">{{brandName}} • </span><span class="page-title">{{pageTitle}}</span>{{$route.path}}
        <div class="header-divider"></div>
    </header>
    <section class="main clearfix">
        <aside class="pull-left register-steps">
            <div class="content">
                <p class="">{{pageTitle}}</p>
                <ul class="steps-list">
                    <li><span class='input-status error'>✕</span>输入昵称</li>
                    <li><span class='input-status success'>✓</span>输入邮箱</li>
                    <li><span class='input-status'>✕</span>输入密码</li>
                    <li><span class='input-status'>✕</span>确认密码</li>
                </ul>
            </div>
        </aside>
        <section class="pull-right register-form">
            <div class="content">
                <div class="row register-item">
                    <input class="edit" placeholder="输入昵称" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" v-on="blur: doneEdit(todo), keyup: doneEdit(todo) | key 'enter', keyup: cancelEdit(todo) | key 'esc'">
                </div>
                <div class="row register-item">
                    <input class="edit" type="text" placeholder="输入邮箱">
                </div>
                <div class="row register-item">
                    <input class="edit" type="text" placeholder="输入密码">
                </div>
                <div class="row register-item">
                    <input class="edit" type="text" placeholder="确认密码">
                </div>
                <div class="row register-item">
                    <a href="" class="btn btn-primary">确 认</a>
                </div>
                <div class="row login-btn">
                    <a v-link="#!/user/login" class="btn btn-link">已有帐号？点此登录</a>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
    var lang = require('../../lang');
    var langConteng = lang.getLangsContent();

    module.exports = {
        data: function () {
            return {
                brandName: 'Staydan.com'
            }
        }
    };
</script>
