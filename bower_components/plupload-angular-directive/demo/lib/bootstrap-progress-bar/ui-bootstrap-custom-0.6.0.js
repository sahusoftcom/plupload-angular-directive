angular.module("ui.bootstrap", ["ui.bootstrap.transition","ui.bootstrap.progressbar"]);
angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('ui.bootstrap.progressbar', ['ui.bootstrap.transition'])

.constant('progressConfig', {
  animate: true,
  autoType: false,
  stackedTypes: ['success', 'info', 'warning', 'danger']
})

.controller('ProgressBarController', ['$scope', '$attrs', 'progressConfig', function($scope, $attrs, progressConfig) {

    // Whether bar transitions should be animated
    var animate = angular.isDefined($attrs.animate) ? $scope.$eval($attrs.animate) : progressConfig.animate;
    var autoType = angular.isDefined($attrs.autoType) ? $scope.$eval($attrs.autoType) : progressConfig.autoType;
    var stackedTypes = angular.isDefined($attrs.stackedTypes) ? $scope.$eval('[' + $attrs.stackedTypes + ']') : progressConfig.stackedTypes;

    // Create bar object
    this.makeBar = function(newBar, oldBar, index) {
        var newValue = (angular.isObject(newBar)) ? newBar.value : (newBar || 0);
        var oldValue =  (angular.isObject(oldBar)) ? oldBar.value : (oldBar || 0);
        var type = (angular.isObject(newBar) && angular.isDefined(newBar.type)) ? newBar.type : (autoType) ? getStackedType(index || 0) : null;

        return {
            from: oldValue,
            to: newValue,
            type: type,
            animate: animate
        };
    };

    function getStackedType(index) {
        return stackedTypes[index];
    }

    this.addBar = function(bar) {
        $scope.bars.push(bar);
        $scope.totalPercent += bar.to;
    };

    this.clearBars = function() {
        $scope.bars = [];
        $scope.totalPercent = 0;
    };
    this.clearBars();
}])

.directive('progress', function() {
    return {
        restrict: 'EA',
        replace: true,
        controller: 'ProgressBarController',
        scope: {
            value: '=percent',
            onFull: '&',
            onEmpty: '&'
        },
        templateUrl: 'template/progressbar/progress.html',
        link: function(scope, element, attrs, controller) {
            scope.$watch('value', function(newValue, oldValue) {
                controller.clearBars();

                if (angular.isArray(newValue)) {
                    // Stacked progress bar
                    for (var i=0, n=newValue.length; i < n; i++) {
                        controller.addBar(controller.makeBar(newValue[i], oldValue[i], i));
                    }
                } else {
                    // Simple bar
                    controller.addBar(controller.makeBar(newValue, oldValue));
                }
            }, true);

            // Total percent listeners
            scope.$watch('totalPercent', function(value) {
              if (value >= 100) {
                scope.onFull();
              } else if (value <= 0) {
                scope.onEmpty();
              }
            }, true);
        }
    };
})

.directive('progressbar', ['$transition', function($transition) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            width: '=',
            old: '=',
            type: '=',
            animate: '='
        },
        templateUrl: 'template/progressbar/bar.html',
        link: function(scope, element) {
            scope.$watch('width', function(value) {
                if (scope.animate) {
                    element.css('width', scope.old + '%');
                    $transition(element, {width: value + '%'});
                } else {
                    element.css('width', value + '%');
                }
            });
        }
    };
}]);