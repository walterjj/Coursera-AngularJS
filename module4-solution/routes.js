(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'categories.template.html',
    component: 'categories',
    resolve: {
      categoriesData: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items 
  .state('items', {
    url: '/items/:category',
    templateUrl: 'items.template.html',
    component: 'items',
    params: {
      category: null
    },
    resolve: {
      items: ['MenuDataService','$stateParams',function (MenuDataService,$stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.category);
      }]
    }
  });

}

})();
