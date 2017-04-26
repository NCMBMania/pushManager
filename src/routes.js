let mainContent = require('./main_content.vue');
let configForm = require('./config_form.vue');
let pushForm   = require('./push_form.vue');

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
  }
];

module.exports = routes;
