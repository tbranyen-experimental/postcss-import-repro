const replaceImportReferencePlugin = (opts = {}) => ({
  postcssPlugin: 'remove-reference',

  AtRule(rule) {
    // Replace (reference) imports with default behavior.
    if (rule.name === 'import') {
      rule.params = rule.params.replace(/\(reference\) /g, '');
    }
  },
});

replaceImportReferencePlugin.postcss = true;

module.exports = {
  entry: {
    home: ['./index.js', './index.less'],
  },

  module: {
    rules: [
      {
        test: /(\.less)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              context: './',
            },
          },
          { loader: 'less-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                syntax: require('postcss-less'),
                plugins: [
                  replaceImportReferencePlugin(),
                  require('postcss-import')({
                    plugins: [
                      replaceImportReferencePlugin(),
                    ],
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
