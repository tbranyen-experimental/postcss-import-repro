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
                  require('postcss-import')({
                    interceptAtRule(atRule) {
                      // Remove the reference tag.
                      atRule.params = atRule.params.replace(
                        /\(reference\) /g,
                        ''
                      );
                      atRule.prev = () => false;
                    },
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
