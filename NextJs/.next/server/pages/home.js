"use strict";
(() => {
var exports = {};
exports.id = 229;
exports.ids = [229];
exports.modules = {

/***/ 994:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

var _firebaseToken_json__WEBPACK_IMPORTED_MODULE_3___namespace_cache;
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(263);
/* harmony import */ var firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(929);
/* harmony import */ var _firebaseToken_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(599);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__, firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__, firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




function Home(props) {
    const posts = props.posts ? JSON.parse(props.posts) : null;
    if (!posts) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
            children: "No posts"
        });
    }
    console.log(posts);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
        children: posts.map((post)=>{
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: `/posts/${post.id}`,
                    children: post.data.md.split("\n")[0].slice(2)
                })
            }, post.id);
        })
    });
}
async function getStaticProps() {
    const app = (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__.initializeApp)({
        credential: (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__.cert)(/*#__PURE__*/ (_firebaseToken_json__WEBPACK_IMPORTED_MODULE_3___namespace_cache || (_firebaseToken_json__WEBPACK_IMPORTED_MODULE_3___namespace_cache = __webpack_require__.t(_firebaseToken_json__WEBPACK_IMPORTED_MODULE_3__, 2))))
    });
    const db = (0,firebase_admin_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)();
    const posts = await db.collection("posts").limit(25).get();
    (0,firebase_admin_app__WEBPACK_IMPORTED_MODULE_1__.deleteApp)(app);
    console.log(posts);
    return {
        props: {
            posts: posts.empty ? null : JSON.stringify(posts.docs.map((doc)=>{
                return {
                    id: doc.id,
                    data: doc.data()
                };
            }))
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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [599], () => (__webpack_exec__(994)));
module.exports = __webpack_exports__;

})();