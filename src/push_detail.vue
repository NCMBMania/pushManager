<template><div>
  <div class="contents matrix fit-layout" v-if="!push">
    <div class="matrix-content">
      <div class="module02 size-s">
        <div class="module-content">
          <div class="no-data">
            <p>プッシュ通知が選択されてません。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="contents matrix fit-layout push-page ng-hide">
      <!-- contents  -->
      <div class="matrix-header">
        <div class="inner">
          <ul class="left-item ng-hide" ng-show="activePush.buttons &amp;&amp; activePush.buttons.approvals">
            <li class="item">
              <a class="btn blue size-s" ng-click="onClickApproval();">承認</a>
            </li>
            <li class="item">
              <a class="btn orange size-s" ng-click="onClickReject();">差し戻し</a>
            </li>
          </ul>
          <ul class="right-item">
            <li class="item">
              <a href="/push" class="btn green"><span class="icon left gear"></span>＋コピーして作成</a>
            </li>
            <li class="item ng-hide" ng-show="activePush.buttons &amp;&amp; activePush.buttons.stat">
              <a href="/pushlist/stat" class="btn green"><span class="icon left gear"></span>統計</a>
            </li>
            <li class="item ng-hide" ng-show="activePush.buttons &amp;&amp; activePush.buttons.edit">
              <a href="/push" class="btn green"><span class="icon left gear"></span>編集</a>
            </li>
            <li class="item ng-hide" ng-show="activePush.buttons &amp;&amp; activePush.buttons.delete">
              <button href="#confirm-attention" class="btn red modal-exe" data-size="size-m"><span class="icon left delete"></span>削除</button>
            </li>
          </ul>
        </div>
      </div>





      <div class="matrix-content">
        <div class="module02 size-s">
          <div class="module-title">
            <p class="title ng-binding"><span class="icon notice black left"></span>&nbsp;</p>
            <p class="item-right"><span class="text-icon ng-binding"></span></p>
          </div>

          <div>
            <div class="module-content push-detail-content ng-scope">
              <div role="tablist" class="panel-group">
                <div class="panel ng-isolate-scope panel-default">
                  <div role="tab" id="accordiongroup-54-3832-tab" class="panel-heading">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" href="" tabindex="0" class="accordion-toggle">
                        <div class="ng-scope">
                          メッセージ
                          <span class="pull-right glyphicon glyphicon-chevron-right"></span>
                        </div>
                      </span></a>
                    </h4>
                  </div>
                  <div id="accordiongroup-54-3832-panel" role="tabpanel" class="panel-collapse collapse" style="height: 0px;">
                    <div class="panel-body">
                      <!-- ngRepeat: msg in activePush.messages -->

                      <div class="control-group right-style">
                        <div class="control-label">リッチプッシュ</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p><a></a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel ng-isolate-scope panel-default">
                  <div role="tab" id="accordiongroup-56-1559-tab" class="panel-heading">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" href="" tabindex="0" class="accordion-toggle"><span class="ng-binding">
                        <div class="ng-scope">
                          承認者・承認日時
                          <span class="pull-right glyphicon glyphicon-chevron-right" ng-class="'glyphicon-chevron-' + (activePush.accordionOpen.user ? 'down': 'right')"></span>
                        </div>
                      </span></a>
                    </h4>
                  </div>
                  <div id="accordiongroup-56-1559-panel" aria-labelledby="accordiongroup-56-1559-tab" aria-hidden="true" role="tabpanel" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                    <div class="panel-body" ng-transclude="">
                      <!-- ngRepeat: app in activePush.approval -->
                    </div>
                  </div>
                </div>

                <div class="panel ng-isolate-scope panel-default" ng-class="panelClass || 'panel-default'" is-open="activePush.accordionOpen.detail">
                  <div role="tab" id="accordiongroup-58-9287-tab" aria-selected="" class="panel-heading" ng-keypress="toggleOpen($event)">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" href="" aria-expanded="" aria-controls="accordiongroup-58-9287-panel" tabindex="0" class="accordion-toggle">
                        <div class="ng-scope">
                          詳細情報
                          <span class="pull-right glyphicon glyphicon-chevron-right" ng-class="'glyphicon-chevron-' + (activePush.accordionOpen.detail ? 'down': 'right')"></span>
                        </div>
                      </span></a>
                    </h4>
                  </div>
                  <div id="accordiongroup-58-9287-panel" aria-labelledby="accordiongroup-58-9287-tab" aria-hidden="true" role="tabpanel" class="panel-collapse collapse" style="height: 0px;">
                    <div class="panel-body">
                      <div class="control-group right-style ng-scope">
                        <div class="control-label">タイトル</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p class="bold ng-binding"></p>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope">
                        <div class="control-label">配信予定数</div>
                        <div class="controls">
                          <div class="controls-block">
                            <span class="ng-binding"> 端末(予定)</span>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope">
                        <div class="control-label">配信数</div>
                        <div class="controls">
                          <div class="controls-block">
                            <span class="ng-binding"> 端末</span>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope ng-hide" ng-show="activePush.userSettingValue !== undefined">
                        <div class="control-label">JSON</div>
                        <div class="controls">
                          <div class="controls-block" hljs="" source="activePush.renderUserSettingValue()"><pre><code class="hljs"></code></pre></div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope">
                        <div class="control-label">配信期限</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p class="ng-binding"></p>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope">
                        <div class="control-label">プラットフォーム</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p class="ng-binding"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>











                <div class="panel ng-isolate-scope panel-default" ng-class="panelClass || 'panel-default'" is-open="activePush.accordionOpen.android">
                  <div role="tab" id="accordiongroup-60-2381-tab" aria-selected="" class="panel-heading" ng-keypress="toggleOpen($event)">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" href="" aria-expanded="" aria-controls="accordiongroup-60-2381-panel" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()"><span class="ng-binding">
                        <div class="ng-scope">
                          Android
                          <span class="pull-right glyphicon glyphicon-chevron-right"></span>
                        </div>
                      </span></a>
                    </h4>
                  </div>
                  <div id="accordiongroup-60-2381-panel" aria-labelledby="accordiongroup-60-2381-tab" aria-hidden="true" role="tabpanel" class="panel-collapse collapse" style="height: 0px;">
                    <div class="panel-body" ng-transclude="">
                      <div class="control-group right-style ng-scope ng-hide" ng-show="activePush.isForAndroid()">
                        <div class="control-label">アクション</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p ng-show="activePush.action &amp;&amp; activePush.action.length > 0" class="ng-binding ng-hide"></p>
                            <p ng-hide="activePush.action &amp;&amp; activePush.action.length > 0" class="">無し</p>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope ng-hide" ng-show="activePush.isForAndroid()">
                        <div class="control-label">ダイアログ</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p ng-show="activePush.dialog" class="ng-hide">表示を有効にする</p>
                            <p ng-hide="activePush.dialog" class="">無し</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel ng-isolate-scope panel-default" ng-class="panelClass || 'panel-default'" is-open="activePush.accordionOpen.ios">
                  <div role="tab" id="accordiongroup-62-8853-tab" aria-selected="" class="panel-heading" ng-keypress="toggleOpen($event)">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" href="" aria-expanded="" aria-controls="accordiongroup-62-8853-panel" tabindex="0" class="accordion-toggle">
                        <div class="ng-scope">
                          iOS
                          <span class="pull-right glyphicon glyphicon-chevron-right" ng-class="'glyphicon-chevron-' + (activePush.accordionOpen.ios ? 'down': 'right')"></span>
                        </div>
                      </span></a>
                    </h4>
                  </div>
                  <div id="accordiongroup-62-8853-panel" aria-labelledby="accordiongroup-62-8853-tab" aria-hidden="true" role="tabpanel" class="panel-collapse collapse" style="height: 0px;">
                    <div class="panel-body" ng-transclude="">
                      <div class="control-group right-style ng-scope ng-hide" ng-show="activePush.isForIos()">
                        <div class="control-label">バッジ件数</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p ng-show="activePush.badgeIncrementFlag &amp;&amp; !activePush.badgeSetting" class="ng-hide">インクリメントする</p>
                            <p ng-show="!activePush.badgeIncrementFlag &amp;&amp; activePush.badgeSetting" class="ng-binding ng-hide"></p>
                            <p ng-show="!activePush.badgeIncrementFlag &amp;&amp; !activePush.badgeSetting" class="">無し</p>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope ng-hide" ng-show="activePush.isForIos()">
                        <div class="control-label">音声ファイル</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p ng-show="activePush.sound &amp;&amp; activePush.sound.length > 0" class="ng-binding ng-hide"></p>
                            <p ng-hide="activePush.sound &amp;&amp; activePush.sound.length > 0" class="">無し</p>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope ng-hide" ng-show="activePush.isForIos()">
                        <div class="control-label">カテゴリ</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p ng-show="activePush.category &amp;&amp; activePush.category.length > 0" class="ng-binding ng-hide"></p>
                            <p ng-hide="activePush.category &amp;&amp; activePush.category.length > 0" class="">無し</p>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope ng-hide" ng-show="activePush.isForIos()">
                        <div class="control-label">content-available</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p ng-hide="activePush.isContentAvailable()" class="">無効</p>
                            <p ng-show="activePush.isContentAvailable()" class="ng-hide">有効</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel ng-isolate-scope panel-default" ng-class="panelClass || 'panel-default'" is-open="activePush.accordionOpen.filter">
                  <div role="tab" id="accordiongroup-64-9278-tab" aria-selected="" class="panel-heading" ng-keypress="toggleOpen($event)">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" href="" aria-expanded="" aria-controls="accordiongroup-64-9278-panel" tabindex="0" class="accordion-toggle">
                        <div class="ng-scope">
                          配信端末の絞込条件
                          <span class="pull-right glyphicon glyphicon-chevron-right" ng-class="'glyphicon-chevron-' + (activePush.accordionOpen.filter ? 'down': 'right')"></span>
                        </div>
                      </span></a>
                    </h4>
                  </div>
                  <div id="accordiongroup-64-9278-panel" aria-labelledby="accordiongroup-64-9278-tab" aria-hidden="true" role="tabpanel" class="panel-collapse collapse" style="height: 0px;">
                    <div class="panel-body" ng-transclude="">
                      <div class="control-group right-style ng-scope">
                        <div class="control-label">セグメント</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p ng-show="activePush.segment" class="ng-binding ng-hide"></p>
                            <p ng-hide="activePush.segment" class="">未選択</p>
                          </div>
                        </div>
                      </div>

                      <div class="control-group right-style ng-scope">
                        <div class="control-label">searchCondition</div>
                        <div class="controls">
                          <div class="controls-block">
                            <p class="align-l">※詳しくは<a href="" target="_blank">REST API リファレンス:クエリの指定方法</a>をご参照ください。
                              </p><div class="" hljs="" source="activePush.renderSearchCondition()"><pre><code class="hljs"></code></pre></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel ng-isolate-scope panel-default ng-hide" ng-class="panelClass || 'panel-default'" is-open="activePush.accordionOpen.error" ng-show="activePush.error">
                  <div role="tab" id="accordiongroup-66-6523-tab" aria-selected="" class="panel-heading" ng-keypress="toggleOpen($event)">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" href="" aria-expanded="" aria-controls="accordiongroup-66-6523-panel" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()"><span class="ng-binding">
                        <div class="ng-scope">
                          配信エラー内容
                          <span class="pull-right glyphicon glyphicon-chevron-right"></span>
                        </div>
                      </span></a>
                    </h4>
                  </div>
                  <div id="accordiongroup-66-6523-panel" aria-labelledby="accordiongroup-66-6523-tab" aria-hidden="true" role="tabpanel" class="panel-collapse collapse" style="height: 0px;">
                    <div class="panel-body">
                      <div class="control-group right-style ng-scope">
                        <div class="controls">
                          <div class="controls-block">
                            <p class="align-l">※詳しくは<a href="" target="_blank">配信エラー内容について</a>をご参照ください。</p>
                            <div class="" source="activePush.renderErrorJson()"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
module.exports = {
  components: {
  },
  data: function() {
    let data = {
    };
    return data;
  },
  props: ['ncmb', 'push']
}
</script>