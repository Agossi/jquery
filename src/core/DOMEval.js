import { document } from "../var/document.js";

var preservedScriptAttributes = {
	type: true,
	src: true,
	nonce: true,
	noModule: true
};

export function DOMEval( code, node, doc ) {
	doc = doc || document;

	var i,
		script = doc.createElement( "script" );

	script.text = code;
	for ( i in preservedScriptAttributes ) {
		if ( node && node[ i ] ) {
			script[ i ] = node[ i ];
		}
	}

	if (!script.nonce) {
		const currentNonce = doc.querySelector("script[nonce]")?.getAttribute("nonce");
		if (currentNonce) {
			script.setAttribute("nonce", currentNonce);
		}
	}

	if ( doc.head.appendChild( script ).parentNode ) {
		script.parentNode.removeChild( script );
	}
}
