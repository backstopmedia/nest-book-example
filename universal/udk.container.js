module.exports = {
  context: __dirname,
  angularProject: 'angular.io-example',
  autoRestart: true,
  hmr: false,
  metafiles: [
    'angular.json',
    'package.json',
    'tsconfig.json',
    'src/tsconfig.app.json',
    'src/tsconfig.server.json',
    'src/index.html'
  ]
};
