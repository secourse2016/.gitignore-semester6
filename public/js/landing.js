$(document).ready(function () {
  $('.slider').slider({full_width: true, height:420});

  $('.slider').mouseenter(function(){
      $(".slider img").fadeTo("slow", 0.8);
  });

  $('.slider').mouseleave(function(){
      $(".slider img").fadeTo("slow", 1);
  });
});
