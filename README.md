# node-inpout

Node implementation and wrapping of InpOut dynamic library.

The DLLs are from http://www.highrez.co.uk/downloads/inpout32/ ; all credit goes to the author.
You can try to recompile dynamic libs from sources for another OS.



## Installation

This module run with [ffi](https://www.npmjs.com/package/ffi) ;
 so Make sure you've installed all the 
[necessary build tools](https://github.com/TooTallNate/node-gyp#installation) 
for your platform.

Then install it via npm:

``` bash
$ npm install --save node-inpout
```

## Example Usage

``` js
const InpOut = require('node-inpout');

let inpout = new InpOut(0x48C, true, 'inpoutx64');
inpout.Inp32().then((data) => {
    /* stuff */
});
```

License
-------

ISC License. See the `LICENSE` file.