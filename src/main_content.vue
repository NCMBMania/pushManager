<template>
  <div id="container" class="">
    <div class="container-inner">
      <div :class="mainClass">
        <main_menu />
        <div :class="contentClass">
          <router-view
            :ncmb="ncmb" 
            :permissions="permissions"
            :segmentations="segmentations"
            :columns="columns"
            v-on:updateKeys="updateKeys"
            v-on:showModal="showModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['ncmb', 'permissions', 'segmentations', 'columns'],
  components: {
    'main_menu': require('./main_menu.vue'),
    'list-page': require('./list_page_main.vue'),
    'push-form': require('./push_form.vue'),
    'config-form': require('./config_form.vue')
  },
  data: function() {
    let data = {
      mainClass: 'main-area reset',
      contentClass: 'contents reset'
    };
    return data;
  },
  updated: function() {
    if (this.$route.matched && this.$route.matched.length > 0) {
      if (this.$route.matched[0].path === '/list') {
        this.mainClass    = 'main-area reset pushlist';
        this.contentClass = '';
      }else{
        this.mainClass  = 'main-area reset';
        this.contentClass = 'contents reset';
      }
    }
  },
  methods: {
    updateKeys: function(application_key, client_key) {
      this.$emit('updateKeys', application_key, client_key);
    },
    showModal: function(modal, options) {
      this.$emit('showModal', modal, options);
    }
  },
}
</script>