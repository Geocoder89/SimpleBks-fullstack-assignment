<template>
  <div>
    <loading-component v-if="isLoading"></loading-component>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-10 col-md-6 col-sm-6">
          <div class="card shadow">
            <div class="card-title text-center border-bottom">
              <h2 class="p-3">Order Items</h2>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Product_id</th>
                      <th scope="col">Product_category_name</th>
                      <th scope="col">Price</th>
                       <th scope="col">Date</th>
                       <th scope="col">Action(View)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orderItems" :key="order._id">
                    
                       <td>{{order.id || 'n/a'}}</td>
                          <td>{{order.product_id}}</td>
                      <td>{{order.product_category}}</td>
                      <td>{{order.price}}</td>
                      
                      <td>{{order.date}}</td>
                      <td><router-link :to="`/order_items/${order._id}`" type="button" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg></router-link></td>
                    </tr>
                    
                  </tbody>


                  
                </table>
              </div>

              <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li v-show="currentPage !== 1" class="page-item">
      <a @click="previousPage" class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
     <template v-for="items in  numberOfPages">
           <li @click="goToSinglePage(items)" :class="{active: items === currentPage}" :key="items" class="page-item"><a class="page-link" href="#">{{items}}</a></li>
     </template>

  
    <li v-show="currentPage !== total" class="page-item">
      <a @click="nextPage" class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {ordersService} from '../services'

import axios from 'axios'
import {authHeader} from '../_helpers'
import LoadingComponent from './LoadingComponent.vue';
export default {
  components: { LoadingComponent },

  name: "OrderItemsComponent",

  data() {
    return {
      orderItems: [],
      limit: 20,
      currentPage: 1,
      total: null,
      isLoading: true
    }
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.total/this.limit)
    }
  },

  mounted(){

     setTimeout(() => {
      this.isLoading = false;
    }, 5000);
    this.fetchPage(1)
  },
  methods: {
    
    nextPage() {
             // For the next page you just increment 'skip' for the page size 'limit'
            this.fetchPage(++this.currentPage);
             console.log('hello world')
    },


    previousPage() {
           this.fetchPage(--this.currentPage)
    },


    goToSinglePage(page) {
     this.currentPage = page
     this.fetchPage(this.currentPage)

    },





      fetchPage(page) {


      const requestOptions = {
     
        headers: authHeader() 
    }

            axios.get(`order_items?&offset=${page}`,requestOptions)
    .then(response=> {
      console.log(response)
        this.orderItems = response.data.data
        this.total = response.data.total
    })
    .catch(error=> {
       if(error.response){
           this.$toasted.error(error.response.data)
        }
    })

       
       
      },
  },
};
</script>

<style scoped>

.page-link {
    color: black;
}



.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: black;
    border-color: transparent;
}



.page-link:focus {
    box-shadow: none;
}
</style>
