let stream
function queryPosition() {
  return new Promise((resolve, reject) => {
    const listener = (data) => {
      const str = data.toString()
      const match = str.match(/\d+/g)
      process.stdin.setRawMode(false)
      stream.pause()
      if (!match || match.length !== 2) {
        reject(new Error("Could not get cursor position"))
      } else {
        const [row, col] = match.map((n) => parseInt(n, 10))
        // Seems to resolve this issue: https://github.com/oven-sh/bun/issues/6279
        setTimeout(() => resolve({ row, col }), 0)
      }
    }
    process.stdin.setRawMode(true)
    if (!stream) {
      stream = process.stdin.on("data", listener)
    } else {
      stream.resume()
      stream.removeAllListeners("data")
      stream.on("data", listener)
    }
    process.stdout.write("\u001B[6n")
  })
}

queryPosition().then((pos) => {
  console.log(pos)
  queryPosition().then((pos) => {
    console.log(pos)
    queryPosition().then((pos) => {
      console.log(pos)
      queryPosition().then((pos) => {
        console.log(pos)
      })
    })
  })
})
