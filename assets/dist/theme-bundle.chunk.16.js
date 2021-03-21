(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var leftArrowKey = 37;
var rightArrowKey = 39;

var Search = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);

  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }

  var _proto = Search.prototype;

  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;

    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };

    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }

    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }

    return nodeData;
  };

  _proto.showProducts = function showProducts(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }

    this.$productListingContainer.removeClass('u-hidden');
    this.$facetedSearchContainer.removeClass('u-hidden');
    this.$contentResultsContainer.addClass('u-hidden');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-product-results-toggle]'));

    if (!navigate) {
      return;
    }

    var searchData = $('#search-results-product-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].goToUrl(url);
  };

  _proto.showContent = function showContent(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }

    this.$contentResultsContainer.removeClass('u-hidden');
    this.$productListingContainer.addClass('u-hidden');
    this.$facetedSearchContainer.addClass('u-hidden');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-content-results-toggle]'));

    if (!navigate) {
      return;
    }

    var searchData = $('#search-results-content-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].goToUrl(url);
  };

  _proto.activateTab = function activateTab($tabToActivate) {
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    $tabsCollection.each(function (idx, tab) {
      var $tab = $(tab);

      if ($tab.is($tabToActivate)) {
        $tab.removeAttr('tabindex');
        $tab.attr('aria-selected', true);
        return;
      }

      $tab.attr('tabindex', '-1');
      $tab.attr('aria-selected', false);
    });
  };

  _proto.onTabChangeWithArrows = function onTabChangeWithArrows(event) {
    var eventKey = event.which;
    var isLeftOrRightArrowKeydown = eventKey === leftArrowKey || eventKey === rightArrowKey;
    if (!isLeftOrRightArrowKeydown) return;
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    var isActiveElementNotTab = $tabsCollection.index($(document.activeElement)) === -1;
    if (isActiveElementNotTab) return;
    var $activeTab = $("#" + document.activeElement.id);
    var activeTabIdx = $tabsCollection.index($activeTab);
    var lastTabIdx = $tabsCollection.length - 1;
    var nextTabIdx;

    switch (eventKey) {
      case leftArrowKey:
        nextTabIdx = activeTabIdx === 0 ? lastTabIdx : activeTabIdx - 1;
        break;

      case rightArrowKey:
        nextTabIdx = activeTabIdx === lastTabIdx ? 0 : activeTabIdx + 1;
        break;

      default:
        break;
    }

    $($tabsCollection.get(nextTabIdx)).focus().trigger('click');
  };

  _proto.onReady = function onReady() {
    var _this2 = this;

    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_3__["default"])(this.context.urls);
    this.arrangeFocusOnSortBy();
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content'); // Init faceted search

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    } // Init collapsibles


    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_6__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showContent();
    });
    $('[data-search-page-tabs]').on('keyup', this.onTabChangeWithArrows);

    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent(false);
    } else {
      this.showProducts(false);
    }

    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();

      if (!validator.check()) {
        return event.preventDefault();
      }

      $searchForm.find('input[name="category\[\]"]').remove();

      for (var _iterator = _createForOfIteratorHelperLoose(selectedCategoryIds), _step; !(_step = _iterator()).done;) {
        var categoryId = _step.value;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
    setTimeout(function () {
      $('[data-search-aria-message]').removeClass('u-hidden');
    }, 100);
  };

  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;

    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };

  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;

    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this5 = this;

    // eslint-disable-next-line object-curly-newline
    var _this$context = this.context,
        onMinPriceError = _this$context.onMinPriceError,
        onMaxPriceError = _this$context.onMaxPriceError,
        minPriceNotEntered = _this$context.minPriceNotEntered,
        maxPriceNotEntered = _this$context.maxPriceNotEntered,
        onInvalidPrice = _this$context.onInvalidPrice;
    var $productListingContainer = $('#product-listing-container');
    var $contentListingContainer = $('#search-results-content');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var $contentCount = $('#search-results-content-count');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'search/product-listing',
        contentListing: 'search/content-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count',
        contentCount: 'search/content-count'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__["default"](requestOptions, function (content) {
      $searchHeading.html(content.heading);
      var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);

      if (url.query.section === 'content') {
        $contentListingContainer.html(content.contentListing);
        $contentCount.html(content.contentCount);

        _this5.showContent(false);
      } else {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);
        $searchCount.html(content.productCount);

        _this5.showProducts(false);
      }

      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_8__["default"])({
      submit: $form
    });
    return this;
  };

  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }

    return this;
  };

  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }

    return false;
  };

  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImxlZnRBcnJvd0tleSIsInJpZ2h0QXJyb3dLZXkiLCJTZWFyY2giLCJmb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUiLCJub2RlIiwibm9kZURhdGEiLCJ0ZXh0IiwiZGF0YSIsImlkIiwibWV0YWRhdGEiLCJzdGF0ZSIsInNlbGVjdGVkIiwib3BlbmVkIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGROb2RlIiwicHVzaCIsInNob3dQcm9kdWN0cyIsIm5hdmlnYXRlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsIiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciIsImFkZENsYXNzIiwiJCIsImFjdGl2YXRlVGFiIiwic2VhcmNoRGF0YSIsInVybCIsImNvdW50IiwidXJsVXRpbHMiLCJyZXBsYWNlUGFyYW1zIiwicGFnZSIsImdvVG9VcmwiLCJzaG93Q29udGVudCIsIiR0YWJUb0FjdGl2YXRlIiwiJHRhYnNDb2xsZWN0aW9uIiwiZmluZCIsImVhY2giLCJpZHgiLCJ0YWIiLCIkdGFiIiwiaXMiLCJyZW1vdmVBdHRyIiwiYXR0ciIsIm9uVGFiQ2hhbmdlV2l0aEFycm93cyIsImV2ZW50IiwiZXZlbnRLZXkiLCJ3aGljaCIsImlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24iLCJpc0FjdGl2ZUVsZW1lbnROb3RUYWIiLCJpbmRleCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIiRhY3RpdmVUYWIiLCJhY3RpdmVUYWJJZHgiLCJsYXN0VGFiSWR4IiwibGVuZ3RoIiwibmV4dFRhYklkeCIsImdldCIsImZvY3VzIiwidHJpZ2dlciIsIm9uUmVhZHkiLCJjb21wYXJlUHJvZHVjdHMiLCJjb250ZXh0IiwidXJscyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiJHNlYXJjaEZvcm0iLCIkY2F0ZWdvcnlUcmVlQ29udGFpbmVyIiwiVXJsIiwicGFyc2UiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0cmVlRGF0YSIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJvbiIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInByZXZlbnREZWZhdWx0IiwicXVlcnkiLCJzZWN0aW9uIiwidmFsaWRhdG9yIiwiaW5pdFZhbGlkYXRpb24iLCJiaW5kVmFsaWRhdGlvbiIsImNhdGVnb3J5VHJlZSIsImNhdGVnb3J5VHJlZURhdGEiLCJjcmVhdGVDYXRlZ29yeVRyZWUiLCJzZWxlY3RlZENhdGVnb3J5SWRzIiwianN0cmVlIiwiZ2V0X3NlbGVjdGVkIiwiY2hlY2siLCJyZW1vdmUiLCJjYXRlZ29yeUlkIiwiaW5wdXQiLCJ0eXBlIiwibmFtZSIsInZhbHVlIiwiYXBwZW5kIiwic2V0VGltZW91dCIsImxvYWRUcmVlTm9kZXMiLCJjYiIsImFqYXgiLCJzZWxlY3RlZENhdGVnb3J5SWQiLCJwcmVmaXgiLCJoZWFkZXJzIiwiQkNEYXRhIiwiY3NyZl90b2tlbiIsImRvbmUiLCJmb3JtYXR0ZWRSZXN1bHRzIiwiZGF0YU5vZGUiLCIkY29udGFpbmVyIiwidHJlZU9wdGlvbnMiLCJjb3JlIiwidGhlbWVzIiwiaWNvbnMiLCJjaGVja2JveCIsInRocmVlX3N0YXRlIiwicGx1Z2lucyIsIm9uTWluUHJpY2VFcnJvciIsIm9uTWF4UHJpY2VFcnJvciIsIm1pblByaWNlTm90RW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwiJGNvbnRlbnRMaXN0aW5nQ29udGFpbmVyIiwiJHNlYXJjaEhlYWRpbmciLCIkc2VhcmNoQ291bnQiLCIkY29udGVudENvdW50IiwicHJvZHVjdHNQZXJQYWdlIiwic2VhcmNoUHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiY29udGVudExpc3RpbmciLCJzaWRlYmFyIiwiaGVhZGluZyIsInByb2R1Y3RDb3VudCIsImNvbnRlbnRDb3VudCIsImNvbmZpZyIsInByb2R1Y3RfcmVzdWx0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCIkZm9ybSIsIm5vZCIsInN1Ym1pdCIsIiRlbGVtZW50IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImVycm9yTWVzc2FnZSIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsIkNhdGFsb2dQYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxZQUFZLEdBQUcsRUFBckI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsRUFBdEI7O0lBRXFCQyxNOzs7Ozs7Ozs7U0FDakJDLDJCLEdBQUEscUNBQTRCQyxJQUE1QixFQUFrQztBQUFBOztBQUM5QixRQUFNQyxRQUFRLEdBQUc7QUFDYkMsVUFBSSxFQUFFRixJQUFJLENBQUNHLElBREU7QUFFYkMsUUFBRSxFQUFFSixJQUFJLENBQUNLLFFBQUwsQ0FBY0QsRUFGTDtBQUdiRSxXQUFLLEVBQUU7QUFDSEMsZ0JBQVEsRUFBRVAsSUFBSSxDQUFDTztBQURaO0FBSE0sS0FBakI7O0FBUUEsUUFBSVAsSUFBSSxDQUFDTSxLQUFULEVBQWdCO0FBQ1pMLGNBQVEsQ0FBQ0ssS0FBVCxDQUFlRSxNQUFmLEdBQXdCUixJQUFJLENBQUNNLEtBQUwsS0FBZSxNQUF2QztBQUNBTCxjQUFRLENBQUNRLFFBQVQsR0FBb0IsSUFBcEI7QUFDSDs7QUFFRCxRQUFJVCxJQUFJLENBQUNTLFFBQVQsRUFBbUI7QUFDZlIsY0FBUSxDQUFDUSxRQUFULEdBQW9CLEVBQXBCO0FB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TCxHQUFpQnFFLDJEQUFHLENBQUM7QUFDakJDLFlBQU0sRUFBRUY7QUFEUyxLQUFELENBQXBCO0FBSUEsV0FBTyxJQUFQO0FBQ0gsRzs7U0FFRGxFLGMsR0FBQSx3QkFBZXFFLFFBQWYsRUFBeUI7QUFDckIsUUFBSSxLQUFLdkUsU0FBVCxFQUFvQjtBQUNoQixXQUFLQSxTQUFMLENBQWV3RSxHQUFmLENBQW1CO0FBQ2ZDLGdCQUFRLEVBQUVGLFFBREs7QUFFZkcsZ0JBQVEsRUFBRSxVQUZLO0FBR2ZDLG9CQUFZLEVBQUVKLFFBQVEsQ0FBQ25KLElBQVQsQ0FBYyxjQUFkO0FBSEMsT0FBbkI7QUFLSDs7QUFFRCxXQUFPLElBQVA7QUFDSCxHOztTQUVEcUYsSyxHQUFBLGlCQUFRO0FBQ0osUUFBSSxLQUFLVCxTQUFULEVBQW9CO0FBQ2hCLFdBQUtBLFNBQUwsQ0FBZTRFLFlBQWY7QUFDQSxhQUFPLEtBQUs1RSxTQUFMLENBQWU2RSxNQUFmLENBQXNCLE9BQXRCLENBQVA7QUFDSDs7QUFFRCxXQUFPLEtBQVA7QUFDSCxHOzs7RUEzVStCQyxnRCIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgJ2pzdHJlZSc7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5cbmNvbnN0IGxlZnRBcnJvd0tleSA9IDM3O1xuY29uc3QgcmlnaHRBcnJvd0tleSA9IDM5O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlKG5vZGUpIHtcbiAgICAgICAgY29uc3Qgbm9kZURhdGEgPSB7XG4gICAgICAgICAgICB0ZXh0OiBub2RlLmRhdGEsXG4gICAgICAgICAgICBpZDogbm9kZS5tZXRhZGF0YS5pZCxcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IG5vZGUuc2VsZWN0ZWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChub2RlLnN0YXRlKSB7XG4gICAgICAgICAgICBub2RlRGF0YS5zdGF0ZS5vcGVuZWQgPSBub2RlLnN0YXRlID09PSAnb3Blbic7XG4gICAgICAgICAgICBub2RlRGF0YS5jaGlsZHJlbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4ucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShjaGlsZE5vZGUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVEYXRhO1xuICAgIH1cblxuICAgIHNob3dQcm9kdWN0cyhuYXZpZ2F0ZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJGZhY2V0ZWRTZWFyY2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XG5cbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcblxuICAgICAgICB0aGlzLmFjdGl2YXRlVGFiKCQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykpO1xuXG4gICAgICAgIGlmICghbmF2aWdhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaERhdGEgPSAkKCcjc2VhcmNoLXJlc3VsdHMtcHJvZHVjdC1jb3VudCBzcGFuJykuZGF0YSgpO1xuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICB9KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gICAgfVxuXG4gICAgc2hvd0NvbnRlbnQobmF2aWdhdGUgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5hZGRDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xuXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5hZGRDbGFzcygnbmF2QmFyLWFjdGlvbi1jb2xvci0tYWN0aXZlJyk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYigkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpKTtcblxuICAgICAgICBpZiAoIW5hdmlnYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hEYXRhID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQtY291bnQgc3BhbicpLmRhdGEoKTtcbiAgICAgICAgY29uc3QgdXJsID0gKHNlYXJjaERhdGEuY291bnQgPiAwKSA/IHNlYXJjaERhdGEudXJsIDogdXJsVXRpbHMucmVwbGFjZVBhcmFtcyhzZWFyY2hEYXRhLnVybCwge1xuICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuICAgIH1cblxuICAgIGFjdGl2YXRlVGFiKCR0YWJUb0FjdGl2YXRlKSB7XG4gICAgICAgIGNvbnN0ICR0YWJzQ29sbGVjdGlvbiA9ICQoJ1tkYXRhLXNlYXJjaC1wYWdlLXRhYnNdJykuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKTtcblxuICAgICAgICAkdGFic0NvbGxlY3Rpb24uZWFjaCgoaWR4LCB0YWIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YWIgPSAkKHRhYik7XG5cbiAgICAgICAgICAgIGlmICgkdGFiLmlzKCR0YWJUb0FjdGl2YXRlKSkge1xuICAgICAgICAgICAgICAgICR0YWIucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICAgICAgICAkdGFiLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICR0YWIuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgICAgICR0YWIuYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25UYWJDaGFuZ2VXaXRoQXJyb3dzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQud2hpY2g7XG4gICAgICAgIGNvbnN0IGlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24gPSBldmVudEtleSA9PT0gbGVmdEFycm93S2V5XG4gICAgICAgICAgICB8fCBldmVudEtleSA9PT0gcmlnaHRBcnJvd0tleTtcbiAgICAgICAgaWYgKCFpc0xlZnRPclJpZ2h0QXJyb3dLZXlkb3duKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgJHRhYnNDb2xsZWN0aW9uID0gJCgnW2RhdGEtc2VhcmNoLXBhZ2UtdGFic10nKS5maW5kKCdbcm9sZT1cInRhYlwiXScpO1xuXG4gICAgICAgIGNvbnN0IGlzQWN0aXZlRWxlbWVudE5vdFRhYiA9ICR0YWJzQ29sbGVjdGlvbi5pbmRleCgkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSA9PT0gLTE7XG4gICAgICAgIGlmIChpc0FjdGl2ZUVsZW1lbnROb3RUYWIpIHJldHVybjtcblxuICAgICAgICBjb25zdCAkYWN0aXZlVGFiID0gJChgIyR7ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZH1gKTtcbiAgICAgICAgY29uc3QgYWN0aXZlVGFiSWR4ID0gJHRhYnNDb2xsZWN0aW9uLmluZGV4KCRhY3RpdmVUYWIpO1xuICAgICAgICBjb25zdCBsYXN0VGFiSWR4ID0gJHRhYnNDb2xsZWN0aW9uLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgbGV0IG5leHRUYWJJZHg7XG4gICAgICAgIHN3aXRjaCAoZXZlbnRLZXkpIHtcbiAgICAgICAgY2FzZSBsZWZ0QXJyb3dLZXk6XG4gICAgICAgICAgICBuZXh0VGFiSWR4ID0gYWN0aXZlVGFiSWR4ID09PSAwID8gbGFzdFRhYklkeCA6IGFjdGl2ZVRhYklkeCAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSByaWdodEFycm93S2V5OlxuICAgICAgICAgICAgbmV4dFRhYklkeCA9IGFjdGl2ZVRhYklkeCA9PT0gbGFzdFRhYklkeCA/IDAgOiBhY3RpdmVUYWJJZHggKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgkdGFic0NvbGxlY3Rpb24uZ2V0KG5leHRUYWJJZHgpKS5mb2N1cygpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dC51cmxzKTtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgIGNvbnN0ICRzZWFyY2hGb3JtID0gJCgnW2RhdGEtYWR2YW5jZWQtc2VhcmNoLWZvcm1dJyk7XG4gICAgICAgIGNvbnN0ICRjYXRlZ29yeVRyZWVDb250YWluZXIgPSAkc2VhcmNoRm9ybS5maW5kKCdbZGF0YS1zZWFyY2gtY2F0ZWdvcnktdHJlZV0nKTtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgdHJlZURhdGEgPSBbXTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50Jyk7XG5cbiAgICAgICAgLy8gSW5pdCBmYWNldGVkIHNlYXJjaFxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2VhcmNoLXBhZ2UtdGFic10nKS5vbigna2V5dXAnLCB0aGlzLm9uVGFiQ2hhbmdlV2l0aEFycm93cyk7XG5cbiAgICAgICAgaWYgKHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmZpbmQoJ2xpLnByb2R1Y3QnKS5sZW5ndGggPT09IDAgfHwgdXJsLnF1ZXJ5LnNlY3Rpb24gPT09ICdjb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0cyhmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSB0aGlzLmluaXRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtKVxuICAgICAgICAgICAgLmJpbmRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtLmZpbmQoJyNzZWFyY2hfcXVlcnlfYWR2JykpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dC5jYXRlZ29yeVRyZWUuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgdHJlZURhdGEucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShub2RlKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSA9IHRyZWVEYXRhO1xuICAgICAgICB0aGlzLmNyZWF0ZUNhdGVnb3J5VHJlZSgkY2F0ZWdvcnlUcmVlQ29udGFpbmVyKTtcblxuICAgICAgICAkc2VhcmNoRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeUlkcyA9ICRjYXRlZ29yeVRyZWVDb250YWluZXIuanN0cmVlKCkuZ2V0X3NlbGVjdGVkKCk7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yLmNoZWNrKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNlYXJjaEZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNhdGVnb3J5XFxbXFxdXCJdJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlJZCBvZiBzZWxlY3RlZENhdGVnb3J5SWRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSAkKCc8aW5wdXQ+Jywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NhdGVnb3J5W10nLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzZWFyY2hGb3JtLmFwcGVuZChpbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgnW2RhdGEtc2VhcmNoLWFyaWEtbWVzc2FnZV0nKS5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBsb2FkVHJlZU5vZGVzKG5vZGUsIGNiKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvcmVtb3RlL3YxL2NhdGVnb3J5LXRyZWUnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2F0ZWdvcnlJZDogbm9kZS5pZCxcbiAgICAgICAgICAgICAgICBwcmVmaXg6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICd4LXhzcmYtdG9rZW4nOiB3aW5kb3cuQkNEYXRhICYmIHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA/IHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA6ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChkYXRhTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShkYXRhTm9kZSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNiKGZvcm1hdHRlZFJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVDYXRlZ29yeVRyZWUoJGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCB0cmVlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvcmU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAobm9kZSwgY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUm9vdCBub2RlXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlkID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMYXp5IGxvYWRlZCBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkVHJlZU5vZGVzKG5vZGUsIGNiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhlbWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tib3g6IHtcbiAgICAgICAgICAgICAgICB0aHJlZV9zdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgICdjaGVja2JveCcsXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuXG4gICAgICAgICRjb250YWluZXIuanN0cmVlKHRyZWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgICAgIGNvbnN0IHsgb25NaW5QcmljZUVycm9yLCBvbk1heFByaWNlRXJyb3IsIG1pblByaWNlTm90RW50ZXJlZCwgbWF4UHJpY2VOb3RFbnRlcmVkLCBvbkludmFsaWRQcmljZSB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkY29udGVudExpc3RpbmdDb250YWluZXIgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudCcpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJHNlYXJjaEhlYWRpbmcgPSAkKCcjc2VhcmNoLXJlc3VsdHMtaGVhZGluZycpO1xuICAgICAgICBjb25zdCAkc2VhcmNoQ291bnQgPSAkKCcjc2VhcmNoLXJlc3VsdHMtcHJvZHVjdC1jb3VudCcpO1xuICAgICAgICBjb25zdCAkY29udGVudENvdW50ID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQtY291bnQnKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LnNlYXJjaFByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnc2VhcmNoL3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgY29udGVudExpc3Rpbmc6ICdzZWFyY2gvY29udGVudC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnc2VhcmNoL3NpZGViYXInLFxuICAgICAgICAgICAgICAgIGhlYWRpbmc6ICdzZWFyY2gvaGVhZGluZycsXG4gICAgICAgICAgICAgICAgcHJvZHVjdENvdW50OiAnc2VhcmNoL3Byb2R1Y3QtY291bnQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRDb3VudDogJ3NlYXJjaC9jb250ZW50LWNvdW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0X3Jlc3VsdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnc2VhcmNoL3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkc2VhcmNoSGVhZGluZy5odG1sKGNvbnRlbnQuaGVhZGluZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAodXJsLnF1ZXJ5LnNlY3Rpb24gPT09ICdjb250ZW50Jykge1xuICAgICAgICAgICAgICAgICRjb250ZW50TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQuY29udGVudExpc3RpbmcpO1xuICAgICAgICAgICAgICAgICRjb250ZW50Q291bnQuaHRtbChjb250ZW50LmNvbnRlbnRDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcbiAgICAgICAgICAgICAgICAkc2VhcmNoQ291bnQuaHRtbChjb250ZW50LnByb2R1Y3RDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0VmFsaWRhdGlvbigkZm9ybSkge1xuICAgICAgICB0aGlzLiRmb3JtID0gJGZvcm07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJGZvcm0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCRlbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAkZWxlbWVudC5kYXRhKCdlcnJvck1lc3NhZ2UnKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=