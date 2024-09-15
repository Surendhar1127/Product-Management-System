module.exports = (error) => {
  console.error('Server error:', error);
  process.exit(1);
};