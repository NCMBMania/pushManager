<template>
  <div>
    <dd class="text-normal">
      <div class="control-message box-s" v-for="(segmentation, index) in segmentations" style="">
        <div class="item clearfix">
          <div class="segment-button">
            <a class="inline-btn" @click="remove(index);"><span class="icon close"></span></a>
          </div>
          <div class="segment-target">
            <select v-model="segmentation.target">
              <option v-for="column in columns">{{column}}</option>
            </select>
            <span>が</span>
          </div>
          <div class="segment-type">
            <input type="text" size="15" v-model="segmentation.targetValue">
            <select v-model="segmentation.type">
              <option value="string">文字列</option>
              <option value="array">配列</option>
              <option value="number">数値</option>
              <option value="date">日付</option>
              <option value="boolean">真偽値</option>
              <option value="geopoint">緯度経度</option>
              <option value="object">オブジェクト</option>
            </select>
            <select v-model="segmentation.decision">
              <option value="" selected="selected">と同じ</option>
              <option value="$ne">ではない</option>
              <option value="$in">のいずれかと同じ</option>
              <option value="$nin">のいずれとも違う</option>
              <option value="$inArray">のいずれかを含む</option>
              <option value="$gt">よりも大きい</option>
              <option value="$gte">以上</option>
              <option value="$lt">よりも小さい</option>
              <option value="$lte">以下</option>
            </select>
          </div>
        </div>
      </div>
    </dd>
    <dd class="text-normal">
      <div class="controls-block"><a @click="add" class="btn size-m"><span class="icon add-refined black left"></span>条件の追加</a></div>
    </dd>
  </div>
</template>

<script>
module.exports = {
  props: ['ncmb', 'segmentations', 'columns'],
  data: function() {
    let data = {
    };
    return data;
  },
  created: function() {
  },
  methods: {
    add: function(e) {
      this.segmentations.push({target: "", targetValue: "", decision: ""});
    },
    remove: function(index) {
      this.segmentations = this.segmentations.filter(function(segmentation, i) {
        if (i != index)
          return segmentation
      });
    },
  }
}
</script>