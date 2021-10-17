const textMasker = (text, keywords) => {
  let documentText = text;

  // split keywords into an array of individual chars (["t","h","e"])
  let splitKeywords = keywords.split("");

  // Transform any phrases that use single quotes to use double quotes
  // This will prevent any words that have apostrophes in them causing issues

  // If the current char is a ' then check the char before and after to determine if its a quote or // apostrophe
  splitKeywords.forEach((e, i) => {
    if (e === `'`) {
      if (i === 0 ||
        i === keywords.split("").length - 1 ||
        !keywords[i - 1].match(/[^,\s?]+/g) ||
        !keywords[i + 1].match(/[^,\s?]+/g)) {
        splitKeywords[i] = `"`;
      }
    }
  })

  // Array of all extracted phrases
  const extractedPhrases = splitKeywords.join("").split(`"`).filter((subStr, i) => {
    if (i % 2) return subStr;
  })

  // Array of all extracted words
  const extractedWords = splitKeywords.join("").split(`"`).filter((subStr, i) => {
    if (!(i % 2)) return subStr;
  }).join("").split(/[ ,]+/).filter(e => e)

  // Concatenate words and phrases together
  const cleanedText = extractedPhrases.concat(extractedWords);

  // Replace matches in text with the extracted keywords & phrases
  cleanedText.forEach(key => {

    // Get all occurrences (g), case insensitive (i), isn't a word within another word (\\b)
    const reg = new RegExp(`\\b${key}\\b`, 'gi');

    documentText = documentText.replace(reg, "XXXX");

  })

  return documentText;
}

exports.textMasker = textMasker;