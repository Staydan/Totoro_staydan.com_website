<style lang="stylus">
    // @import '../../res/css/notfound.styl'
</style>

<template>
<h2 class="red">
{{msg}}
</template>

<script>
module.exports = {
  data: function () {
    return {
      msg: 'The page you want to visit is not ready!'
    }
  }
}
</script>
