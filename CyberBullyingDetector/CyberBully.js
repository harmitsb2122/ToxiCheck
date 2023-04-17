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
        // * Segregating toxic/abusive words *//
        async function getResult(send_data) {
          console.log(send_data);
          const options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer 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",
            },
            body: send_data,
          };
          return new Promise((resolve, reject) => {
            fetch(
              "https://api-inference.huggingface.co/models/unitary/toxic-bert",
              options
            )
              .then((response) => {
                return response.json();
              })
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

        // * Generating sentences *//
        async function genResult(send_data) {
          console.log(send_data);
          const options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer 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",
            },
            body: send_data,
          };
          return new Promise((resolve, reject) => {
            fetch(
              "https://api-inference.huggingface.co/models/s-nlp/bart-base-detox",
              options
            )
              .then((response) => {
                return response.json();
              })
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
          suggestPanel.style.borderRadius = "15px";
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

          //* highlight Button *//
          var highlightButton = document.createElement("button");
          highlightButton.style.position = "fixed";
          highlightButton.style.borderRadius = "20px";
          highlightButton.style.right = "15px";
          highlightButton.style.bottom = "50px";
          highlightButton.style.backgroundColor = "green";
          highlightButton.style.color = "white";
          highlightButton.style.border = "none";
          highlightButton.style.padding = "8px";
          highlightButton.style.zIndex = 1000;
          highlightButton.innerText = "Search";
          highlightButton.style.visibility = "hidden";
          highlightButton.style.border = "1px solid blue";

          //* Hover Button *//
          // pops up above the currently hovered element
          var hoverButton = document.createElement("button");
          hoverButton.style.position = "fixed";
          hoverButton.style.borderRadius = "50%";
          hoverButton.style.right = "400px";
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

          //* Check Button *//
          // pops up above the currently hovered element
          var checkButton = document.createElement("button");
          checkButton.style.position = "fixed";
          checkButton.style.borderRadius = "50%";
          checkButton.style.right = "400px";
          checkButton.style.bottom = "10px";
          checkButton.style.backgroundColor = "blue";
          checkButton.style.color = "white";
          checkButton.style.border = "none";
          checkButton.style.padding = "8px";
          checkButton.style.zIndex = 1000;
          checkButton.innerText = "C";
          checkButton.style.visibility = "hidden";
          checkButton.style.border = "1px solid yellow";

          document.body.appendChild(suggestButton);
          document.body.appendChild(highlightButton);
          document.body.appendChild(suggestPanel);
          document.body.appendChild(hoverButton);
          document.body.appendChild(checkButton);

          var currentElement = null;
          const target_sentences = new Set();
          var currentState = 0;
          window.addEventListener("input", async function () {
            // TODO MUST : API multiple request (429 error) resolutuion with same text
            // TODO OPTIONAL: Modify the panel with the current suggestion on click (hoverButton)
            // TODO OPTIONAL : Intensity based coloring scheme
            // TODO OPTIONAL: Separate non-relevant text to words for phrases
            suggestPanel.innerHTML = "";
            const collection1 = document.getElementsByClassName(
              "Am Al editable LW-avf tS-tW"
            );

            const array1 = [...collection1];

            const elementlist = array1;

            if (
              elementlist != null &&
              elementlist[0] != null &&
              elementlist[0].innerText.length > 0
            ) {
              currentState = 0; // state for gmail
              currentElement = elementlist[0];

              // TODO LATER: Preprocessing

              text = elementlist[0].innerText;

              // TODO LATER: Context - based phrase tokenization

              const regex = /(?<=\.|\?|\!)\s+/;
              const sentences = text.split(regex);

              // TODO LATER: Context based paragaphs/ group of sentences

              for (let j = 0; j < sentences.length - 1; j++) {
                const currentSentence = sentences[j];

                var data = JSON.stringify({
                  inputs: currentSentence,
                });

                await getResult(data).then((ans) => {
                  console.log(ans);
                  // * Defining the score metric *//
                  let toxic_score = 0.0;
                  let obscene_score = 0.0;
                  let insult_score = 0.0;
                  let identity_hate_score = 0.0;
                  let severley_toxic_score = 0.0;
                  let threat_score = 0.0;
                  let score = 0.0;
                  let value = 0;
                  for (let j = 0; j < 6; j++) {
                    if (!ans) {
                      break;
                    }
                    if (ans[j].label === "toxic") toxic_score += ans[j].score;
                    else if (ans[j].label === "obscene")
                      obscene_score += ans[j].score;
                    else if (ans[j].label === "insult")
                      insult_score += ans[j].score;
                    else if (ans[j].label === "identity_hate")
                      identity_hate_score += ans[j].score;
                    else if (ans[j].label === "severe_toxic")
                      severley_toxic_score += ans[j].score;
                    else if (ans[j].label === "threat")
                      threat_score += ans[j].score;

                    score += ans[j].score;
                  }

                  if (score >= 1.5) {
                    target_sentences.add(currentSentence);
                  }
                });
              }

              hoverButton.style.visibility = "hidden";
              highlightButton.style.visibility = "hidden";
              if (target_sentences.size != 0) {
                suggestButton.style.visibility = "visible";
                highlightButton.style.visibility = "visible";
              } else {
                suggestButton.style.visibility = "hidden";
                highlightButton.style.visibility = "hidden";
                return;
              }
            }
          });

          // * Github *//
          window.addEventListener("input", async function () {
            suggestPanel.innerHTML = "";
            const element = document.getElementById("new_comment_field");
            if (element != null) {
              currentState = 1; // state for github
              currentElement = element;
              suggestButton.style.backgroundColor = "white"; // setting up according to github dark theme
              suggestButton.style.color = "black";
              suggestButton.style.border = "1px solid blue";

              text = element.value;

              const regex = /(?<=\.|\?|\!)\s+/;
              const sentences = text.split(regex);

              for (let j = 0; j < sentences.length - 1; j++) {
                const currentSentence = sentences[j];

                var data = JSON.stringify({
                  inputs: currentSentence,
                });

                await getResult(data).then((ans) => {
                  console.log(ans);
                  // * Defining the score metric *//
                  let toxic_score = 0.0;
                  let obscene_score = 0.0;
                  let insult_score = 0.0;
                  let identity_hate_score = 0.0;
                  let severley_toxic_score = 0.0;
                  let threat_score = 0.0;
                  let score = 0.0;
                  let value = 0;
                  for (let j = 0; j < 6; j++) {
                    if (!ans) {
                      break;
                    }
                    if (ans[j].label === "toxic") toxic_score += ans[j].score;
                    else if (ans[j].label === "obscene")
                      obscene_score += ans[j].score;
                    else if (ans[j].label === "insult")
                      insult_score += ans[j].score;
                    else if (ans[j].label === "identity_hate")
                      identity_hate_score += ans[j].score;
                    else if (ans[j].label === "severe_toxic")
                      severley_toxic_score += ans[j].score;
                    else if (ans[j].label === "threat")
                      threat_score += ans[j].score;

                    score += ans[j].score;
                  }

                  if (score >= 1.5) {
                    target_sentences.add(currentSentence);
                  }
                });
              }

              hoverButton.style.visibility = "hidden";
              suggestPanel.style.visibility = "hidden";
              highlightButton.style.visibility = "hidden";
              if (target_sentences.size != 0) {
                suggestButton.style.visibility = "visible";
                if (currentState == 0)
                  highlightButton.style.visibility = "visible";
              } else {
                suggestButton.style.visibility = "hidden";
                highlightButton.style.visibility = "hidden";
                return;
              }
            }
          });

          //* Gmail *//
          highlightButton.addEventListener("click", function () {
            const collection1 = document.getElementsByClassName(
              "Am Al editable LW-avf tS-tW"
            );

            const array1 = [...collection1];

            const elementlist = array1;

            if (currentState != 0) {
              return;
            }
            //* Handling text to span conversion (recursive) *//
            for (const sentence of target_sentences) {
              newtext = elementlist[0].innerText;
              //* Handling recursive additions *//
              let spanRegex = new RegExp(sentence, "g");
              newtext = newtext.replaceAll(
                spanRegex,
                `<span style='text-decoration: underline red;'>${sentence}</span>`
              );
              elementlist[0].innerHTML = newtext;
            }
          });

          //* Gmail *//
          suggestButton.addEventListener("click", async function () {
            if (currentState != 0) return;
            suggestPanel.innerHTML = "";
            for (const sentence of target_sentences) {
              //* Panel text *//

              var sentence_data = JSON.stringify({
                inputs: sentence,
              });
              let suggestion = "";
              await genResult(sentence_data).then((ans) => {
                console.log(ans);
                if (ans) suggestion = ans.generated_text;
                else suggestion = sentence;
              });

              if (suggestion === sentence || sentence == suggestion) {
                suggestion = " ";
              }

              var suggestPanelText = document.createElement("div");
              suggestPanelText.innerText = "Text : " + sentence; // this would be the suggested phrase
              if (suggestion === " ")
                suggestPanelText.innerText +=
                  "\nSuggestion : (Better to remove it)";
              // this would be the suggested phrase
              else suggestPanelText.innerText += "\nSuggestion : " + suggestion; // this would be the suggested phrase
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
              suggestPanelButton1.style.bottom = "2px";
              suggestPanelButton1.style.top = "2px";

              //* Handling span to text conversion (non-recursive) *//
              suggestPanelButton1.addEventListener("click", function () {
                if (currentElement != null) {
                  if (
                    currentElement.innerHTML.includes(
                      `<span style="text-decoration: underline red;">${sentence}</span>`
                    )
                  ) {
                    let text = currentElement.innerHTML;
                    let newText = text.replaceAll(
                      `<span style="text-decoration: underline red;">${sentence}</span>`,
                      suggestion
                    );
                    currentElement.innerHTML = newText;
                    target_sentences.delete(sentence);
                  } else if (currentElement.innerHTML.includes(sentence)) {
                    let text = currentElement.innerHTML;
                    let newText = text.replaceAll(sentence, suggestion);
                    currentElement.innerHTML = newText;
                    target_sentences.delete(sentence);
                  }
                }
              });
              suggestPanel.appendChild(suggestPanelButton1);
            }
          });

          // * Github * //
          suggestButton.addEventListener("click", async function () {
            if (currentState != 1) return;
            suggestPanel.innerHTML = "";
            suggestPanel.style.backgroundColor = "#161b22"; //syled as per github page
            suggestPanel.style.border = "0.5px solid #7d8590";

            for (const sentence of target_sentences) {
              //* Panel text *//

              var sentence_data = JSON.stringify({
                inputs: sentence,
              });
              let suggestion = "";
              await genResult(sentence_data).then((ans) => {
                console.log(ans);
                if (ans) suggestion = ans.generated_text;
                else suggestion = sentence;
              });

              if (suggestion === sentence || sentence == suggestion) {
                suggestion = " ";
              }

              var suggestPanelText = document.createElement("div");
              suggestPanelText.innerText = "Text : " + sentence; // this would be the suggested phrase
              if (suggestion === " ")
                suggestPanelText.innerText +=
                  "\nSuggestion : (Better to remove it)";
              // this would be the suggested phrase
              else suggestPanelText.innerText += "\nSuggestion : " + suggestion; // this would be the suggested phrase
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
              suggestPanelButton1.style.bottom = "2px";
              suggestPanelButton1.style.top = "2px";

              //* Handling span to text conversion (non-recursive) *//
              suggestPanelButton1.addEventListener("click", function () {
                if (currentElement != null) {
                  if (currentElement.value.includes(sentence)) {
                    let text = currentElement.value;
                    let newText = text.replaceAll(sentence, suggestion);
                    currentElement.value = newText;
                    target_sentences.delete(sentence);
                  }
                }
              });
              suggestPanel.appendChild(suggestPanelButton1);
            }
          });

          // make dictionary with Boolean values for each sentence
          var dict = {};

          window.addEventListener("mouseover", async function () {
            //* Dynamic Hover *//
            const spanElements = document.querySelectorAll(
              "span[style='text-decoration: underline red;']"
            );

            spanElements.forEach((spanElement) => {
              spanElement.addEventListener("mouseenter", function () {
                var rect = spanElement.getBoundingClientRect();
                hoverButton.style.top =
                  rect.top - hoverButton.offsetHeight - 1 + "px";
                hoverButton.style.left = rect.left + "px";
                hoverButton.style.visibility = "visible";
                hoverButton.style.width = "30px";
                hoverButton.style.height = "30px";
                hoverButton.style.padding = "0px";
              });
            });

            // TODO : clean the code here
            // TODO MUST : Complete code to unblur specific lines based on toxicity
            // TODO MUST : Complete code to add replace button to replace all the content with generated ones (use the same logic no panel is required)

            const collection1 = document.getElementsByClassName("ii gt");
            const collection2 = document.getElementsByClassName("comment-copy");
            // const collection3 = document.getElementsByClassName(
            //   "d-block comment-body markdown-body  js-comment-body"
            // );
            const collection3 = document.getElementsByClassName("comment-copy");
            // const collection4 = document.getElementsByClassName(
            //   "comment-body markdown-body js-preview-body"
            // );
            const collection4 = document.getElementsByClassName("comment-copy");
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
            var currentElement = null;
            for (i = 0; i < elementlist.length; i++) {
              if (elementlist[i].innerText.length > 0) {
                // check if elementlist[i].innerText is a key in dict
                if (elementlist[i].innerText in dict) {
                  if (dict[elementlist[i].innerText] === true) {
                    elementlist[i].style.filter = "blur(3px)";
                  } else {
                    elementlist[i].style.filter = "none";
                  }
                } else {
                  // if not, add it to dict with value false
                  var data = JSON.stringify({
                    inputs: elementlist[i].innerText,
                  });

                  let score = 0.0;

                  await getResult(data).then((ans) => {
                    // * Defining the score metric *//
                    for (let j = 0; j < 6; j++) {
                      if (!ans) {
                        break;
                      }

                      score += ans[j].score;
                    }
                    if (score >= 1.5) {
                      dict[elementlist[i].innerText] = true;
                      console.log("True condition");
                    } else {
                      dict[elementlist[i].innerText] = false;
                      console.log("False condition");
                    }

                    if (dict[elementlist[i].innerText] === true) {
                      elementlist[i].style.filter = "blur(3px)";
                    } else {
                      elementlist[i].style.filter = "none";
                    }
                  });
                }
              }
            }
            if (elementlist[0] && elementlist[0].innerText.length > 0) {
              currentElement = elementlist[0];
              elementlist[0].addEventListener("mouseenter", function () {
                var rect = currentElement.getBoundingClientRect();
                checkButton.style.top =
                  rect.top - checkButton.offsetHeight - 1 + "px";
                checkButton.style.left = rect.left + "px";
                checkButton.style.visibility = "visible";
                checkButton.style.width = "30px";
                checkButton.style.height = "30px";
                checkButton.style.padding = "0px";
              });
              elementlist[0].addEventListener("mouseleave", () =>
                setTimeout(() => {
                  checkButton.style.visibility = "hidden";
                }, 5000)
              );
              elementlist[0].addEventListener("click", function () {
                this.style.filter = "none";
              });
              checkButton.addEventListener("click", function () {
                console.log(elementlist[0].innerText);
              });
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
