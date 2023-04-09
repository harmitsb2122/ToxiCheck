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
          // Main Panel
          var mainPanel = document.createElement("div");
          mainPanel.style.position = "fixed";
          mainPanel.style.fontSize = "15px";
          mainPanel.style.borderRadius = "20px";
          mainPanel.style.right = "100px";
          mainPanel.style.bottom = "10px";
          mainPanel.style.backgroundColor = "white";
          mainPanel.style.zIndex = 1000;
          mainPanel.style.visibility = "hidden";
          mainPanel.style.width = "300px";
          mainPanel.style.width = "300px";
          mainPanel.style.height = "100px";
          mainPanel.style.padding = "10px";
          mainPanel.style.border = "1px solid black";
          mainPanel.style.overflow = "auto"; // make panel scrollable
          mainPanel.style.maxHeight = "2000px"; // set max height for panel

          // main button
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
            if (mainPanel.style.visibility == "hidden") {
              mainPanel.style.visibility = "visible";
            } else {
              mainPanel.style.visibility = "hidden";
            }
          });

          document.body.appendChild(mainButton);
          document.body.appendChild(mainPanel);

          // counter button --> pops up above the currently hovered element
          var counterButton = document.createElement("button");
          counterButton.style.position = "fixed";
          counterButton.style.borderRadius = "50%";
          counterButton.style.right = "10px";
          counterButton.style.bottom = "10px";
          counterButton.style.backgroundColor = "red";
          counterButton.style.color = "white";
          counterButton.style.border = "none";
          counterButton.style.padding = "8px";
          counterButton.style.zIndex = 1000;
          counterButton.innerText = "!!";
          counterButton.style.visibility = "hidden";
          counterButton.style.border = "1px solid yellow";
          counterButton.addEventListener("click", function () {
            if (mainPanel.style.visibility == "hidden") {
              mainPanel.style.visibility = "visible";
            } else {
              mainPanel.style.visibility = "hidden";
            }
          });

          document.body.appendChild(counterButton);

          var currentElement = null;
          window.addEventListener("input", async function () {
            const collection1 = document.getElementsByClassName(
              "Am Al editable LW-avf tS-tW"
            );

            const array1 = [...collection1];

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
                    // automating panel text ...
                    var mainPanelText = document.createElement("div");
                    mainPanelText.innerText =
                      "Text : " + elementlist[i].innerText; // this would be the suggested phrase
                    mainPanelText.innerText +=
                      "\nSuggestion : " + elementlist[i].innerText; // this would be the suggested phrase
                    mainPanelText.style.marginBottom = "10px";
                    mainPanelText.style.padding = "5px";
                    mainPanel.appendChild(mainPanelText);

                    // panel buttons
                    var mainPanelButton = document.createElement("button");
                    mainPanelButton.innerText = "Close";
                    mainPanelButton.style.backgroundColor = "red";
                    mainPanelButton.style.color = "white";
                    mainPanelButton.style.fontSize = "15px";
                    mainPanelButton.style.border = "none";
                    mainPanelButton.style.padding = "5px";
                    mainPanelButton.addEventListener("click", function () {
                      mainPanel.style.visibility = "hidden";
                    });
                    mainPanelButton.style.marginRight = "20px";
                    mainPanelButton.style.bottom = "2px";
                    mainPanelButton.style.top = "2px";
                    mainPanel.appendChild(mainPanelButton);

                    var mainPanelButton1 = document.createElement("button");
                    mainPanelButton1.innerText = "Replace";
                    mainPanelButton1.style.backgroundColor = "red";
                    mainPanelButton1.style.color = "white";
                    mainPanelButton1.style.fontSize = "15px";
                    mainPanelButton1.style.border = "none";
                    mainPanelButton1.style.padding = "5px";
                    mainPanelButton1.addEventListener("click", function () {
                      if (currentElement != null) {
                        currentElement.innerText = "dummy text"; // to be replaced with suggested phrase
                        currentElement.style.textDecoration = "none";
                        mainButton.style.visibility = "hidden";
                        mainPanel.style.visibility = "hidden";
                        counterButton.style.visibility = "hidden";
                      }
                    });
                    mainPanelButton.style.bottom = "2px";
                    mainPanelButton.style.top = "2px";
                    mainPanel.appendChild(mainPanelButton1);

                    currentElement = elementlist[i];
                    currentElement.style.textDecoration = "underline red";
                    mainButton.style.visibility = "visible";
                    // open the dialog box here
                    mainButton.style.visibility = "visible";
                    // open the dialog box here
                    currentElement.addEventListener("mouseenter", function () {
                      var rect = currentElement.getBoundingClientRect();
                      counterButton.style.top =
                        rect.top - counterButton.offsetHeight - 1 + "px";
                      counterButton.style.left = rect.left + "px";
                      if (
                        currentElement.style.textDecoration === "underline red"
                      )
                        counterButton.style.visibility = "visible";
                      counterButton.style.width = "30px";
                      counterButton.style.height = "30px";
                      counterButton.style.padding = "0px";
                    });
                  } else {
                    mainButton.style.visibility = "hidden";
                    counterButton.style.visibility = "hidden";
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
