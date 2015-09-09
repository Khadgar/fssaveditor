//mainApp declaration
var app = angular.module('mainApp', ['ngFileUpload','ngRoute']);

app.service('VaultData', function() {
  var vault ='';

  var setVault = function(newObj) {
      vault = newObj;
  };

  var getVault = function(){
      return vault;
  };

  return {
    setVault: setVault,
    getVault: getVault
  };

});