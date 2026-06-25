"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_lib_models_Content_js";
exports.ids = ["_rsc_lib_models_Content_js"];
exports.modules = {

/***/ "(rsc)/./lib/models/Content.js":
/*!*******************************!*\
  !*** ./lib/models/Content.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Content: () => (/* binding */ Content)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ContentSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    page: {\n        type: String,\n        required: true,\n        unique: true,\n        index: true\n    },\n    data: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.Mixed,\n        required: true\n    }\n}, {\n    timestamps: true\n});\nconst Content = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Content || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Content\", ContentSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL0NvbnRlbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLE1BQU1DLGdCQUFnQixJQUFJRCx3REFBZSxDQUN2QztJQUNFRyxNQUFNO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7UUFBTUMsUUFBUTtRQUFNQyxPQUFPO0lBQUs7SUFDaEVDLE1BQU07UUFBRUwsTUFBTUosd0RBQWUsQ0FBQ1UsS0FBSyxDQUFDQyxLQUFLO1FBQUVMLFVBQVU7SUFBSztBQUM1RCxHQUNBO0lBQUVNLFlBQVk7QUFBSztBQUdkLE1BQU1DLFVBQ1hiLHdEQUFlLENBQUNhLE9BQU8sSUFBSWIscURBQWMsQ0FBQyxXQUFXQyxlQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFya3F1ZWVuLWhvdGVsLy4vbGliL21vZGVscy9Db250ZW50LmpzPzgxMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJ1xuXG5jb25zdCBDb250ZW50U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcbiAge1xuICAgIHBhZ2U6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlLCBpbmRleDogdHJ1ZSB9LFxuICAgIGRhdGE6IHsgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk1peGVkLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxuKVxuXG5leHBvcnQgY29uc3QgQ29udGVudCA9XG4gIG1vbmdvb3NlLm1vZGVscy5Db250ZW50IHx8IG1vbmdvb3NlLm1vZGVsKCdDb250ZW50JywgQ29udGVudFNjaGVtYSlcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIkNvbnRlbnRTY2hlbWEiLCJTY2hlbWEiLCJwYWdlIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidW5pcXVlIiwiaW5kZXgiLCJkYXRhIiwiVHlwZXMiLCJNaXhlZCIsInRpbWVzdGFtcHMiLCJDb250ZW50IiwibW9kZWxzIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/Content.js\n");

/***/ })

};
;