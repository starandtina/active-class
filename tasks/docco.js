module.exports = function () {
  'use strict';

  return {
    docs: {
      src: ['dist/active-class.js'],
      options: {
        output: '<%= docsDir %>/docco'
      }
    }
  };
};
