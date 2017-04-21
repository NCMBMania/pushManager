<template>
<div>
  <div class="module02 module02-push-form">
    <div class="module-content">
      <div class="control-group">
        <p><a href="/pushlist" class="btn">
          <span class="icon left back"></span>
          <span class="text">プッシュ通知一覧へ</span>
        </a></p>
      </div>
    </div>
    <div class="module-title">
      <p class="title">プッシュ通知 配信情報</p>
    </div>

    <div class="module-content">
    <div class="control-group">
      <p><img src="assets/route.png"></p>
    </div>
    <form class="form-horizontal pushform" name="pushForm" novalidate="">
      <div class="auto-resize" style="margin-top:23px;">
        <!-- プレビュー -->
        <vue-preview :message="preview_message" />
        <div v-for="(message, index) in messages">
          <!-- タイトル -->
          <div class="control-group long">
            <div class="control-label">
              <label class="bold">タイトル</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知で表示するタイトルを記述します。(Android：システムトレイに表示する件名、iOS：Apple Watchに表示する文字列)</span></span></a></div>
            <div class="controls">
              <input class="size-l" v-model="message.title" type="text">
              <span class="controls-inline error-message" v-if="message.errors.title">タイトルが入力されてません。</span>
            </div>
          </div>

            <!-- メッセージ -->
            <div class="control-group long">
              <div class="control-label">
                <label class="bold">メッセージ</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知で表示する内容を記述します。</span></span></a>
              </div>

                <div class="controls">
                  <div>
                    <textarea v-model="message.value" rows="6" class="size-l"></textarea>
                    <a class="inline-btn" v-if="messages.length > 1" @click="closeMessage(index)">
                      <span class="icon close"></span>
                    </a>
                  </div>

                  <div class="controls-block size-l align-r">
                    <label style="margin-right:15px;" v-if="messages.length > 1">
                      <input v-model="preview_index" v-bind:value="index" type="radio">プレビュー</label>
                  </div>
                </div>

                <div class="controls">
                  <div class="controls-block size-l align-r">
                    <span>Android残り xxx バイト</span>
                    <span>iOS残り xxx バイト</span>
                  </div>
                </div>
                </div>
              </div>

              <div class="controls">
                <div class="controls-block">
                  <a class="clickable btn size-m" @click="addMessage">メッセージを追加する</a>
              </div>
            </div>

      <!-- 詳細情報 -->
      <div class="control-group long detail">
        <div class="control-label" style="width:100%; cursor:pointer;" @click="showDetail">
          <label class="bold">
            
            <span v-if="detail_view">▼</span><span v-else>▶</span>&nbsp;詳細情報</label>
        </div>
        
        <div class="slide" v-if="detail_view">
          <!-- URL -->
          <div class="control-label">
            <label class="bold">URL</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知からアプリを起動した際に表示するWebコンテンツのURLを設定できます。</span></span></a>
          </div>
          <div class="controls">
            <input class="size-m" v-model="messagerichUrl" type="url">
          </div>
          <div class="controls">
            <div class="controls-block">
              <a class="clickable btn size-m">HTMLを作成する</a>
            </div>
          </div>
          
          <!-- JSONメッセージ -->
          <div class="control-label">
            <label class="bold">JSON</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">JSONデータを記述することで、push通知をカスタマイズできます。</span></span></a>
          </div>

          <div class="controls">
            <div class="control-message box-s json clearfix" style="display:block;" v-for="(json, index) in jsons">
              <div class="closebox">
                <a class="inline-btn" @click="deleteJson(index)"><span class="icon close"></span></a>
              </div>
              <div class="item">
                <input class="key" v-model="json.key" type="text">
                <span>
                    <select v-model="json.type">
                      <option v-for="json_type in html.json_types" :value="json_type.key">{{json_type.value}}</option>
                    </select>
                  </span>
                <input class="value" v-model="json.value" type="text" v-if="json.type == 'string'">
                <input class="value number" v-model="json.value" type="number" v-if="json.type == 'number'">
                <span class="value" v-if="json.type == 'boolean'">
                  <label>
                    <input v-model="json.value" v-bind:checked="json.value" type="radio">True
                  </label>
                  &nbsp;
                  <label>
                    <input v-model="json.value" v-bind:checked="!json.value" type="radio">False
                  </label>
                </span>
              </div>
            </div>
            
            <div class="controls-block">
              <a class="clickable btn size-m" ng-click="onClickAddJson()">JSONデータを追加する</a>
            </div>
          </div>
        </div>

      </div>

      <!-- 配信日時 -->
      <div class="control-group long">
        <div class="control-label">
          <label class="bold">配信日時</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知を配信する時間を指定できます。</span></span></a>
        </div>

        <!-- ngRepeat: deliveryTime in deliveryTimes --><div class="controls ng-scope" ng-repeat="deliveryTime in deliveryTimes">
          <div class="control-message box-s">
            <select ng-model="deliveryTime.immediateDelivery" class="ng-pristine ng-untouched >
              <option value="" selected="selected">今すぐ配信</option>
              <option value="1">日時</option>
            </select>
            <a class="inline-btn hide" ng-show="$index &gt; 0 || deliveryTimes.length &gt;= 2" ng-click="onClickDeleteDeliveryTime(deliveryTime)"><span class="icon close"></span></a>

            <div class="controls-block hide" ng-show="deliveryTime.immediateDelivery === '1'">
              <input class="input-date ng-pristine ng-untouched  name="deliveryDate" ng-model="deliveryDate" onchange="
                      angular.element(this).scope().deliveryDate = this.value;
                      angular.element(this).scope().$apply();
                    " placeholder="2016年03月03日" style="background-color: #f5f4e7;" type="text">
              <button type="button" class="ui-datepicker-trigger"><span class="icon calendar black"></span></button>

              <select class="time-select ng-pristine ng-untouched  ng-model="deliveryHour" ng-options="_v for _v in [] | range:0:23"><option value="?" selected="selected"></option>
                <option v-for="(item, index) in hours" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              :
              <select class="time-select" ng-model="deliveryMinute">
                <option value="?" selected="selected"></option>
                <option v-for="(item, index) in minutes" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              <span class="controls-inline error-message hide" ng-show="pushForm.deliveryDate.$error.pastDate">未来の日付を設定してください。</span>
              <span class="controls-inline error-message hide" ng-show="pushForm.deliveryDate.$error.invalidFormat">日付を正しく入力してください。</span>
            </div>
          </div>
        </div><!-- end ngRepeat: deliveryTime in deliveryTimes -->

        <div class="controls">
          <div class="controls-block">
            <a class="clickable btn size-m" ng-click="onClickAddDeliveryTime()">配信日時を追加する</a>
          </div>
        </div>

      </div>


      <div class="control-group long">
        <div class="control-label">
          <label class="bold">配信期限</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">電源が切れているデバイスやインターネットに接続していない端末にプッシュ通知を再送する期限を設定できます。</span></span></a></div>

        <!-- 配信期限 -->
        <div class="controls">
          <select ng-model="deliveryExpiration" name="deliveryExpiration" class="ng-pristine ng-untouched >
            <option value="" selected="selected">指定なし</option>
            <option value="0">期間</option>
            <option value="1">日時</option>
          </select>

          <div>
            <div class="controls-block hide" ng-show="deliveryExpiration == '0'">
              <select class="time-select">
                <option value="?" selected="selected"></option>
                <option v-for="(item, index) in limitDate" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              <select class="time-select ng-pristine ng-untouched hide" ng-show="deliveryExpirationTimeType === 'hour'" ng-model="deliveryExpirationTime" ng-options="_v for _v in [] | range:0:23"><option value="?" selected="selected"></option>
                <option v-for="(item, index) in hours" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              <select ng-model="deliveryExpirationTimeType" class="span2 ng-pristine ng-untouched >
                <option value="" selected="selected">日</option>
                <option value="hour">時間</option>
              </select>

              <span class="controls-inline error-message hide" ng-show="pushForm.deliveryExpiration.$error.maxExpiration">配信期限は28日間までしか指定出来ません</span>
            </div>

            <div class="controls-block hide" ng-show="deliveryExpiration == '1'">

              <input class="input-date ng-pristine ng-untouched  ng-model="deliveryExpirationDate" name="deliveryExpirationDate" ng-init="setupDatePickers()" onchange="
                    angular.element(this).scope().deliveryExpirationDate = this.value;
                    angular.element(this).scope().$apply();
                  " placeholder="2016年03月03日" type="text">
              <button type="button" class="ui-datepicker-trigger"><span class="icon calendar black"></span></button>

              <select class="time-select ng-pristine ng-untouched  ng-model="deliveryExpirationHour"><option value="?" selected="selected"></option>
                <option v-for="(item, index) in hours" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              :
              <select class="time-select ng-pristine ng-untouched  ng-model="deliveryExpirationMinute"><option value="?" selected="selected"></option>
                <option v-for="(item, index) in minutes" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>

              <span class="controls-inline error-message hide" ng-show="pushForm.deliveryExpiration.$error.maxExpiration">配信期限は28日間までしか指定出来ません</span>

              <span class="controls-inline error-message hide" ng-show="pushForm.deliveryExpiration.$error.pastDate">未来の日付を設定してください。</span>
              <span class="controls-inline error-message hide" ng-show="pushForm.deliveryExpirationDate.$error.invalidFormat">日付を正しく入力してください。</span>
            </div>

          </div>
        </div>
      </div>

      <div class="control-group long">
        <!--<div class="control-label"><label class="bold">ターゲット</label></div>-->

        <!-- 配信期限 -->
        <div class="controls">

          <!-- androidに配信するかどうか -->
          <div class="controls-block">
            <label>
              <input ng-model="forAndroid" name="forAndroid" class="ng-pristine ng-untouched"  type="checkbox"> Android端末に配信する</label>
            <span class="controls-inline error-message hide" ng-show="pushForm.forAndroid.$dirty &amp;&amp; pushForm.forAndroid.$invalid">どちらかを有効にしてください。</span>
          </div>

          <!-- androidに配信する場合のオプション -->
          <div class="control-message box hide" ng-show="forAndroid">
            <div class="control-group long">
              <div class="control-label">
                <label class="bold">アクション</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">Android端末への配信を行う際の、受信処理を担うカスタムレシーバの指定が可能です</span></span></a></div>
              <div class="controls">
                <input name="action" placeholder="" class="size-m ng-pristine ng-untouched  ng-model="push.action" ng-pattern="/^(([a-zA-Z0-9_]+\.)*[a-zA-Z0-9_]+|)$/" type="text">
                <span class="controls-inline error-message hide" ng-show="pushForm.$dirty &amp;&amp; pushForm.action.$error.pattern">正しく入力してください。</span>
              </div>
            </div>

            <div class="control-group long">
              <div class="control-label">
                <label class="bold">ダイアログ</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">Android端末へ配信する際に、プッシュ通知のダイアログ表示を有効にします。</span></span></a></div>
              <div class="controls">
                <label>
                  <input name="dialog" ng-model="push.dialog" class="ng-pristine ng-untouched  type="checkbox">ダイアログ表示を有効にする</label>
              </div>
            </div>

          </div>

          <!-- iOSに配信するかどうか -->
          <div class="controls-block">
            <label>
              <input ng-model="forIos" name="forIos" class="ng-pristine ng-untouched" type="checkbox"> iOS端末に配信する</label>
            <span class="controls-inline error-message hide" ng-show="pushForm.forIos.$dirty &amp;&amp; pushForm.forIos.$invalid">どちらかを有効にしてください。</span>
          </div>

          <!-- iOSに配信する場合のオプション -->
          <div class="control-message box hide" ng-show="forIos">
            <div class="control-group long">
              <div class="control-label">
                <label class="bold">バッジ件数</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">iOS端末への配信を行う際の、バッジ件数の指定（固定値の指定もしくは値の増加）が可能です。</span></span></a></div>
              <div class="controls control-badge-settings">
                <label>
                  <input name="badgeType" ng-model="badgeType" class="ng-pristine ng-untouched  checked="checked" type="radio">指定しない</label>
                <label>
                  <input name="badgeType" type="radio">インクリメントする</label>
                <label>
                  <input name="badgeType" type="radio">数値を指定する</label>
                <!-- ngIf: badgeType === badgeTypes.input --><input placeholder="" name="badgeSetting" class="size-ss ng-pristine ng-untouched ng-scope  ng-pattern="/^\d+$/" ng-if="badgeType === badgeTypes.input" ng-model="push.badgeSetting" type="text"><!-- end ngIf: badgeType === badgeTypes.input -->
                <span class="controls-inline error-message hide" ng-show="pushForm.$dirty &amp;&amp; (pushForm.badgeSetting.$error.invalidState || pushForm.badgeSetting.$error.pattern)">バッジ件数には2147483647以下の数字を指定してください。</span>
                <br>
                <span class="controls-inline error-message hide" ng-show="pushForm.badgeType.$error.invalidState">content-availableとバッジ件数は片方だけ設定してください。</span>
              </div>
            </div>

            <div class="control-group long">
              <div class="control-label">
                <label class="bold">音声ファイル名</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">iOS端末への配信を行う際の、通知音設定が可能です。</span></span></a></div>
              <div class="controls">
                <input placeholder="" class="size-l ng-pristine ng-untouched  ng-model="push.sound" type="text">
                <div class="controls-block size-l align-r">省略可</div>
              </div>
            </div>

            <div class="control-group long">
              <div class="control-label">
                <label class="bold">カテゴリ</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">iOS端末への配信を行う際の、カテゴリ設定が可能です。</span></span></a></div>
              <div class="controls">
                <input placeholder="" class="size-l ng-pristine ng-untouched  ng-model="push.category" type="text">
                <div class="controls-block size-l align-r">省略可</div>
              </div>
            </div>

            <div class="control-group long">
              <div class="control-label">
                <label class="bold">content-available</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">iOS端末への配信を行う際の、News Standへの送信設定が可能です。</span></span></a></div>
              <div class="controls">
                <select>
                  <option value="有効にする">有効にする</option>
                  <option selected="selected" value="無効にする">無効にする</option>
                </select>
                <span class="controls-inline error-message hide" ng-show="pushForm.contentAvailable.$error.invalidState">content-availableとバッジ件数は片方だけ設定してください。</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="control-group long">
        <!-- パーミッション -->
        <div class="control-label">
          <label class="bold">パーミッション</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知に対してパーミッションを設定することで、プッシュ通知を編集できる権限を管理できます</span></span></a></div>
        <div class="controls">
          <div class="controls-block">
            <a class="clickable btn size-m" ng-click="onClickPermissionButton()">パーミッションを設定する</a>
          </div>
        </div>
      </div>

      <div class="control-group long">
        <!-- 配信端末の絞り込み -->
        <div class="control-label">
          <label class="bold">配信端末</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知の配信端末を選択することができます。installationクラスに格納されている端末から絞り込みも可能です。</span></span></a></div>
        <div class="controls">
          <select ng-model="searchConditionSelect" class="ng-pristine ng-untouched >
            <option value="" selected="selected">installationクラスのすべての端末</option>
            <option value="10">男性</option>
            <option value="20">女性</option>
            <option value="30">10代</option>
            <option value="40">20代</option>
            <option value="50">30代</option>
            <option value="60">40代</option>
            <option value="70">50代</option>
            <option value="80">60歳以上</option>
            <option value="90">女性：20歳以下</option>
            <option value="100">女性：20歳以上40歳未満</option>
            <option value="110">女性：40歳以上</option>
            <option value="120">男性：20歳以下</option>
            <option value="130">男性：20歳以上40歳未満</option>
            <option value="140">男性：40歳以上</option>
            <option value="1">installationクラスから絞込み</option>
          </select>
          &nbsp;
          <a class="clickable btn size-m" ng-click="onClickCreateSegment()">新しいセグメントを作成する</a>
        </div>

      </div>

      <!-- 絞り込み条件 -->
      <div class="control-group long hide" ng-show="searchConditionSelect == '1'">

        <div class="controls">
          <div class="control-message box-s">
            <div class="item">
              <select>
                <option value="0" selected="selected">applicationName</option>
                <option value="1">appVersion</option>
                <option value="2">badge</option>
                <option value="3">channels</option>
                <option value="4">deviceToken</option>
                <option value="5">sdkVersion</option>
                <option value="6">timeZone</option>
                <option value="7">acl</option>
                <option value="8">objectId</option>
                <option value="9">createDate</option>
                <option value="10">updateDate</option>
              </select>
              <span class="ng-scope">
                <span>が</span>
              <input size="15" class="ng-dirty" type="text">
              <select>
                <option value="string" selected="selected">文字列</option>
                <option value="array">配列</option>
                <option value="number">数値</option>
                <option value="date">日付</option>
                <option value="boolean">真偽値</option>
                <option value="geopoint">緯度経度</option>
                <option value="object">オブジェクト</option>
              </select>
              <select>
                <option value="0" selected="selected">と同じ</option>
                <option value="1">ではない</option>
                <option value="2">のいずれかと同じ</option>
                <option value="3">のいずれとも違う</option>
                <option value="4">のいずれかを含む</option>
                <option value="5">よりも大きい</option>
                <option value="6">以上</option>
                <option value="7">よりも小さい</option>
                <option value="8">以下</option>
              </select>
              </span>
              <a class="inline-btn"><span class="icon close"></span></a>
            </div>
          </div>
          <div class="control-message box-s">
            <div class="item">
              <select>
                <option value="0" selected="selected">applicationName</option>
                <option value="1">appVersion</option>
                <option value="2">badge</option>
                <option value="3">channels</option>
                <option value="4">deviceToken</option>
                <option value="5">sdkVersion</option>
                <option value="6">timeZone</option>
                <option value="7">acl</option>
                <option value="8">objectId</option>
                <option value="9">createDate</option>
                <option value="10">updateDate</option>
              </select>
              <span class="ng-scope">
                <span>が</span>
              <input size="15" class="ng-dirty" type="text">
              <select>
                <option value="string" selected="selected">文字列</option>
                <option value="array">配列</option>
                <option value="number">数値</option>
                <option value="date">日付</option>
                <option value="boolean">真偽値</option>
                <option value="geopoint">緯度経度</option>
                <option value="object">オブジェクト</option>
              </select>
              <select>
                <option value="0" selected="selected">と同じ</option>
                <option value="1">ではない</option>
                <option value="2">のいずれかと同じ</option>
                <option value="3">のいずれとも違う</option>
                <option value="4">のいずれかを含む</option>
                <option value="5">よりも大きい</option>
                <option value="6">以上</option>
                <option value="7">よりも小さい</option>
                <option value="8">以下</option>
              </select>
              </span>
              <a class="inline-btn"><span class="icon close"></span></a>
            </div>
          </div>
        </div>
      </div>

      <!-- 条件の追加 -->
      <div class="control-group long hide" ng-show="searchConditionSelect == '1'">
        <div class="controls">
          <div class="controls-block"><a ng-click="narrowing.addCondition()" class="btn size-m"><span class="icon add-refined black left"></span>条件の追加</a></div>
        </div>
      </div>

      <!-- 条件の追加 -->
      <div class="control-group long hide" ng-show="userSearchConditionSelect == '1'" style="display:none;">
        <div class="controls">
          <div class="controls-block"><a ng-click="userNarrowing.addCondition()" ng-show="userNarrowing.canAddNewCondition()" class="btn size-m hide"><span class="icon add-refined black left"></span>条件の追加</a></div>
        </div>
      </div>
      <!-- #### -->

      <!-- push通知が届く端末の数 -->
      <div class="control-group long">
        <div class="controls">
          <div class="control-message green" ng-show="true">
            <p ng-show="loadingDeliveryCount" style="display:none;" class="hide">
              <span class="icon loading"></span>
              <span>配信予定端末数</span>
            </p>
            <div hide="loadingDeliveryCount" class="">
              <p hide="deliveryCount" class="hide"><span>送信される端末がありません</span></p>
              <p ng-show="deliveryCount" class=""><span class="icon device-notice colored left"></span>
                <span class="fontL">9,532</span> 端末に向けて送信されます
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="module02">
        <div class="module-content">
          <div class="control-group long">
            <div class="controls">
              <div class="controls-block">
                <div ng-show="true" ng-click="onClickTestButton();" class="btn green size-m">テスト配信</div>
                <div ng-show="true" ng-click="onClickSaveButton();" class="btn green size-m">下書き保存</div>
                <div ng-show="true" ng-click="onClickPushButton();" class="btn green size-m">プッシュ通知を作成する</div>
                <span style="margin-left:10px">配信パターン数：<span class="fontL" style="font-size: 1.44em;font-weight: bold;">1</span>
                <span class="controls-inline error-message hide" ng-show="tried &amp;&amp; pushForm.$invalid">入力内容を確認してください</span>
              </span></div>
            </div>
          </div>
        </div>
      </div>
      <br><br>社内問い合わせ先：supportpush@syanai.co.jp</div>
    </form>
    </div>
  </div>
  <push-modal />
