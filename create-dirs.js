const fs = require('fs');
const paths = [
  'c:/Users/nayan/OneDrive/Desktop/AIP05/frontend/app/features',
  'c:/Users/nayan/OneDrive/Desktop/AIP05/frontend/app/datasets',
  'c:/Users/nayan/OneDrive/Desktop/AIP05/frontend/app/(auth)/sign-in/[[...sign-in]]',
  'c:/Users/nayan/OneDrive/Desktop/AIP05/frontend/app/(auth)/sign-up/[[...sign-up]]'
];

paths.forEach(p => {
  try {
    fs.mkdirSync(p, {recursive: true});
    console.log(`✓ Created: ${p}`);
  } catch (err) {
    console.error(`✗ Failed to create ${p}: ${err.message}`);
  }
});

console.log('\nAll directories created successfully!');
