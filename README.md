# Face Recognition Parameter Output

This is a cut-down version of the Jeeliz demo and distribution repo, to be found [here](<https://github.com/jeeliz/jeelizWeboji>)

## How to use

1. Use MS Visual Studio Code
2. Ensure you have the Extensions: Live Server installed - see [here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 
3. Open this folder structure by dragging the folder face_recognition_parameter_output onto a fresh VS Code window.
4. The Explorer pane will open.
5. Right-click on  /svg/index.html. Choose 'Open with Live Server'.
6. WEBOJI SVG DEMO will open in a browser, at 127.0.0.1:5500/demos/svg/index.html
7. all will work, there is no need to do anything else.



## How it works

The sample code runs from /demo_webojiSVG.js through an evaluation loop from the entry point.

The sample code delegates to a bunch of helper functions specific to SVG in 

We have added an object called _output to the /helpers/svg/JeelizSVGHelper.js file, which has a .data container object, and a functioned_output, which we use to crudely paste parameters onto a canvas.

The canvas is digitalLabsOutputCanvas, which has been added to the /svg/index.html.

We update the _output.data object as part of the update cycle which calls the rotationCallback function.

We populate with values we're intending to use later on in the development.




