(function (angular) {
    angular.module("jquery-alt", ["slider-mouse"]);


        angular.module("slider-mouse", [])
            .directive("sliderMouse", ["$compile", "$timeout", function($compile, $timeout){
                    return {
                        link: function(scope, element, attrs){

                                element.mouseenter(function(){
                                    angular.element(".slider img").fadeTo("slow", 0.5);
                                });

                                element.mouseleave(function(){
                                    angular.element(".slider img").fadeTo("slow", 1);
                                });
                    }}}]);
})(angular);
