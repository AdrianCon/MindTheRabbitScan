import './Code.scss'
import { CopyBlock } from "react-code-blocks";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Code({code}: any){
    let myMap = new Map(Object.entries(JSON.parse(code)));
    let jeison = JSON.parse(code)
    console.log(Object.keys(jeison))
    return (
        // <div
        //     style={{
        //         backgroundColor: '#1f4662',
        //         color: '#fff',
        //         fontSize: '12px',
        //         maxWidth: '60vw'
        //     }}>
        //     <pre
        //         style={{
        //             display: 'block',
        //             padding: '10px 30px',
        //             margin: '0',
        //             overflow: 'hidden',
        //         }}
        //     >
        //         {JSON.stringify(JSON.parse(code),null,4)}
        //     </pre>
        // </div>

        // <div style={{width: '40vw', flexDirection: 'row'}}>
            // <CopyBlock
            //     text={code}
            //     language='javascript'
            //     showLineNumbers
            //     wrapLines
            //     theme={dracula}
            //     customStyle={{
            //         maxWidth: '300px'
            //     }}
            // />
        // </div>
        <div style={{maxWidth: '80%', overflow: 'clip'}}>
            <SyntaxHighlighter
                language='json'
                style={dark}
                wrapLines={true}
                wrapLongLines
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

const dracula = {
    lineNumberColor: `#6272a4`,
    lineNumberBgColor: `#282a36`,
    backgroundColor: `#282a36`,
    textColor: `#f8f8f2`,
    substringColor: `#f1fa8c`,
    keywordColor: `#ff79c6`,
    attributeColor: `#50fa7b`,
    selectorTagColor: `#8be9fd`,
    docTagColor: `#f1fa8c`,
    nameColor: `#66d9ef`,
    builtInColor: `#50fa7b`,
    literalColor: `#FF79C6`,
    bulletColor: `#8BE9FD`,
    codeColor: `#50FA7B`,
    additionColor: `#f1fa8c`,
    regexpColor: `#F1FA8C`,
    symbolColor: `#F1FA8C`,
    variableColor: `#F8F8F2`,
    templateVariableColor: `#FF79C6`,
    linkColor: `#00bcd4`,
    selectorAttributeColor: `#FF79C6`,
    selectorPseudoColor: `#FF79C6`,
    typeColor: `#8BE9FD`,
    stringColor: `#F1FA8C`,
    selectorIdColor: `#50FA7B`,
    selectorClassColor: `#50FA7B`,
    quoteColor: `#E9F284`,
    templateTagColor: `#FF79C6`,
    deletionColor: `#FF79C6`,
    titleColor: `#ff555580`,
    sectionColor: `#F8F8F2`,
    commentColor: `#6272A4`,
    metaKeywordColor: `#50FA7B`,
    metaColor: `#50FA7B`,
    functionColor: `#50FA7B`,
    numberColor: `#bd93f9`,      
}
