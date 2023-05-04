export function waitAfterCallback(callback: () => any, time: number) {
  return new Promise((resolve) => {
    callback()
    setTimeout(() => {
      resolve('')
    }, time + (0.5 - Math.random()) * 150)
  })
}
