export function run(command: string, args: string[]) {
  switch (command) {
    case "version":
      console.log("0.0.1")
      break
    default:
      console.log("Unknown command:", command)
  }
}
