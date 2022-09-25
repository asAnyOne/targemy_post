/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/addComment.js":
/*!**************************************!*\
  !*** ./src/js/modules/addComment.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const addComments = (url, inputSelector) => {
  const refresh_token = sessionStorage.getItem("refresh");
  const input = document.querySelector(inputSelector);
  input.addEventListener("change", e => {
    const inpValue = e.target.value.trim();

    if (inpValue.length) {
      const data = {
        type: "post",
        post_id: 113,
        card_id: 1
      };
      data.content = inpValue;
      data.refresh_token = sessionStorage.getItem("refresh");
      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          Authorization: refresh_token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(console.log).catch(console.log);
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (addComments);

/***/ }),

/***/ "./src/js/modules/comments-list.js":
/*!*****************************************!*\
  !*** ./src/js/modules/comments-list.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");


const commentsList = _ref => {
  let {
    url,
    parentSelector
  } = _ref;
  const parent = document.querySelector(parentSelector);
  let count = 2,
      offset = 0;

  const createCard = comments => {
    document.querySelector(".comment__block-text").textContent = `${comments._meta.totalCount}  комментариев`;
    comments.items.slice(offset, count).forEach(comment => {
      const {
        id,
        user_id,
        type,
        post_id,
        card_id,
        date_create,
        content
      } = comment;
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getData)(`${url}/user/${user_id}`).then(_ref2 => {
        let {
          first_name,
          last_name,
          updated_at
        } = _ref2;
        let date = (Date.parse(new Date()) - Date.parse(date_create)) / 60000;
        let timeMessage,
            second = date == 1,
            seconds = date > 2 && date < 60,
            minute = date < 120 && date > 60,
            minutes = date >= 120 && date < 3600,
            hour = date == 3600 && date < 7200,
            hours = date / 3600 > 1 && date / 3600 < 5,
            hourss = date / 3600 >= 5 && date / 3600 < 24,
            day = date / (3600 * 24) === 1 && date / (3600 * 24) < 2,
            days = date / (3600 * 24) > 1 && date / (3600 * 24) < 5,
            dayss = date / (3600 * 24) >= 5 && date / (3600 * 24) < 30,
            month = date / (3600 * 24 * 30) == 1 && date / (3600 * 24 * 30) < 1.5,
            months = date / (3600 * 24 * 30) > 1 && date / (3600 * 24 * 30) < 5,
            monthss = date / (3600 * 24 * 30) > 4 && date / (3600 * 24 * 30) < 12,
            year = date / (3600 * 24 * 365) === 1 && date / (3600 * 24 * 365) < 1.5,
            years = date / (3600 * 24 * 365) > 1 && date / (3600 * 24 * 365) < 5,
            yearss = date / (3600 * 24 * 365) > 5;
        second && date + " секунда";
        seconds && (timeMessage = date + " секунды");
        minute && (timeMessage = (date / 60).toFixed(0) + " минутa");
        minutes && (timeMessage = (date / 60).toFixed(0) + " минуты");
        hour && (timeMessage = (date / 3600).toFixed(0) + " час");
        hours && (timeMessage = (date / 3600).toFixed(0) + " часа");
        hourss && (timeMessage = (date / 3600).toFixed(0) + " часов");
        day && (timeMessage = (date / (3600 * 24)).toFixed(0) + " день");
        days && (timeMessage = (date / (3600 * 24)).toFixed(0) + " дня");
        dayss && (timeMessage = (date / (3600 * 24)).toFixed(0) + " дней");
        month && (timeMessage = (date / (3600 * 24 * 30)).toFixed(0) + " месяц");
        months && (timeMessage = (date / (3600 * 24 * 30)).toFixed(0) + " месяца");
        monthss && (timeMessage = (date / (3600 * 24 * 30)).toFixed(0) + " месяцев");
        year && (timeMessage = (date / (3600 * 24 * 365)).toFixed(0) + " год");
        years && (timeMessage = (date / (3600 * 24 * 365)).toFixed(0) + " года");
        yearss && (timeMessage = (date / (3600 * 24 * 365)).toFixed(0) + " лет");
        const commentCard = document.createElement("div");
        commentCard.classList.add("comment__card");
        commentCard.innerHTML = `
        <div class="comment__card-header">
        <img
          src="assets/images/user_avatar copy 10.jpg"
          alt="user"
          class="comment__card-img"
        />
        <div class="comment__card-title">
          <div class="comment__card-username"> ${first_name} ${last_name} </div>
          <div class="comment__card-time">${timeMessage} назад</div>
        </div>
        <div class="comment__card-menu">
          <img src="assets/images/icons/menu copy 3.svg" />
        </div>
      </div>
      <div class="comment__card-text">
      ${content}
      </div> 
        `;
        parent.appendChild(commentCard);
      });
    });
    offset += 2;
    count += 2;
  };

  document.querySelector(".comment__block-more").addEventListener("click", () => (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getData)(`${url}/comments`).then(createCard));
  (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getData)(`${url}/comments`).then(createCard);
};

/* harmony default export */ __webpack_exports__["default"] = (commentsList);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const forms = url => {
  const form = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");

  function clearInputs() {
    inputs.forEach(input => input.value = "");
  }

  const statusMessage = {
    loading: "Loading...",
    success: "Sending successfully",
    error: "Something went wrong",
    spinner: "assets/images/spinner.gif",
    ok: "assets/images/ok.png",
    fail: "assets/images/fail.png"
  };
  form.forEach(item => {
    item.addEventListener("submit", e => {
      e.preventDefault();
      const status = document.createElement("div");
      status.classList.add("status");
      item.parentNode.appendChild(status);
      setTimeout(() => {
        item.style.display = "none";
      }, 400);
      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", statusMessage.spinner);
      status.appendChild(statusImg);
      let statusText = document.createElement("div");
      statusText.textContent = statusMessage.loading;
      status.appendChild(statusText);
      const formData = new FormData(item);
      const obj = {};
      formData.forEach((val, key) => {
        obj[key] = val;
      });
      const {
        email,
        password
      } = obj;
      console.log(email, password);
      const key = {
        basic: window.btoa(`${email}:${password}`)
      };
      console.log(key);
      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(key)
      }).then(res => res.json()).then(res => {
        console.log(res);
        res && sessionStorage.setItem("access", res.data.access_token) || sessionStorage.setItem("refresh", res.data.refresh_token);
        statusImg.setAttribute("src", statusMessage.ok);
        statusText.textContent = statusMessage.success;
      }).catch(() => {
        statusImg.setAttribute("src", statusMessage.fail);
        statusText.textContent = statusMessage.error;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          status.remove();
          item.style.display = "block";
        }, 5000);
      });
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const modals = () => {
  function closeModal(windows) {
    windows.forEach(item => item.style.display = "none");
    document.body.style.overflow = "";
  }

  function showModal(e, windows, modal) {
    e.preventDefault();
    windows.forEach(item => item.style.display = "none");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          closeBtn = modal.querySelector(closeSelector),
          windows = document.querySelectorAll("[data-modal]");
    trigger.forEach(item => item.addEventListener("click", e => e.target && !sessionStorage.getItem("access") && showModal(e, windows, modal)));
    closeBtn.addEventListener("click", () => closeModal(windows));
    modal.addEventListener("click", e => e.target === modal && closeModal(windows));
  }

  if (!sessionStorage.getItem("access") && !sessionStorage.getItem("refresh")) {
    bindModal(".comment__block-input", ".popup", ".popup_close");
  }
};

/* harmony default export */ __webpack_exports__["default"] = (modals);

/***/ }),

