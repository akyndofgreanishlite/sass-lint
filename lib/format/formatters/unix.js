/**
 * @fileoverview unix-style formatter.
 * @author oshi-shinobu
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns a canonical error level string based upon the error message passed in.
 * @param {Object} message Individual error message provided by eslint
 * @returns {string} Error level string
 */
const getMessageType = function (message) {
  if (message.severity === 2) {
    return 'Error';
  }
  return 'Warning';
};


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {

  let output = '',
      total = 0;

  results.forEach(result => {

    const messages = result.messages;

    total += messages.length;

    messages.forEach(message => {

      output += `${result.filePath}:`;
      output += `${message.line || 0}:`;
      output += `${message.column || 0}:`;
      output += ` ${message.message} `;
      output += `[${getMessageType(message)}${message.ruleId ? `/${message.ruleId}` : ''}]`;
      output += '\n';
    });
  });

  if (total > 0) {
    output += `\n${total} problem${total !== 1 ? 's' : ''}`;
  }

  return output;
};