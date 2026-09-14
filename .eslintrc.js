export default {
    // other configurations...
    rules: {
      // Ignore 'React' if it's not used
      'no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
      // Disable rules requiring React to be in scope
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
};
