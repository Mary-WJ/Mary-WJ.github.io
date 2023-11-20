/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/side.js":
/*!*********************!*\
  !*** ./src/side.js ***!
  \*********************/
/***/ (() => {

eval("let activePage = window.location.pathname;\r\n//check the current location pathname\r\nconst navLinks = document.querySelectorAll('nav a');\r\nnavLinks.forEach(link => {\r\n    //if the link href contains the same value of activePage then add class called 'active'\r\n    if(link.href.includes(`${activePage}`)){\r\n        link.classList.add('active');\r\n    }\r\n})\n\n//# sourceURL=webpack://lab-template/./src/side.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/side.js"]();
/******/ 	
/******/ })()
;