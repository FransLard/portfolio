export interface WaterBounds {
  waterMinY: number;
  waterMaxY: number;
}

export function renderWaterBody(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4
): void {
  let waterTop = '#3ed6a4';
  let waterMid = '#0e9384';
  let waterBottom = '#0a3f38';

  if (depthLevel === 1) {
    waterTop = '#3ed6a4';
    waterMid = '#0e9384';
    waterBottom = '#0b6e63';
  } else if (depthLevel === 2) {
    waterTop = '#3ed6a4';
    waterMid = '#0e9384';
    waterBottom = '#0a3f38';
  } else if (depthLevel === 3) {
    waterTop = '#0e9384';
    waterMid = '#0a3f38';
    waterBottom = '#01283a';
  } else {
    waterTop = '#0a3f38';
    waterMid = '#024968';
    waterBottom = '#023850';
  }

  const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
  waterGrad.addColorStop(0, waterTop);
  waterGrad.addColorStop(0.55, waterMid);
  waterGrad.addColorStop(1, waterBottom);
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, 0, width, height);
}

export function renderSandLayers(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4,
  time: number
): WaterBounds {
  let waterMinY = 0;
  let waterMaxY = height;

  if (depthLevel === 1) {
    const topSandHeight = height * 0.20;
    waterMinY = topSandHeight;

    ctx.save();
    const topSandGrad = ctx.createLinearGradient(0, 0, 0, topSandHeight);
    topSandGrad.addColorStop(0, '#f3d9ae');
    topSandGrad.addColorStop(0.25, '#f7e3bd');
    topSandGrad.addColorStop(0.55, '#f7e3bd');
    topSandGrad.addColorStop(0.80, '#fdeed3');
    topSandGrad.addColorStop(1.0, '#fff3df');
    ctx.fillStyle = topSandGrad;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, topSandHeight);

    for (let x = width; x >= 0; x -= 6) {
      const sy =
        topSandHeight +
        Math.sin(x * 0.005 + time * 0.8) * 8 +
        Math.cos(x * 0.009 - time * 0.4) * 4;
      ctx.lineTo(x, sy);
    }

    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        topSandHeight +
        Math.sin(x * 0.005 + time * 0.8) * 8 +
        Math.cos(x * 0.009 - time * 0.4) * 4;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4.5;
    ctx.stroke();

    ctx.restore();
  } else if (depthLevel === 4) {
    const bottomSandY = height * 0.82;
    waterMaxY = bottomSandY;

    ctx.save();
    const bottomSandGrad = ctx.createLinearGradient(0, bottomSandY, 0, height);
    bottomSandGrad.addColorStop(0, '#f5d9a8');
    bottomSandGrad.addColorStop(0.3, '#f7e3bd');
    bottomSandGrad.addColorStop(0.7, '#fdf0d5');
    bottomSandGrad.addColorStop(1.0, '#fff3df');
    ctx.fillStyle = bottomSandGrad;

    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, bottomSandY);

    for (let x = 0; x <= width; x += 6) {
      const sy =
        bottomSandY +
        Math.sin(x * 0.004 + time * 0.6) * 10 +
        Math.cos(x * 0.008 - time * 0.3) * 5;
      ctx.lineTo(x, sy);
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        bottomSandY +
        Math.sin(x * 0.004 + time * 0.6) * 10 +
        Math.cos(x * 0.008 - time * 0.3) * 5;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  }

  return { waterMinY, waterMaxY };
}

export function renderWaterWaves(
  ctx: CanvasRenderingContext2D,
  width: number,
  waterMinY: number,
  waterMaxY: number,
  time: number
): void {
  const wave1Y = waterMinY + (waterMaxY - waterMinY) * 0.35;
  ctx.save();
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const cy =
      wave1Y +
      Math.sin(x * 0.004 + time * 1.1) * 14 +
      Math.cos(x * 0.008 - time * 0.5) * 6;
    if (x === 0) ctx.moveTo(x, cy);
    else ctx.lineTo(x, cy);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 2.8;
  ctx.stroke();
  ctx.restore();

  const wave2Y = waterMinY + (waterMaxY - waterMinY) * 0.72;
  ctx.save();
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const cy =
      wave2Y +
      Math.sin(x * 0.005 + time * 0.9 + 2) * 16 +
      Math.sin(x * 0.01 - time * 0.4) * 8;
    if (x === 0) ctx.moveTo(x, cy);
    else ctx.lineTo(x, cy);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 2.4;
  ctx.stroke();
  ctx.restore();
}

export function renderBubbles(
  ctx: CanvasRenderingContext2D,
  width: number,
  waterMinY: number,
  waterMaxY: number,
  time: number
): void {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;

  const waterHeight = waterMaxY - waterMinY;
  for (let i = 0; i < 14; i++) {
    const speed = 0.5 + (i % 4) * 0.25;
    const bx = ((width * 0.075 * i + Math.sin(time * 0.8 + i) * 25 + width) % width);
    const by = waterMinY + (waterHeight - (((time * 50 * speed + i * 40) % waterHeight)));
    const r = 3.5 + (i % 3) * 2;

    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(bx - r * 0.35, by - r * 0.35, r * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
