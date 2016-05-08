<template>
    <header-bar></header-bar>
    <section class="body">
        <router-view></router-view>
    </section>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                test: 'test'
            }
        },
        components: {
            'header-bar': require('../components/header.vue')
        }
    }
</script>