/***/ "./src/js/modules/posts.js":
/*!*********************************!*\
  !*** ./src/js/modules/posts.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");
/* harmony import */ var _search_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-panel */ "./src/js/modules/search-panel.js");



const posts = _ref => {
  let {
    url,
    parentSelector
  } = _ref;
  const parent = document.querySelector(parentSelector);
  const rndPostId = (Math.random() * 100).toFixed(0);

  const showPost = (data, value) => {
    if (data.photo_cover) {
      const img = document.createElement("img");
      img.setAttribute("src", data.photo_cover);
      img.setAttribute("alt", "postImage");
      img.classList.add("post-img");
      parent.appendChild(img);
    } else {
      const message = document.createElement("p");
      message.style.cssText = "color:gray; font-size:2rem;margin:40px;line-height:2rem;";
      message.textContent = `У поста с ID номером ${value || rndPostId} нет фото`;
      parent.appendChild(message);
    }
  };

  (0,_search_panel__WEBPACK_IMPORTED_MODULE_1__["default"])({
    url,
    inputSelector: ".search__panel-input",
    searchIcon: ".search__panel-icon",
    callback: showPost
  });
  (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getData)(`${url}/post/${rndPostId}`).then(showPost);
};

/* harmony default export */ __webpack_exports__["default"] = (posts);

/***/ }),

/***/ "./src/js/modules/search-panel.js":
/*!****************************************!*\
  !*** ./src/js/modules/search-panel.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");


const serchPanel = _ref => {
  let {
    url,
    inputSelector,
    searchIcon,
    callback
  } = _ref;
  const inp = document.querySelector(inputSelector);
  const searchBtn = document.querySelector(searchIcon);
  searchBtn.addEventListener("click", e => {
    let input = e.target.nextElementSibling;

    if (input.value && typeof +input.value === "number" && !isNaN(+input.value)) {
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getData)(`${url}/post/${input.value}`).then(res => {
        callback(res, input.value);
      });
      input.value = "";
    } else {
      input.setAttribute("placeholder", "введитe числы");
      input.value = "";
    }
  });
  inp.addEventListener("change", e => {
    if (typeof +e.target.value === "number" && !isNaN(+e.target.value)) {
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getData)(`${url}/post/${inp.value}`).then(res => {
        callback(res, inp.value);
        inp.value = "";
      }).catch(e => console.log(e));
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (serchPanel);

/***/ }),

/***/ "./src/js/services/requests.js":
/*!*************************************!*\
  !*** ./src/js/services/requests.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": function() { return /* binding */ getData; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    body: data
  });
  return await res.text();
};
const getData = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_addComment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/addComment */ "./src/js/modules/addComment.js");
/* harmony import */ var _modules_comments_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/comments-list */ "./src/js/modules/comments-list.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_posts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/posts */ "./src/js/modules/posts.js");





window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const url = "https://api.stage.targemy.com/v1";
  (0,_modules_comments_list__WEBPACK_IMPORTED_MODULE_1__["default"])({
    url,
    parentSelector: ".comment__block-cards"
  });
  (0,_modules_posts__WEBPACK_IMPORTED_MODULE_4__["default"])({
    url,
    parentSelector: ".post"
  });
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(url);
  (0,_modules_addComment__WEBPACK_IMPORTED_MODULE_0__["default"])(`${url}/auth/login`, ".comment__block-input");
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map