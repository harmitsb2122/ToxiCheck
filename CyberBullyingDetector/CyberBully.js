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

        //****** MAIN CODE STARTS FROM HERE *****//

        function main() {
          //* Suggestion Panel *//
          var suggestPanel = document.createElement("div");
          suggestPanel.style.position = "fixed";
          suggestPanel.style.fontSize = "15px";
          suggestPanel.style.borderRadius = "20px";
          suggestPanel.style.right = "100px";
          suggestPanel.style.bottom = "10px";
          suggestPanel.style.backgroundColor = "white";
          suggestPanel.style.zIndex = 1000;
          suggestPanel.style.visibility = "hidden";
          suggestPanel.style.width = "300px";
          suggestPanel.style.width = "300px";
          suggestPanel.style.height = "100px";
          suggestPanel.style.padding = "10px";
          suggestPanel.style.border = "1px solid black";
          suggestPanel.style.overflow = "auto"; // make panel scrollable
          suggestPanel.style.maxHeight = "2000px"; // set max height for panel

          //* Suggest Button *//
          var suggestButton = document.createElement("button");
          suggestButton.style.position = "fixed";
          suggestButton.style.borderRadius = "20px";
          suggestButton.style.right = "10px";
          suggestButton.style.bottom = "10px";
          suggestButton.style.backgroundColor = "blue";
          suggestButton.style.color = "white";
          suggestButton.style.border = "none";
          suggestButton.style.padding = "8px";
          suggestButton.style.zIndex = 1000;
          suggestButton.innerText = "Suggest";
          suggestButton.style.visibility = "hidden";
          suggestButton.style.border = "1px solid yellow";
          suggestButton.addEventListener("click", function () {
            if (suggestPanel.style.visibility == "hidden") {
              suggestPanel.style.visibility = "visible";
            } else {
              suggestPanel.style.visibility = "hidden";
            }
          });

          //* Hover Button *//
          // pops up above the currently hovered element
          var hoverButton = document.createElement("button");
          hoverButton.style.position = "fixed";
          hoverButton.style.borderRadius = "50%";
          hoverButton.style.right = "10px";
          hoverButton.style.bottom = "10px";
          hoverButton.style.backgroundColor = "red";
          hoverButton.style.color = "white";
          hoverButton.style.border = "none";
          hoverButton.style.padding = "8px";
          hoverButton.style.zIndex = 1000;
          hoverButton.innerText = "!!";
          hoverButton.style.visibility = "hidden";
          hoverButton.style.border = "1px solid yellow";

          // toggle suggest panel
          hoverButton.addEventListener("click", function () {
            if (suggestPanel.style.visibility == "hidden") {
              suggestPanel.style.visibility = "visible";
            } else {
              suggestPanel.style.visibility = "hidden";
            }
          });

          document.body.appendChild(suggestButton);
          document.body.appendChild(suggestPanel);
          document.body.appendChild(hoverButton);

          var currentElement = null;

          window.addEventListener("input", async function () {
            // TODO MODIFIED AND DONE: transport the hoverButton to the current element position --> changed the role to highlight words
            // TODO DONE: Separate non-relevant text to words for now --> (changed 'bad' to 'good')

            // TODO INCOMING : Intensity based coloring scheme
            // TODO : Modify the panel with the current suggestion on click (hoverButton)
            // TODO LATER : Separate non-relevant text to words for phrases

            const collection1 = document.getElementsByClassName(
              "Am Al editable LW-avf tS-tW"
            );

            const array1 = [...collection1];

            const elementlist = array1;

            var i = 0;
            for (i = 0; i < elementlist.length; i++) {
              if (elementlist[i].innerText.length > 0) {
                var data = JSON.stringify({
                  data: [[elementlist[i].innerText]],
                });

                currentElement = elementlist[i];
                await getResult(data).then((ans) => {
                  if (ans != 6) {
                    hoverButton.addEventListener("click", function () {
                      if (
                        currentElement != null &&
                        currentElement.innerText.includes("bad")
                      ) {
                        let text = currentElement.innerText;
                        let newText = text.replaceAll(
                          "bad",
                          "<span style='text-decoration: underline blue;'>bad</span>"
                        );
                        currentElement.innerHTML = newText;
                      }
                    });
                    //* Panel text *//
                    var suggestPanelText = document.createElement("div");
                    suggestPanelText.innerText =
                      "Text : " + elementlist[i].innerText; // this would be the suggested phrase
                    suggestPanelText.innerText +=
                      "\nSuggestion : " + elementlist[i].innerText; // this would be the suggested phrase
                    suggestPanelText.style.marginBottom = "10px";
                    suggestPanelText.style.padding = "5px";
                    suggestPanel.appendChild(suggestPanelText);

                    //* Panel Buttons *//
                    var suggestPanelButton = document.createElement("button");
                    suggestPanelButton.innerText = "Close";
                    suggestPanelButton.style.backgroundColor = "red";
                    suggestPanelButton.style.color = "white";
                    suggestPanelButton.style.fontSize = "15px";
                    suggestPanelButton.style.border = "none";
                    suggestPanelButton.style.padding = "5px";
                    suggestPanelButton.addEventListener("click", function () {
                      suggestPanel.style.visibility = "hidden";
                    });
                    suggestPanelButton.style.marginRight = "20px";
                    suggestPanelButton.style.bottom = "2px";
                    suggestPanelButton.style.top = "2px";
                    suggestPanel.appendChild(suggestPanelButton);

                    var suggestPanelButton1 = document.createElement("button");
                    suggestPanelButton1.innerText = "Replace";
                    suggestPanelButton1.style.backgroundColor = "red";
                    suggestPanelButton1.style.color = "white";
                    suggestPanelButton1.style.fontSize = "15px";
                    suggestPanelButton1.style.border = "none";
                    suggestPanelButton1.style.padding = "5px";
                    suggestPanelButton1.addEventListener("click", function () {
                      // Replace all instances of "bad" with "good"
                      if (currentElement != null) {
                        if (currentElement.innerText.includes("bad")) {
                          let text = currentElement.innerText;
                          let newText = text.replaceAll("bad", "good");
                          currentElement.innerText = newText;
                        }

                        currentElement.innerHTML = newInnerHTML;
                        // currentElement.innerText = "dummy text"; // to be replaced with suggested phrase
                        currentElement.style.textDecoration = "none";
                        suggestButton.style.visibility = "hidden";
                        suggestPanel.style.visibility = "hidden";
                        hoverButton.style.visibility = "hidden";
                      }
                    });
                    suggestPanelButton.style.bottom = "2px";
                    suggestPanelButton.style.top = "2px";

                    suggestPanel.appendChild(suggestPanelButton1);

                    // styling the element
                    currentElement.style.textDecoration = "underline red";
                    suggestButton.style.visibility = "visible";

                    // open the dialog box here
                    currentElement.addEventListener("mouseenter", function () {
                      var rect = currentElement.getBoundingClientRect();
                      hoverButton.style.top =
                        rect.top - hoverButton.offsetHeight - 1 + "px";
                      hoverButton.style.left = rect.left + "px";
                      if (
                        currentElement.style.textDecoration === "underline red"
                      )
                        hoverButton.style.visibility = "visible";
                      hoverButton.style.width = "30px";
                      hoverButton.style.height = "30px";
                      hoverButton.style.padding = "0px";
                    });
                  } else {
                    suggestButton.style.visibility = "hidden";
                    hoverButton.style.visibility = "hidden";
                    elementlist[i].style.textDecoration = "none";
                  }
                });
              }
            }
          });

          window.addEventListener("mouseover", async function () {
            // TODO : clean the code here

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
