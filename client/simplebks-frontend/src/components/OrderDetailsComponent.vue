<template>
  <div>
      <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-10 col-md-6 col-sm-6">
          <div v-for="orderItem in order" :key="orderItem._id" >
            <div class="card shadow">
            <div class="card-title text-center border-bottom">
              <h3 class="p-3">{{orderItem._id}}</h3>
            </div>
            <div class="card-body">
                <div class="row p-3 border-bottom" >
                    <div class="col-lg-4">
                        <h6>id: {{orderItem.product_id}}</h6>
                    </div>
                    <div class="col-lg-4">
                      <h6>id: {{orderItem.id || 'n/a'}}</h6>
                    </div>
                    <div class="col-lg-4">
                        Date: {{orderItem.date}}
                    </div>
                </div>



                <div class="row p-3 border-bottom">
                    <div class="col-lg-4">
                        <h6>Product_category: {{orderItem.product_category}}</h6>
                    </div>
                    <div class="col-lg-4">

                    </div>
                    <div class="col-lg-4">
                        Price: ${{orderItem.price}}
                    </div>
                </div>


                <div class="row p-3">

                    <!-- <div class="col-lg-4"></div> -->
                    <div class="d-flex justify-content-center">
                         <router-link :to="`/order_items/${orderItem._id}/edit`" type="button" class="btn btn-warning text-white me-3">Edit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></router-link>
                    <button @click="deleteOrder" class="btn btn-danger">Delete
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
                    </button>
                    </div>
                   
                   <!-- <div class="col-lg-4"></div> -->
                </div>
                
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {authHeader} from '../_helpers'
export default {

name: 'OrderDetailsComponent',

data() {
  return {
    id: '',
    order: []
  }
},

mounted () {
  this.getOrder();
 
},

methods: {
  getOrder() {

     this.id = this.$route.params.id
      const requestOptions = {
    
        headers: authHeader() 
    }


    axios.get(`order_items/${this.id}`,requestOptions).then(response=>{
      this.order = response.data.data
    }).catch(error=>{
      if(error.response) {
        this.$toasted.error(error.response.data,{
          duration: 3000
        })
      }
    })
  },


  deleteOrder() {

      this.id = this.$route.params.id
       const requestOptions = {
    
        headers: authHeader() 
    }
    if(!confirm('Do you want to delete this Order Item')){
      return
    }

    axios.delete(`order_items/${this.id}`,requestOptions).then(response=>{
      console.log(response)
          this.$toasted.success('Order successfully deleted',{
            duration: 3000
          })
         this.$router.push('/')
    }
       
    )
    .catch(error=>{
      if(error.response) {
        this.$toasted.error(error.response.data,{
          duration: 3000
        })
      }
    })

 
  }

  
},
}
</script>


<style>

</style>