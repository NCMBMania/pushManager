<template>
  <div class="header-menu">
    <div class="header-menu-item header-menu-app hide" ng-show="false">
      <a href="#/applications/new"><span>+新しいアプリ</span></a>
    </div>
    <div class="header-menu-item header-menu-doc" ng-show="false">
      <a href="" target="_blank"><span>ドキュメント</span></a>
    </div>
    <div class="header-menu-item header-menu-community" ng-show="false">
      <a href="" target="_blank"><span>コミュニティ</span></a>
    </div>
    <div class="header-menu-item header-menu-user" ng-show="nav.isLogin()">
      <div class="header-menu-item-inner">
        <a href="#" id="accout-menu" ng-click="nav.appSelect()">
        </a>
        <ul id="accout-menu-list" ng-show="nav.visibleMenu" class="hide">
          <li><a href="javascript:void(0);" ng-click="nav.logout()"><span class="icon header-logout"></span><span class="text">ログアウト</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
