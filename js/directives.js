var myDirectives = angular.module('myDirectives',[]);
myDirectives.directive('checkValidity',function(){
  //http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/

    return {
      restrict: 'A',
      require:  '^form',
      link: function (scope, elm, attrs, formCtrl) {

        var formId = attrs.checkValidity;

        var formElm = document.querySelector(formId);


        setValidator();

        function setValidator(){
          var formGroupElms = formElm.querySelectorAll(".form-group");
          for (var i = formGroupElms.length - 1; i >= 0; i--) {

            var inputElm = formGroupElms[i].querySelector('[name]');
            var inputElmNg = angular.element(inputElm);

            inputElmNg.bind('blur change', onDataModify(inputElm, formGroupElms[i]));
          };

          var elmNg = angular.element(elm[0]);
          elmNg.bind('click', function(){
            var formGroupElms = formElm.querySelectorAll(".form-group");
            for (var i = formGroupElms.length - 1; i >= 0; i--) {
              var inputElm = formGroupElms[i].querySelector('[name]');
              Validation(inputElm, formGroupElms[i],formCtrl);

            };

          })
        }

        function onDataModify(inputElm, formGroupElm){
          return function(){
            Validation(inputElm, formGroupElm,formCtrl);
          }
        }
      }
    }
});

myDirectives.directive('other', function(){
  return {
    restrict : 'E',
    replace: true,
    templateUrl : 'tpls/dir/other.html'

  }
})

myDirectives.directive('hiddenFieldValidity',function(){
    return {
      restrict : 'A',
      requrie : '^form',
      scope : {
        isappendhiddenfield : '='
      },
      link : function(scope, elm, attrs, formCtrl){

        scope.$watch('isappendhiddenfield',function(){
          if(scope.isappendhiddenfield === true){
            var hiddenInput = elm[0].querySelector('[name]');
            var hiddenInputNg = angular.element(hiddenInput);
            hiddenInputNg.bind('blur',function(){
              var icon = elm[0].querySelector('.glyphicon');

              var formGroupElmNg = angular.element(elm[0]);
              var iconNg = angular.element(icon);

              var invalid = hiddenInput.value == '';
              formGroupElmNg.toggleClass('has-error', invalid);
              if(invalid){
                iconNg.removeClass('glyphicon-ok').addClass('glyphicon-remove');
              }
              else{
                iconNg.removeClass('glyphicon-remove').addClass('glyphicon-ok');
              }
            })
          }
        })

      }
    }
})

function Validation(inputElm, formGroupElm,formCtrl){

  var icon = formGroupElm.querySelector('.glyphicon');

  var formGroupElmNg = angular.element(formGroupElm);
  var inputElmsNg = angular.element(inputElm);
  var iconNg = angular.element(icon);

  var inputName = inputElmsNg.attr('name');

  var invalid = formCtrl[inputName].$invalid;
  formGroupElmNg.toggleClass('has-error', invalid);
  if(invalid){
    iconNg.removeClass('glyphicon-ok').addClass('glyphicon-remove');
  }
  else{
    iconNg.removeClass('glyphicon-remove').addClass('glyphicon-ok');
  }
}