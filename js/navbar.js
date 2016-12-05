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


  $('#jadegreen-layout-navtoggle').on('click', function() {
    this.classList.toggle('active');
  });

  $('#jadegreen-layout-navtoggle').click(function() {
    $('nav ul').toggle();
  });

})(jQuery);
