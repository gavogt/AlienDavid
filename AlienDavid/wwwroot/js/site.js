document.addEventListener("DOMContentLoaded", () => {
    const runButton = document.getElementById("run-visualization");
    const entityCore = document.getElementById("entity-core");
    const status = document.getElementById("signal-status");
    const stage = document.querySelector(".visual-stage");
    const canvas = document.getElementById("telemetry-canvas");
    const heatmapCanvas = document.getElementById("heatmap-canvas");
    const modeReadout = document.getElementById("mode-readout");
    const locomotionReadout = document.getElementById("locomotion-readout");
    const perceptionReadout = document.getElementById("perception-readout");
    const cortexNoise = document.getElementById("cortex-noise");
    const patternLock = document.getElementById("pattern-lock");
    const signalFold = document.getElementById("signal-fold");
    const paradoxDrift = document.getElementById("paradox-drift");
    const fibonacciBloom = document.getElementById("fibonacci-bloom");
    const entityPresence = document.getElementById("entity-presence");

    if (!runButton || !entityCore || !status || !stage || !canvas || !heatmapCanvas) {
        return;
    }

    const context = canvas.getContext("2d");
    const heatmapContext = heatmapCanvas.getContext("2d");
    if (!context || !heatmapContext) {
        return;
    }

    let manifested = false;
    let animationFrameId = 0;
    let startTime = 0;

    const phrases = [
        "Abstract telemetry engaged. The scene is now mapping pulse and pattern flow.",
        "Paradox drift detected. The entity is re-threading the scene.",
        "Fibonacci bloom rising. The visual field is now alive."
    ];

    const resizeCanvas = () => {
        const rect = stage.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        canvas.width = Math.floor(rect.width * ratio);
        canvas.height = Math.floor(rect.height * ratio);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const resizeHeatmapCanvas = () => {
        const rect = heatmapCanvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        heatmapCanvas.width = Math.floor(rect.width * ratio);
        heatmapCanvas.height = Math.floor(rect.height * ratio);
        heatmapCanvas.style.width = `${rect.width}px`;
        heatmapCanvas.style.height = `${rect.height}px`;
        heatmapContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const fibonacciNumbers = [1, 1, 2, 3, 5, 8, 13, 21];

    const updateReadouts = (elapsedSeconds) => {
        const noise = manifested ? 42 + Math.round(Math.sin(elapsedSeconds * 1.8) * 18 + 18) : 14;
        const fold = manifested ? (1.4 + Math.sin(elapsedSeconds * 0.9) * 0.6).toFixed(2) : "0.0";
        const bloom = manifested ? fibonacciNumbers[(Math.floor(elapsedSeconds * 1.5) % fibonacciNumbers.length)] : 0;

        cortexNoise.textContent = `${noise}%`;
        patternLock.textContent = manifested ? "Recursive" : "Dormant";
        signalFold.textContent = `${fold}x`;
        paradoxDrift.textContent = manifested ? `${(elapsedSeconds * 0.73).toFixed(2)} ms` : "Idle";
        fibonacciBloom.textContent = `${bloom} nodes`;
        entityPresence.textContent = manifested ? "Visible" : "Standby";
        modeReadout.textContent = manifested ? "Telemetry Cascade" : "Sentient Pattern Storm";
        locomotionReadout.textContent = manifested ? "Phase Drift + Spiral Return" : "Synchronicity + Paradox Drift";
        perceptionReadout.textContent = manifested ? "Fibonacci Perception Machine" : "Hallucinating Fibonacci Field";
    };

    const drawGrid = (width, height) => {
        context.save();
        context.strokeStyle = "rgba(108, 232, 255, 0.08)";
        context.lineWidth = 1;

        for (let x = 0; x < width; x += 40) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }

        for (let y = 0; y < height; y += 40) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }
        context.restore();
    };

    const drawWaveField = (width, height, elapsedSeconds) => {
        const amplitude = manifested ? 28 : 10;
        const centerY = height * 0.72;
        const layers = manifested ? 4 : 2;

        for (let layer = 0; layer < layers; layer += 1) {
            context.beginPath();
            context.lineWidth = 1.5 + layer * 0.3;
            context.strokeStyle = `rgba(${manifested ? "108, 232, 255" : "169, 191, 208"}, ${0.22 + layer * 0.08})`;

            for (let x = 0; x <= width; x += 8) {
                const phase = x * 0.018 + elapsedSeconds * (1.2 + layer * 0.24);
                const y = centerY
                    + Math.sin(phase) * amplitude
                    + Math.cos(phase * 0.6 + layer) * amplitude * 0.4
                    + layer * 14;

                if (x === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            }

            context.stroke();
        }
    };

    const drawFibonacciSpiral = (width, height, elapsedSeconds) => {
        const centerX = width * 0.5;
        const centerY = height * 0.45;
        let radius = 10;

        context.save();
        context.translate(centerX, centerY);
        context.rotate(elapsedSeconds * (manifested ? 0.18 : 0.05));

        for (let index = 0; index < fibonacciNumbers.length; index += 1) {
            const fib = fibonacciNumbers[index];
            const angle = index * 0.85 + elapsedSeconds * 0.22;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            context.beginPath();
            context.fillStyle = `rgba(183, 255, 101, ${manifested ? 0.65 : 0.18})`;
            context.arc(x, y, 2 + fib * 0.45, 0, Math.PI * 2);
            context.fill();

            context.beginPath();
            context.strokeStyle = `rgba(255, 122, 92, ${manifested ? 0.28 : 0.1})`;
            context.lineWidth = 1.2;
            context.arc(0, 0, radius + fib * 2.2, angle - 0.8, angle + 0.8);
            context.stroke();

            radius += fib * (manifested ? 5.5 : 2.4);
        }
        context.restore();
    };

    const drawPulseColumns = (width, height, elapsedSeconds) => {
        const baseY = height * 0.18;
        const barWidth = width / 18;

        for (let index = 0; index < 12; index += 1) {
            const x = width * 0.08 + index * barWidth;
            const pulse = Math.abs(Math.sin(elapsedSeconds * 1.7 + index * 0.7));
            const barHeight = (manifested ? 90 : 26) * pulse + (manifested ? 24 : 10);
            const gradient = context.createLinearGradient(0, baseY, 0, baseY + barHeight);
            gradient.addColorStop(0, manifested ? "rgba(255, 122, 92, 0.8)" : "rgba(169, 191, 208, 0.35)");
            gradient.addColorStop(1, "rgba(108, 232, 255, 0.05)");

            context.fillStyle = gradient;
            context.fillRect(x, baseY, barWidth * 0.56, barHeight);
        }
    };

    const drawHeatmap = (elapsedSeconds) => {
        const width = heatmapCanvas.clientWidth;
        const height = heatmapCanvas.clientHeight;
        const columns = 14;
        const rows = 8;
        const cellWidth = width / columns;
        const cellHeight = height / rows;

        heatmapContext.clearRect(0, 0, width, height);

        for (let row = 0; row < rows; row += 1) {
            for (let column = 0; column < columns; column += 1) {
                const wave = Math.sin(elapsedSeconds * 1.1 + column * 0.65) + Math.cos(elapsedSeconds * 0.8 + row * 0.72);
                const fibBias = fibonacciNumbers[(row + column) % fibonacciNumbers.length] / 21;
                const intensity = manifested
                    ? Math.max(0, Math.min(1, (wave + 2) / 4 + fibBias * 0.45))
                    : Math.max(0, 0.12 + fibBias * 0.22);

                let fill = `rgba(108, 232, 255, ${0.10 + intensity * 0.25})`;
                if (intensity > 0.55) {
                    fill = `rgba(183, 255, 101, ${0.16 + intensity * 0.35})`;
                }
                if (intensity > 0.82) {
                    fill = `rgba(255, 122, 92, ${0.2 + intensity * 0.5})`;
                }

                const x = column * cellWidth;
                const y = row * cellHeight;
                heatmapContext.fillStyle = fill;
                heatmapContext.fillRect(x + 2, y + 2, cellWidth - 4, cellHeight - 4);
            }
        }

        heatmapContext.save();
        heatmapContext.strokeStyle = "rgba(255, 255, 255, 0.06)";
        heatmapContext.lineWidth = 1;

        for (let column = 0; column <= columns; column += 1) {
            const x = column * cellWidth;
            heatmapContext.beginPath();
            heatmapContext.moveTo(x, 0);
            heatmapContext.lineTo(x, height);
            heatmapContext.stroke();
        }

        for (let row = 0; row <= rows; row += 1) {
            const y = row * cellHeight;
            heatmapContext.beginPath();
            heatmapContext.moveTo(0, y);
            heatmapContext.lineTo(width, y);
            heatmapContext.stroke();
        }

        const pathY = height * 0.5 + Math.sin(elapsedSeconds * 1.2) * height * 0.12;
        heatmapContext.beginPath();
        heatmapContext.strokeStyle = manifested ? "rgba(255, 255, 255, 0.72)" : "rgba(169, 191, 208, 0.24)";
        heatmapContext.lineWidth = 2;
        heatmapContext.moveTo(0, pathY);

        for (let x = 0; x <= width; x += 10) {
            const y = height * 0.5
                + Math.sin(x * 0.018 + elapsedSeconds * 1.3) * height * 0.08
                + Math.cos(x * 0.009 + elapsedSeconds * 0.5) * height * 0.05;
            heatmapContext.lineTo(x, y);
        }

        heatmapContext.stroke();
        heatmapContext.restore();
    };

    const render = (timestamp) => {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsedSeconds = (timestamp - startTime) / 1000;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        context.clearRect(0, 0, width, height);
        drawGrid(width, height);
        drawPulseColumns(width, height, elapsedSeconds);
        drawWaveField(width, height, elapsedSeconds);
        drawFibonacciSpiral(width, height, elapsedSeconds);
        drawHeatmap(elapsedSeconds);
        updateReadouts(elapsedSeconds);

        animationFrameId = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    resizeHeatmapCanvas();
    animationFrameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", () => {
        resizeCanvas();
        resizeHeatmapCanvas();
    });

    runButton.addEventListener("click", () => {
        manifested = !manifested;

        stage.classList.toggle("manifested", manifested);
        entityCore.classList.toggle("active", manifested);
        runButton.textContent = manifested ? "Recalibrate Entity" : "Run Entity Visualization";
        status.textContent = manifested
            ? phrases[Math.floor(Math.random() * phrases.length)]
            : "Standby. Signal not yet manifested.";
    });
});
