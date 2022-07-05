# emotion-recognition-website-react

[![reactjs](badges/react.svg)](https://badges.aleen42.com/src/react.svg)
[![javascript](badges/javascript.svg)](https://badges.aleen42.com/src/javascript.svg)

try yourself our AI : https://clementreiffers.github.io/emotion-recognition-website-react/

## Inspiration

This project is inspired from another project : https://github.com/clementreiffers/emotion-recognition-website.
The goal is the same, make a complete website to launch an AI able to recognize emotions.

The AI was trained by myself and friends in this project : https://github.com/clementreiffers/emotion_recognition_cnn/.
N.B. There already is a website inside "emotion_recognition_cnn" but made with python and works only in server side. (We
use the camera from the server) The goal of this old project wasn't doing an interface but only making a demo of our AI.
There real interface of our project is here.

## Launch the website

you can directly go to the link : https://clementreiffers.github.io/emotion-recognition-website-react/ and accept using 
the camera.

if you want to launch the website yourself on your computer, there is below some steps to do it:

### `yarn install`

in the first time, you have to install all requirements, so :
- react
- react-camera
- tfjs (a portability of tensorflow of javascript, used to launch our AI)
### `yarn run start`

once you have installed all the requirements, you can type this command in the terminal.
With this command, the website is compiled and the terminal will tell you when you will be able to launch it. 
you will be local, so "localhost:3000" will work on your browser

### `yarn run build`

if you want an optimized version of your website, an example of a build is available in the gh-pages branch or this 
repository. It is not necessary if you stay in local.


## Sources 

- React : https://en.reactjs.org
- Badges of the readme : https://github.com/aleen42/badges
- tfjs : https://www.npmjs.com/package/@tensorflow/tfjs
- the base I used to recognize faces on camera : https://github.com/lauirvin/react-use-face-detection 
- load a layer model into react : https://towardsdatascience.com/loading-models-into-tensorflow-js-using-react-js-f3e118ee4a59
