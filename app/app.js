/**
 * Author: Daniel Zhu(enterzhu@gmail.com)
 */

// include the key framework
var Vue = require('vue');

// include the routing component
var VueRouter = require('vue-router');

// include the config file
// var config = require('./config');

// include the main view
var routerMap = require('./router');

// install router
Vue.use(VueRouter);

// init the App
var App = Vue.extend({});

// create router
var router = new VueRouter({
    // history: true
    saveScrollPosition: true
});

// router.redirect({
  // '*': '/home'
// Configure the routers in a single file
// appRouter(router);
// })

routerMap(router);
// Start the App
router.start(App, '#app');

// just for debugging
window.router = router;
