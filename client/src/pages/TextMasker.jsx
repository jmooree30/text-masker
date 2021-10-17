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
        const payload = { title, text, originalText };
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

    const maskDocument = async () => {
        const payload = { text, keywords };
        if (text && keywords) {
            await api.maskDocument(payload).then(res => {
                setOriginalText(text);
                setText(res.data.text);
            }).catch(err => {
                window.alert(`Server Error: ${err}`);
            })
        } else {
            window.alert("You must first add the document text and keywords.")
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
