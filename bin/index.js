#!/usr/bin/env node
process.env.FORCE_COLOR = true
const chalk = require('chalk')
const { Command } = require('commander')
const packageJson = require('../package.json')

const init = async () => {
    let appName;
    let program =  new Command(packageJson.name);

    console.log(process.version);
   
    program.version(packageJson.version)
        .arguments('<project-directory>')
        .usage(`${chalk.green('<project-directory>')} [options]`)
        .action(projectName => {
            appName = projectName;
            suggestCommands(projectName);
        })
        .parse(process.argv)
    console.log(appName, process.argv)
}


init();


function suggestCommands(unknownCommand) {
    const availableCommands = ['create'];

    let suggestion;

    availableCommands.forEach(cmd => {
        let distance = minDistance(cmd, unknownCommand); 
        if (distance < 3 && distance >= 1) {
            suggestion = cmd;
        }
    });

    if (suggestion) {
        console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
    }
}

function minDistance(word1, word2) {
    var m = word1.length;
    var n = word2.length;

    if(m == 0) return n;
    if(n == 0) return m;

    var dp = new Array(m + 1).fill(0).map(item => new Array(n + 1).fill(0));

    for(var i = 0;i <= m;i++){
        dp[i][0] = i;
    }

    for(var i = 0;i <= n;i++){
        dp[0][i] = i;
    }

    for(var i = 1; i <= m;i++){
        for(var j = 1;j <= n;j++){
            if(word1[i - 1] == word2[j - 1]){
                dp[i][j] = dp[i - 1][j - 1];
            }else{
                dp[i][j] = Math.min(dp[i - 1][j - 1],dp[i - 1][j],dp[i][j - 1]) + 1;
            }
        }
    }


    // console.log(dp)
    return dp[m][n];
};