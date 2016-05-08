<style lang="stylus">
    @import '../../res/css/user/login.styl'
</style>

<template>
    <header class="header clearfix">
        <span class="title">{{brandName}} • </span><span class="page-title">{{pageTitle}}</span>{{$route.path}}
        <div class="header-divider"></div>
    </header>
    <section class="main clearfix">
        <aside class="pull-left register-steps">
            <div class="content">
            </div>
        </aside>
        <section class="pull-right register-form">
            <div class="content">
                <div class="row register-item">
                    <input class="edit" type="text" placeholder="您的邮箱">
                </div>
                <div class="row register-item">
                    <input class="edit" type="text" placeholder="藏好密码">
                </div>
                <div class="row register-item">
                    <a href="" class="btn btn-primary">登 录</a>
                </div>
                <div class="row login-btn">
                    <a v-link="/user/reset-pwd" class="btn btn-link">忘记密码？</a>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
    module.exports = {
        data: function(){
            return {
                brandName: 'Staydan.com',
                password: ''
            }
        },
        methods: {
            signIn: function(){
                User.signIn(this.username, this.password, function(err,res){
                    if (err) {
                        alert(err.message);
                    } else {
                        localStorage.setItem('token',res.token);
                        localStorage.setItem('user', JSON.stringify(res.user));
                        location.href="/";
                    }
                }.bind(this));
            }
        }
    };
</script>
