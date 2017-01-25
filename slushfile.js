/*
 * slush-start-task
 * https://github.com/effervescentia/slush-start-task
 *
 * Copyright (c) 2017, Ben Teichman
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var yarn = require('gulp-yarn');
var _ = require('underscore.string');
var inquirer = require('inquirer');
var path = require('path');

function format (string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

var defaults = (function () {
  var workingDirName = path.basename(process.cwd());
  var homeDir;
  var osUserName;
  var configFile;
  var user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  } else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    taskName: workingDirName.replace(/^start-/, ''),
    userName: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || ''
  };
})();

gulp.task('default', function (done) {
  var prompts = [{
    name: 'taskName',
    message: 'What is the name of your Start task?',
    default: defaults.taskName
  }, {
    name: 'appDescription',
    message: 'What is the description?'
  }, {
    name: 'appVersion',
    message: 'What is the version of your project?',
    default: '1.0.0'
  }, {
    name: 'authorName',
    message: 'What is the author name?',
    default: defaults.authorName
  }, {
    name: 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    name: 'userName',
    message: 'What is the github username?',
    default: defaults.userName
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }];
    // Ask
  inquirer.prompt(prompts,
        function (answers) {
          if (!answers.moveon) {
            return done();
          }
          answers.year = new Date().getFullYear();
          answers.appNameSlug = `start-${_.slugify(answers.taskName)}`;
          answers.appNameCamel = _.camelize(answers.appNameSlug);

          gulp.src(__dirname + 'templates/**')
                .pipe(template(answers, { interpolate: /<%=([\s\S]+?)%>/g }))
                .pipe(rename(function (file) {
                  if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                  }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(yarn())
                .on('end', function () {
                  done();
                });
        });
});
