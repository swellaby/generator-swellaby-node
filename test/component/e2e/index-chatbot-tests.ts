'use strict';

import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yeomanAssert = require('yeoman-assert');

import ProjectTypes = require('./../../../generators/app/project-types');
import testHelpers = require('./../test-helpers');

/**
 * Contains component integration tests from the index entry point to the functions in chatbot.ts
 */
suite('Index/Chatbot Project Component Integration Tests:', () => {
    let gitInitCommandStub: Sinon.SinonStub;
    let npmInstallCommandStub: Sinon.SinonStub;
    let installDependenciesCommandStub: Sinon.SinonStub;

    setup(() => {
        gitInitCommandStub = testHelpers.createGitInitStub(Sinon);
        npmInstallCommandStub = testHelpers.createNpmInstallStub(Sinon);
        installDependenciesCommandStub = testHelpers.createDependenciesInstallStub(Sinon);
    });

    teardown(() => {
        Sinon.restore();
    });

    suite('Chatbot Option Tests:', () => {
        const chatbotAppName = 'chatbot app';
        const appType = ProjectTypes[ProjectTypes.chatbot];
        const appDescription = 'brand new chatbot';
        const author = 'hemingway';
        const chatbotFiles = [
            './src/bot.ts',
            './src/config.ts',
            './src/console.ts',
            './src/server.ts',
            './src/dialogs/dialog-base.ts',
            './src/dialogs/sample.ts'
        ];

        suiteSetup(() => {
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: appType,
                vscode: true,
                author: author
            };

            return helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise();
        });

        test('Should create all the correct boilerplate files when the Chatbot option is selected', () => {
            yeomanAssert.file(testHelpers.boilerplateFiles);
        });

        test('Should create all the correct express files when the Chatbot option is selected', () => {
            yeomanAssert.file(chatbotFiles);
        });

        test('Should inject the App Name into the README.md file when the Express API option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, '# ' + chatbotAppName);
        });

        test('Should inject the description into the README.md file when the Base option is selected', () => {
            yeomanAssert.fileContent(testHelpers.readmeFileName, appDescription);
        });

        test('Should inject author name correctly into package.json', () => {
            yeomanAssert.fileContent(testHelpers.packageJson, '"name": "' + author + '"');
        });

        test('Should create and scaffold into a new directory if the specified app name differs from the current directory with the Chatbot option', (done) => {
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.chatbot]
            };

            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then((dir) => {
                const cwd = testHelpers.getYeomanTmpCwd();
                yeomanAssert.equal(path.basename(cwd), chatbotAppName);
                yeomanAssert.equal(path.resolve(cwd), path.join(dir, chatbotAppName));
                done();
            });
        });

        test('Should scaffold into the current directory when the specified app name matches the current directory name with the Chatbot option', (done) => {
            Sinon.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), chatbotAppName);
            });
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.chatbot]
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then((dir) => {
                const cwd = testHelpers.getYeomanTmpCwd();
                yeomanAssert.equal(path.basename(cwd), path.basename(dir));
                yeomanAssert.equal(path.resolve(cwd), path.resolve(dir));
                yeomanAssert.noFile(path.join(process.cwd(), chatbotAppName));
                done();
            });
        });

        test('Should install dependencies if user confirms with the Chatbot option selected', (done) => {
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.chatbot],
                installDependencies: true
            };

            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(npmInstallCommandStub.called, true);
                yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                done();
            });
        });

        test('Should not install dependencies if user declines with the Chatbot option selected', (done) => {
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.chatbot],
                installDependencies: false
            };

            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(npmInstallCommandStub.called, false);
                yeomanAssert.deepEqual(installDependenciesCommandStub.called, false);
                done();
            });
        });

        test('Should create all the correct VS Code files when the vscode option is selected', () => {
            yeomanAssert.file(testHelpers.vsCodeFiles);
        });

        test('Should set VS Code debug program correctly for chatbot app', () => {
            yeomanAssert.fileContent('.vscode/launch.json', '"program": "${workspaceRoot}/src/server.ts"');
        });

        test('Should not add VS Code files if the user declines the vscode option', (done) => {
            const prompts = {
                appName: 'fo',
                description: appDescription,
                type: ProjectTypes[ProjectTypes.chatbot],
                vscode: false
            };

            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.noFile(testHelpers.vsCodeFiles);
                done();
            });
        });

        test('Should init a new git repository when the destination directory does not have a .git directory', (done) => {
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };
            helpers.run(testHelpers.generatorRoot).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(gitInitCommandStub.called, true);
                done();
            });
        });

        test('Should init a new git repository when the destination directory has a file entitled \'.git\'', (done) => {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in
            // the same directory as the destinationRoot of the generator.
            Sinon.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), chatbotAppName);
            });
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };
            helpers.run(testHelpers.generatorRoot).inTmpDir((dir) => {
                fs.writeFileSync(path.join(dir, '.git'), null);
            }).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(gitInitCommandStub.called, true);
                done();
            });
        });

        test('Should not init a new git repository when the destination directory already has a git repo initialized', (done) => {
            // this stub is to ensure that the tmp directory (see below) creates the .git directory in
            // the same directory as the destinationRoot of the generator.
            Sinon.stub(YeomanGenerator.prototype, testHelpers.yoDestinationPathFunctionName).callsFake(() => {
                return path.join(process.cwd(), chatbotAppName);
            });
            const prompts = {
                appName: chatbotAppName,
                description: appDescription,
                type: ProjectTypes[ProjectTypes.boilerplate]
            };
            helpers.run(testHelpers.generatorRoot).inTmpDir((dir) => {
                fs.mkdirSync(path.join(path.resolve(dir), '.git'));
            }).withPrompts(prompts).toPromise().then(() => {
                yeomanAssert.deepEqual(gitInitCommandStub.called, false);
                done();
            });
        });
    });
});