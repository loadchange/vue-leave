export function overlap(dom1, dom2) {
  let rect1 = dom1.getBoundingClientRect()
  let rect2 = dom2.getBoundingClientRect()

  let x1 = rect1.x || rect1.left
  let y1 = rect1.y || rect1.top
  let w1 = rect1.width
  let h1 = rect1.height

  let x2 = rect2.x || rect2.left
  let y2 = rect2.y || rect2.top
  let w2 = rect2.width
  let h2 = rect2.height

  return (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2)
}
