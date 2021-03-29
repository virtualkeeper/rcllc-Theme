(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.bindEvents();
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;

    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not quality for min/max quantity

    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: invalidEntry + " is not a valid entry",
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;

    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();

    if (this.$modal === null) {
      this.$modal = $('#modal');
    }

    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
      var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
      $productOptionsContainer.css('height', modalBodyReservedHeight);
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);

      _this4.bindGiftWrappingForm();

      modal.setupFocusableElements(_global_modal__WEBPACK_IMPORTED_MODULE_6__["modalTypes"].CART_CHANGE_PRODUCT);
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);

      _this5.$cartTotals.html(response.totals);

      _this5.$cartMessages.html(response.statusMessages);

      $cartPageTitle.replaceWith(response.pageTitle);

      _this5.bindEvents();

      _this5.$overlay.hide();

      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault(); // edit item in cart

      _this6.cartEditOptions(itemId, productId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: $certInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this9.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents(); // initiate shipping estimator module

    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__["default"]($('[data-shipping-estimator]'));
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");







var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit"
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }

      shippingEstimatorAlert.attr('role', 'alert'); // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity

      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: 'The \'Country\' field cannot be blank.'
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: 'The \'State/Province\' field cannot be blank.'
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };

    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }

    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;

    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();

      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };

  return ShippingEstimator;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");


