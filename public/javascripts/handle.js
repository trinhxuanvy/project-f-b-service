$(document).ready(function () {
  // Xử lý menu cố định trên top
  $(function () {
    const posHeader = $("#header").position();
    const topHeader = posHeader.top;

    $(window).on("scroll load", function () {
      const topWindow = $(window).scrollTop();

      if (topWindow > topHeader) {
        $(header).addClass("header--fixed");
      } else {
        $(header).removeClass("header--fixed");
      }
    });
  });

  // Xử lý menu reponsive
  $(function() {
    $("#menu-toggle").click(function (e) { 
      e.preventDefault();
      const menuList = $(".header__menu-list");
      const hasClass = $(menuList).hasClass("header__menu-list-responsive");
      console.log(hasClass);
      if (hasClass) {
        $(menuList).removeClass("header__menu-list-responsive");
      } else {
        $(menuList).addClass("header__menu-list-responsive");
      }    
    });
  });

  // Xử lý slide voucher
  $(function () {
    $(".vouchers__menu-list").owlCarousel({
      loop: true,
      margin: 32,
      autoplay: true,
      responsive: {
        0: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4,
        },
      },
    });
  });

  // Xử lý toggle products
  $(function () {
    const buttonTitle = $(".body__item__menu-list__item__title");
    const products = $(".body__item__menu-list__item--set-height");
    
    for (let i = 0; i < buttonTitle.length; i++) {
      $(buttonTitle[i]).click(function (e) { 
        e.preventDefault();
        
        const hasClass = $(products[i]).hasClass("set-height");

        if (hasClass) {
          $(products[i]).removeClass("set-height");
        } else {
          $(products[i]).addClass("set-height");
        }
      });
    }
  });
});
