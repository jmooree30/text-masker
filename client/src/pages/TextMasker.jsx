import React, { useState } from 'react'
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'form-group',
}) `
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
}) `
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
}) `
    margin: 15px 15px 15px 5px;
`

const StyledTextarea = styled.textarea.attrs({
    className: 'form-control',
}) `
width: 50%;
height: 50%;
`;

function TextMasker() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [keywords, setKeywords] = useState('');
    const [originalText, setOriginalText] = useState("");

    const handleChangeInputTitle = event => {
        const title = event.target.value;
        setTitle(title);
    }

    const handleChangeInputText = event => {
        const text = event.target.value;
        setText(text);
    }

    const handleChangeInputKeywords = event => {
        const keywords = event.target.value;
        setKeywords(keywords);
    }

    const saveDocument = async () => {
        const payload = { title, text, originalText }
        if (title && text) {
            await api.insertDocument(payload).then(res => {
                window.alert(`Document saved successfully`)
                setTitle('');
                setText('');
                setKeywords('');
                setOriginalText('');
            }).catch(err => {
                window.alert(`Server Error: ${err}`);
            })
        } else {
            window.alert("Please add a title and document text before saving.")
        }
    }

    const maskDocument = () => {
        if (keywords && text) {
            setOriginalText(text);

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

            setText(documentText);
        } else {
            window.alert("You must add document text and keywords.")
        }
    }

    return (
        <Wrapper>

            <Label>Title: </Label>
            <InputText
                type="text"
                value={title}
                onChange={(event) => handleChangeInputTitle(event)}
            />

            <Label>Keywords & Phrases: </Label>
            <InputText
                type="text"
                value={keywords}
                onChange={(event) => handleChangeInputKeywords(event)}
            />

            <Label>Document Text: </Label>
            <StyledTextarea
                type="text"
                value={text}
                onChange={(event) => handleChangeInputText(event)}
            />

            <Button onClick={() => maskDocument()}>Mask Document</Button>
            <Button onClick={() => saveDocument()}>Save Document Text</Button>
        </Wrapper>
    )
}

export default TextMasker
