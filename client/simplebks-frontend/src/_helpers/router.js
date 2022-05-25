import Vue from 'vue'

import Router from 'vue-router'
import LoginComponent from './../components/LoginComponent.vue'
import OrderItemsComponent from './../components/OrderItemsComponent.vue'
import OrderDetailsComponent from './../components/OrderDetailsComponent'
import SellerEditComponent from './../components/SellerEditComponent'
import OrderEditComponent from './../components/OrderEditComponent'
Vue.use(Router)

 export const router = new Router({
  mode:'history',
    routes: [
      { path: '/login', component: LoginComponent },
      {path: '/',component:
      OrderItemsComponent},
      {path: '/order_items/:id',component:OrderDetailsComponent},
      {path: '/account',component:SellerEditComponent},
      { path: '/order_items/:id/edit',component:OrderEditComponent},
      // otherwise redirect to home
    { path: '*', redirect: '/login' }
    ]
})


router.beforeEach((to,from,next)=>{
   // redirect to login page if not logged in and trying to access a restricted page
   const publicPages = ['/login'];
   const authRequired = !publicPages.includes(to.path);
   const loggedIn = localStorage.getItem('user');
 
   if (authRequired && !loggedIn) {
     return next({ 
       path: '/login', 
      //  query: { returnUrl: to.path } 
     });
   }
 
   next();
})




