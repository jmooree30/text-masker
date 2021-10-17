const mask = require('./index');

test('that it works with only one keyword', () => {
  expect(mask.textMasker("aliens are coming", "aliens")).toBe("XXXX are coming");
});

test('that it works with multiple words seperated by commas', () => {
  expect(mask.textMasker("aliens have landed in chicago", "aliens, chicago")).toBe("XXXX have landed in XXXX");
});

test('that it works with multiple words seperated by spaces', () => {
  expect(mask.textMasker("aliens have landed in chicago", "aliens chicago")).toBe("XXXX have landed in XXXX");
});

test('that it works with multiple words seperated by commas and spaces', () => {
  expect(mask.textMasker("aliens have landed in chicago. They seem hostile", "aliens chicago, hostile")).toBe("XXXX have landed in XXXX. They seem XXXX");
});

test('that it works with phrases in double quotes', () => {
  expect(mask.textMasker("aliens have landed in chicago. They seem hostile", "\"have landed\"")).toBe("aliens XXXX in chicago. They seem hostile");
});

test('that it works with phrases in single quotes', () => {
  expect(mask.textMasker("aliens have landed in chicago. They seem hostile", "'have landed'")).toBe("aliens XXXX in chicago. They seem hostile");
});

test('that it works with phrases in single quotes and double quotes seperated by spaces', () => {
  expect(mask.textMasker("aliens have landed in chicago. They seem hostile", "'have landed' \"seem hostile\"")).toBe("aliens XXXX in chicago. They XXXX");
});

test('that it works with phrases in single quotes and double quotes seperated by commas', () => {
  expect(mask.textMasker("aliens have landed in chicago. They seem hostile", "'have landed',\"seem hostile\"")).toBe("aliens XXXX in chicago. They XXXX");
});

test('that it works with words and phrases', () => {
  expect(mask.textMasker("aliens have landed in chicago. They seem hostile", "'have landed',seem hostile")).toBe("aliens XXXX in chicago. They XXXX XXXX");
});

test('that it works with words and phrases in single and double quotes', () => {
  expect(mask.textMasker("aliens have landed in chicago. They seem hostile", "'have landed' \"in chicago\",seem hostile")).toBe("aliens XXXX XXXX. They XXXX XXXX");
});

test('that it works with words containing apostrophes', () => {
  expect(mask.textMasker("aliens are coming. They're hostile", "they're")).toBe("aliens are coming. XXXX hostile");
});