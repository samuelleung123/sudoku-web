<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-app-bar-title>Sudoku</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <Sudoku/>
    </v-main>
  </v-app>
</template>

<script>

import Sudoku from "./components/Sudoku.vue";

export default {
  name: 'App',

  components: {
    Sudoku
  },

  data: () => ({
    //
  }),
};
</script>
