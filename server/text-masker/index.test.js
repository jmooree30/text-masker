const mask = require('./index');

test('that it works with only one keyword', () => {
  expect(mask.textMasker("aliens are coming", "aliens")).toBe("XXXX are coming");
});