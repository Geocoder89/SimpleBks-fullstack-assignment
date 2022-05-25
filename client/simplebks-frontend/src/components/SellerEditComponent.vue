<template>
    <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Update Order Item</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="editStateDetails">
              <div class="mb-4">
                <label for="sellerCity" class="form-label">Seller City</label>
                <input type="text" class="form-control" id="sellerCity" v-model="city" />
              </div>
              <div class="mb-4">
                <label for="sellerState" class="form-label">Seller State</label>
                <input type="text" class="form-control" id="sellerState" v-model="state" />
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
import {authHeader} from '../_helpers/auth-header'
export default {
    name: 'SellerEditComponent',


data() {
  return {
    city: '',
    state: '',
    user: {}
  }
},

    mounted () {
        this.user = JSON.parse(localStorage.getItem('user'))

        console.log(this.user,'user')

        this.city = this.user.seller_city,
        this.state = this.user.seller_state

        console.log(this.user.seller_city)
        console.log(this.user.seller_state)
    },


    methods: {
      editStateDetails() {

          const requestOptions = {
    
        headers: authHeader() 
    }
        axios.put('users/accounts',{
          seller_city: this.city,
          seller_state: this.state
        },requestOptions).then(response=> {
          console.log(response)
          this.$toasted.success('Seller details has been updated')
           this.$router.push('/')
            localStorage.removeItem('user')
        localStorage.setItem('user',JSON.stringify({...this.user,
          seller_city: this.city,
          seller_state: this.state
        }))
        }).catch(error=>{
          if(error.response){
            this.$toasted.error(error.response.data)
          }
        })



         
        
        
       




      


        // console.log(this.$route.push)

        
        
      }
    },
}
</script>



<style scoped>

</style>