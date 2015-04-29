/**
 * Module
 */
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Sample = {
    name: 'Sample System',
    version: '0.0.1',
    summary: 'Sample System.',
    roles: [
        'admin',
        'general',
        'reporter'
    ]
};
