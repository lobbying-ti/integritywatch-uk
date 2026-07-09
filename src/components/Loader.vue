<template>
  <div class="overlay">
    <div class="loader-container">
      <div class="loader-text">
        {{ text }}
      </div>
      <div class="loader"></div>
      <div class="loader-text below">
        Please wait a moment for the data to load ...
		<br>
		-
		<br>
		<h1 id="title">Open Access UK: monitor lobbying meetings across Whitehall and Holyrood</h1>
		<p id="underlay">This is a user-friendly interactive database that provides a unique overview of lobby meetings with hosts in the UK Government, Scottish Government, and Scottish Parliament.</p>
	  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    text: String,
  }
}
</script>

<style scoped lang="scss">
#title {
  font-family: Montserrat, sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #2C3E50;
}

#underlay {
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #2C3E50;
}

/* Media queries for mobile responsiveness */
@media (max-width: 768px) { /* Tablet and mobile devices */
  #title {
    font-size: 20px;
  }

  #underlay {
    font-size: 16px;
  }
  .loader-container{width:90%!important}
}

@media (max-width: 480px) { /* Mobile devices */
  #title {
    font-size: 18px;
  }

  #underlay {
    font-size: 14px;
  }
}

.overlay {
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10001;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  margin: 0;
  .loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
    .loader {
      border: 13px solid #f3f3f3; /* Light grey */
      border-top: 13px solid #138496; /* Blue */
      border-radius: 50%;
      width: 120px;
      height: 120px;
      margin: 30px auto;
      animation: spin 2s linear infinite;
    }
    .loader-text {
      font-size: 20px;
      font-weight: 600;
      &.below {
        color: #138496;
        font-weight: 600;
      }
    }
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
