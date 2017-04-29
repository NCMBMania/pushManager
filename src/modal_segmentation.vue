<template>
  <div modal-render="true" tabindex="-1" role="dialog" class="modal fade ng-isolate-scope modal-position in" uib-modal-animation-class="fade" modal-in-class="in" ng-style="{'z-index': 1050 + index*10, display: 'block'}" uib-modal-window="modal-window" window-class="modal-position" size="lg" index="0" animate="animate" modal-animation="true" style="z-index: 1050; display: block;">
      <div class="modal-dialog modal-lg"><div class="modal-content" uib-modal-transclude=""><div class="reset segment ng-scope">
    <dl class="modal-content">

      <dt class="title">
        <span>新しいセグメントを作成</span>
      </dt>

      <dd class="text-normal">
        <div>
          <input type="text" v-model="name" class="name">
        </div>
      </dd>
      <segmentation-config :segmentations="segmentations" :ncmb="ncmb" :columns="columns" />

      <dd class="area-button">
        <button type="button" class="btn gray" @click="cancel">キャンセル</button>
        <button class="btn green" @click="save">保存</button>
      </dd>
    </dl>

    <a title="Close" class="fancybox-item fancybox-close" href="javascript:;" style="position:absolute;" @click="cancel"></a>
  </div>
  </div></div>
  </div>
</template>

<script>
module.exports = {
  props: ['ncmb', 'columns'],
  components: {
    'segmentation-config': require('./segmentation-config.vue')
  },
  data: function() {
    let data = {
      segmentations: []
    };
    data.Segmentation = this.ncmb.DataStore('Segmentation');
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
    save: function(e) {
      let me = this;
      let segmentation = new this.Segmentation;
      segmentation
        .set('name', this.name)
        .set('segmentations', this.segmentations)
        .save()
        .then(function(results) {
          me.$emit('saveSegmentation', results);
          me.cancel();
        })
    }
  }
}
</script>

