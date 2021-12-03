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
  $(function () {
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

  // Xử lý toggle modal order
  $(function () {
    const buttonOrder = $(".body__item__menu-list__item__card__button");

    for (let i = 0; i < buttonOrder.length; i++) {
      $(buttonOrder[i]).click(function (e) {
        e.preventDefault();

        const popupParent = $(".container-popup");
        const popupChild = $(".container-popup .popup");
        const popupTitle = $("#popupOrder .popup__header__right__title");
        const popupPrice = $("#popupOrder .popup__header__right__price span");
        const popupPriceDel = $("#popupOrder .popup__header__right__price del");
        const popupInfo = $("#popupOrder .popup__header__right__info i");
        const popupSizeM = $("#popupOrder #size-M");
        const popupSizeL = $("#popupOrder #size-L");
        const sizeX = $("#popupOrder #sizeX");
        const popupLoading = $("#popupOrder #loading");
        const val = $(this.children[0]).val();
        const hasClass = $(popupParent[0]).hasClass("container-popup-toggle");
        const url = new URL(window.location.href);

        $(popupLoading[0]).removeClass("loading-hide");

        $.ajax({
          type: "get",
          url: url.origin + url.pathname + "/" + val,
          dataType: "json",
          success: function (response) {
            if (response?.success) {
              $(popupParent[0]).attr(
                "action",
                "/order/" + response?.product._id
              );
              $(popupLoading[0]).addClass("loading-hide");
              $(popupInfo[0]).html(response?.product?.description);
              let str = "";
              response?.product?.subProduct.forEach((item) => {
                str += `<label for="${item._id}">
                <input
                  type="radio"
                  name="size"
                  id="${item._id}"
                  value="${item.type}"
                />
                <span class="popup__body__item__form-group__item__name">Size ${item.type}</span>
              </label>`;
              });

              $(sizeX[0]).html(str);
              $(popupTitle[0]).html(response?.product?.name);
              $(popupPrice[0]).html(
                convertMoney(
                  Math.floor(
                    (response?.product?.subProduct[0].price *
                      (100 - response?.product?.sale)) /
                      100
                  )
                )
              );
              $(popupPriceDel[0]).html(
                convertMoney(response?.product?.subProduct[0].price)
              );
            }
          },
        });

        if (hasClass) {
          $(popupParent[0]).removeClass("container-popup--toggle");
          $(popupChild[0]).removeClass("popup--toggle");
        } else {
          $(popupParent[0]).addClass("container-popup--toggle");
          $(popupChild[0]).addClass("popup--toggle");
        }
      });
    }

    const buttonClose = $(".container-popup .popup__close");

    for (let i = 0; i < buttonClose.length; i++) {
      $(buttonClose[i]).click(function (e) {
        e.preventDefault();

        $(sizeX[0]).html();

        const popupParent = $(".container-popup");
        const popupChild = $(".container-popup .popup");
        const hasClass = $(popupParent[0]).hasClass("container-popup-toggle");

        if (!hasClass) {
          $(popupParent[0]).removeClass("container-popup--toggle");
          $(popupChild[0]).removeClass("popup--toggle");
        } else {
          $(popupParent[0]).addClass("container-popup--toggle");
          $(popupChild[0]).addClass("popup--toggle");
        }
      });
    }
  });

  // Xử lý focus input
  $(function () {
    const input = $(".login__item__input");
    const label = $(".login__item__title");

    for (let i = 0; i < input.length; i++) {
      $(input[i]).focus(function (e) {
        e.preventDefault();

        $(label[i]).addClass("login__item__title--active");
      });

      $(input[i]).focusout(function (e) {
        e.preventDefault();

        if (input[i].value) {
          $(label[i]).addClass("login__item__title--active");
        } else {
          $(label[i]).removeClass("login__item__title--active");
        }
      });
    }
  });

  // Xử lý change login - register
  $(function () {
    const login = $("#login");
    const register = $("#register");

    $(register).click(function (e) {
      e.preventDefault();

      $(".login").addClass("login--active");
      $(".register").addClass("register--active");
    });

    $(login).click(function (e) {
      e.preventDefault();

      $(".login").removeClass("login--active");
      $(".register").removeClass("register--active");
    });
  });

  // Xử lý slide payment
  $(function () {
    $(".payment-slide").owlCarousel({
      loop: false,
      margin: 16,
      autoplay: false,
      dots: false,
      mouseWheel: false,
      nav: true,
      navText: [
        "<span style='display: block; padding: 8px 16px; background-color: #D2A451; color: #ffffff;'>Thanh toán trực tiếp</span>",
        "<span style='display: block; padding: 8px 16px; background-color: #D2A451; color: #ffffff;'>Thanh toán online</span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 1,
        },
      },
    });
  });

  // Xử lý hiển thị giá tiền
  $(function () {
    const money = $(".money");

    for (let i = 0; i < money.length; i++) {
      money[i].innerHTML = convertMoney(money[i].innerHTML);
    }
  });
});

function convertMoney(money) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
}
