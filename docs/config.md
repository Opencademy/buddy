## Config settings

```js
// Project build configuration.
exports.build = {
  js: {
    // Directories containing potential js source files for this project ('node_modules' are added by default).
    sources: ['a/js/source/directory', 'another/js/source/directory'],
    // One or more js build targets.
    targets: [
      {
        // An entrypoint js (or equivalent) file to be wrapped in a module definition,
        // concatenated with all it's resolved dependencies.
        input: 'a/js/file',
        // A destination in which to save the processed input.
        // If a directory is specified, the input file name will be appended.
        output: 'a/js/file/or/directory',
        // An alternate destination in which to save the compressed output.
        output_compressed: 'a/js/file/or/directory',
        // A script to run before a target is built.
        before: 'console.log(context); done();',
        // A script to run after a target is built.
        after: './hooks/after.js',
        // A script to run after each output file is ready to be written to disk.
        afterEach: 'context.content = "foo"; done();',
        // A flag indicating that require.js boilerplate be added to the output file
        boilerplate: true,
        // A flag indicating that the entry point module should require itself (bootstrap)
        bootstrap: true,
        // Targets can have children.
        // Any sources included in the parent target will NOT be included in the child.
        targets: [
          {
            input: 'a/js/file',
            output: 'a/js/file/or/directory'
          }
        ]
      },
      {
        // Files are batch processed when a directory is used as input.
        input: 'a/js/directory',
        output: 'a/js/directory',
        // Skips module wrapping (ex: for use in server environments).
        modular: false
      },
      {
        // Files are only watched when no output is specified.
        // Glob patterns are allowed
        input: 'a/collection/of/{server,shared}/files/*.*'
        // Flag task to force server restarts on changes during "buddy watch --reload --serve"
        server: true
      }
    ]
  },
  css: {
    // Directories containing potential css source files for this project.
    sources: ['a/css/directory', 'another/css/directory'],
    // One or more css build targets
    targets: [
      {
        // An entrypoint css (or equivalent) file to be processed,
        // concatenated with all it's resolved dependencies.
        input: 'a/css/file',
        // A destination in which to save the processed input.
        // If a directory is specified, the input file name will be appended.
        output: 'a/css/file/or/directory'
      },
      {
        // Files are batch processed when a directory is used as input,
        // though @import'ed dependencies are still resolved and inlined.
        input: 'a/css/directory',
        output: 'a/css/directory'
      }
    ]
  },
  html: {
    // Directories containing potential css source files for this project.
    sources: ['a/html/directory', 'another/html/directory'],
    // One or more html build targets
    targets: [
      {
        // An entrypoint html (or equivalent) file to be processed
        input: 'an/html/template/file',
        // A destination in which to save the processed input.
        // If a directory is specified, the input file name will be appended.
        output: 'an/html/file/or/directory'
      }
    ]
  }
};

// Run a command after build
exports.script = 'command --flags';

// Configure webserver
exports.server = {
  // Defaults to project root
  directory: 'a/project/directory',
  // Alternatively, pass a file reference to start a custom application server
  file: 'a/file'
  // Specify port number. Defaults to 8080
  port: 8000
};
```