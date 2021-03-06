(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


function ShoppingListCheckOffService() {
  var service = this;

  // Lists of to buy and boughtitems
  var toBuyItems = [
  		{ name: "cookies", quantity: 5 },
  		{ name: "coffee", quantity: 2 },
  		{ name: "ice cream", quantity: 1 }  
  ];
  
  var alreadyBoughtItems = [];

	//add an item to buy
  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    toBuyItems.push(item);
  };


  // remove an item from the "to buy" list
  // and add it to  the "already bought" list

  service.boughtItem = function (itemIndex) {  	 
  	 alreadyBoughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
    
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };
  
  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };
}


ToBuyController.$inject = ['ShoppingListCheckOffService','$scope'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','$scope'];


function ToBuyController(ShoppingListCheckOffService,$scope) {
	//var self=this;
	$scope.getItems = function () {
		return ShoppingListCheckOffService.getToBuyItems();
	}
	
	$scope.boughtItem = function (itemIndex) {
		return ShoppingListCheckOffService.boughtItem(itemIndex);
	}
	
	$scope.isEmpty = function () {
		return !$scope.getItems().length;
	}

};

function AlreadyBoughtController(ShoppingListCheckOffService,$scope) {
	//var self=this;
	$scope.getItems= function () {
		return ShoppingListCheckOffService.getAlreadyBoughtItems();
	}

	$scope.isEmpty = function () {
		return !$scope.getItems().length;
	}	
};

})();

