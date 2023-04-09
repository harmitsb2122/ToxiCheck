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

        // MAIN CODE STARTS FROMHERE

        function main() {
          var panel = document.createElement("div");
          panel.style.position = "fixed";
          panel.style.borderRadius = "20px";
          panel.style.right = "100px";
          panel.style.bottom = "10px";
          panel.style.backgroundColor = "white";
          panel.style.zIndex = 1000;
          panel.style.visibility = "hidden";
          panel.style.width = "200px";
          panel.style.height = "100px";
          panel.style.padding = "10px";
          panel.style.border = "1px solid black";

          var panelText = document.createElement("div");
          panelText.innerText = "dummy text"; // this would be the suggested phrase
          panelText.style.marginBottom = "10px";
          panel.appendChild(panelText);

          var panelButton = document.createElement("button");
          panelButton.innerText = "Close";
          panelButton.style.backgroundColor = "red";
          panelButton.style.color = "white";
          panelButton.style.border = "none";
          panelButton.style.padding = "5px";
          panelButton.addEventListener("click", function () {
            panel.style.visibility = "hidden";
          });
          panelButton.style.marginRight = "10px";
          panelButton.style.bottom = "2px";
          panel.appendChild(panelButton);

          var panelButton1 = document.createElement("button");
          panelButton1.innerText = "Replace";
          panelButton1.style.backgroundColor = "red";
          panelButton1.style.color = "white";
          panelButton1.style.border = "none";
          panelButton1.style.padding = "5px";
          panelButton1.addEventListener("click", function () {
            if (currentElement != null) {
              currentElement.innerText = "dummy text"; // to be replaced with suggested phrase
              currentElement.style.textDecoration = "none";
            }
          });
          panelButton1.style.bottom = "2px";
          panel.appendChild(panelButton1);

          var mainButton = document.createElement("button");
          mainButton.style.position = "fixed";
          mainButton.style.borderRadius = "20px";
          mainButton.style.right = "10px";
          mainButton.style.bottom = "10px";
          mainButton.style.backgroundColor = "blue";
          mainButton.style.color = "white";
          mainButton.style.border = "none";
          mainButton.style.padding = "8px";
          mainButton.style.zIndex = 1000;
          mainButton.innerText = "Suggest";
          mainButton.style.visibility = "hidden";
          mainButton.style.border = "1px solid yellow";
          mainButton.addEventListener("click", function () {
            if (panel.style.visibility == "hidden") {
              panel.style.visibility = "visible";
            } else {
              panel.style.visibility = "hidden";
            }
          });

          document.body.appendChild(mainButton);
          document.body.appendChild(panel);

          var currentElement = null;
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
                    currentElement = elementlist[i];
                    elementlist[i].style.textDecoration = "underline red";
                    mainButton.style.visibility = "visible";
                    // open the dialog box here
                  } else {
                    mainButton.style.visibility = "hidden";
                    elementlist[i].style.textDecoration = "none";
                  }
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
            const collection5 = document.getElementsByClassName("h3YV2d");
            const collection6 = document.getElementsByClassName("ras4vb");

            const array1 = [...collection1];
            const array2 = [...collection2];
            const array3 = [...collection3];
            const array4 = [...collection4];
            const array5 = [...collection5];
            const array6 = [...collection6];

            const elementlist1 = array1.concat(array2);
            const elementlist2 = elementlist1.concat(array3);
            const elementlist3 = elementlist2.concat(array4);
            const elementlist4 = elementlist3.concat(array5);
            const elementlist = elementlist4.concat(array6);

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
