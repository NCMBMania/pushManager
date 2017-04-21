<template><div>
  <div modal-render="true" tabindex="-1" role="dialog" class="modal fade in" uib-modal-window="modal-window" index="0" animate="animate" modal-animation="true" style="z-index: 1050; display: block;">
    <div class="modal-dialog "><div class="modal-content" uib-modal-transclude=""><div class="reset">
  <dl class="modal-content">
    <dt class="title">
      <span>承認者の管理</span>
    </dt>

    <dd class="sub-title" style="background-color:#6E777B; color:#ffffff;">
      承認者を上から順番に設定してください。
    </dd>

    <dd class="text-normal">
      <div class="align-l" ng-hide="disabledEditObjectAcl">
        <div class="btn green" @click="addManager">+承認者の追加</div>
        <div class="btn red" @click="deleteManager"><span class="icon left delete"></span><span class="text">削除</span></div>
      </div>

      <form name="aclForm">
        <div class="table-ptn01 module-scroll-y">
          <table>
            <tbody>
              <tr>
                <th style="text-align:center; width:30px;">
                  <input type="checkbox" v-if="managers.length > 0" @click="checkAll">
                </th>
                <th width="220">承認者1</th>
                <th>備考</th>
                <th>&nbsp;</th>
              </tr>
              
              
              <tr v-for="manager in managers">
                <input type="hidden" v-model="manager.objectId">
                <td class="align-c">
                  <label class="">
                    <input type="checkbox" v-model="manager.checked">
                  </label>
                </td>
                <td>
                  <input type="text" v-model="manager.userName" autocomplete="off" style="width:100%;">
                </td>
                <td>
                  <input type="text" v-model="manager.description" autocomplete="off" style="width:100%;">
                </td>
                <td>
                  <a type="button" class="btn" style="text-decoration:none;" @click="moveManager(manager, -1)">↑</a>
                  <a type="button" class="btn" style="text-decoration:none;margin-left:1px;" @click="moveManager(manager, 1)">↓</a>
                </td>
              </tr>
            </tbody>

            <tfoot v-if="managers.length == 0">
              <tr>
                <td colspan="4">
                  承認者は設定されていません。
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

<div class="modal-backdrop fade in" uib-modal-animation-class="fade" modal-in-class="in" ng-style="{'z-index': 1040 + (index &amp;&amp; 1 || 0) + index*10}" uib-modal-backdrop="modal-backdrop" modal-animation="true" style="z-index: 1040;"></div>

</div></template>

<script>
let Vue = require('vue');

module.exports = {
  props: ['ncmb'],
  data: function() {
    let data = {
      managers: []
    };
    return data;
  },
  created: function() {
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
      let Manager = this.ncmb.DataStore('Manager');
      Manager
        .order('order')
        .fetchAll()
        .then(results => {
          me.managers = results;
        })
        .catch(err => {
          me.$emit('errorMessage', "データの取得に失敗しました")
        })
    },
    save: function(e) {
      let me = this;
      let promises = [];
      for (let i = 0; i < this.managers.length; i++) {
        let manager = this.managers[i];
        manager.set('order', i);
        promises.push(manager.objectId ? manager.update() : manager.save());
      }
      Promise.all(promises)
        .then(results => {
          me.$emit('successMessage', "承認者を登録しました");
          me.cancel()
        }, err => {
          me.$emit('errorMessage', "データの保存に失敗しました");
        })
    },
    addManager: function() {
      let Manager = this.ncmb.DataStore('Manager');
      let manager = new Manager;
      this.managers.push(manager);
    },
    deleteManager: function() {
      let promises = [];
      let me = this;
      for (let i = 0; i < this.managers.length; i++) {
        let manager = this.managers[i];
        if (manager.checked) {
          promises.push(manager.delete());
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
      let managers = [];
      for (let i = 0; i < this.managers.length; i++) {
        let manager = this.managers[i];
        manager.checked = e.target.checked;
        managers.push(manager);
      }
      this.managers = managers;
    },
    moveManager: function(o_manager, order) {
      for (let i = 0; i < this.managers.length; i++) {
        let manager = this.managers[i];
        if (manager !== o_manager)
          continue;
        if (!this.managers[i + order])
          continue;
        Vue.set(this.managers, i, this.managers[i + order]);
        Vue.set(this.managers, (i + order), o_manager);
        return;
      }
    }
  }
}  
</script>