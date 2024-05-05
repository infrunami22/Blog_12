<template>
  <h1>Admin</h1>  
  <button @click="countdown">Önmegsemmisítés</button>
  <p v-if="counter >= 0">Önmegsemmisítés {{ counter }} másodperc múlva...</p>
  <p v-else>BOOM!</p>
</template>

<script>
export default {
  data() {
    return {
      counter: -1
    }
  },
  methods: {
    countdown() {
      this.counter = 10;
      let intervalId = setInterval(() => {
        if (this.counter === 0) {
          clearInterval(intervalId);
          window.open('https://media.newyorker.com/photos/59095bb86552fa0be682d9d0/master/pass/Monkey-Selfie.jpg', '_blank');
        } else {
          this.counter--;
        }
      }, 1000);
    },
  },
};
</script>