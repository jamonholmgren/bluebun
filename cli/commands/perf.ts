import { Props, print, ask } from "bluebun"

// run this with `bun run --inspect ./bluebun perf` to see the inspector
export default {
  name: "perf",
  description: "Runs stress test for inspector",
  run: async (props: Props) => {
    // long running perf test
    print("Running perf tests...")
    for (let i = 0; i < 100000000; i++) {
      // load a file
      const file = await Bun.file("package.json").json()
      // look at the 3rd character
      if (file.name[2] === "e") {
        // do nothing
      }
    }
  },
}
