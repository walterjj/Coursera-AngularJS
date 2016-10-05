(function () {
'use strict';

angular.module('lunchCheckerApp', [])
.controller('LunchCheckController', LunchCheckController);


LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {

  $scope.checkLunch = function (lunch) {

    try {
        var items=$scope.lunch.trim().split(',');
        var count=0;
	var i;
        for (i in items) 
    	  if(items[i]) count++;
        $scope.count=count;
        if(count==0)
    	    return "Please enter data first";
        else if (count>3) 
    	    return "Too much!";
        else
    	    return  "Enjoy!";
    }
    catch (e) {
	    console.log(e);
	    return "Please enter data first";
    }

  };
};

})();

