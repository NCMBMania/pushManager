let mainContent = require('./main_content.vue');
let configForm = require('./config_form.vue');
let pushForm   = require('./push_form.vue');

const routes = [
  {
    path: '/', component: mainContent,
    children: [
      {
        path: '', 
        component: configForm
      }
    ]
  },
  {
    path: '/config', component: mainContent,
    children: [
      {
        path: '', 
        component: configForm
      }
    ]
  },
  {
    path: '/new', component: mainContent,
    children: [
      {
        path: '', 
        component: pushForm
      }
    ]
  }
];

module.exports = routes;
