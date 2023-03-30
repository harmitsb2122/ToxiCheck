parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === "function" && parcelRequire;
  var nodeRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        var currentRequire =
          typeof parcelRequire === "function" && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        if (previousRequire) {
          return previousRequire(name, true);
        }

        if (nodeRequire && typeof name === "string") {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    var mainExports = newRequire(entry[entry.length - 1]);

    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      });
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  parcelRequire = newRequire;

  if (error) {
    throw error;
  }

  return newRequire;
})(
  {
    "sotagger.js": [
      function (require, module, exports) {
        var array = [];

        async function getResult(send_data) {
          const options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: send_data,
          };
          return new Promise((resolve, reject) => {
            fetch("http://127.0.0.1:8000/predict", options)
              .then((response) => response.json())
              .then((data) => {
                var ans = data[0];
                resolve(ans);
              })
              .catch((error) => {
                console.log("error", error);

                reject(error);
              });
          });
        }
        function main() {
          window.addEventListener("input", async function () {
            const collection1 = document.getElementsByClassName(
              "Am Al editable LW-avf tS-tW"
            );
            // const collection2 = document.getElementsByClassName(
            //   "comment-body markdown-body js-preview-body"
            // );

            const array1 = [...collection1];
            // const array2 = [...collection2];

            // const elementlist = array1.concat(array2);
            const elementlist = array1;

            var i = 0;
            for (i = 0; i < elementlist.length; i++) {
              console.log(elementlist[i].innerText);
              if (elementlist[i].innerText.length > 0) {
                var data = JSON.stringify({
                  data: [[elementlist[i].innerText]],
                });

                await getResult(data).then((ans) => {
                  if (ans != 6) {
                    elementlist[i].style.textDecoration = "underline red";
                  } else {
                    elementlist[i].style.textDecoration = "none";
                  }
                });
                elementlist[i].addEventListener("click", function () {
                  this.style.textDecoration = "none";
                });
              }
            }
          });

          window.addEventListener("mouseover", async function () {
            const collection1 = document.getElementsByClassName("ii gt");
            const collection2 = document.getElementsByClassName("comment-copy");
            const collection3 = document.getElementsByClassName(
              "d-block comment-body markdown-body  js-comment-body"
            );
            const collection4 = document.getElementsByClassName(
              "comment-body markdown-body js-preview-body"
            );

            const array1 = [...collection1];
            const array2 = [...collection2];
            const array3 = [...collection3];
            const array4 = [...collection4];

            const elementlist1 = array1.concat(array2);
            const elementlist2 = elementlist1.concat(array3);
            const elementlist = elementlist2.concat(array4);

            var i = 0;
            for (i = 0; i < elementlist.length; i++) {
              if (elementlist[i].innerText.length > 0) {
                var data = JSON.stringify({
                  data: [[elementlist[i].innerText]],
                });

                await getResult(data).then((ans) => {
                  if (ans != 6) {
                    elementlist[i].style.filter = "blur(3px)";
                  } else {
                    elementlist[i].style.filter = "none";
                  }
                });
                elementlist[i].addEventListener("click", function () {
                  this.style.filter = "none";
                });
              }
            }
          });
        }

        $(document).ready(function () {
          main();
        });
      },
      {},
    ],
  },
  {},
  ["sotagger.js"],
  null
);
