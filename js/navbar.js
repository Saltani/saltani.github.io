/*
########################################################
--== MENU OVERLAY --==
- Open and close Menu Overlay
########################################################
*/
// Open Menu Overlay by clicking on the "Hamburger" Menu
$(".fa-bars").click(function() {
  $("aside").css("width", "100%");
});

// Close Menu Overlay by clicking anywhere on the overlay.
$("aside").click(function() {
  $("aside").css("width", "0%");
});


/*
###############################################
--== HIDE AND SHOW HEADER ==--
- Hide header on scroll down, show on scroll up
- Source: http://kortlink.dk/medium/23r6x
###############################################
*/
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar-container').outerHeight();

$(window).scroll(function(event) {
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    // $('.navbar-container').removeClass('nav-down').addClass('nav-up');
    $('.navbar-container').fadeOut('fast', function() {
      $(this).css('display', 'none');
    });
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      // $('.navbar-container').removeClass('nav-up').addClass('nav-down');
      $('.navbar-container').fadeIn('fast', function() {
        $(this).css('display', 'grid');
      });
    }
  }

  lastScrollTop = st;
}
