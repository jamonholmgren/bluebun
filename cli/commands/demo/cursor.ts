import { cursor, inputKey, print, type Props } from "bluebun"

export default {
  name: "cursor",
  description: "Tests cursor movement and bookmarking.",
  run: async (props: Props) => {
    cursor.alternate(true)
    cursor.write(`\n\n\n     Testing cursor movement and bookmarking.`).write("\n\n\n")

    while (true) {
      const k = await inputKey()
      if (k === "q") break
      if (k === "ctrl-c") break
      if (k === "esc") break
      if (k === "up") cursor.up()
      if (k === "down") cursor.down()
      if (k === "left") cursor.back()
      if (k === "right") cursor.forward()
      if (k === "backspace") cursor.backspace()
      if (k === "enter") cursor.moveDown()
      // if alphabetical, write it
      if (k.length === 1 && k.match(/[a-z]/i)) cursor.write(k)

      // if it's a number, go to the bookmark
      if (k.length === 1 && k.match(/[0-9]/)) {
        // if it's already a bookmark, go to it
        const pos = cursor.getBookmark(`bookmark-${k}`)
        if (pos) {
          cursor.goto(pos)
        } else {
          // save the position as a bookmark
          await cursor.bookmark(`bookmark-${k}`)
        }
      }
    }
    cursor.alternate(false)
  },
}
