import remarkableRender from './remarkable';
import katexRender from './katex';
import rerouteLinks from './reroute';
import {symbolRender, citationsRender} from './jsonrender';

export type Config = {
  input: string, 
  citations?: any, 
  symbols?: {[latexSymbol: string]: {type: string, description: string}},
  rerouteLinks?: ((str: string) => string)
};

/**
 * Processes Markdown with Syntax Highlighting 
 * and Latex Preprocessors, and adds references.
 */
function markademic(config: Config) {
  
  let out = katexRender(config.input);
  if (out !== undefined)
    out = remarkableRender(out);
  else
    out = remarkableRender(config.input);

  if (config.rerouteLinks)
    out = rerouteLinks(out, config.rerouteLinks);

  if (config.symbols)
    out = symbolRender(out, config.symbols);

  if (config.citations)
    out = citationsRender(out, config.citations);


  return out;
}

export default markademic;
