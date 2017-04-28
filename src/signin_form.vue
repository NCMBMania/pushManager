<template><div>
  <div class="modal fade in" style="z-index: 1100; display: block;">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="reset">
          <dl class="modal-content">
            <dt class="title">
              <span>ログイン</span>
            </dt>

            <dd class="text-normal">
              <form name="aclForm">
                <div class="table-ptn01">
                  <table>

                    <tbody>
                      <tr>
                        <td>
                          ユーザ名
                        </td>
                        <td>
                          <input type="text" autocomplete="off" v-model="userName" style="width:100%;">
                        </td>
                      </tr>
                      <tr>
                        <td>
                          パスワード
                        </td>
                        <td>
                          <input type="password" autocomplete="off" v-model="password" style="width:100%;">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>

            </dd>


            <dd class="area-button">
              <button type="button" class="btn gray" @click="cancel">キャンセル</button>
              <button class="btn green" @click="signIn">ログイン</button>
            </dd>
          </dl>
      <a title="Close" class="fancybox-item fancybox-close" href="javascript:;" style="position:absolute;" @click="cancel"></a>
    </div></div></div>
  </div>
  <div class="modal-backdrop fade in" style="z-index: 1040;"></div>
</div>
</template>

<script>
module.exports = {
  props: ['ncmb'],
  data: function() {
    let data = {
      userName: "",
      password: ""
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
    signIn: function(e) {
      this.$emit('login', this.userName, this.password);
    }
  }
}  
</script>