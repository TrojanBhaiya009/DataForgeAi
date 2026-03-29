// Cleanup file - can be deleted
const fs = require('fs');

// Delete this file after UI revamp is complete
try {
  fs.unlinkSync(__filename);
  console.log('Cleanup file deleted');
} catch (e) {
  console.log('File already deleted or error:', e.message);
}
