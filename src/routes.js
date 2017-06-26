let mainContent = require('./main_content.vue');
let configForm  = require('./config_form.vue');
let pushForm    = require('./push_form.vue');
let listPageMain = require('./list_page_main.vue');
let listPage     = require('./list_page.vue');

let path = document.location.pathname;

const routes = [
  {
    path: path, component: mainContent,
    children: [
      {
        path: '', 
        component: configForm
      }
    ]
  },
  {
    path: `${path}config`, component: mainContent,
    children: [
      {
        path: '', 
        component: configForm
      }
    ]
  },
  {
    path: `${path}new`, component: mainContent,
    children: [
      {
        path: '', 
        component: pushForm
      }
    ]
  },
  {
    path: `${path}list`, component: mainContent,
    children: [
      {
        path: '', 
        component: listPageMain
      },
      {
        path: `${path}list/history`,
        component: listPage,
        meta: {
          type: 'history'
        }
      },
      {
        path: `${path}list/auth`,
        component: listPage,
        meta: {
          type: 'auth'
        }
      },
      {
        path: `${path}list/draft`,
        component: listPage,
        meta: {
          type: 'draft'
        }
      }
    ]
  }
];

module.exports = routes;
