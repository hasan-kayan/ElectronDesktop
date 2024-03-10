document.addEventListener('DOMContentLoaded', () => {
    const stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    let isDrawing = false;
    let line;

    stage.on('mousedown touchstart', (e) => {
        isDrawing = true;
        const pos = stage.getPointerPosition();
        line = new Konva.Line({
            stroke: 'black',
            strokeWidth: 5,
            globalCompositeOperation: 'source-over',
            points: [pos.x, pos.y, pos.x, pos.y] // start and end point are the same initially
        });
        layer.add(line);
    });

    stage.on('mouseup touchend', () => {
        isDrawing = false;
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
        layer.batchDraw();
    });
});
