import path from 'path'
import { watch, rollup, OutputOptions } from 'rollup'
import minimist from 'minimist'
import chalk from 'chalk'
import ora from 'ora'
import options from './rollup.config'

const argv = minimist(process.argv.slice(2))
const opt = options({
  proc: 'preload',
  env: argv.env,
  input: {
    main: path.join(__dirname, `../src/preload/main.ts`),
    login: path.join(__dirname, `../src/preload/login.ts`),
  },
})
const TAG = '[build-preload.ts]'
const spinner = ora(`${TAG} Electron preload build...`)

; (async () => {
  if (argv.watch) {
    const watcher = watch(opt)
    watcher.on('change', filename => {
      const log = chalk.yellow(`change -- ${filename}`)
      console.log(TAG, log)

      /**
       * @todo Hot reload render process !!!
       */
    })
  } else {
    spinner.start()
    try {
      const build = await rollup(opt)
      await build.write(opt.output as OutputOptions)
      spinner.succeed()
      process.exit()
    } catch (error) {
      console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n')
      spinner.fail()
      process.exit(1)
    }
  }
})();
