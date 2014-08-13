'use strict';

Parse.initialize("rEDF9yvJdK0h4t3MW0h38cBJcAjVSWNnGDnOAvVM", "dWjkrIX5DH2vQjmrN17tJu3vP3O0Tkp85vb40HLC");

//refresh();

function getUserNumber(){

	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	
	query.count({
	  success: function(number) {
	    $("#total .number").html(number);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function getPostNumber(){

	var Post = Parse.Object.extend("Posts");
	var query = new Parse.Query(Post);
	
	query.count({
	  success: function(number) {
	    $("#posts .number").html(number);
	  },

	  error: function(error) {
	    console.log(error);
	  }
	});

}

function getFemaleNumber(){

	var Female = Parse.Object.extend("User");
	var query = new Parse.Query(Female);
	query.equalTo('gender', 'Female');
	
	query.count({
	  success: function(number) {
	    $("#female .number").html(number);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function getMaleNumber(){

	var Male = Parse.Object.extend("User");
	var query = new Parse.Query(Male);
	query.equalTo('gender', 'Male');
	
	query.count({
	  success: function(number) {
	    $("#male .number").html(number);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function getVerifiedNumber(){

	var Verified = Parse.Object.extend("User");
	var query = new Parse.Query(Verified);
	query.equalTo('emailVerified', true);
	
	query.count({
	  success: function(number) {
	    $("#verified .number").html(number);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function getRepliesNumber(){

	var Reply = Parse.Object.extend("Reply");
	var query = new Parse.Query(Reply);
	
	query.count({
	  success: function(number) {
	    $("#replies .number").html(number);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function getLikesNumber(){

	var Likes = Parse.Object.extend("Vote");
	var query = new Parse.Query(Likes);
	
	query.count({
	  success: function(number) {
	    $("#likes .number").html(number);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function getPMNumber(){

	var Messages = Parse.Object.extend("Message");
	var query = new Parse.Query(Messages);
	
	query.count({
	  success: function(number) {
	    $("#messages .number").html(number);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function printEmails(gender){

	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.limit(2000);
	query.equalTo('gender', gender);
	query.find({
	  success: function(results) {
	  	console.log(results.length);
	  	var str = "";
	    for (var i = results.length - 1; i >= 0; i--) {
	    	str = str + ", " + results[i].get("email");
	    };
	    console.log(str);
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

        //<div id="message" class="col-lg-10"><p ><span class="number"></span></p></div>  
        //<div id="email" class="col-lg-2"><p ><span class="name"></span></p></div> 

function getLatestCustomerMessage(){

	var Message = Parse.Object.extend("CustomerMessage");
	var query = new Parse.Query(Message);
	query.descending("createdAt");
	
	query.first({
	  success: function(object) {
	    $("#message .number").html(object.get("message"));
	    $("#email .name").html(object.get("userEmail"));
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }
	});

}

function refresh(){
	getLatestCustomerMessage();
	getVerifiedNumber();
 	getFemaleNumber();
 	getMaleNumber();
 	getUserNumber();
 	getPostNumber();
 	getLikesNumber();
 	getRepliesNumber();
 	getPMNumber();
}

//refresh();

$(window).load(function() 
 {
 	// printEmails();
 	refresh();
    setInterval(function(){
	    refresh();
    },60000);
 });  

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
