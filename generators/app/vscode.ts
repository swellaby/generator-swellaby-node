'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');

import pathHelpers = require('./path-helpers');
import ProjectTypes = require('./project-types');

/**
 * Adds the appropriate launch configuration to the VSCode settings based on the project type.
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 *
 * @private
 */
// tslint:disable-next-line:no-any
const addLaunchConfiguration = (generator: YeomanGenerator, context: any) => {
    const launch = generator.fs.readJSON(path.join(generator.destinationRoot(), '.vscode/launch.json'), {});
    const projectType: ProjectTypes = +ProjectTypes[context.type];

    if (projectType === ProjectTypes.chatbot) {
        launch.configurations[0].program = '${workspaceRoot}/src/server.ts';
    } else if (projectType === ProjectTypes.expressApi) {
        launch.configurations[0].program = '${workspaceRoot}/src/app.ts';
    }

    generator.fs.writeJSON(path.join(generator.destinationRoot(), '.vscode/launch.json'), launch);
};

/**
 * Scaffolds the VS Code content.
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
export const scaffoldVSCodeContent = (generator: YeomanGenerator, extensionConfig: any) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to scaffold the ' +
            'VS Code content :( The VS Code files were not added to the project.');
        return;
    }

    generator.sourceRoot(pathHelpers.vscodeRoot);
    const context = extensionConfig;
    context.dot = true;
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot() + '/.vscode', context);
    addLaunchConfiguration(generator, context);
};