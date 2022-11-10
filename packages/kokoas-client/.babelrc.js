const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: 'api-kintone',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
  ],
  [
    'babel-plugin-import',
    {
      "libraryName": "lodash",
      "libraryDirectory": "",
      "camel2DashComponentName": false,  // default: true
    }
  ],
  [
    'babel-plugin-import',
    {
      "libraryName": "date-fns",
      "libraryDirectory": "",
      "camel2DashComponentName": false,  // default: true
    }
  ]
];

module.exports = { plugins };