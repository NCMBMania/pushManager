<template>
  <div>
    <config-manager 
      id="config-manager" 
      :ncmb="ncmb"
      v-on:errorMessage="errorMessage"
      v-on:successMessage="successMessage"
      v-on:closeModal="closeModal"
      v-on:showModal="showModal"
      v-if="modal == 'configManager'" 
    />
    <installation-manager
      id="installation-manager"
      :ncmb="ncmb"
      v-on:errorMessage="errorMessage"
      v-on:successMessage="successMessage"
      v-on:closeModal="closeModal"
      v-on:showModal="showModal"
      v-if="modal == 'installationManager'" 
    />
    <signin-form
      id="installation-manager"
      :ncmb="ncmb"
      v-on:errorMessage="errorMessage"
      v-on:successMessage="successMessage"
      v-on:closeModal="closeModal"
      v-on:login="login"
      v-if="modal == 'signinForm'" 
    />
    <modal-permission
      id="modal-permission"
      :ncmb="ncmb"
      :permissions="permissions"
      v-on:errorMessage="errorMessage"
      v-on:successMessage="successMessage"
      v-on:closeModal="closeModal"
      v-on:savePermission="savePermission"
      v-if="modal == 'modalPermission'" 
    />
    <modal-segmentation
      :ncmb="ncmb"
      :segmentations="segmentations"
      :columns="columns"
      v-on:errorMessage="errorMessage"
      v-on:successMessage="successMessage"
      v-on:closeModal="closeModal"
      v-on:saveSegmentation="saveSegmentation"
      v-if="modal == 'modalSegmentation'" 
    />
    
    <modal-confirm
      :ncmb="ncmb"
      :options="message"
      v-on:errorMessage="errorMessage"
      v-on:successMessage="successMessage"
      v-on:closeModal="closeModal"
      v-if="modal == 'modalConfirm'" 
    />
    
    <vue-header
      :ncmb="ncmb"
      :success="success"
      :error="error"
      v-on:showModal="showModal"
      v-on:logout="logout"
    />
    <router-view
      :ncmb="ncmb"
      :permissions="permissions"
      :segmentations="segmentations"
      :columns="columns"
      v-on:updateKeys="updateKeys" 
      v-on:showModal="showModal"></router-view>
    <vue-footer :ncmb="ncmb"></vue-footer>
  </div>
</template>

<script>
const NCMB = require('ncmb');
let   ncmb = null;
const application_key = localStorage.getItem('application_key');
const client_key      = localStorage.getItem('client_key');
if (application_key && client_key) {
  ncmb = new NCMB(application_key, client_key)
}

export default {
  name: 'app',
  data: function() {
    return {
      ncmb: ncmb,
      error: null,
      success: null,
      modal: null,
      permissions: [],
      segmentations: [],
      columns: [],
      options: null
    };
  },
  components: {
    'vue-header': require('./header.vue'),
    'vue-footer': require('./footer.vue'),
    'config-manager': require('./config_manager.vue'),
    'installation-manager': require('./installation_manager.vue'),
    'signin-form': require('./signin_form.vue'),
    'modal-permission': require('./modal_permission.vue'),
    'modal-segmentation': require('./modal_segmentation.vue'),
    'modal-confirm': require('./modal_confirm.vue'),
  },
  created: function() {
    if (!this.ncmb)
      return;
    let me = this;
    let Segmentation = ncmb.DataStore('Segmentation');
    Segmentation
      .fetchAll()
      .then((results) => {
        me.segmentations = results;
      })
    me.ncmb.Installation
      .fetch()
      .then(function(result) {
        if (Object.keys(result).length == 0) {
          me.columns = ['applicationName', 'appVersion', 'badge', 
                        'channels', 'deviceToken', 'sdkVersion', 
                        'timeZone', 'acl', 'objectId', 'createDate', 'updateDate'
                      ];
        }else{
          me.columns = Object.keys(result).filter(function(column) {
            if (['tester', 'checked'].indexOf(column) < 0)
              return column;
          })
        }
        me.columns = me.columns.sort(function(a, b) {
          return (a > b) - (a < b);
        })
      })
  },
  methods: {
    message_clear: function(type, message, msec) {
      let me = this;
      me[type] = message;
      setTimeout(() => {
        me[type] = null;
      }, msec);
    },
    updateKeys: function(application_key, client_key) {
      this.ncmb = new NCMB(application_key, client_key);
      let me = this;
      let Test = this.ncmb.DataStore('test');
      Test.fetch()
        .then(data => {
          // 成功
          localStorage.setItem('application_key', application_key);
          localStorage.setItem('client_key', client_key);
          me.message_clear('success', "キーを保存しました", 3000);
        })
        .catch(err => {
          // エラー
          me.message_clear('error', "保存できませんでした。キーを確認してください。", 3000);
        })
    },
    showModal: function(modal, options) {
      this.modal = modal;
      this.options = options;
    },
    closeModal: function() {
      this.modal = null;
    },
    errorMessage: function(msg) {
      this.message_clear('error', msg, 3000);
    },
    successMessage: function(msg) {
      this.message_clear('success', msg, 3000);
    },
    login: function(userName, password) {
      var me = this;
      this.ncmb.User.login(userName, password)
        .then(function(user) {
          me.successMessage("ログイン成功しました");
          me.closeModal();
          location.reload();
        })
        .catch(function(err) {
          me.errorMessage("ログイン失敗しました");
        })
    },
    logout: function() {
      let me = this;
      this.ncmb.User.logout()
        .then(() => {
          location.reload();
        })
        .catch(() => {
          location.reload();
        });
    },
    savePermission: function(permissions) {
      this.permissions = permissions;
    },
    saveSegmentation: function(segmentations) {
      this.segmentations.push(segmentations);
    }
  },
  render: h => h(App)
}
</script>