</div>
</template>

<script>
module.exports = {
  data: () => {
    const data = {
      hours: [...Array(24)].map((_, i) => i),
      minutes: [...Array(60)].map((_, i) => i),
      limitDate: [...Array(29)].map((_, i) => i),
      messages: [{
        title: "プッシュ通知のタイトルです",
        value: "アプリをインストールしている端末に入力されたメッセージでプッシュ通知を送信します。",
        errors: {},
      }],
      jsons: [
        {key: "Key5", type: "boolean", value: true}
      ],
      preview_index: 0,
      detail_view: false,
      html: {
        json_types: [
          {key: "string", value: "文字列"},
          {key: "number", value: "数値"},
          {key: "boolean", value: "真偽値"}
        ]
      }
    };
    
    data.preview_message = data.messages[data.preview_index];
    
    return data;
  },
  props: ['ncmb'],
  components: {
    'vue-preview': require('./push_preview.vue'),
    'push-modal': require('./push_modal.vue')
  },
  methods: {
    // メッセージを追加するアクション
    addMessage: function(event) {
      this.messages.push({
        title: "",
        value: "",
        errors: {}
      });
    },
    closeMessage: function(index) {
      this.messages.splice(index, 1);
    },
    showDetail: function() {
      this.detail_view = !this.detail_view;
    },
    deleteJson: function(index) {
    
    }
  },
  watch: {
    preview_index: function(event) {
      this.preview_message = this.messages[this.preview_index];
    }
  }
}
</script>