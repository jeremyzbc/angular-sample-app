var myDirectives = angular.module('myDirectives',[]);
myDirectives.directive('checkValidity',function(){
  //http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/

    return {
      restrict: 'A',
      require:  '^form',
      link: function (scope, el, attrs, formCtrl) {
        // find the text box element, which has the 'name' attribute
        var inputEl   = el[0].querySelector("[name]");

        //get icon element
        var icon = el[0].querySelector('.glyphicon');
        // convert the native text box element to an angular element
        var inputNgEl = angular.element(inputEl);
        var iconNgEl = angular.element(icon);
        // get the name on the text box so we know the property to check
        // on the form controller
        var inputName = inputNgEl.attr('name');

        // only apply the has-error class after the user leaves the text box
        inputNgEl.bind('blur', function() {
          var invalid = formCtrl[inputName].$invalid;
          el.toggleClass('has-error', invalid);
          if(invalid){
            iconNgEl.removeClass('glyphicon-ok').addClass('glyphicon-remove');
          }
          else{
            iconNgEl.removeClass('glyphicon-remove').addClass('glyphicon-ok');
          }
        })
      }
    }
});

myDirectives.directive('hiddenField',function(){
  return {
    restrict : 'A',
    scope : {
      gametype : '='
    },
    controller : function($scope){

    },
    link : function(scope, elm, attrs){

      var elmNg = angular.element(elm[0]);

      elmNg.bind('change', function(){
        var hiddenField = elm[0].querySelector('#hidden-field');
          hiddenFieldNg = angular.element(hiddenField);
        if(scope.gametype == 'Other'){

          hiddenFieldNg.removeClass('ng-hide');
        }
        else{
          hiddenFieldNg.addClass('ng-hide');
        }
      })
    }
  }
})

myDirectives.directive('other', function(){
  return {
    restrict : 'E',
    require : '^hidden-field',
    template : '<input id="hidden-field" type="text" class="form-control ng-hide" placeholder="Game Type" required ng-model="gameType" name="type" ng-trim="true">',

  }
})