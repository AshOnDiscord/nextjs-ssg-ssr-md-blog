"use strict";
(() => {
var exports = {};
exports.id = 889;
exports.ids = [889];
exports.modules = {

/***/ 1:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

var _firebaseToken_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache;
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Post),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var remark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(774);
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(809);
/* harmony import */ var remark_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(740);
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(263);
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(929);
/* harmony import */ var _firebaseToken_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(599);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([remark__WEBPACK_IMPORTED_MODULE_1__, remark_gfm__WEBPACK_IMPORTED_MODULE_2__, remark_html__WEBPACK_IMPORTED_MODULE_3__, firebase_admin_app__WEBPACK_IMPORTED_MODULE_4__, firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_5__]);
([remark__WEBPACK_IMPORTED_MODULE_1__, remark_gfm__WEBPACK_IMPORTED_MODULE_2__, remark_html__WEBPACK_IMPORTED_MODULE_3__, firebase_admin_app__WEBPACK_IMPORTED_MODULE_4__, firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function Post(props) {
    if (!props) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
            children: "404"
        });
    }
    //console.log(props)
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "md h-screen",
        dangerouslySetInnerHTML: {
            __html: props.html
        }
    });
}
async function getStaticPaths() {
    // ...
    return {
        paths: [
            {
                // You can add a cache of posts by getting a list of ids every build
                params: {
                    pid: "markdown-blog"
                }
            }
        ],
        // In case a new post is created after the build or we don't implement the cache which we should do since it greatly decreases load speeds
        fallback: "blocking"
    };
}
async function getStaticProps({ params  }) {
    const app = (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_4__.initializeApp)({
        credential: (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_4__.cert)(/*#__PURE__*/ (_firebaseToken_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache || (_firebaseToken_json__WEBPACK_IMPORTED_MODULE_6___namespace_cache = __webpack_require__.t(_firebaseToken_json__WEBPACK_IMPORTED_MODULE_6__, 2))))
    });
    const db = (0,firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_5__.getFirestore)();
    const doc = await db.collection("posts").doc(params.pid).get();
    // console.log(doc)
    (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_4__.deleteApp)(app);
    let mdHtml = "";
    if (doc.exists) {
        const md = doc?.data()?.md;
        const processed = await (0,remark__WEBPACK_IMPORTED_MODULE_1__.remark)().use(remark_gfm__WEBPACK_IMPORTED_MODULE_2__["default"]).use(remark_html__WEBPACK_IMPORTED_MODULE_3__["default"]).process(md);
        mdHtml = processed.toString();
    }
    return {
        props: {
            html: mdHtml
        }
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 263:
/***/ ((module) => {

module.exports = import("firebase-admin/app");;

/***/ }),

/***/ 929:
/***/ ((module) => {

module.exports = import("firebase-admin/firestore");;

/***/ }),

/***/ 774:
/***/ ((module) => {

module.exports = import("remark");;

/***/ }),

/***/ 809:
/***/ ((module) => {

module.exports = import("remark-gfm");;

/***/ }),

/***/ 740:
/***/ ((module) => {

module.exports = import("remark-html");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [599], () => (__webpack_exec__(1)));
module.exports = __webpack_exports__;

})();