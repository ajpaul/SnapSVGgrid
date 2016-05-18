# SnapSVGgrid
This is some sandbox code to demonstrate some handy features of snap.svg (and a 3rd party library snap.svg.zpd) that are helpful when creating/working with a grid with objects that snap to the grid. This is just something quick that I whipped up, so please forgive any errors you might find, but I just wanted to demonstrate some functionality with the given context. I could only find one example on the internet (thanks for getting us started @brainwipe) on some of this stuff, and every single forum post on some of these topics seemed to point back to that one example, which sometimes wasn't enough for me. Hopefully this can help some other people that were originally in the same boat as me.

You can easily tweak this code to add multiple rectangles or change the grid size or whatever. Right now the "configure grid with current settings" button destroys everything and starts you with a fresh grid and a single rect.

Just drop all of these files in a folder and open up sandbox.html in a browser. Note that this is using snap.svg 0.4.1 which is current as of May 18, 2016.

#Selectable Parameters
1. Live snapping
2. Lock x axis movements
3. Lock y axis movements
4. Offset X
5. Offset Y


### Live Snapping
If this feature is turned on, then the rectangle will constantly snap to every cell as you drag it. This can get a little annoying. If it's turned off, you can drag the rect freely and it will only snap when you "drop" it or end the drag. I like this better.

### Lock x axis movements
Turn this feature on if you want to only move on the x axis

### Lock y axis movements
Turn this feature on if you want to only move on the y axis

## Offsets (x and y)
This basically causes the grid to start with partial cells. It also adjusts the snapping logic of the rect to conform to the shifted grid.

# Snap.svg.zpd Library
This library (made by huei90 on here) is very helpful. The ZPD stands for zoom pan drag and gives the SVGs some added functionality. I barely scratched the surface with what it can do. In this project I only use it to toggle the pan/drag property of the entire grid on and off whenever a rect is clicked. You can move the grid around wherever you please until you click a rect, then the grid locks so you can move the rect without moving the grid too. When it's dropped, then you can move the grid again. Everything in the $("#svg") moves as a whole since the rect is nested underneath the main svg.

For more or to pull the code, go [to the Github project/details here](https://github.com/huei90/snap.svg.zpd).

