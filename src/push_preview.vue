<template>
  <div class="control-group long previewblock">
    <center>
      <label>
        <input value="ios" name="previewtype" style="" checked="checked" type="radio" v-model="preview"><br>
        <img src="assets/icon_ios.gif" width="100px" height="auto">
      </label>
      &nbsp;
      <label>
        <input value="android" name="previewtype" style="" type="radio" v-model="preview"><br>
        <img src="assets/icon_android.gif" width="100px" height="auto">
      </label>
    </center>
    <div class="previewbox ios" v-if="preview == 'ios'">
      <div class="message">{{message.value}}</div>
    </div>
    <div class="previewbox android" v-else>
      <div class="title">{{message.title}}</div>
      <div class="message">{{message.value}}</div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['message'],
  data: function() {
    return {
      preview: 'ios'
    };
  }
}
</script>