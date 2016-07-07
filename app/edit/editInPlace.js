  
  //Custom Directive to allow for on-click editable text fields

  (function() {
      'use strict';

      angular
          .module('myApp')
          .directive('editInPlace', editInPlace);

      editInPlace.$inject = [];

      /* @ngInject */
      function editInPlace() {
          // Usage: Allows user to edit input fields in place by clicking on field
          //
          // Creates: Span containing copied version of data for editing before updating value on model
          //
          var directive = {
              restrict: 'A',
              scope: { value: '=editInPlace', onSaveFn: '&onSave', onCancelFn: '&onCancel' },
              template: '<span ng-click="handleClick()" ng-bind="value"></span><input ng-model="modelCopy" style="width:100%;"></input>',
              link: link
          };
          return directive;

          function link($scope, element) {
              var inputChild = angular.element(element.children()[1]),
                  previousValue;

              element.addClass('edit-in-place');
              $scope.editing = false;

              $scope.handleClick = function() {
                  if (!$scope.editing) {
                      $scope.beginEdit();
                  }
              };

              // activate editing mode
              $scope.beginEdit = function() {
                  $scope.editing = true;
                  previousValue = $scope.value;

                  // This directive edits a copy of the value. Important because if the
                  // value is included in a sorted list, then the sorting will be active
                  // during editing, which can cause UI surprises. Elements get sorted out
                  // from under the cursor and can lose focus. So we edit a copy of the
                  // value. The actual model will get updated later, by the controller, 
                  // when this directive calls the onSaveFn.
                  $scope.modelCopy = $scope.value;

                  // When the css class is 'active', the input box gets displayed.
                  // See the css for details.
                  element.addClass('active');

                  // Now, focus the element.
                  // `angular.element()` returns a chainable array, like jQuery. To access
                  // a native DOM function, reference the first element in the array.
                  inputChild[0].focus();
              };

              // When the user leaves the input box, stop editing and accept the changes
              inputChild.prop('onblur', function() {
                  if ($scope.editing) {
                      $scope.acceptEdits();
                  }
              });

              // has the user pressed the RETURN or ESCAPE key from within the input box?
              inputChild.prop('onkeyup', function(e) {
                  if ($scope.editing) {
                      if (e.keyCode === 13) {
                          $scope.acceptEdits();
                      } else if (e.keyCode === 27) {
                          $scope.cancelEdits();
                      }
                  }
              });

              // Accept edits
              $scope.acceptEdits = function() {
                  if ($scope.editing) {
                      $scope.editing = false;
                      element.removeClass('active');
                      if ($scope.modelCopy !== previousValue) {
                          // This directive does not update the model directly. It's up to
                          // the controller to "accept" or apply the changes and apply them to the
                          // original model.
                          $scope.onSaveFn({ value: $scope.modelCopy});
                          $scope.$apply();
                      }
                  }
              };

              // Cancel edits
              $scope.cancelEdits = function() {
                  if ($scope.editing) {
                      $scope.editing = false;
                      element.removeClass('active');
                      // wrap this assignment so that the view gets updated
                      $scope.$apply(function() {
                          $scope.value = previousValue;
                      });
                      $scope.onCancelFn({ value: $scope.value });
                  }
              };
          }
      }

  })();
