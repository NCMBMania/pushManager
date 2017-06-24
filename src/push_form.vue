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
      <ol class="breadcrumb">
        <li class="breadcrumb-item" v-for="manager in managers">
          <span class="breadcrumb-item active">{{manager.userName}}</span>
        </li>
      </ol>      
    </div>
    <form class="form-horizontal pushform" name="pushForm" novalidate="">
      <div class="auto-resize" style="margin-top:23px;">
        <!-- プレビュー -->
        <vue-preview :message="preview_message" />
        <div v-for="(m_message, index) in message.messages">
          <!-- タイトル -->
          <div class="control-group long">
            <div class="control-label">
              <label class="bold">タイトル</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知で表示するタイトルを記述します。(Android：システムトレイに表示する件名、iOS：Apple Watchに表示する文字列)</span></span></a></div>
            <div class="controls">
              <input class="size-l" v-model="m_message.title" type="text">
              <span class="controls-inline error-message" v-if="m_message.errors.title">タイトルが入力されてません。</span>
            </div>
          </div>

            <!-- メッセージ -->
            <div class="control-group long">
              <div class="control-label">
                <label class="bold">メッセージ</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知で表示する内容を記述します。</span></span></a>
              </div>

                <div class="controls">
                  <div>
                    <textarea v-model="m_message.value" rows="6" class="size-l"></textarea>
                    <a class="inline-btn" v-if="message.messages.length > 1" @click="closeMessage(index)">
                      <span class="icon close"></span>
                    </a>
                  </div>

                  <div class="controls-block size-l align-r">
                    <label style="margin-right:15px;" v-if="message.messages.length > 1">
                      <input v-model="message.preview_index" v-bind:value="index" type="radio">プレビュー</label>
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
              <!--
              <div class="controls">
                <div class="controls-block">
                  <a class="clickable btn size-m" @click="addMessage">メッセージを追加する</a>
              </div>
            </div>
          -->

      <!-- 詳細情報 -->
      <div class="control-group long detail">
        <div class="control-label" style="width:100%; cursor:pointer;" @click="showDetail">
          <label class="bold">
            
            <span v-if="message.detail_view">▼</span><span v-else>▶</span>&nbsp;詳細情報</label>
        </div>
        
        <div class="slide" v-if="message.detail_view">
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
            <div class="control-message box-s json clearfix" style="display:block;" v-for="(json, index) in message.jsons">
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
                    <input v-model="json.value" value="true" type="radio">True
                  </label>
                  &nbsp;
                  <label>
                    <input v-model="json.value" value="false" type="radio">False
                  </label>
                </span>
              </div>
            </div>
            
            <div class="controls-block">
              <a class="clickable btn size-m" @click="addJson">JSONデータを追加する</a>
            </div>
          </div>
        </div>

      </div>

      <!-- 配信日時 -->
      <div class="control-group long">
        <div class="control-label">
          <label class="bold">配信日時</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知を配信する時間を指定できます。</span></span></a>
        </div>

        <div class="controls" v-for="(deliveryTime, index) in message.deliveryTimes">
          <div class="control-message box-s">
            <select v-model="deliveryTime.immediateDelivery">
              <option value="">今すぐ配信</option>
              <option value="1">日時</option>
            </select>
            
            <a class="inline-btn hide" ng-click="onClickDeleteDeliveryTime(deliveryTime)"><span class="icon close"></span></a>

            <div class="controls-block" v-if="deliveryTime.immediateDelivery == '1'">
              <input class="input-date" v-model="deliveryTime.deliveryDate" style="background-color: #f5f4e7;" type="text" @change="checkDate(deliveryTime, index)">
              <!-- <button type="button" class="ui-datepicker-trigger"><span class="icon calendar black"></span></button> -->

              <select class="time-select" v-model="deliveryTime.deliveryHour" @change="checkDate(deliveryTime, index)">
                <option value="?" selected="selected"></option>
                <option v-for="(item, index) in html.hours" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              :
              <select class="time-select" v-model="deliveryTime.deliveryMinute" @change="checkDate(deliveryTime, index)">
                <option value="?" selected="selected"></option>
                <option v-for="(item, index) in html.minutes" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              <span class="controls-inline error-message" v-if="deliveryTime.error">{{deliveryTime.error}}</span>
              <!-- 未来の日付を設定してください。, 日付を正しく入力してください。-->
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="controls-block">
            <a class="clickable btn size-m" @click="addDeliveryTime">配信日時を追加する</a>
          </div>
        </div>

      </div>


      <div class="control-group long">
        <div class="control-label">
          <label class="bold">配信期限</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">電源が切れているデバイスやインターネットに接続していない端末にプッシュ通知を再送する期限を設定できます。</span></span></a></div>

        <!-- 配信期限 -->
        <div class="controls">
          <select v-model="message.deliveryExpiration">
            <option value="" selected="selected">指定なし</option>
            <option value="0">期間</option>
            <option value="1">日時</option>
          </select>

          <div>
            <div class="controls-block" v-if="message.deliveryExpiration == '0'">
              <select class="time-select" v-model="message.deliveryExpirationDate" v-if="deliveryExpirationTimeType !== 'hour'">
                <option value="?" selected="selected"></option>
                <option v-for="(item, index) in html.limitDate" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              <select class="time-select" v-if="message.deliveryExpirationTimeType === 'hour'" v-model="message.deliveryExpirationTime">
                <option value="?" selected="selected"></option>
                <option v-for="(item, index) in html.hours" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              <select v-model="message.deliveryExpirationTimeType" class="span2">
                <option value="" selected="selected">日</option>
                <option value="hour">時間</option>
              </select>

              <span class="controls-inline error-message hide">配信期限は28日間までしか指定出来ません</span>
            </div>

            <div class="controls-block" v-if="message.deliveryExpiration == '1'">

              <input class="input-date" v-model="message.deliveryExpirationDate" type="text">
              <!-- <button type="button" class="ui-datepicker-trigger"><span class="icon calendar black"></span></button> -->
              <select class="time-select" v-model="message.deliveryExpirationHour">
                <option value="?"></option>
                <option v-for="(item, index) in html.hours" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>
              :
              <select class="time-select" v-model="message.deliveryExpirationMinute">
                <option value="?"></option>
                <option v-for="(item, index) in html.minutes" v-bind:value="'number:' + item">
                  {{item}}
                </option>
              </select>

              <span class="controls-inline error-message">配信期限は28日間までしか指定出来ません</span>

              <span class="controls-inline error-message hide">未来の日付を設定してください。</span>
              <span class="controls-inline error-message hide">日付を正しく入力してください。</span>
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
              <input v-model="message.forAndroid" @click="updateTarget" type="checkbox"> Android端末に配信する</label>
            <span class="controls-inline error-message hide">どちらかを有効にしてください。</span>
          </div>

          <!-- androidに配信する場合のオプション -->
          <div class="control-message box" v-if="message.forAndroid">
            <div class="control-group long">
              <div class="control-label">
                <label class="bold">アクション</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">Android端末への配信を行う際の、受信処理を担うカスタムレシーバの指定が可能です</span></span></a></div>
              <div class="controls">
                <input v-model="action" class="size-m" type="text">
                <span class="controls-inline error-message hide" ng-show="pushForm.$dirty &amp;&amp; pushForm.action.$error.pattern">正しく入力してください。</span>
              </div>
            </div>

            <div class="control-group long">
              <div class="control-label">
                <label class="bold">ダイアログ</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">Android端末へ配信する際に、プッシュ通知のダイアログ表示を有効にします。</span></span></a></div>
              <div class="controls">
                <label>
                  <input type="checkbox">ダイアログ表示を有効にする</label>
              </div>
            </div>

          </div>

          <!-- iOSに配信するかどうか -->
          <div class="controls-block">
            <label>
              <input v-model="message.forIos" type="checkbox"> iOS端末に配信する</label>
            <span class="controls-inline error-message hide">どちらかを有効にしてください。</span>
          </div>

          <!-- iOSに配信する場合のオプション -->
          <div class="control-message box" v-if="message.forIos">
            <div class="control-group long">
              <div class="control-label">
                <label class="bold">バッジ件数</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">iOS端末への配信を行う際の、バッジ件数の指定（固定値の指定もしくは値の増加）が可能です。</span></span></a></div>
              <div class="controls control-badge-settings">
                <label>
                  <input v-model="badgeType" type="radio">指定しない</label>
                <label>
                  <input v-model="badgeType" type="radio">インクリメントする</label>
                <label>
                  <input v-model="badgeType" type="radio">数値を指定する</label>
                <input name="badgeSetting" class="size-ss" v-if="badgeType === message.badgeTypes.input" v-model="message.badgeSetting" type="text">
                <span class="controls-inline error-message hide">バッジ件数には2147483647以下の数字を指定してください。</span>
                <br>
                <span class="controls-inline error-message hide" ng-show="pushForm.badgeType.$error.invalidState">content-availableとバッジ件数は片方だけ設定してください。</span>
              </div>
            </div>

            <div class="control-group long">
              <div class="control-label">
                <label class="bold">音声ファイル名</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">iOS端末への配信を行う際の、通知音設定が可能です。</span></span></a></div>
              <div class="controls">
                <input placeholder="" class="size-l ng-pristine ng-untouched" v-model="message.sound" type="text">
                <div class="controls-block size-l align-r">省略可</div>
              </div>
            </div>

            <div class="control-group long">
              <div class="control-label">
                <label class="bold">カテゴリ</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">iOS端末への配信を行う際の、カテゴリ設定が可能です。</span></span></a></div>
              <div class="controls">
                <input placeholder="" class="size-l"  v-model="message.category" type="text">
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
            <a class="clickable btn size-m" @click="showModal('modalPermission')">パーミッションを設定する</a>
          </div>
        </div>
      </div>

      <div class="control-group long">
        <!-- 配信端末の絞り込み -->
        <div class="control-label">
          <label class="bold">配信端末</label><a class="inline-btn" href="javascript:void(0);"><span class="icon question right"><span class="balloon-arrow-bottom-s white">プッシュ通知の配信端末を選択することができます。installationクラスに格納されている端末から絞り込みも可能です。</span></span></a></div>
        <div class="controls">
          <select v-model="message.segmentationSelected" @change="countTarget">
            <option value="0">installationクラスのすべての端末</option>
            <option v-for="segmentation in segmentations" v-bind:value="segmentation.objectId">
              {{segmentation.name}}
            </option>
            <option value="1">installationクラスから絞り込み</option>
          </select>
          &nbsp;
          <a class="clickable btn size-m" @click="showModal('modalSegmentation')">新しいセグメントを作成する</a>
        </div>

      </div>

      <!-- 絞り込み条件 -->
      <div class="control-group long" v-if="message.segmentationSelected == '1'">
        
        <div class="controls" v-for="(searchCondition, index) in message.searchConditions">
          <div class="control-message box-s">
            <div class="item">
              <select v-model="searchCondition.target">
                <option v-for="column in columns">{{column}}</option>
              </select>
              <span>
                <span>が</span>
              <input size="15" v-model="searchCondition.targetValue" type="text" @keyup="countTarget">
              <select v-model="searchCondition.type" @change="countTarget">
                <option value="string">文字列</option>
                <option value="array">配列</option>
                <option value="number">数値</option>
                <option value="date">日付</option>
                <option value="boolean">真偽値</option>
                <option value="geopoint">緯度経度</option>
                <option value="object">オブジェクト</option>
              </select>
              <select v-model="searchCondition.decision" @change="countTarget">
                <option value="equalTo">と同じ</option>
                <option value="notEqualTo">ではない</option>
                <option value="in">のいずれかと同じ</option>
                <option value="notIn">のいずれとも違う</option>
                <option value="inArray">のいずれかを含む</option>
                <option value="greaterThan">よりも大きい</option>
                <option value="greaterThanOrEqualTo">以上</option>
                <option value="lessThan">よりも小さい</option>
                <option value="lessThanOrEqualTo">以下</option>
              </select>
              </span>
              <a class="inline-btn" @click="removeCondition(index)"><span class="icon close"></span></a>
            </div>
          </div>
        </div>
      </div>

      <!-- 条件の追加 -->
      <div class="control-group long" v-if="message.segmentationSelected == '1'">
        <div class="controls">
          <div class="controls-block">
            <a @click="addCondition" class="btn size-m"><span class="icon add-refined black left"></span>条件の追加</a>
          </div>
        </div>
      </div>

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
                <span class="fontL">{{installation_count}}</span> 端末に向けて送信されます
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
                <div ng-show="true" @click="saveDraft" class="btn green size-m">下書き保存</div>
                <div ng-show="true" @click="confirm" class="btn green size-m">プッシュ通知を作成する</div>
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
const strftime = require('strftime');
const Vue = require('vue');
module.exports = {
  data: () => {
    let data = {
      managers: [],
      message: {
        messages: [{
          title: "プッシュ通知のタイトルです",
          value: "アプリをインストールしている端末に入力されたメッセージでプッシュ通知を送信します。",
          badgeSetting: null,
          errors: {}
        }],
        objectId: null,
        deliveryExpirationDate: strftime('%Y年%m月%d日', new Date),
        deliveryExpirationTime: "?",
        jsons: [
          {key: "Key", type: "boolean", value: true}
        ],
        deliveryTimes: [
          {immediateDelivery: "", deliveryDate: strftime('%Y年%m月%d日', new Date)}
        ],
        draft: true,
        deliveryExpiration: "",
        deliveryExpirationTimeType: "",
        deliveryExpirationHour: "?",
        deliveryExpirationMinute: "?",
        segmentationSelected: "",
        searchConditions: [],
        preview_index: 0,
        detail_view: false,
        forAndroid: false,
        forIos: false,
        targets: [],
        badgeTypes: {},
      },
      
      html: {
        hours: [...Array(24)].map((_, i) => i),
        minutes: [...Array(60)].map((_, i) => i),
        limitDate: [...Array(29)].map((_, i) => i),
        json_types: [
          {key: "string", value: "文字列"},
          {key: "number", value: "数値"},
          {key: "boolean", value: "真偽値"}
        ]
      },
      installation_count: 0
    };
    data.preview_message = data.message.messages[data.message.preview_index];
    return data;
  },
  props: ['ncmb', 'permissions', 'segmentations', 'columns'],
  components: {
    'vue-preview': require('./push_preview.vue'),
    'push-modal': require('./push_modal.vue')
  },
  
  created: function() {
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
  methods: {
    // メッセージを追加するアクション
    addMessage: function(event) {
      this.message.messages.push({
        title: "",
        value: "",
        errors: {}
      });
    },
    closeMessage: function(index) {
      this.message.messages.splice(index, 1);
    },
    addJson: function() {
      this.message.jsons.push({key: "Key", type: "string", value: ""});
    },
    showDetail: function() {
      this.message.detail_view = !this.message.detail_view;
    },
    showModal: function(name) {
      this.$emit("showModal", name);
    },
    deleteJson: function(index) {
      this.message.jsons = this.message.jsons.filter(function (item, i) {
        if (i != index) return item;
      })
    },
    checkDate: function(date, index) {
      date.error = "";
      let match = date.deliveryDate.match(/([0-9]{4})年([0-9]{1,2})月([0-9]{1,2})日/);
      let hour  = date.deliveryHour ? date.deliveryHour.replace("number:", "") : 0;
      let minute = date.deliveryMinute ? date.deliveryMinute.replace("number:", "") : 0;
      if (match) {
        var parseDate = new Date(match[1], (parseInt(match[2]) - 1), match[3], hour, minute);
        if (parseDate.toString() == 'Invalid Date') {
          date.error = "日付の形式が不正です";
        }
        if (parseDate < new Date) {
          date.error = "未来の日付を指定してください";
        }
      }else{
        date.error = "日付の形式が不正です";
      }
      Vue.set(this.message.deliveryTimes, index, date); 
    },
    addDeliveryTime: function() {
      this.message.deliveryTimes.push({immediateDelivery: "", deliveryDate: strftime('%Y年%m月%d日', new Date)});
    },
    addCondition: function() {
      this.message.searchConditions.push({target: "", targetValue: "", decision: ""});
    },
    removeCondition: function(index) {
      this.message.searchConditions = this.message.searchConditions.filter(function(searchCondition, i) {
        if (i != index)
          return searchCondition;
      });
    },
    confirm: function() {
      this.$emit('showModal', 'modalConfirm', this.message);
    },
    saveDraft: function() {
      let prePush = new (this.ncmb.DataStore('prePush'));
      let me = this;
      for (let key in this.message) {
        if (key === 'objectId' && !this.message.objectId) {
          continue;
        }
        prePush.set(key, this.message[key]);
      }
      let method = me.message.objectId ? 'update' : 'save';
      console.log('method', method);
      prePush[method]()
        .then(function(obj) {
          me.message.objectId = obj.objectId;
          me.$emit('successMessage', "保存しました");
        })
    },
    updateTarget: function() {
      this.message.targets = [];
      if (this.message.forAndroid)
        this.message.targets.push('android');
      if (this.message.forIos)
        this.message.targets.push('ios');
      this.countTarget();
    },
    countTarget: function() {
      if (this.message.targets.length === 0) {
        return true;
      }
      switch (this.message.segmentationSelected) {
      case '1':
        this.countTargetByConditions(this.message.searchConditions);
        break;
      case '0':
        this.searchInstallation();
        break;
      default:
        let segmentation = this.segmentations.filter((segmentation) => {
          if (segmentation.objectId === this.message.segmentationSelected)
            return segmentation;
        })[0];
        if (!segmentation)
          return;
        this.countTargetByConditions(segmentation.segmentations);
      }
    },
    countTargetByConditions: function(searchConditions) {
      let installation = this.ncmb.Installation;
      for (let i = 0; i < searchConditions.length; i++) {
        let searchCondition = searchConditions[i];
        if (typeof searchCondition.decision === 'undefined' || 
          typeof searchCondition.target === 'undefined' ||
          typeof searchCondition.targetValue === 'undefined') {
          continue;
        }
        
        switch (searchCondition.type) {
        case "number":
          searchCondition.targetValue = parseInt(searchCondition.targetValue);
          break;
        }
        installation = installation[searchCondition.decision](searchCondition.target, searchCondition.targetValue);
      }
      this.searchInstallation(installation);
    },
    searchInstallation: function(installation) {
      if (!installation)
        installation = this.ncmb.Installation;
      installation
        .in('deviceType', this.message.targets)
        .count()
        .fetchAll()
        .then((result) => {
          console.log(result)
          this.installation_count = result.count;
        })
    }
  },
  watch: {
    message: {
      preview_index: function(event) {
        this.preview_message = this.message.messages[this.preview_index];
      }
    }
  }
}
</script>