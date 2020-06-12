// backing script for the pixel art maker

window.addEventListener('DOMContentLoaded', (event) => {    

    var currentColor = 'black'

    // make the 32 by 32 table
    var size = 10;
    var table = document.createElement('table')


    for (let i=0; i<32; i++) {
        let row = document.createElement('tr')     
        row.style = 'margin: 0px; padding: 0px;'   
        for (let j=0;j<32; j++) {
            let cell = document.createElement('td')
            cell.style = `width: ${size}px; height: ${size}px; border: 1px solid black; margin: 0px;`
            
            // each cell will have its x-y coords in its id as 'row-column'
            cell.id = `${i}-${j}`;

            // add cell to the row
            row.appendChild(cell)
        }
        table.appendChild(row)
    }

    table.style = 'margin: 0px; padding: 0px; border: 0px solid black;border-collapse: collapse; border-spacing: 0; '
    table.addEventListener('mousedown', (event) => {

        // color the cell
        document.getElementById(event.target.id).style = `background-color: ${currentColor};`
    })
    table.addEventListener('mousemove', (event) => {
        if (event.buttons == 1) {

            // color the cell
            document.getElementById(event.srcElement.id).style = `background-color: ${currentColor};`
        }
    })
    
    document.querySelector("#editor").appendChild(table)

    // make some basic colors available in the pallete
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

    // add the color table to the DOM
    document.querySelector("#colors").appendChild(colorTable)
    

    var clearTable = () => {
        for (let i=0;i<32;i++) {
            for (let j=0;j<32;j++) {
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