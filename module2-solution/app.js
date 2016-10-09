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


ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];


function ToBuyController(ShoppingListCheckOffService) {
	var self=this;
	this.getItems = function () {
		return ShoppingListCheckOffService.getToBuyItems();
	}
	
	this.boughtItem = function (itemIndex) {
		return ShoppingListCheckOffService.boughtItem(itemIndex);
	}
	
	this.isEmpty = function () {
		return !self.getItems().length;
	}

};

function AlreadyBoughtController(ShoppingListCheckOffService) {
	var self=this;
	this.getItems= function () {
		return ShoppingListCheckOffService.getAlreadyBoughtItems();
	}

	this.isEmpty = function () {
		return !self.getItems().length;
	}	
};

})();

