<template>
  <div>
    <div class="module02 section-file-permission">
      <div class="module-title">
        <p class="title">テスト配信端末の管理</p>
      </div>
      <div class="module-content">
        <div class="control-group list">
          <div class="control-label"><span class="text">テスト配信端末</span></div>
          <div class="controls">
            <a class="btn" @click="showInstallationModal"><span class="icon left gear"></span><span class="text">テスト配信端末の管理</span></a>
          </div>
        </div>
      </div>
    </div>
    <div class="module02 section-file-permission">
      <div class="module-title">
        <p class="title">承認者の管理</p>
      </div>
      <div class="module-content">
        <div class="control-group list">
          <div class="control-label"><span class="text">承認者</span></div>
          <div class="controls">
            <a class="btn" @click="showManagerModal"><span class="icon left gear"></span><span class="text">承認者の管理</span></a>
          </div>
        </div>
      </div>
    </div>
    <div class="module02 section-api-key">
      <div class="module-title">
          <p class="title ng-binding">APIキー</p>
      </div>

      <div class="module-content">

          <div class="control-group long">
              <div class="control-label"><label class="ng-binding">アプリケーションキー</label><a href="javascript:void(0);" class="inline-btn"><span class="icon question right"><span class="balloon-arrow-bottom-s white ng-binding">アプリケーションを一意に識別するキーです。クライアントキーと組み合わせてAPIを利用するための認証を行います。</span></span></a></div>
              <div class="controls">
                <input type="text" class="size-l" v-model="application_key">
              </div>
          </div>

          <div class="control-group long">
              <div class="control-label"><label>クライアントキー</label><a href="javascript:void(0);" class="inline-btn"><span class="icon question right"><span class="balloon-arrow-bottom-s white">APIを利用する際に必要なキーです。アプリケーションキーとともにりに利用してください</span></span></a></div>
              <div class="controls">
                <input type="text" class="size-l" v-model="client_key">
              </div>
          </div>
          <div class="controls-block">
            <button class="btn size-m green" @click="saveKeys">保存する</button>
          </div>
      </div>
    </div>
  </div>  
</template>

<script>
const Vue = require('Vue');
module.exports = {
  data: function() {
    let data = {
      application_key: null, client_key: null
    };
    if (this.ncmb) {
      data.application_key =  this.ncmb.apikey;
      data.client_key      = this.ncmb.clientkey;
    }
    return data;
  },
  props: ['ncmb'],
  methods: {
    saveKeys: function(e) {
      if (this.application_key && this.client_key) {
        this.$emit('updateKeys', this.application_key, this.client_key);
      }
    },
    showManagerModal: function(e) {
      this.$emit('showModal', 'configManager');
    },
    showInstallationModal: function(e) {
      this.$emit('showModal', 'installationManager');
    }
  }
}
</script>