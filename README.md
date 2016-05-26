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

Also, on Windows systems, you can manually install `InstallDriver.exe` which is required to link the DLL to physical ports.
In any case, the module try itself to install it if it's necessary.

## Example Usage

``` js
const InpOut = require('node-inpout');

let inpout = new InpOut(0x48C, true, 'inpoutx64');
inpout.Inp32().then((data) => {
    /* stuff */
});
```

Test
----
To avoid the problem of using a physical device to test the module, you can find in the test folder C++ sources for a dummy dynamic library.
I've already build the OSX version and the sources should be safe to use in another platform.

License
----

ISC License. See the `LICENSE` file.