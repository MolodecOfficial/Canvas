/** @type {HTMLCanvasElement} */


function newFigures() {
    const canvas = document.getElementById("canvas");
    var 
    hexHeight,
    hexRadius,
    hexRectangleHeight, 
    hexRectangleWidth,
    hexagonAngle = 0.523598776, // 30 градусов в радианах
    sideLength = 30, // длина стороны, пискели
    boardWidth = 51, // ширина "доски" по вертикали
    boardHeight = 20; // высота "доски" по вертикали
   
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;
    
    var coloredHexagons = []; // массив для закрашивания фигур
    
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d")
        ctx.fillStyle = "#009000";
        ctx.strokeStyle = '#d1d1d147';
        ctx.lineWidth = 3;
        drawBoard(ctx, boardWidth, boardHeight); // первичная отрисовка
        canvas.addEventListener("click", function(eventInfo) { // обработчик клика
            const x = eventInfo.offsetX || eventInfo.layerX;
            const y = eventInfo.offsetY || eventInfo.layerY;
            const hexY = Math.floor(y / (hexHeight + sideLength));
            const hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);
            const screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            const screenY = hexY * (hexHeight + sideLength);
            if (hexX >= -boardWidth/2 && hexX <= boardWidth) {
                if (hexY >= -boardHeight/2 && hexY <= boardHeight) {
                    var hexKey = hexX + "_" + hexY;
                    if (!coloredHexagons.includes(hexKey)) { // проверяем, не закрашен ли уже шестиугольник
                        coloredHexagons.push(hexKey); // добавляем координаты закрашенного шестиугольника в массив
                        var selectedColor = document.getElementById("colorPicker").value;
                        ctx.fillStyle = selectedColor;
                        drawHexagon(ctx, screenX, screenY, true); // закрасить шестиугольник в выбранный цвет
                    }
                }
            }
        });
        // Перебираем массив coloredHexagons и закрашиваем все шестиугольники из этого массива
        coloredHexagons.forEach(function(hexKey) {
            const coordinates = hexKey.split("_");
            const hexX = parseInt(coordinates[0]);
            const hexY = parseInt(coordinates[1]);
            const screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            const screenY = hexY * (hexHeight + sideLength);
            ctx.fillStyle = "#009000";
            drawHexagon(ctx, screenX, screenY, true); // закрасить шестиугольник в зеленый
        });
        
    }
    
    function drawBoard (canvasContext, width, height) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                drawHexagon (ctx, i * hexRectangleWidth + ((j % 2) * hexRadius), 
                j * (sideLength + hexHeight), false);
            }
        }
    }

    function drawHexagon (canvasContext, x, y, fill) {           
        var fill = fill || false;
        canvasContext.beginPath();
        canvasContext.moveTo (x + hexRadius, y);
        canvasContext.lineTo (x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo (x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo (x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo (x, y + sideLength + hexHeight);
        canvasContext.lineTo (x, y + hexHeight);
        canvasContext.closePath();
        if (fill) canvasContext.fill();
        else canvasContext.stroke();
    }
};
newFigures()
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}