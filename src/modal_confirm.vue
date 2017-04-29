<template><div>
  <div modal-render="true" tabindex="-1" role="dialog" class="modal fade ng-isolate-scope modal-position in" uib-modal-animation-class="fade" modal-in-class="in" ng-style="{'z-index': 1050 + index*10, display: 'block'}" uib-modal-window="modal-window" window-class="modal-position" size="sm" index="0" animate="animate" modal-animation="true" style="z-index: 1050; display: block;">
      <div class="modal-dialog modal-sm"><div class="modal-content" uib-modal-transclude=""><div class="reset ng-scope">
    <dl class="modal-content">

      <dt class="title">
        <span class="ng-binding">確認</span>
      </dt>

      <dd class="text-normal ng-binding">
        プッシュ通知を作成しますか？
      </dd>

      <dd class="area-button">
        <button type="button" class="btn gray ng-binding" ng-show="cancel" ng-click="onClickCancel()">キャンセル</button>
        <button class="btn green ng-binding" ng-click="onClickOk()">作成する</button>
      </dd>
    </dl>

    <a title="Close" class="fancybox-item fancybox-close" href="javascript:;" style="position:absolute;" ng-click="onClickCancel()"></a>
  </div>
  </div></div>
  </div>
  <div class="modal-backdrop fade in" uib-modal-animation-class="fade" modal-in-class="in" ng-style="{'z-index': 1040 + (index &amp;&amp; 1 || 0) + index*10}" uib-modal-backdrop="modal-backdrop" modal-animation="true" style="z-index: 1040;"></div>
</div></template>

<script>
module.exports = {
  props: ['ncmb'],
  data: function() {
    let data = {
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
    }
  }
}
</script>
