(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  	service.getAllCategories= function () {
		return $http({
	  		method: 'GET',
	  		url: 'https://davids-restaurant.herokuapp.com/categories.json'
			})
			.then (function (result) {
					//console.log(result.data.length);
					return(result.data);
			});
	};
        service.getItemsForCategory= function (categoryShortName) {
		return $http({
	  		method: 'GET',
	  		url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category='+categoryShortName
			})
			.then (function (result) {
					//console.log(result.data);
					return(result.data);
			});
	};
}

})();
