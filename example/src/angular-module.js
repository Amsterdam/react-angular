import angular from 'angular';

angular
  .module('ngExample', [])
  .component('ngExampleComponent', {
    template: '<div><h1>{{ctrl.message}}</h1><h2>{{ctrl.foo}}</h2></div>',
    controllerAs: 'ctrl',
    bindings: {
      message: '@',
      foo: '<',
    },
  });
