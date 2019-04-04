export function overlap(dom1, dom2) {
  const rect1 = dom1.getBoundingClientRect();
  const rect2 = dom2.getBoundingClientRect();

  const x1 = rect1.x || rect1.left;
  const y1 = rect1.y || rect1.top;
  const w1 = rect1.width;
  const h1 = rect1.height;

  const x2 = rect2.x || rect2.left;
  const y2 = rect2.y || rect2.top;
  const w2 = rect2.width;
  const h2 = rect2.height;

  return x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2;
}

export function getGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
