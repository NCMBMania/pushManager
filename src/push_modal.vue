<template>
  <div id="confirm-attention" class="modal-wrap">
    <dl class="modal-content">
      <dt class="title"><span>確認</span></dt>
      <dd class="text-normal">
        <p>プッシュ通知を作成しますか？</p>
      </dd>
      <dd class="area-button">
        <button class="btn gray" onclick="javascript:$.fancybox.close();">キャンセル</button>
        <button ng-click="savePush();" class="btn green"><span class="text">作成する</span></button>
      </dd>
    </dl>
  </div>
</template>

