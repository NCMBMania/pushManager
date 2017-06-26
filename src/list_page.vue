<template>
<div>
  <list-page-menu />
  <div class="sub-navigation pushinfo">
    <div class="navi-inner">
      <ul>
        <li v-for="(push, index) in pushes">
          <a>
            <div class="inner">
              <div class="item"><span class="icon notice black"></span></div>
              <div class="name word-break-all">{{push.messages[0].title}}
                <span class="text-icon" v-if="push.draft">下書き</span>
              </div>
              <div class="date">{{push.createDate}}</div>
            </div>
            <div class="inner">
              <div class="text word-break-all">{{push.messages[0].message}}</div>
              <div class="right">
                <span class="text-icon">{{push.installation_count}} 端末(予定)</span>
              </div>
            </div>
          </a>
        </li>
        <li class="list-item-margin">&nbsp;</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
const Vue = require('Vue');
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
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function() {
      let me = this;
      me.pushes = [];
      switch (this.$route.meta.type) {
      case 'draft':
        let prePush = this.ncmb.DataStore('prePush');
        prePush
          .fetchAll()
          .then(function(results) {
            me.pushes = results;
          })
        break;
      case 'auth':
        break;
      case 'history':
        let Push = this.ncmb.Push;
        Push
          .fetchAll()
          .then(function(results) {
            me.pushes = results;
          })
        break;
      }
    }
  }
}
</script>