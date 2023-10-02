import GlitchText from '../GlitchText/GlitchText'
import StairsText from '../StairsText/StairsText'
import './Header.scss'
export default function Header(){
    return(
        <header className="head">
            {/* <GlitchText /> */}
            <StairsText />
        </header>
    )
}