function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);

  function CartItemDetails($scope, context, productAttributesData) {
    var _this;

    if (productAttributesData === void 0) {
      productAttributesData = {};
    }

    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions); // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view

    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }

    return _this;
  }

  var _proto = CartItemDetails.prototype;

  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');

      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });

        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;

        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');

        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);

            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };

            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };

          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;

            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }

          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];

            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }

          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }

          return;
        }

        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');

    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }
  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */
  ;

  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);

    this.$scope.find('.modal-content').removeClass('hide-content');
  };

  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string') {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbIkNhcnQiLCJvblJlYWR5IiwiJG1vZGFsIiwiJGNhcnRDb250ZW50IiwiJCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRvdmVybGF5IiwiaGlkZSIsIiRhY3RpdmVDYXJ0SXRlbUlkIiwiJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uIiwiYmluZEV2ZW50cyIsImNhcnRVcGRhdGUiLCIkdGFyZ2V0IiwiaXRlbUlkIiwiZGF0YSIsIiRlbCIsIm9sZFF0eSIsInBhcnNlSW50IiwidmFsIiwibWF4UXR5IiwibWluUXR5IiwibWluRXJyb3IiLCJtYXhFcnJvciIsIm5ld1F0eSIsInN3YWwiLCJmaXJlIiwidGV4dCIsImljb24iLCJzaG93IiwidXRpbHMiLCJhcGkiLCJjYXJ0IiwiaXRlbVVwZGF0ZSIsImVyciIsInJlc3BvbnNlIiwic3RhdHVzIiwicmVtb3ZlIiwicmVmcmVzaENvbnRlbnQiLCJlcnJvcnMiLCJqb2luIiwiY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UiLCJwcmVWYWwiLCJOdW1iZXIiLCJpbnZhbGlkRW50cnkiLCJjYXJ0UmVtb3ZlSXRlbSIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJjb250ZXh0IiwicHJvZHVjdEZvckNoYW5nZUlkIiwibW9kYWwiLCJkZWZhdWx0TW9kYWwiLCJvcHRpb25zIiwidGVtcGxhdGUiLCJvcGVuIiwiZmluZCIsImFkZENsYXNzIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsIiRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciIsIm1vZGFsQm9keVJlc2VydmVkSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJjc3MiLCJwcm9kdWN0RGV0YWlscyIsIkNhcnRJdGVtRGV0YWlscyIsImJpbmRHaWZ0V3JhcHBpbmdGb3JtIiwic2V0dXBGb2N1c2FibGVFbGVtZW50cyIsIm1vZGFsVHlwZXMiLCJDQVJUX0NIQU5HRV9QUk9EVUNUIiwiaG9va3MiLCJvbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsIiRmb3JtIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94Iiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwicmVzdWx0IiwicHVyY2hhc2luZ19tZXNzYWdlIiwicHJvcCIsInB1cmNoYXNhYmxlIiwiaW5zdG9jayIsIiRjYXJ0SXRlbXNSb3dzIiwiJGNhcnRQYWdlVGl0bGUiLCJ0b3RhbHMiLCJwYWdlVGl0bGUiLCJzdGF0dXNNZXNzYWdlcyIsImxlbmd0aCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiZGVib3VuY2VUaW1lb3V0IiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJzaG93Q2FuY2VsQnV0dG9uIiwidGhlbiIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJnaWZ0Q2VydENoZWNrIiwiYXBwbHlHaWZ0Q2VydGlmaWNhdGUiLCJyZXNwIiwiYmluZEdpZnRXcmFwcGluZ0V2ZW50cyIsImdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zIiwiJHNlbGVjdCIsImlkIiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiU2hpcHBpbmdFc3RpbWF0b3IiLCJQYWdlTWFuYWdlciIsIiRlbGVtZW50IiwiJHN0YXRlIiwiaXNFc3RpbWF0b3JGb3JtT3BlbmVkIiwiaW5pdEZvcm1WYWxpZGF0aW9uIiwiYmluZFN0YXRlQ291bnRyeUNoYW5nZSIsImJpbmRFc3RpbWF0b3JFdmVudHMiLCJzaGlwcGluZ0VzdGltYXRvckFsZXJ0Iiwic2hpcHBpbmdWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImJpbmRWYWxpZGF0aW9uIiwiYmluZFN0YXRlVmFsaWRhdGlvbiIsImJpbmRVUFNSYXRlcyIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsImNvdW50cnlJZCIsImlzTmFOIiwiZXJyb3JNZXNzYWdlIiwiJGVsZSIsImVsZVZhbCIsIlVQU1JhdGVUb2dnbGUiLCIkZXN0aW1hdG9yRm9ybVVwcyIsIiRlc3RpbWF0b3JGb3JtRGVmYXVsdCIsInRvZ2dsZUNsYXNzIiwiJGxhc3QiLCJzdGF0ZUNvdW50cnkiLCJ1c2VJZEZvclN0YXRlcyIsImZpZWxkIiwiRXJyb3IiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJpcyIsIlZhbGlkYXRvcnMiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUiLCJ0b2dnbGVCdXR0b24iLCJidXR0b25TZWxlY3RvciIsIiR0b2dnbGVDb250YWluZXIiLCJjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUiLCJzZWxlY3RvclRvQWN0aXZhdGUiLCIkZXN0aW1hdG9yQ29udGFpbmVyIiwiJGVzdGltYXRvckZvcm0iLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwYXJhbXMiLCJjb3VudHJ5X2lkIiwic3RhdGVfaWQiLCJjaXR5IiwiemlwX2NvZGUiLCJnZXRTaGlwcGluZ1F1b3RlcyIsImNsaWNrRXZlbnQiLCJxdW90ZUlkIiwic3VibWl0U2hpcHBpbmdRdW90ZSIsIiRzY29wZSIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsIiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQiLCJoYXNPcHRpb25zIiwidHJpbSIsImhhc0RlZmF1bHRPcHRpb25zIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJvcHRpb25DaGFuZ2VDYWxsYmFjayIsIm9wdGlvbkNoYW5nZURlY29yYXRvciIsImNhbGwiLCJ1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyIsInVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMiLCJlYWNoIiwib3B0aW9uTGFiZWwiLCJjaGlsZHJlbiIsImlubmVyVGV4dCIsIm9wdGlvblRpdGxlIiwic3BsaXQiLCJyZXF1aXJlZCIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ0eXBlIiwiZ2V0QXR0cmlidXRlIiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJpc1NhdGlzZmllZCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNlbGVjdCIsInNlbGVjdGVkSW5kZXgiLCJkYXRlU3RyaW5nIiwibWFwIiwieCIsImNoZWNrZWQiLCJnZXRTZWxlY3RlZE9wdGlvbkxhYmVsIiwicHJvZHVjdFZhcmlhbnRzbGlzdCIsImNvbnZlcnRJbnRvQXJyYXkiLCJtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0IiwiaW5wdCIsImRhdGFzZXQiLCJwcm9kdWN0QXR0cmlidXRlVmFsdWUiLCJsYWJlbCIsImlzQnJvd3NlcklFIiwibGFiZWxzIiwidGl0bGUiLCJwcm9kdWN0VmFyaWFudCIsInNvcnQiLCJ2aWV3IiwicHJvZHVjdE5hbWUiLCJtYXRjaCIsImNhcmQiLCJQcm9kdWN0RGV0YWlsc0Jhc2UiLCJjZXJ0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d0NBLGNBQXpEOztBQUNBLFVBQUlFLElBQUksQ0FBQ2xHLElBQUwsQ0FBVSxpQkFBVixDQUFKLEVBQWtDO0FBQzlCa0csWUFBSSxDQUFDbEcsSUFBTCxDQUFVLHNCQUFWLEVBQWtDZ0csY0FBbEM7QUFDSCxPQUZELE1BRU87QUFDSCxZQUFNRyxXQUFXLEdBQUdELElBQUksQ0FBQ3BKLElBQUwsR0FBWXNKLEtBQVosQ0FBa0IsU0FBbEIsRUFBNkIsQ0FBN0IsQ0FBcEI7QUFDQSxZQUFNQyxJQUFJLEdBQUduUCxDQUFDLG1CQUFnQmlQLFdBQWhCLFNBQWQ7QUFDQUUsWUFBSSxDQUFDckcsSUFBTCxDQUFVLHNCQUFWLEVBQWtDZ0csY0FBbEM7QUFDSDtBQUNKO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTs7O1NBQ0lyQyx1QixHQUFBLGlDQUF3QjlMLElBQXhCLEVBQThCO0FBQzFCLGtDQUFNOEwsdUJBQU4sWUFBOEI5TCxJQUE5Qjs7QUFFQSxTQUFLb0wsTUFBTCxDQUFZM0ksSUFBWixDQUFpQixnQkFBakIsRUFBbUN3SCxXQUFuQyxDQUErQyxjQUEvQztBQUNILEc7OztFQXhJd0N3RSw2RDs7Ozs7Ozs7Ozs7Ozs7O0FDTDdDO0FBQWUseUVBQVVDLElBQVYsRUFBZ0I7QUFDM0IsTUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCLFdBQU8sS0FBUDtBQUNILEdBSDBCLENBSzNCOzs7QUFDQSxTQUFPLElBQVA7QUFDSCxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgeyBiaW5kLCBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZ2lmdENlcnRDaGVjayBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuaW1wb3J0IENhcnRJdGVtRGV0YWlscyBmcm9tICcuL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwgPSBudWxsO1xuICAgICAgICB0aGlzLiRjYXJ0Q29udGVudCA9ICQoJ1tkYXRhLWNhcnQtY29udGVudF0nKTtcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBpdGVtSWQ7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwYXJzZUludCgkZWwudmFsKCksIDEwKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnID8gb2xkUXR5ICsgMSA6IG9sZFF0eSAtIDE7XG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWluRXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xuICAgICAgICBsZXQgaW52YWxpZEVudHJ5O1xuXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKCFuZXdRdHkpIHtcbiAgICAgICAgICAgIGludmFsaWRFbnRyeSA9ICRlbC52YWwoKTtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IGAke2ludmFsaWRFbnRyeX0gaXMgbm90IGEgdmFsaWQgZW50cnlgLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1pbkVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWF4RXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVJlbW92ZShpdGVtSWQsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHsgcHJvZHVjdEZvckNoYW5nZUlkOiBwcm9kdWN0SWQsIC4uLnRoaXMuY29udGV4dCB9O1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLiRtb2RhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkKCcjbW9kYWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2NvbmZpZ3VyZS1wcm9kdWN0JyxcbiAgICAgICAgfTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgIHRoaXMuJG1vZGFsLmZpbmQoJy5tb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsIHRoaXMuJG1vZGFsKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0ID0gJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIuY3NzKCdoZWlnaHQnLCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgQ2FydEl0ZW1EZXRhaWxzKHRoaXMuJG1vZGFsLCBjb250ZXh0KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuXG4gICAgICAgICAgICBtb2RhbC5zZXR1cEZvY3VzYWJsZUVsZW1lbnRzKG1vZGFsVHlwZXMuQ0FSVF9DSEFOR0VfUFJPRFVDVCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJChjdXJyZW50VGFyZ2V0KS5maW5kKCdmb3JtJyk7XG4gICAgICAgICAgICBjb25zdCAkc3VibWl0ID0gJCgnaW5wdXQuYnV0dG9uJywgJGZvcm0pO1xuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hDb250ZW50KHJlbW92ZSkge1xuICAgICAgICBjb25zdCAkY2FydEl0ZW1zUm93cyA9ICQoJ1tkYXRhLWl0ZW0tcm93XScsIHRoaXMuJGNhcnRDb250ZW50KTtcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdjYXJ0L2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgIHRvdGFsczogJ2NhcnQvdG90YWxzJyxcbiAgICAgICAgICAgICAgICBwYWdlVGl0bGU6ICdjYXJ0L3BhZ2UtdGl0bGUnLFxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2VzOiAnY2FydC9zdGF0dXMtbWVzc2FnZXMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGFzdCBpdGVtIGZyb20gY2FydD8gUmVsb2FkXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q29udGVudChvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kY2FydENvbnRlbnQuaHRtbChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzLmh0bWwocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZXMpO1xuXG4gICAgICAgICAgICAkY2FydFBhZ2VUaXRsZS5yZXBsYWNlV2l0aChyZXNwb25zZS5wYWdlVGl0bGUpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIHRoaXMuJGNhcnRDb250ZW50KS5kYXRhKCdjYXJ0UXVhbnRpdHknKSB8fCAwO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG5cbiAgICAgICAgICAgICQoYFtkYXRhLWNhcnQtaXRlbWlkPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtSWR9J11gLCB0aGlzLiRjYXJ0Q29udGVudClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGBbZGF0YS1hY3Rpb249JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb259J11gKVxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kQ2FydEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgZGVib3VuY2VUaW1lb3V0ID0gNDAwO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGUsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNhcnRSZW1vdmVJdGVtID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRSZW1vdmVJdGVtLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgbGV0IHByZVZhbDtcblxuICAgICAgICAvLyBjYXJ0IHVwZGF0ZVxuICAgICAgICAkKCdbZGF0YS1jYXJ0LXVwZGF0ZV0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYXJ0IHF0eSBtYW51YWxseSB1cGRhdGVzXG4gICAgICAgICQoJy5jYXJ0LWl0ZW0tcXR5LWlucHV0JywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdmb2N1cycsIGZ1bmN0aW9uIG9uUXR5Rm9jdXMoKSB7XG4gICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9KS5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNhcnQtcmVtb3ZlJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb25maXJtRGVsZXRlJyk7XG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0ZW0gZnJvbSBjYXJ0XG4gICAgICAgICAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWVkaXRdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgncHJvZHVjdElkJyk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcbiAgICAgICAgICAgIHRoaXMuY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFByb21vQ29kZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xuICAgICAgICBjb25zdCAkY291cG9uRm9ybSA9ICQoJy5jb3Vwb24tZm9ybScpO1xuICAgICAgICBjb25zdCAkY29kZUlucHV0ID0gJCgnW25hbWU9XCJjb3Vwb25jb2RlXCJdJywgJGNvdXBvbkZvcm0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhpZGUoKTtcbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcbiAgICAgICAgICAgICRjb2RlSW5wdXQudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNvZGVJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gRW1wdHkgY29kZVxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICRjb2RlSW5wdXQuZGF0YSgnZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlDb2RlKGNvZGUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNlcnRGb3JtID0gJCgnLmNhcnQtZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0SW5wdXQgPSAkKCdbbmFtZT1cImNlcnRjb2RlXCJdJywgJGNlcnRGb3JtKTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjZXJ0SW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICghZ2lmdENlcnRDaGVjayhjb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY2VydElucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5R2lmdENlcnRpZmljYXRlKGNvZGUsIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCkge1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZ2lmdHdyYXBdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtR2lmdHdyYXAnKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9naWZ0LXdyYXBwaW5nLWZvcm0nLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyhpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdFdyYXBwaW5nRm9ybSgpIHtcbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHNlbGVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9ICRzZWxlY3QudmFsKCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICRzZWxlY3QuZGF0YSgnaW5kZXgnKTtcblxuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYWxsb3dNZXNzYWdlID0gJHNlbGVjdC5maW5kKGBvcHRpb25bdmFsdWU9JHtpZH1dYCkuZGF0YSgnYWxsb3dNZXNzYWdlJyk7XG5cbiAgICAgICAgICAgICQoYC5naWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9LSR7aWR9YCkuc2hvdygpO1xuXG4gICAgICAgICAgICBpZiAoYWxsb3dNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlVmlld3MoKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoJ2lucHV0OnJhZGlvW25hbWUgPVwiZ2lmdHdyYXB0eXBlXCJdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0ICRzaW5nbGVGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1zaW5nbGUnKTtcbiAgICAgICAgICAgIGNvbnN0ICRtdWx0aUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLW11bHRpcGxlJyk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NhbWUnKSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCdbbmFtZT1cImdpZnR3cmFwdHlwZVwiXScpLm9uKCdjbGljaycsIHRvZ2dsZVZpZXdzKTtcblxuICAgICAgICB0b2dnbGVWaWV3cygpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuYmluZENhcnRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kUHJvbW9Db2RlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKTtcblxuICAgICAgICAvLyBpbml0aWF0ZSBzaGlwcGluZyBlc3RpbWF0b3IgbW9kdWxlXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSBuZXcgU2hpcHBpbmdFc3RpbWF0b3IoJCgnW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXScpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBzd2FsIGZyb20gJy4uL2dsb2JhbC9zd2VldC1hbGVydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBwaW5nRXN0aW1hdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0Rm9ybVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMuYmluZEVzdGltYXRvckV2ZW50cygpO1xuICAgIH1cblxuICAgIGluaXRGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFc3RpbWF0b3JBbGVydCA9ICQoJy5zaGlwcGluZy1xdW90ZXMnKTtcblxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gZXN0aW1hdG9yIGVycm9yIG1lc3NhZ2VzIGFyZSBiZWluZyBpbmplY3RlZCBpbiBodG1sIGFzIGEgcmVzdWx0XG4gICAgICAgICAgICAvLyBvZiB1c2VyIHN1Ym1pdDsgY2xlYXJpbmcgYW5kIGFkZGluZyByb2xlIG9uIHN1Ym1pdCBwcm92aWRlc1xuICAgICAgICAgICAgLy8gcmVndWxhciBhbm5vdW5jZW1lbnQgb2YgdGhlc2UgZXJyb3IgbWVzc2FnZXNcbiAgICAgICAgICAgIGlmIChzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnKSkge1xuICAgICAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQucmVtb3ZlQXR0cigncm9sZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnLCAnYWxlcnQnKTtcbiAgICAgICAgICAgIC8vIFdoZW4gc3dpdGNoaW5nIGJldHdlZW4gY291bnRyaWVzLCB0aGUgc3RhdGUvcmVnaW9uIGlzIGR5bmFtaWNcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSBhIGNoZWNrIGZvciBhbGwgZmllbGRzIHdoZW4gY291bnRyeSBoYXMgYSB2YWx1ZVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XG4gICAgICAgICAgICBpZiAoJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kVVBTUmF0ZXMoKTtcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5SWQgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRyeUlkICE9PSAwICYmICFOdW1iZXIuaXNOYU4oY291bnRyeUlkKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnVGhlIFxcJ0NvdW50cnlcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlID0gJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVWYWwgPSAkZWxlLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnVGhlIFxcJ1N0YXRlL1Byb3ZpbmNlXFwnIGZpZWxkIGNhbm5vdCBiZSBibGFuay4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGJldHdlZW4gZGVmYXVsdCBzaGlwcGluZyBhbmQgdXBzIHNoaXBwaW5nIHJhdGVzXG4gICAgICovXG4gICAgYmluZFVQU1JhdGVzKCkge1xuICAgICAgICBjb25zdCBVUFNSYXRlVG9nZ2xlID0gJy5lc3RpbWF0b3ItZm9ybS10b2dnbGVVUFNSYXRlJztcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgVVBTUmF0ZVRvZ2dsZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybVVwcyA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tdXBzJyk7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1VcHMudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtRGVmYXVsdC50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xuICAgICAgICBsZXQgJGxhc3Q7XG5cbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxuICAgICAgICBzdGF0ZUNvdW50cnkodGhpcy4kc3RhdGUsIHRoaXMuY29udGV4dCwgeyB1c2VJZEZvclN0YXRlczogdHJ1ZSB9LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuZ2V0U3RhdHVzKHRoaXMuJHN0YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSh0aGlzLiRzdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZmllbGQuYXR0cigncGxhY2Vob2xkZXInLCAnU3RhdGUvcHJvdmluY2UnKTtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXaGVuIHlvdSBjaGFuZ2UgYSBjb3VudHJ5LCB5b3Ugc3dhcCB0aGUgc3RhdGUvcHJvdmluY2UgYmV0d2VlbiBhbiBpbnB1dCBhbmQgYSBzZWxlY3QgZHJvcGRvd25cbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZW1vdmUgdGhpcyBjbGFzcyB3aGVuIHdlIHN3YXAgc2luY2Ugbm9kIHZhbGlkYXRpb24gZG9lc24ndCBjbGVhbnVwIGZvciB1c1xuICAgICAgICAgICAgJCh0aGlzLnNoaXBwaW5nRXN0aW1hdG9yKS5maW5kKCcuZm9ybS1maWVsZC0tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdmb3JtLWZpZWxkLS1zdWNjZXNzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSh0b2dnbGVCdXR0b24sIGJ1dHRvblNlbGVjdG9yLCAkdG9nZ2xlQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSA9IChzZWxlY3RvclRvQWN0aXZhdGUpID0+IHtcbiAgICAgICAgICAgICQodG9nZ2xlQnV0dG9uKS5hdHRyKCdhcmlhLWxhYmVsbGVkYnknLCBzZWxlY3RvclRvQWN0aXZhdGUpO1xuICAgICAgICAgICAgJChidXR0b25TZWxlY3RvcikudGV4dCgkKGAjJHtzZWxlY3RvclRvQWN0aXZhdGV9YCkudGV4dCgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkKSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1jbG9zZScpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWFkZCcpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9ICF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZDtcbiAgICB9XG5cbiAgICBiaW5kRXN0aW1hdG9yRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yQ29udGFpbmVyID0gJCgnLnNoaXBwaW5nLWVzdGltYXRvcicpO1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcbiAgICAgICAgJGVzdGltYXRvckZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgc3RhdGVfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctc3RhdGVcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAkKCdbbmFtZT1cInNoaXBwaW5nLXppcFwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc2hpcHBpbmctcXVvdGVzJykuaHRtbChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cbiAgICAgICAgICAgICAgICAkKCcuc2VsZWN0LXNoaXBwaW5nLXF1b3RlJykub24oJ2NsaWNrJywgY2xpY2tFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1b3RlSWQgPSAkKCcuc2hpcHBpbmctcXVvdGU6Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzQmFzZSwgeyBvcHRpb25DaGFuZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3Byb2R1Y3QtZGV0YWlscy1iYXNlJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNCcm93c2VySUUsIGNvbnZlcnRJbnRvQXJyYXkgfSBmcm9tICcuL3V0aWxzL2llLWhlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0SXRlbURldGFpbHMgZXh0ZW5kcyBQcm9kdWN0RGV0YWlsc0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgY29udGV4dCwgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0ge30pIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBjb250ZXh0KTtcblxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJyNDYXJ0RWRpdFByb2R1Y3RGaWVsZHNGb3JtJywgdGhpcy4kc2NvcGUpO1xuICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNFbGVtZW50ID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgJGZvcm0pO1xuICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaGFzRGVmYXVsdE9wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ1tkYXRhLWRlZmF1bHRdJykubGVuZ3RoO1xuXG4gICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlQ2FsbGJhY2sgPSBvcHRpb25DaGFuZ2VEZWNvcmF0b3IuY2FsbCh0aGlzLCBoYXNEZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHByb2R1Y3QgYXR0cmlidXRlcy4gQWxzbyB1cGRhdGUgdGhlIGluaXRpYWwgdmlldyBpbiBjYXNlIGl0ZW1zIGFyZSBvb3NcbiAgICAgICAgLy8gb3IgaGF2ZSBkZWZhdWx0IHZhcmlhbnQgcHJvcGVydGllcyB0aGF0IGNoYW5nZSB0aGUgdmlld1xuICAgICAgICBpZiAoKGlzRW1wdHkocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKSB8fCBoYXNEZWZhdWx0T3B0aW9ucykgJiYgaGFzT3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gdGhpcy5jb250ZXh0LnByb2R1Y3RGb3JDaGFuZ2VJZDtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIG9wdGlvbkNoYW5nZUNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFByb2R1Y3RWYXJpYW50KCkge1xuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgICAgICAkLmVhY2goJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyksIChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gdmFsdWUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uVGl0bGUgPSBvcHRpb25MYWJlbC5zcGxpdCgnOicpWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB2YWx1ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUnKTtcblxuICAgICAgICAgICAgaWYgKCh0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInKSAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndGV4dGFyZWEnICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2F0aXNmaWVkID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2F0aXNmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5tYXAoKHgpID0+IHgudmFsdWUpLmpvaW4oJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2RhdGVTdHJpbmd9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBzZWxlY3Quc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtzZWxlY3Qub3B0aW9uc1tzZWxlY3RlZEluZGV4XS5pbm5lclRleHR9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAnc3dhdGNoJyB8fCB0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RWYXJpYW50c2xpc3QgPSBjb252ZXJ0SW50b0FycmF5KHZhbHVlLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQgPSBpbnB0ID0+IGlucHQuZGF0YXNldC5wcm9kdWN0QXR0cmlidXRlVmFsdWUgPT09IGNoZWNrZWQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdFZhcmlhbnRzbGlzdC5maWx0ZXIobWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dClbMF07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuaW5uZXJUZXh0LnRyaW0oKSA6IGNoZWNrZWQubGFiZWxzWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc3dhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5jaGlsZHJlblswXSA6IGNoZWNrZWQubGFiZWxzWzBdLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06WWVzYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpOb2ApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHByb2R1Y3RWYXJpYW50ID0gdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5sZW5ndGggPT09IDAgPyBvcHRpb25zLnNvcnQoKS5qb2luKCcsICcpIDogJ3Vuc2F0aXNmaWVkJztcbiAgICAgICAgY29uc3QgdmlldyA9ICQoJy5tb2RhbC1oZWFkZXItdGl0bGUnKTtcblxuICAgICAgICBpZiAocHJvZHVjdFZhcmlhbnQpIHtcbiAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50ID0gcHJvZHVjdFZhcmlhbnQgPT09ICd1bnNhdGlzZmllZCcgPyAnJyA6IHByb2R1Y3RWYXJpYW50O1xuICAgICAgICAgICAgaWYgKHZpZXcuYXR0cignZGF0YS1ldmVudC10eXBlJykpIHtcbiAgICAgICAgICAgICAgICB2aWV3LmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0TmFtZSA9IHZpZXcuaHRtbCgpLm1hdGNoKC8nKC4qPyknLylbMV07XG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZCA9ICQoYFtkYXRhLW5hbWU9XCIke3Byb2R1Y3ROYW1lfVwiXWApO1xuICAgICAgICAgICAgICAgIGNhcmQuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIG9yIG1hcmsgYXMgdW5hdmFpbGFibGUgb3V0IG9mIHN0b2NrIGF0dHJpYnV0ZXMgaWYgZW5hYmxlZFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xuICAgICAgICBzdXBlci51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCcubW9kYWwtY29udGVudCcpLnJlbW92ZUNsYXNzKCdoaWRlLWNvbnRlbnQnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9