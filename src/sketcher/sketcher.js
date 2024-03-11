document.addEventListener('DOMContentLoaded', () => {
    const stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
    });

    const photoLayer = new Konva.Layer(); // Layer for the photo
    stage.add(photoLayer);

    const drawingLayer = new Konva.Layer(); // Layer for drawing lines
    stage.add(drawingLayer);

    let isDrawing = false;
    let line;
    let lines = []; // Array to store all lines
    let angleText = new Konva.Text({ // Create text object for displaying angle
        x: 10,
        y: 10,
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 'black'
    });
    drawingLayer.add(angleText);

    // Add grid helper
    const gridSize = 50;
    for (let x = 0; x < stage.width(); x += gridSize) {
        drawingLayer.add(new Konva.Line({
            points: [x, 0, x, stage.height()],
            stroke: 'lightgrey',
            strokeWidth: 1,
            dash: [5, 5] // Optional: Add dashes to the grid lines for better visibility
        }));
    }

    for (let y = 0; y < stage.height(); y += gridSize) {
        drawingLayer.add(new Konva.Line({
            points: [0, y, stage.width(), y],
            stroke: 'lightgrey',
            strokeWidth: 1,
            dash: [5, 5] // Optional: Add dashes to the grid lines for better visibility
        }));
    }

    // Function to handle file upload
    function handleFileUpload(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const imgWidth = img.width;
                const imgHeight = img.height;
                const imgNode = new Konva.Image({
                    image: img,
                    x: 0,
                    y: 0
                });
                photoLayer.add(imgNode);
                photoLayer.batchDraw();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Event listener for file input change
    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Event listener for upload button click
    document.getElementById('uploadButton').addEventListener('click', function() {
        document.getElementById('fileInput').click();
    });

    stage.on('mousedown touchstart', (e) => {
        isDrawing = true;
        const pos = stage.getPointerPosition();
        line = new Konva.Line({
            stroke: 'black',
            strokeWidth: 5,
            globalCompositeOperation: 'source-over',
            points: [pos.x, pos.y, pos.x, pos.y] // start and end point are the same initially
        });
        drawingLayer.add(line);
        lines.push(line); // Add the line to the array
        drawingLayer.batchDraw();
    });

    stage.on('mouseup touchend', () => {
        isDrawing = false;
        updateAngle(); // Update angle after drawing each line
    });

    stage.on('mousemove touchmove', () => {
        if (!isDrawing) {
            return;
        }
        const pos = stage.getPointerPosition();
        let points = line.points();
        points[2] = pos.x; // Update the end point
        points[3] = pos.y;
        line.points(points);
        drawingLayer.batchDraw();
    });

    function updateAngle() {
        if (lines.length > 1) {
            let lastLine = lines[lines.length - 2];
            let currentLine = lines[lines.length - 1];
            let lastPoints = lastLine.points();
            let currentPoints = currentLine.points();

            // Calculate the angle between lines
            let angle = Math.atan2(currentPoints[3] - currentPoints[1], currentPoints[2] - currentPoints[0]) -
                Math.atan2(lastPoints[3] - lastPoints[1], lastPoints[2] - lastPoints[0]);
            angle = angle * (180 / Math.PI); // Convert radians to degrees

            angleText.text('Angle between lines: ' + angle.toFixed(2) + ' degrees');
            drawingLayer.batchDraw();
        }
    }

    // Zoom functionality
    let scaleBy = 1.05;
    stage.on('wheel', (e) => {
        e.evt.preventDefault();

        let oldScale = stage.scaleX();

        let pointer = stage.getPointerPosition();

        let deltaY = e.evt.deltaY;

        if (deltaY > 0) {
            // Zoom out
            stage.scaleX(oldScale * scaleBy);
            stage.scaleY(oldScale * scaleBy);
        } else {
            // Zoom in
            stage.scaleX(oldScale / scaleBy);
            stage.scaleY(oldScale / scaleBy);
        }

        let newPos = {
            x: -(pointer.x - stage.getPointerPosition().x / oldScale) * stage.scaleX(),
            y: -(pointer.y - stage.getPointerPosition().y / oldScale) * stage.scaleY()
        };

        stage.position(newPos);

        stage.batchDraw();
    });
});
