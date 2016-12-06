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

  $('.jadegreen-layout-navmobile').click(function() {
    $('nav ul').toggle();
  });

  var navtoggle = document.getElementById('jadegreen-layout-navtoggle')

  $('.jadegreen-layout-navmobile').on('click', function() {
    navtoggle.classList.toggle('active');
  });

})(jQuery);
