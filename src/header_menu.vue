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
    <div class="header-menu-item header-menu-user">
      <div class="header-menu-item-inner">
      
        <a href="#" id="accout-menu" @click="openMenu">
          <span class="icon header-user"></span>
          <span class="text" v-if="user">{{user.userName}}&nbsp;</span>
          <span class="text" v-if="!user">未ログイン&nbsp;</span>
          <span class="icon arrow arrow-down white"></span>
        </a>
        
        <ul id="accout-menu-list" v-if="menu">
          <li v-if="user">
            <a href="javascript:void(0);" @click="logout">
              <span class="icon header-logout"></span>
              <span class="text">ログアウト</span>
            </a>
          </li>
          <li v-if="!user">
            <a href="javascript:void(0);" @click="openLogin">
              <span class="icon header-logout"></span>
              <span class="text">ログイン</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['ncmb'],
    data: function() {
      let data = {
        menu: false
      };
      data.user = this.ncmb.User.getCurrentUser();
      return data;
    },
    methods: {
      openMenu: function() {
        console.log(this.menu)
        this.menu = !this.menu;
      },
      logout: function() {
        this.$emit('logout');
      },
      openLogin: function() {
        this.$emit('showModal', "signinForm");
      }
    }
  };
</script>