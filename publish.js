const { execSync } = require('child_process');
const { statSync, readdirSync } = require('fs');

readdirSync('./packages').forEach((item) => {
  const dir = './packages/' + item;
  if (statSync(dir).isDirectory()) {
    try {

    // const result = execSync("standard-version")
    // if (result) {
      const pub = execSync("npm publish")
      if (pub) {
        console.log('> 发布成功');
      }
    // }
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }
});
