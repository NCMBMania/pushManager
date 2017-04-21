<template>
  <div id="container" class="">
    <div class="container-inner ng-scope" ui-view="">
      <div class="main-area reset ng-scope">
        <main_menu />
        <div class="contents reset">
          <router-view :ncmb="ncmb" v-on:updateKeys="updateKeys" v-on:showModal="showModal"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['ncmb'],
  components: {
    'main_menu': require('./main_menu.vue'),
    'push-form': require('./push_form.vue'),
    'config-form': require('./config_form.vue')
  },
  methods: {
    updateKeys: function(application_key, client_key) {
      this.$emit('updateKeys', application_key, client_key);
    },
    showModal: function(modal) {
      this.$emit('showModal', modal);
    }
  },
}
</script>