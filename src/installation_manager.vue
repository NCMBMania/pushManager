<template><div>
  <div class="modal fade in" style="z-index: 1100; display: block;">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="reset">
          <dl class="modal-content">
            <dt class="title">
              <span>テスト端末の管理</span>
            </dt>

            <dd class="text-normal">
              <div class="align-l">
                <div class="btn green" @click="addInstallation">+テスト端末の追加</div>
                <div class="btn red" @click="deleteInstallation"><span class="icon left delete"></span><span class="text">削除</span></div>
              </div>

              <form name="aclForm" class="ng-pristine ng-valid">
                <div class="table-ptn01 module-scroll-y ng-scope">
                  <table>

                    <tbody>
                      <tr>
                        <th style="text-align:center; width:30px;">
                          <label>
                            <input type="checkbox" v-if="installations.length > 0" @click="checkAll">
                          </label>
                        </th>
                        <th width="220">端末</th>
                        <th>備考</th>
                      </tr>
                      
                      
                      <tr v-for="installation in installations">
                        <td class="align-c">
                          <label>
                            <input type="checkbox" v-model="installation.checked">
                          </label>
                        </td>
                        <td>
                          <input type="text" v-model="installation.objectId" autocomplete="off" style="width:100%;">
                        </td>
                        <td>
                          <input type="text" v-model="installation.description" autocomplete="off" style="width:100%;">
                        </td>
                      </tr>
                    </tbody>

                    <tfoot v-if="installations.length == 0">
                      <tr>
                        <td colspan="4">
                          テスト端末は設定されていません。
                        </td>
                      </tr>
                    </tfoot>

                  </table>
                </div>
              </form>

            </dd>


            <dd class="area-button">
              <button type="button" class="btn gray" @click="cancel">キャンセル</button>
              <button class="btn green" @click="save">変更を保存</button>
            </dd>
          </dl>
      <a title="Close" class="fancybox-item fancybox-close" href="javascript:;" style="position:absolute;" @click="cancel"></a>
    </div></div></div>
  </div>
  <div class="modal-backdrop fade in" style="z-index: 1040;"></div>
</div>
</template>

<script>
let Vue = require('vue');

module.exports = {
  props: ['ncmb'],
  data: function() {
    let data = {
      installations: []
    };
    return data;
  },
  created: function() {
    if (!this.ncmb.User.getCurrentUser()) {
      this.cancel();
      this.$emit('showModal', "signinForm");
      return;
    }
    window.addEventListener('keyup', this.cancel);
    this.updateList();
  },
  methods: {
    cancel: function(e) {
      if (typeof e == 'undefined' || e.type == 'click' || (e.type == 'keyup' && e.keyCode == 27)) {
        
      }else{
        return true;
      }
      this.$emit('closeModal');
    },
    updateList: function() {
      let me = this;
      let Installation = this.ncmb.Installation;
      Installation
        .where({'tester': true})
        .order('order')
        .fetchAll()
        .then(results => {
          me.installations = results;
        })
        .catch(err => {
          me.$emit('errorMessage', "データの取得に失敗しました")
        })
    },
    save: function(e) {
      let me = this;
      let promises = [];
      console.log(this.installations);
      for (let i = 0; i < this.installations.length; i++) {
        let installation = this.installations[i];
        promises.push(installation.set('tester', true).update());
      }
      
      Promise.all(promises)
        .then(results => {
          me.$emit('successMessage', "テスト端末を登録しました");
          me.cancel()
        }, err => {
          me.$emit('errorMessage', "データの保存に失敗しました");
        })
    },
    addInstallation: function() {
      let Installation = this.ncmb.Installation;
      let installation = new Installation;
      this.installations.push(installation);
    },
    deleteInstallation: function() {
      let promises = [];
      let me = this;
      for (let i = 0; i < this.installations.length; i++) {
        let installation = this.installations[i];
        if (installation.checked) {
          if (!installation.objectId) {
            delete this.installations[i];
          }else{
            promises.push(
              installation
                .set('tester', null)
                .set('description', null)
                .update()
            );
          }
        }
      }
      Promise.all(promises)
        .then(results => {
          me.updateList();
        }, err => {
          me.$emit('errorMessage', "データの削除に失敗しました");
        })
    },
    checkAll: function(e) {
      let installations = [];
      for (let i = 0; i < this.installations.length; i++) {
        let installation = this.installations[i];
        installation.checked = e.target.checked;
        installations.push(installation);
      }
      this.installations = installations;
    }
  }
}  
</script>