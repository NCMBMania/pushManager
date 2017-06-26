<template>
  <div>
    <list-page-menu />
    <router-view
            :ncmb="ncmb" 
    />
    <push-detail v-if="activePush" :push="activePush" />
  </div>
</template>

<script>
module.exports = {
  components: {
    'push-detail': require('./push_detail.vue'),
    'list-page-menu': require('./list_page_menu.vue')
  },
  data: function() {
    let data = {
      pushes: [],
      activePush: null
    };
    return data;
  },
  props: ['ncmb'],
  methods: {
  }
}
</script>