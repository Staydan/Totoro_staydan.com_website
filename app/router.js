/*global app, Router */
'use strict'

// include other views
var notFoundView = require('./views/404.vue');
var indexView = require('./views/index.vue');
var mineView = require('./views/mine.vue');
var mineAppListView = require('./views/mine/appList.vue');
var mineProfileView = require('./views/mine/profile.vue');
var userView = require('./views/user.vue');
var userRegisterView = require('./views/user/register.vue');
var userLoginView = require('./views/user/login.vue');
var userResetPwdView = require('./views/user/resetPwd.vue');
var userActiveWelcomeView = require('./views/user/activeWelcome.vue');

// wedding page
var weddingView = require('./views/wedding.vue');
var weddingPhotoView = require('./views/wedding/photo.vue');
var weddingGallaryView = require('./views/wedding/gallary.vue');
var weddingHomeView = require('./views/wedding/home.vue');

module.exports = function (router) {
    var routers = {
        '*': {
            component: notFoundView
        },
        '/': {
            component: indexView
        }
        // '/mine': {
        //     component: mineView,
        //     subRoutes: {
        //         '/app-list': {
        //             component: mineAppListView
        //         },
        //         '/profile': {
        //             component: mineProfileView
        //         }
        //     }
        // },
        // '/wedding': {
        //     component: weddingView,
        //     subRoutes: {
        //         '/home': {
        //             component: weddingHomeView
        //         },
        //         '/photo/:index': {
        //             component: weddingPhotoView
        //         },
        //         '/gallary': {
        //             component: weddingGallaryView
        //         }
        //     }
        // },
        // '/user': {
        //     component: userView,
        //     subRoutes: {
        //         '/register': {
        //             component: userRegisterView
        //         },
        //         '/login': {
        //             component: userLoginView
        //         },
        //         '/reset-pwd': {
        //             component: userResetPwdView
        //         },
        //         '/active-welcome': {
        //             component: userActiveWelcomeView
        //         }
        //     }
        // }
    };

    router.map(routers);
}
        // '/topic/:id': {               //专题
        //     name: 'topic',
        //     component: function (resolve) {
        //         require(['./views/topic.vue'], resolve);
        //     }
        // },
        // '/add': {               //首页
        //     name: 'add',
        //     component: function (resolve) {
        //         require(['./views/new.vue'], resolve);
        //     },
        //     auth: true
        // },
        // '/message': {               //消息
        //     name: 'message',
        //     component: function (resolve) {
        //         require(['./views/message.vue'], resolve);
        //     },
        //     auth: true
        // },

        // '/login': {               //登录
        //     name: 'login',
        //     component: function (resolve) {
        //         require(['./views/login.vue'], resolve);
        //     }
        // },
        // '/user/:loginname': {               //用户信息
        //     name: 'user',
        //     component: function (resolve) {
        //         require(['./views/user.vue'], resolve);
        //     }
        // }


// module.exports = function configRouter (router) {
  // normal routes
  // router.map({
    // basic example
    // '/about': {
      // the component can also be a plain string component id,
      // but a component with that id must be available in the
      // App component's scope.
      // component: require('./components/about.vue')
    // },
    // '*': {
    //   component: require('./views/404.vue')
    // },
    // '/': {
    //   component: require('./views/home.vue')
    // },
    // 'user/register': {
    //   component: require('./views/register.vue')
    // },
    // 'user/login': {
    //   component: require('./views/login.vue')
    // },
    // 'user/reset-pwd': {
    //   component: require('./views/resetPwd.vue')
    // }
    // nested example
    // '/user/:userId': {
    //   component: require('./components/user/index.vue'),
    //   subRoutes: {
    //     // matches "/user/:userId/profile/:something"
    //     'profile/:something': {
    //       component: require('./components/user/profile.vue')
    //     },
    //     // matches "/user/:userId/posts"
    //     'posts': {
    //       component: require('./components/user/posts.vue')
    //     },
    //     // matches "/user/:userId/settings"
    //     'settings': {
    //       component: require('./components/user/settings.vue')
    //     }
    //   }
    // },

    // not found handler
    // '*': {
      // component: require('./components/not-found.vue')
    // },

    // advanced example
    // '/inbox': {
    //   component: require('./components/inbox/index.vue'),
    //   subRoutes: {
    //     '/message/:messageId': {
    //       component: require('./components/inbox/message.vue')
    //     },
    //     '/archived': {
    //       component: require('./components/inbox/archive.vue')
    //     },
    //     // default component to render into the nested outlet
    //     // when the parent route is matched but there's no
    //     // nested segment. In this case, "/inbox".
    //     '/': {
    //       // inline component
    //       component: {
    //         template: 'default yo'
    //       }
    //     }
    //   }
    // }
  // })

  // redirect
  // router.redirect({
    // '/info': '/about'
    // '/hello/:userId': '/user/:userId'
  // })

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  // router.beforeEach(function (transition) {
  //   if (transition.to.path === '/forbidden') {
  //     router.app.authenticating = true
  //     setTimeout(function () {
  //       router.app.authenticating = false
  //       alert('this route is forbidden by a global before hook')
  //       transition.abort()
  //     }, 1500)
  //   } else {
  //     transition.next()
  //   }
  // })
// }
