<template>
  <div>
    <span class="icon loading hide" ng-show="globals.loading"></span>
    <span class="" v-if="success">
      <span class="icon success size-s"></span>
      <span class="text">{{success}}</span>
    </span>
    <span class="" v-if="error">
      <span class="icon attention size-s"></span>
      <span class="text">{{error}}</span>
    </span>
  </div>
</template>

<script>
module.exports = {
  props: ['error', 'success']
};
</script>