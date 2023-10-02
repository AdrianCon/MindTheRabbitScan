import { useEffect, useState } from 'react';
import GlitchText from '../GlitchText/GlitchText'
import StairsText from '../StairsText/StairsText'
import './Header.scss'
export default function Header(){
    const randomInt = Math.floor(Math.random() * (2 - 1 + 1) + 1)

    return(
        <header className="head">
            {randomInt === 1 ? 
            <GlitchText />
            :
            <StairsText />
            }
        </header>
    )
}