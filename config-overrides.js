const { alias, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json'); // Adjust the path accordingly

module.exports = function override(config) {
  alias(aliasMap)(config);

  return config;
};