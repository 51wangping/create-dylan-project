#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const yargs = require('yargs');
const chalk = require('chalk');
const { execSync, exec } = require('child_process');
const path = require('path');
const ejs = require('ejs');
const ora = require('ora');

const logger = {
  info(tag, message) {
    return console.log(chalk`{magenta ${tag}:} ${message}`);
  },

  error(tag, message) {
    return console.log(chalk`{red ${tag}:} ${message}`);
  },
};

const execAsync = (command, options, slient = false) => {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, options);

    childProcess.stdout.on('message', (message) => {
      slient && console.log(message.toString());
    });

    childProcess.stdout.on('error', (message) => {
      slient && console.log(message.toString());
    });

    childProcess.on('error', (err) => {
      reject(err);
    });

    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve();
      }
    });
  });
};

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

yargs
  .version(require('../package.json').version)
  .command(
    'init <projectName>',
    '初始化项目',
    (yargs) => {
      yargs.positional('projectName', {
        describe: '项目名称',
        type: 'string',
      });
    },
    async (argv) => {
      let templateModulePath;
      let gitFail = false;

      const { projectName } = argv;

      if (!projectName) {
        logger.error('错误', '请输入项目名称');
        return;
      }

      const projectPath = path.resolve(process.cwd(), projectName);

      if (fs.existsSync(projectPath)) {
        logger.error('错误', '项目已存在');
        return;
      }

      console.log(`> 开始创建项目 ${chalk.yellow(projectName)}，请根据提示完成项目配置`);

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          message: '项目描述',
          validate: (input) => {
            if (input.length > 0) {
              return true;
            }
            return '请输入项目描述';
          }
        },
        {
          type: 'list',
          message:'选择项目模板',
          name: 'template',
          choices: [
            {
              name: 'react-mobile',
              value: 'react-mobile',
            },
            {
              name: 'react-pc',
              value: 'react-pc',
            },
            {
              name: 'taro 小程序',
              value: 'taro-mobile',
            }
          ]
        }
      ]);
      // 写一个默认，让依赖能装到当前文件夹
      fs.writeFileSync(
        path.join(projectPath, `package.json`),
        JSON.stringify(
          {
            name: projectName,
            description: answers.description,
            version: '0.1.0',
          },
          null,
          2
        )
      );

      const spinner = ora('正在获取模板...\n');
      spinner.start();

      // 模板地址 TODO: 支持多模板 根据answers.template 匹配
      if (process.env.NODE_ENV === 'debug') {
        templateModulePath = path.resolve(__dirname, '../../react-pc-template');
      } else {
        await execAsync(
          `npm install  react-pc-template --no-save`,
          {
            cwd: projectPath
          }
        );
        spinner.succeed('获取模板完成');
        await sleep(500);
        templateModulePath = path.resolve(projectPath,`./node_modules/react-pc-template`);
        logger.info('模板地址', templateModulePath);
        // templateModulePath = path.resolve(__dirname, '../../react-pc-template');
      }

      const templateInfo = require(path.join(templateModulePath, 'template.json'));
      const templatePah = path.join(templateModulePath, 'template');
      const packageJSON = templateInfo.package;
      packageJSON.name = projectName;
      packageJSON.description = answers.description;

      console.log('');
      fs.ensureDirSync(projectName);


      logger.info('复制文件',"package.json");
      fs.writeFileSync(path.join(projectName, 'package.json'), JSON.stringify(packageJSON, null, 2));

      // 复制文件
      const copyFile = (dir) => {
        if (!fs.existsSync(dir)) return;

        fs.readdirSync(dir).forEach((filePath) => {
          if (['.DS_Store'].includes(filePath)) {
            return;
          }

          const fullFilePath = path.join(dir, filePath);

          if (fs.statSync(fullFilePath).isDirectory()) {
            copyFile(fullFilePath);
            return;
          }

          const relativePath = path.relative(templatePah, fullFilePath);

          fs.ensureDirSync(path.dirname(path.join(projectName, relativePath)));

          logger.info('复制文件', `${relativePath}`);

          if (
            filePath === 'manifest.json'
          ) {
            const fileContent = ejs.render(fs.readFileSync(fullFilePath).toString(), result);
            fs.writeFileSync(path.join(projectName, relativePath), fileContent);
            return;ss
          } else {
            fs.copyFileSync(fullFilePath, path.join(projectName, relativePath));
          }
        });
      };

      copyFile(templatePah);

      console.log('');


      try {
        execSync('git init', {
          cwd: projectName,
        });

        logger.info('GIT', '初始化仓库完成');
      } catch (e) {
        gitFail = true;
        logger.error(
          'GIT',
          '初始化仓库失败，会导致安装 git hooks 失效，请后续手动初始化 git 并重新安装 node_modules'
        );
      }

      console.log('');
      console.log(`> 安装依赖模块`);
      console.log('');

      execSync('yarn ', {
        cwd: projectName,
        stdio: 'inherit',
      });

       if (!gitFail) {
        try {
          execSync('git add .', {
            cwd: appDir,
          });
          execSync('git commit -m "initial project" --no-verify', {
            cwd: appDir,
          });
        } catch (e) {
          //
        }
      }

      spinner.succeed('项目初始化成功');
      console.log('');
      console.log(`> 应用创建完成，可以通过下面的命令启动了\n${chalk.cyan(`cd ${projectName}\n`)}${chalk.cyan(`npm start`)}\n`);
      sleep(500);
      console.log('更多信息请查看项目内的 README.md，拜拜~');
    }
  ).demandCommand()
  .showHelpOnFail(true)
  .help().argv;

process.on('unhandledRejection', (err) => {
  
  throw err;
});