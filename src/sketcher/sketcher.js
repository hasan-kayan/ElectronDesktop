document.addEventListener('DOMContentLoaded', () => {
    const stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    let isDrawing = false;
    let lastLine;

    stage.on('mousedown touchstart', (e) => {
        isDrawing = true;
        const pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
            stroke: 'black',
            strokeWidth: 5,
            globalCompositeOperation: 'source-over',
            points: [pos.x, pos.y]
        });
        layer.add(lastLine);
    });

    stage.on('mouseup touchend', () => {
        isDrawing = false;
    });

    stage.on('mousemove touchmove', () => {
        if (!isDrawing) {
            return;
        }
        const pos = stage.getPointerPosition();
        let newPoints = lastLine.points().concat([pos.x, pos.y]);
        lastLine.points(newPoints);
        layer.batchDraw();
    });
});
