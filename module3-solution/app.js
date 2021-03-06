(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
};


MenuSearchService.$inject = ['$http'];

function MenuSearchService($http) {
  var service = this;

	service.getMatchedMenuItems= function (searchTerm) {
		return $http({
	  		method: 'GET',
	  		url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			})
			.then (function (result) {
					//console.log(result.data);
					return(result.data.menu_items.filter(
						function (item) {
							return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1;
						}					
					));
			});
	};
}


NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService) {
	var self=this;
	self.found=null;
	self.doSearch= function (searchTerm) {
		if(searchTerm)
			MenuSearchService.getMatchedMenuItems(searchTerm)
				.then(function (items) {
				self.found=items;
				//console.log("items", items);
			});
		else
			self.found=[];
	};
	
	self.removeItem = function (itemIndex) {  
	 //console.log("removeItem");	 
    self.found.splice(itemIndex, 1);
  	};
};


})();

