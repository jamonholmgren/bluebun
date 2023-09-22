import type { Parameters } from "./blowgun"

/**
 * This parses process.argv and returns an object with the command path and
 * options.
 *
 * Example:
 *
 * mycli parse file ./index.js --output ./dist/index.js --verbose -g=es6
 *
 * would return:
 *
 * {
 *   path: ["parse", "file", "./index.js"],
 *   options: {
 *     output: "./dist/index.js",
 *     verbose: true,
 *     g: "es6"
 *   }
 * }
 *
 * Options can be specified with or without a value. If the option is specified without
 * a value, the value will be `true`. If the option is specified with a value, the value
 * will be the next argument in the array.
 *
 * If an option is --no-foo or --skip-foo, the value will be `false`.
 *
 * Options can also be specified with a single dash, but only if the option is a single letter.
 *
 * Options can also be specified with --foo=bar or --foo bar.
 *
 * No commands are allowed after the first option.
 *
 * Usage:
 *
 * const { path, options, errors } = argvParser(process.argv)
 */
export function argvParser(argv: string[]): Parameters {
  const args = argv.slice(2)

  const fullpath: string[] = []
  const options: { [key: string]: string | boolean } = {}
  const errors: string[] = []
  let firstOption = false

  for (let i = 0; i < args.length; i += 1) {
    let arg = args[i]
    if (arg.startsWith("-")) {
      firstOption = true

      if (arg.startsWith("--")) {
        // normal 2-dash option
        arg = arg.slice(2)
      } else if (arg.startsWith("-") && arg.length === 2) {
        // if single-dash and only a single letter, treat as option
        arg = arg.slice(1)
      } else if (arg.startsWith("-") && arg.length > 2) {
        // multiple single-dash options, set them all to true
        arg = arg.slice(1)
        for (const letter of arg) {
          options[letter] = true
        }
        continue
      }

      // now check for --foo=bar
      const [key, value] = arg.split("=")
      if (value !== undefined) {
        options[key] = value
        continue
      }

      // if skip-foo or no-foo, set to false
      if (key.startsWith("skip-") || key.startsWith("no-")) {
        const realKey = key.replace("skip-", "").replace("no-", "")
        options[realKey] = false
        continue
      }

      // check if next arg is a value, and assign that to the option
      if (i + 1 < args.length && !args[i + 1].startsWith("-")) {
        options[key] = args[i + 1]
        i += 1 // skip that one, since we've parsed it
      } else {
        options[key] = true
      }

      // done with this option/arg
      continue
    }

    if (firstOption) {
      errors.push(`Unknown option: ${arg}`)
      continue
    }

    fullpath.push(arg)
  }

  return { fullpath, options, errors }
}
