#!/usr/bin/env node

const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const mainPath = path.dirname(fs.realpathSync(__filename));

const boraBill = function (){

    const args = process.argv.slice(2);
    const soundPath = getSoundPath(args);

    const linuxcmd = 'paplay '+soundPath+'.ogg';
    const windowscmd = path.join(mainPath, './forWindows.vbs')+' '+soundPath+'.mp3';
    const maccmd = 'afplay '+soundPath+'.mp3';
    
    const platform = process.platform;

    if(platform === 'linux'){
        return exec(linuxcmd);
    }
    else if(platform === 'win32'){
        return exec(windowscmd);
    } else if(platform === 'darwin'){
        return exec(maccmd);
    }

    function exec(cmd){
        return exect(cmd, function (error, stdout, stderr) {
           if(error)
               console.error(error);
        });
    }
}

const getSoundPath = (args) => {

    const arg = args[0];

    switch (arg) {
        case '--muie':
            return path.join(mainPath, './boramuiedobill');
        case '--fio':
            return path.join(mainPath, './borafiodobill');
        default:
            return path.join(mainPath, './borabill');
    }
};

module.exports = boraBill;

if (!module.parent) {
    boraBill();
}