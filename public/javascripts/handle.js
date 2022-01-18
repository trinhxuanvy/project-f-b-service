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
      autoplay: false,
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
        const popupImage = $("#popupOrder .popup__header__left img");
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
                  required
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
              $(popupImage[0]).attr("src", response?.product?.picture);
              $("#inputAmount").val(1);
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
      touchDrag: false,
      mouseDrag: false,
      singleItem: true,
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

  // Xử lý hiển thị message box
  $(function () {
    $(".close").click(function () {
      $(this).parent(".alert").fadeOut();
    });
  });

  // Load thông tin tỉnh thành Việt Nam
  $(function () {
    const selectVietNamProvinces = $("#vietNamProvinces");
    const selectVietNamDistrict = $("#vietNamDistrict");
    const selectVietNamCommune = $("#vietNamCommune");

    $.ajax({
      type: "get",
      url: "https://provinces.open-api.vn/api/?depth=1",
      dataType: "json",
      success: function (response) {
        response.forEach((item) => {
          $(selectVietNamProvinces[0]).append(
            `<option value="${item.name}">${item.name}</option>`
          );
        });
      },
    });

    $(selectVietNamDistrict[0]).focus(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: "https://provinces.open-api.vn/api/?depth=2",
        dataType: "json",
        success: function (response) {
          const dataFilter = response.filter(
            (data) => data.name == $(selectVietNamProvinces[0]).val()
          );

          $(selectVietNamDistrict[0]).find(".list-option").remove().end();

          dataFilter[0]?.districts.forEach((item) => {
            $(selectVietNamDistrict[0]).append(
              `<option class="list-option" value="${item.name}">${item.name}</option>`
            );
          });
        },
      });
    });

    $(selectVietNamCommune[0]).focus(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: "https://provinces.open-api.vn/api/?depth=3",
        dataType: "json",
        success: function (response) {
          let dataFilter = response.filter(
            (data) => data.name == $(selectVietNamProvinces[0]).val()
          );

          dataFilter = dataFilter[0]?.districts.filter(
            (data) => data.name == $(selectVietNamDistrict[0]).val()
          );

          $(selectVietNamCommune[0]).find(".list-option").remove().end();

          dataFilter[0]?.wards.forEach((item) => {
            $(selectVietNamCommune[0]).append(
              `<option class="list-option" value="${item.name}">${item.name}</option>`
            );
          });
        },
      });
    });

    $(selectVietNamProvinces[0]).change(function (e) {
      e.preventDefault();
      $(selectVietNamCommune[0]).find(".list-option").remove().end();
      $(selectVietNamCommune[0]).find(".primary-option-ward").remove().end();
      $(selectVietNamDistrict[0]).find(".list-option").remove().end();
      $(selectVietNamDistrict[0])
        .find(".primary-option-district")
        .remove()
        .end();
    });

    $(selectVietNamDistrict[0]).change(function (e) {
      e.preventDefault();
      $(selectVietNamCommune[0]).find(".list-option").remove().end();
      $(selectVietNamCommune[0]).find(".primary-option-ward").remove().end();
    });
  });

  // Sử dụng tabs cho trang account
  $(function () {
    $("#tabs").tabs();
  });

  // Xử lý thêm voucher ajax
  $(function () {
    const btnAdd = $(".vouchers__menu-list__item__right__button");

    for (let i = 0; i < btnAdd.length; i++) {
      $(btnAdd[i]).click(function (e) {
        e.preventDefault();

        const url = new URL(window.location.href);

        $.ajax({
          type: "get",
          url: url.origin + "/add/voucher/" + $(btnAdd[i]).val(),
          dataType: "json",
          success: function (response) {
            $(btnAdd[i]).html(response.message);
          },
        });
      });
    }
  });

  // Xử lý thay đổi voucher
  $(function () {
    const selectVoucher = $("#selectVoucher");

    $(selectVoucher[0]).change(function (e) {
      e.preventDefault();

      const url = new URL(window.location.href);
      let code = $(selectVoucher[0]).val() || 0;
      $.ajax({
        type: "get",
        url: url.origin + "/get/voucher/" + code,
        dataType: "json",
        success: function (response) {
          console.log(response);
          const total = $(".payment__item__body__item__total");
          const ship = $("#ship");
          $(total[0]).html(convertMoney(response.totalPrice));
          $(ship[0]).html(convertMoney(response.ship));
        },
      });
    });
  });

  // Thêm validate phone
  jQuery.validator.addMethod("valid_number", function (value) {
    var regex = /^[0-9]*$/gm;
    return value.trim().match(regex);
  });

  // Thêm validate username
  jQuery.validator.addMethod("valid_username", function (value) {
    const url = new URL(window.location.href);
    var data = $.ajax({
      method: "get",
      contentType: "application/json",
      async: false,
      url: url.origin  + "/user/" + value,
      dataType: "json",
      success: function (response) {
        return response;
      },
    });

    return data.responseJSON?.status;
  });

  // Thêm validate password
  jQuery.validator.addMethod("valid_password", function (value) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return value.trim().match(regex);
  });

  // Thêm validate tên
  jQuery.validator.addMethod("valid_name", function (value) {
    var finalVal = removeAscent(value);
    var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return !regex.test(finalVal);
  });

  // Xử lý validator password
  $(function () {
    $("#formValidate").validate({
      onfocusout: false,
      rules: {
        username: {
          required: true,
          email: true,
          valid_username: true
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 20,
          valid_password: true
        },
        confirmPassword: {
          equalTo: "#password",
        },
      },
      messages: {
        confirmPassword: {
          equalTo: "Mật khẩu không khớp",
          required: "Vui lòng nhập lại mật khẩu"
        },
        username: {
          required: "Vui lòng nhập email",
          email: "Vui lòng kiểm tra email",
          valid_username: "Tài khoản đã tồn tại"
        },
        password: {
          required: "Vui lòng nhập mật khẩu",
          minlength: "Mật khẩu ít nhất 8 kí tự",
          maxlength: "Mật khẩu tối đa 20 ký tự",
          valid_password: "Mật khẩu ít nhất một chữ in hoa, thường, chữ số"
        },
      },
      submitHandler: function(form) {
        // do other things for a valid form
        form.submit();
      }
    });
  });

  $(function () {
    $("#formValidateLogin").validate({
      onfocusout: false,
      rules: {
        username: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 20,
          valid_password: true
        },
      },
      messages: {
        username: {
          required: "Vui lòng nhập email",
          email: "Vui lòng kiểm tra email",
        },
        password: {
          required: "Vui lòng nhập mật khẩu",
          minlength: "Mật khẩu ít nhất 8 kí tự",
          maxlength: "Mật khẩu tối đa 20 ký tự",
          valid_password: "Mật khấu ít nhất một chữ in hoa, thường, chữ số"
        },
      },
      submitHandler: function(form) {
        // do other things for a valid form
        form.submit();
      }
    });
  });

  $(function () {
    $("#formValidateAccount").validate({
      onfocusout: false,
      rules: {
        phone: {
          required: true,
          valid_number: true
        },
        identityCard: {
          required: true,
          valid_number: true
        },
        name: {
          required: true,
          valid_name: true
        },
        address: {
          required: true,
          maxlength: 50
        }
      },
      messages: {
        name: {
          required: "Vui lòng nhập họ tên",
          valid_name: "Tên không chứa ký tự đặt biệt"
        },
        identityCard: {
          required: "Vui lòng nhập CMND",
          valid_number: "CMND chỉ chứa chữ số 0-9"
        },
        phone: {
          required: "Vui lòng nhập số điện thoại",
          valid_number: "Số điện thoại chỉ chứa chữ số 0-9"
        },
        province: {
          required: "Vui lòng chọn tỉnh thành"
        },
        district: {
          required: "Vui lòng chọn quận huyện"
        },
        ward: {
          required: "Vui lòng chọn xã, thị trấn"
        },
        address: {
          required: "Vui lòng nhập địa chỉ",
          maxlength: "Địa chỉ tối đa 50 ký tự"
        }
      },
      submitHandler: function(form) {
        // do other things for a valid form
        form.submit();
      }
    });
  });

  $(function () {
    const inputAmount = $("#inputAmount");
    $("#plus-amount").click(function (e) { 
      e.preventDefault();
      $(inputAmount[0]).val(parseInt($(inputAmount[0]).val()) + 1);
    });

    $("#minus-amount").click(function (e) { 
      e.preventDefault();
      let val = parseInt($(inputAmount[0]).val()) - 1;
      let finalVal = val > 0 ? val : 1;
      $(inputAmount[0]).val(finalVal);
    });
  });
});

function convertMoney(money) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
}

function removeAscent (str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(" ", "");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}