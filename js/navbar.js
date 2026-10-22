/*
#-------------------------------------------------------------------------------
# NAME: navbar.js
#
# DESC: Manage accessible mobile navigation and show the navbar on upward scroll.
#
# USAGE: Load after the navigation markup and jQuery in index.html.
#
# DEPS: A browser with inert support; jQuery for the navbar scroll behavior.
#
# AUTH: Saltani/Codex-cli
#
# DATE: 05. februar 2024
#
# EDIT: 22. oktober 2026
#-------------------------------------------------------------------------------
*/
var menuButton = document.querySelector('.menu');
var menu = document.querySelector('.overlay-menu');
var closeButton = menu.querySelector('.close');
var navbar = document.querySelector('.navbar-container');
var main = document.querySelector('main');

function openMenu() {
  menu.hidden = false;
  menu.inert = false;
  menuButton.setAttribute('aria-expanded', 'true');
  closeButton.focus();
  navbar.inert = true;
  main.inert = true;
}

function closeMenu() {
  if (menu.hidden) return;
  navbar.inert = false;
  main.inert = false;
  menuButton.setAttribute('aria-expanded', 'false');
  // At desktop widths the mobile trigger is hidden; focus the visible home link.
  var focusTarget = window.matchMedia('(min-width: 600px)').matches
    ? navbar.querySelector('.home') : menuButton;
  focusTarget.focus();
  menu.inert = true;
  menu.hidden = true;
}

menuButton.addEventListener('click', openMenu);
// Preserve dismissal when clicking a link, the close button, or the backdrop.
menu.addEventListener('click', closeMenu);
menu.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
  } else if (event.key === 'Tab') {
    var controls = menu.querySelectorAll('button, a[href]');
    var first = controls[0];
    var last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
window.addEventListener('resize', function() {
  if (window.matchMedia('(min-width: 600px)').matches) closeMenu();
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
  if (!menu.hidden) return;
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
