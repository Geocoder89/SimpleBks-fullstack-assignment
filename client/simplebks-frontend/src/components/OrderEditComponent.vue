<template>
    <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Update Order Item</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="onEditOrderItem">
              <div class="mb-4">
                <label for="category" class="form-label">Product_Category</label>
                <input type="text" v-model="formEditData.product_category" class="form-control" id="category" />
              </div>
              <div class="mb-4">
                <label for="price" class="form-label">Price</label>
                <input type="text" v-model="formEditData.price" class="form-control" id="price" name="price" />
              </div>


              <div class="mb-4">
                <label for="orderId" class="form-label">Id</label>
                <input type="text" v-model="formEditData.orderId" class="form-control" id="orderId" name="orderId" />
              </div>



                         <div class="mb-4">
                <label for="productId" class="form-label">Product Id</label>
                <input type="text" v-model="formEditData.product_id" class="form-control" id="productId" name="productId" />
              </div>


              <div class="mb-4">
                <label for="date" class="form-label">Order Date</label>
                <input type="datetime-local" v-model="formEditData.date" class="form-control" id="date" name="date" />
              </div>
              <div class="d-grid mb-4">
                <button type="submit" class="btn btn-primary p-2">Edit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {authHeader} from '../_helpers/auth-header'
export default {
    name: 'OrderEditComponent',

    data() {
      return {
       formEditData: {
        price: '',
        product_category: '',
        product_id: '',
        date: '',
        orderId: ''
        
        }

      }
    },

    mounted () {
      this.getOrder()
      console.log(this.$route.params.id)
          console.log(this.formEditData.orderId,'order id value')
    console.log(this.formEditData.date,'order date value')
    console.log('orderId',this.formEditData.orderId)
    console.log('productId',this.formEditData.product_id)
    },

   methods: {
        getOrder() {

        this.id = this.$route.params.id
        console.log(this.id)

        const format = "YYYY-MM-DDTkk:mm"

      const requestOptions = {
    
        headers: authHeader() 
    }

    axios.get(`order_items/${this.id}`,requestOptions).then(response=>{
      console.log(response.data.data)
      console.log('hello world',response.data.data[0])

      this.formEditData.price = response.data.data[0].price,
      this.formEditData.product_category = response.data.data[0].product_category
      this.formEditData.date = moment(response.data.data[0].date).format(format)
      this.formEditData.orderId = response.data.data[0].id
      this.formEditData.product_id = response.data.data[0].product_id


    })


    

  },


  onEditOrderItem() {

      this.id = this.$route.params.id
      console.log(this.id)
      const requestOptions = {
    
        headers: authHeader() 
    }

    axios.put(`order_items/${this.id}`,{
      price: this.formEditData.price,
      date: this.formEditData.date,
      id: this.formEditData.orderId,
      product_id: this.formEditData.product_id,
      product_category: this.formEditData.product_category
    },requestOptions).then(response=>{
      console.log(response)
      this.$toasted.success('Order has been successfully updated')
    this.$router.push('/')
    }).catch(error=>{
      if(error.response){
        this.$toasted.error(error.response.data)
      }
    })

  }
   },
}
</script>

<style scoped>

</style>