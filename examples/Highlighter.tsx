import * as React from "react";

import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';

export default ({ lang, code }:{ lang: string; code: string}) => {
  return <SyntaxHighlighter
    language={lang || 'jsx'}
    style={atomDark}
    showLineNumbers
  >{code}</SyntaxHighlighter>;
}