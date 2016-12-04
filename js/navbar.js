(function($) {
  $(function() {
    $('nav ul li > a:not(:only-child)').click(function(e) {
      $(this).siblings('.jadegreen-layout-navdropdown').toggle();
      $('.jadegreen-layout-navdropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function() {
      $('.jadegreen-layout-navdropdown').hide();
    });
  });
})(jQuery);