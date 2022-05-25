<template>
    <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow p-4">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group mb-4">
                <label 
                for="username" class="form-label">Username/Email</label>
                <input 
                type="text" 
                v-model="username"
                name="username"
                :class="{ 'is-invalid': submitted && !username }"
                class="form-control" id="username" />

                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
              </div>
              <div class="form-group mb-4">
                <label for="password" class="form-label">Password</label>
                <input 
                v-model="password"
                name="password"
                type="password" 
                 :class="{ 'is-invalid': submitted && !password }" class="form-control" id="password" />
              </div>
              <div class="d-grid mb-4">
                <button 
                :disabled="loading"
                type="submit"
               class="btn btn-success p-2">Login</button>


                 <img v-show="loading" class="my-3" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>

                <div v-if="error" class="alert alert-danger">{{error}}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {router} from '../_helpers/router'
import {authService} from '../services'
export default {
    name: 'LoginComponent',

    data() {
      return {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            returnUrl: '',
            error: ''
        }
    },

    created () {
      // reset login status

      authService.logout()

      // get return url from route parameters or default to '/


      this.returnUrl = this.$route.query.returnUrl || '/';
    },

   methods: {
     /* eslint-disable */ 
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;

            // stop here if form is invalid
            if (!(username && password)) {
                return;
            }

            this.loading = true;
            authService.login(username, password)
                .then(
                    user => router.push(this.returnUrl),
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        }
    }
    
}
</script>

<style scoped>

</style>