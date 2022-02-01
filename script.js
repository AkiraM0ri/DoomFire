const firePixelsArr = []
const fireWidth = 40
const fireHeight = 40
const fireColorsPalette = [
    { r: 7, g: 7, b: 7, a: 0 },
    { r: 31, g: 7, b: 7, a: 1 },
    { r: 47, g: 15, b: 7, a: 1 },
    { r: 71, g: 15, b: 7, a: 1 },
    { r: 87, g: 23, b: 7, a: 1 },
    { r: 103, g: 31, b: 7, a: 1 },
    { r: 119, g: 31, b: 7, a: 1 },
    { r: 143, g: 39, b: 7, a: 1 },
    { r: 159, g: 47, b: 7, a: 1 },
    { r: 175, g: 63, b: 7, a: 1 },
    { r: 191, g: 71, b: 7, a: 1 },
    { r: 199, g: 71, b: 7, a: 1 },
    { r: 223, g: 79, b: 7, a: 1 },
    { r: 223, g: 87, b: 7, a: 1 },
    { r: 223, g: 87, b: 7, a: 1 },
    { r: 215, g: 95, b: 7, a: 1 },
    { r: 215, g: 95, b: 7, a: 1 },
    { r: 215, g: 103, b: 15, a: 1 },
    { r: 207, g: 111, b: 15, a: 1 },
    { r: 207, g: 119, b: 15, a: 1 },
    { r: 207, g: 127, b: 15, a: 1 },
    { r: 207, g: 135, b: 23, a: 1 },
    { r: 199, g: 135, b: 23, a: 1 },
    { r: 199, g: 143, b: 23, a: 1 },
    { r: 199, g: 151, b: 31, a: 1 },
    { r: 191, g: 159, b: 31, a: 1 },
    { r: 191, g: 159, b: 31, a: 1 },
    { r: 191, g: 167, b: 39, a: 1 },
    { r: 191, g: 167, b: 39, a: 1 },
    { r: 191, g: 175, b: 47, a: 1 },
    { r: 183, g: 175, b: 47, a: 1 },
    { r: 183, g: 183, b: 47, a: 1 },
    { r: 183, g: 183, b: 55, a: 1 },
    { r: 207, g: 207, b: 111, a: 1 },
    { r: 223, g: 223, b: 159, a: 1 },
    { r: 239, g: 239, b: 199, a: 1 },
    { r: 255, g: 255, b: 255, a: 1 }
];

function start(){
    createFireDataStructure();
    createFireSource()
    renderFire();
    
    setInterval(calculateFirePropagation, 50)
}

function modoNoturno() {
    const chb = document.querySelector('#theme')
    const doom = document.querySelector('#doom')

    if(chb.checked) {
        document.body.style.backgroundColor = 'rgb(7,7,7)'
        doom.style.color = '#fff'
    } else {
        document.body.style.backgroundColor = '#fff'
        doom.style.color = '#000'
    }
}

function createFireDataStructure() {
    const noOfPixels = fireWidth * fireHeight;

    for (let i = 0; i < noOfPixels; i++) {
        firePixelsArr[i] = 0 
    }
}

function calculateFirePropagation(){
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + ( fireWidth * row )
            
            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * 3 )
    const belowPixelFireIntensity = firePixelsArr[belowPixelIndex]
    const newFireIntensity = 
    belowPixelFireIntensity - decay >0 ? belowPixelFireIntensity - decay : 0;

    firePixelsArr[currentPixelIndex - decay] = newFireIntensity
}

function renderFire(){
    const debug = false;

    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++) {
            const pixelIndex = column + (fireWidth * row)
            const fireIntensity = firePixelsArr[pixelIndex]

            if (debug === true) {
                html += '<td>'
                html += `<div class=pixel-index>${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            } else {
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }

        }

        html += '</tr>' 
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArr[pixelIndex] = 36
    }
}

start()