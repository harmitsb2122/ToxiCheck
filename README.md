# ToxiCheck
### A Tool to Detect Cyberbullying and Check the Toxicity of Comments on Various Websites
## About
ToxiCheck is a Google Chrome Extension which primarily targets software developer websites such as Github , detects cyberbullying on them, and provides toxicity reports on comments. Along with this , Toxicheck also assists the user in avoiding the use of toxic language by suggesting gentler alternatives as they type.

## Technical Details
Models used - 
1. Toxic-BERT [[1]](https://huggingface.co/unitary/toxic-bert)
2. BART-base-detox [[1]](https://aclanthology.org/2022.acl-long.469.pdf) [[2]](https://huggingface.co/s-nlp/bart-base-detox)

UI -
1. Vanilla JS
2. Chart JS

[Demo Video](https://drive.google.com/file/d/1AHUO4LCQu2TPE0iGI-8iwmO2IL37kES1/view?usp=sharing)

## Flow Diagrams
Working of the Bullying Classifier (Text Blurring Mechanism)

![image](https://github.com/harmitsb2122/ToxiCheck/assets/80470843/cecd305b-369e-4da2-90ec-3772ef95f971)

Working of the Autosuggestor (Suggestion Mechanism)

![image](https://github.com/harmitsb2122/ToxiCheck/assets/80470843/c7c28493-8c3d-412f-b15c-40b9c9ad46a6)

## Major Features

### Toxicity Chart

![image](https://user-images.githubusercontent.com/80470843/235318719-f7dc54db-7e00-4299-84f6-009baf142f49.gif)

### Autosuggestor feature

![image](https://user-images.githubusercontent.com/80470843/235319414-18d4ea10-7bc9-49c4-afd2-dedfb30ee764.gif)

## Features for Github

### Toxicity charts for Github

![Screenshot 2023-04-30 011019](https://user-images.githubusercontent.com/80470843/235321248-55b7b9c5-df7a-47a7-9fc5-f82a52de2efb.png)

### The Autosuggestor for Github

![image](https://user-images.githubusercontent.com/80470843/235321099-488ea1d0-5733-49ba-8797-696838492b6e.png)

## Instructions
1. Clone the repository
2. Enter the directory Toxicheck and type 
```
$ npm install
```
3. Edit the bearer token inside the app.js file with your huggingface (write enabled) token.
4. Go to chrome browser and type 
```
chrome://extensions/
```
5. Click on Load Unpacked option and browse to the folder Toxicheck and select it.
6. Enable/Reload the extension
7. Navigate to the websites you wish
