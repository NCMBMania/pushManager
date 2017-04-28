<template>
  <header id="header" class="reset">
    <div class="header-inner">
      <div class="logo-site">
        <a href="/"><img src="assets/logo.png"></a>
      </div>
      <div class="">
        <header-menu :ncmb="ncmb" v-on:showModal="showModal" v-on:logout="logout"></header-menu>
      </div>
      <div class="status">
        <header-status :success="success" :error="error"></header-status>
      </div>
    </div>

    <div id="app-footpath" class="">
      <header-login :ncmb="ncmb"></header-login>      
    </div>
  </header>
</template>

<script>
module.exports = {
  props: ['ncmb', 'error', 'success'],
  components: {
    'header-menu': require('./header_menu.vue'),
    'header-status': require('./header_status.vue'),
    'header-login': require('./header_login.vue')
  },
  methods: {
    showModal: function(modal) {
      console.log('showModal')
      this.$emit('showModal', modal);
    },
    logout: function() {
      this.$emit('logout');
    }
  }
};
</script>
