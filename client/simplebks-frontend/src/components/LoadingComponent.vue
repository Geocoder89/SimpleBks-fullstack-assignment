<template>
  <div id="loading">
    <img
      class="img"
      src="@/assets/images/loading.gif"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script>
export default {
  name: "LoadingComponent"
};
</script>






<style scoped>
#loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  line-height: 100vh;
}
.img {
  position: relative;
  margin: auto;
  margin-top: 20%;
}
</style>