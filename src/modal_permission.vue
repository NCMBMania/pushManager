<template>
<div>
<div modal-render="true" tabindex="-1" role="dialog" class="modal fade in" index="0" animate="animate" modal-animation="true" style="z-index: 1050; display: block;">
    <div class="modal-dialog "><div class="modal-content" uib-modal-transclude=""><div class="reset permission ng-scope">
  <dl class="modal-content">

    <dt class="title">
      <span>オブジェクトのパーミッション</span>
    </dt>

    <dd class="text-normal">
      <div class="align-l" ng-hide="disabledEditObjectAcl">
        <div class="btn green" @click="add">+新しいパーミッション</div>
        <div class="btn red" @click="remove"><span class="icon left delete"></span><span class="text">削除</span></div>
      </div>

      <form name="aclForm">
        <div class="table-ptn01 module-scroll-y">
          <table>

            <tbody>
              <tr>
                <th style="text-align:center; width:30px;">
                  <label ng-hide="disabledEditObjectAcl">
                    <input type="checkbox" v-if="permissions.length > 0" @click="checkAll" style="">
                  </label>
                </th>
                <th>対象</th>
                <th class="align-c" style="text-align:center; width:60px;">読込</th>
                <th class="align-c" style="text-align:center; width:100px;">更新・削除</th>
              </tr>


              <tr v-for="permission in new_permissions">
                <td class="align-c">
                  <input type="checkbox" v-model="permission.checked">
                </td>
                <td>
                  <select v-model="permission.target">
                    <option value="all">全員</option>
                    <option value="role">ロール</option>
                    <option value="user">会員</option>
                  </select>
                  <input type="text" v-if="permission.target === 'role'" v-model="permission.roleName">
                  <input type="text" v-if="permission.target === 'user'" v-model="permission.objectId">
                </td>
                <td style="text-align:center;">
                  <input type="checkbox" v-model="permission.readable">
                </td>
                <td style="text-align:center;">
                  <input type="checkbox" v-model="permission.writable">
                </td>
              </tr>
              
            </tbody>

            <tfoot v-if="permissions.length == 0">
              <tr>
                <td colspan="4">
                  パーミッションは設定されていません。
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

  <a title="Close" class="fancybox-item fancybox-close" href="javascript:;" style="position:absolute;" ng-click="cancel()"></a>
</div></div></div>
</div>
<div class="modal-backdrop fade in" uib-modal-animation-class="fade" modal-in-class="in" ng-style="{'z-index': 1040 + (index &amp;&amp; 1 || 0) + index*10}" uib-modal-backdrop="modal-backdrop" modal-animation="true" style="z-index: 1040;"></div>

</div>
</template>

<script>
module.exports = {
  props: ['ncmb', 'permissions'],
  data: function() {
    let data = {
      new_permissions: this.permissions || []
    };
    return data;
  },
  created: function() {
    window.addEventListener('keyup', this.cancel);
  },
  methods: {
    cancel: function(e) {
      if (typeof e == 'undefined' || e.type == 'click' || (e.type == 'keyup' && e.keyCode == 27)) {
        
      }else{
        return true;
      }
      this.$emit('closeModal');
    },
    add: function(e) {
      this.new_permissions.push({checked: false, target: 'all', rollName: null, objectId: null, readable: true, writable: false});
    },
    remove: function(e) {
      this.new_permissions = this.new_permissions.filter(function(permission) {
        if (!permission.checked)
          return permission;
      });
    },
    save: function(e) {
      console.log(e)
      this.$emit('savePermission', this.new_permissions);
      this.cancel();
    },
    checkAll: function(e) {
      for (let i = 0; i < this.permissions.length; i++) {
        this.permissions[i].checked = e.target.checked;
      }
    }
  }
}
</script>
