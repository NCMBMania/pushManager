<template>
  <div class="navigation reset">
    <ul>
      <li ng-show="true" class="">
        <router-link to="/list" active-class="stay">
          <span class="icon gnavi-datastore"></span>
          <span class="text">プッシュ一覧</span>
        </router-link>
      </li>
      <li ng-show="true" class="">
      <router-link to="./new" active-class="stay">
        <span class="icon gnavi-pushinfo"></span>
        <span class="text">プッシュ作成</span>
      </router-link>
      </li>
      <li class="app-settings" ng-show="true">
        <router-link to="./config" active-class="stay">
          <span class="icon gnavi-appset"></span>
          <span class="text">アプリ設定</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>