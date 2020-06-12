// backing script for the pixel art maker

window.addEventListener('DOMContentLoaded', (event) => {    

    var currentColor = 'black'  // default start color
    var bucketMode = false; // bucket vs pixel mode
    var size = 10;  // pixel canvas size of each cell
    var sizeTable = 50 // size of the table h x w
    var table = document.createElement('table') // ref to the table itself

    /* make the 32 by 32 table */
    for (let i=0; i<sizeTable; i++) {
        let row = document.createElement('tr')     
        row.style = 'margin: 0px; padding: 0px;'   
        for (let j=0;j<sizeTable; j++) {
            let cell = document.createElement('td')
            cell.style = `width: ${size}px; height: ${size}px; border: 1px solid black; margin: 0px;`
            
            // each cell will have its x-y coords in its id as 'row-column'
            cell.id = `${i}-${j}`;

            // add cell to the row
            row.appendChild(cell)
        }
        table.appendChild(row)
    }

    // style the table itself
    table.style = 'margin: 0px; padding: 0px; border: 0px solid black;border-collapse: collapse; border-spacing: 0; '
    table.addEventListener('mousedown', (event) => {
        // color the cell on its inital mousedown location
        if (!bucketMode) {
            document.getElementById(event.target.id).style = `background-color: ${currentColor};`
        }
        else {
            // bucket fill from this point - fun
                        
        }

    })
    table.addEventListener('touchstart', (event) => {
        // color the cell on its inital mousedown location
        if (!bucketMode) {
            document.getElementById(event.target.id).style = `background-color: ${currentColor};`
        }
        else {
            // bucket fill from this point - fun
                        
        }

    })

    table.addEventListener('mousemove', (event) => {

        if (event.buttons == 1 && !bucketMode) {
            // color the cell with the primary mouse button down,
            //  as it drags into other cells.
            document.getElementById(event.srcElement.id).style = `background-color: ${currentColor};`
        }
    })

    table.addEventListener('touchmove', (event) => {

        if (event.buttons == 1 && !bucketMode) {
            // color the cell with the primary mouse button down,
            //  as it drags into other cells.
            document.getElementById(event.srcElement.id).style = `background-color: ${currentColor};`
        }
    })
    
    // add the whole table to the DOM
    document.querySelector("#editor").appendChild(table)

    /* make some basic colors available in the pallete */
    var colorTable = document.createElement('table')
    let colorRow = document.createElement('tr')     
    colorRow.style = 'margin: 0px; padding: 0px;'
    let colors = ['green', 'red', 'yellow', 'brown', 'black', 'white', 'blue',
                    'cyan', 'magenta', 'purple', ]   
    for (let i=0;i<10; i++) {
        let cell = document.createElement('td')
        cell.style = `background-color: ${colors[i]}; width: 20px; height: 20px; border: 1px solid black; margin: 0px;`
        
        // each cell will have its id as the color name
        cell.id = colors[i];

        // add cell to the row
        colorRow.appendChild(cell)
    }

    // add current color label
    let currentColorName = document.createElement('td')
    currentColorName.style = `background-color: white; border: 0px; margin: 0px;`
    currentColorName.innerText = 'Current Color >>'
    colorRow.appendChild(currentColorName)

    // add current color status cell
    let currentColorCell = document.createElement('td')
    currentColorCell.id = 'currColor'
    currentColorCell.style =  `background-color: ${currentColor}; width: 20px; height: 20px; border: 1px solid black; margin: 0px;`
    colorRow.appendChild(currentColorCell)

    // add in the color row to the pallette
    colorTable.appendChild(colorRow)

    // add event listener to the color table itself
    colorTable.addEventListener('mouseup', (event) => {

        // update current color
        currentColor = event.target.id;
        document.getElementById('currColor').style['background-color'] = `${currentColor}`
    })

    // add the bucket fill tool
    let bucketToolCell = document.createElement('td')
    bucketToolCell.id = 'bucketTool'
    bucketToolCell.innerText= "Bucket Tool?"
    let bucketCheckBox = document.createElement('input')
    bucketCheckBox.setAttribute('type', 'checkbox')
    bucketCheckBox.id = 'bucketToolCheckBox'
    bucketToolCell.appendChild(bucketCheckBox)
    colorRow.appendChild(bucketToolCell)

    // add the color table to the DOM
    document.querySelector("#colors").appendChild(colorTable)    

    /* define a local func for clearing/resetting the table */
    var clearTable = () => {
        for (let i=0;i<sizeTable;i++) {
            for (let j=0;j<sizeTable;j++) {
                document.getElementById(`${i}-${j}`).style = `width: ${size}px; height: ${size}px; border: 1px solid black; margin: 0px;`
            }
        }
    }


    /* now we add the custom controls. */

    // clear button
    var clearButton = document.createElement('button')
    clearButton.innerText = 'Clear!'
    clearButton.addEventListener('click', (event) => {
        clearTable();
    })
    document.body.appendChild(clearButton);

    // save button
    var saveButton = document.createElement('button')
    saveButton.innerText = 'Save!'
    saveButton.addEventListener('click', (event) => {
        // stringify and stash!
        // grab each cells background color into a 
        // giant data structure (object), key'ed by the cell's ID
        // which is also the coordinate!!
        var pixels = {}

        for (let i=0;i<sizeTable;i++) {
            for (let j=0;j<sizeTable;j++) {
                pixels[`${i}-${j}`] = document.getElementById(`${i}-${j}`).style['background-color']
            }
        }

        localStorage.setItem('savedPic', JSON.stringify(pixels))
    })
    document.body.appendChild(saveButton);

    // restore button
    var restoreButton = document.createElement('button')
    restoreButton.innerText = 'Restore Last!'
    restoreButton.addEventListener('click', (event) => {
        
        var pixels = localStorage.getItem('savedPic')
        console.log(pixels)
        if (pixels != null) {

            console.log("sdfdsf")
            pixels = JSON.parse(pixels);

            for (var key in pixels) {
                document.getElementById(key).style['background-color'] = pixels[key]
            }

        }
    })
    document.body.appendChild(restoreButton);

    // custom color button
    var customColorButton = document.createElement('input')
    customColorButton.setAttribute('type', 'color')
    var label = document.createElement('label')
    label.innerText = "Choose Color..."
    document.body.appendChild(label)
    customColorButton.addEventListener('change', (event) => {
        // update current color
        currentColor = event.target.value;
        document.getElementById('currColor').style['background-color'] = `${currentColor}`
    })
    document.body.appendChild(customColorButton);

    

    
});