import { useRef, useEffect, useState} from 'react';

export default function Paint() {
    const CANVAS_W = 1200;
    const CANVAS_H = 675;
    const PIXEL_SIZE = 50;

    const cols = parseInt(CANVAS_W / PIXEL_SIZE);
    const rows = parseInt(CANVAS_H / PIXEL_SIZE);

    const canvasRef = useRef(null);
    const pixelsRef = useRef(null);

    useEffect(() => {
        console.log(rows)
        const arr = new Array(rows);
        for (let r = 0; r < rows; r++) {
            arr[r] = new Array(cols).fill(null); // null means transparent/empty
        }
        pixelsRef.current = arr;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        drawGrid(ctx);
    }, []);


    // draw the grid lines (subtle)
    function drawGrid(ctx) {
        ctx.save();
        ctx.strokeStyle = "rgba(0,0,0,0.06)";
        ctx.lineWidth = 1;
        for (let x = 0; x <= CANVAS_W; x += PIXEL_SIZE) {
            ctx.beginPath();
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, CANVAS_H);
            ctx.stroke();
        }
        for (let y = 0; y <= CANVAS_H; y += PIXEL_SIZE) {
            ctx.beginPath();
            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(CANVAS_W, y + 0.5);
            ctx.stroke();
        }
        ctx.restore();
    }

    return <>
        <div className="absolute w-full h-full aspect-video">
            <canvas className="w-full h-full"
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                style={{imageRendering: 'pixelated', touchAction: 'none'}}
            ></canvas>
        </div>
    </>
}