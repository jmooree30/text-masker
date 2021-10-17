import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 150px;
`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
}) `
    margin-bottom: 20 px;
    color: white;
`

function NavBar() {
    return (
        <Container>
            <Nav>
                Text Masker
            </Nav>
        </Container>
    )
}

export default NavBar
