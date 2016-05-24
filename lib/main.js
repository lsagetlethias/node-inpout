'use strict';

;(() => {
    const
        /* external */
        ffi     = require('ffi'),
        ref     = require('ref'),
        /* internal */
        util    = require('util');

    //TODO: export in a config file
    const LIBRARY_FILE    = 'inpoutx64';

    const
        BOOL_TYPE   = ref.types.bool,
        UCHAR_TYPE  = ref.types.uchar,
        USHORT_TYPE = ref.types.ushort,
        ULONG_TYPE  = ref.types.ulong;

    let inpout;

    /**
     * Node implementation of InpOut dynamic library
     */
    class InpOut {
        /**
         * @return {Number}
         */
        get port () {
            return this.port;
        }

        /**
         * @param {Number} p
         */
        set port (p) {
            if (!util.isNumber(p)) {
                console.error('Very wrong port (%j)', p);
                return;
            }
            this.port = p;
        }

        /**
         * @returns {boolean}
         */
        get async () {
            return this.async;
        }

        /**
         * @param {boolean} a
         */
        set async (a) {
            this.async = !!a;
        }
        /**
         * Construct a port-mapped I/O interface on the given physical address.
         *
         * @param {Number} port
         * @param {boolean} [async]
         * @param {String} [library_file] without extension
         */
        constructor(port, async, library_file) {
            inpout = ffi.Library(library_file || LIBRARY_FILE, {
                'Inp32'                 : ['short', ['short']],
                'Out32'                 : ['void' , ['short', 'short']],
                'IsInpOutDriverOpen'    : [BOOL_TYPE, []],
                'IsXP64Bit'             : [BOOL_TYPE, []],
                'DlPortReadPortUchar'   : [UCHAR_TYPE,  [USHORT_TYPE]],
                'DlPortWritePortUchar'  : ['void',      [USHORT_TYPE, UCHAR_TYPE]],
                'DlPortReadPortUshort'  : [USHORT_TYPE, [USHORT_TYPE]],
                'DlPortWritePortUshort' : ['void',      [USHORT_TYPE, USHORT_TYPE]],
                'DlPortReadPortUlong'   : [ULONG_TYPE,  [USHORT_TYPE]],
                'DlPortWritePortUlong'  : ['void',      [USHORT_TYPE, ULONG_TYPE]]
            })
            
            /** @member {Number} */
            this.port = port;
            /** @member {boolean} */
            this.async = !!async;
        }

        /**
         * Set async with chain
         *
         * @param {boolean} a
         * @return {InpOut}
         */
        setAsync (a) {
            this.async = !!a;
            return this;
        }

        /**
         * @typedef {Function} ffi_ForeignFunction
         * @property {Function} async
         */
        /**
         * "Don't Repeat Yourself" private method that handle the call, async or not, of the DLL actions
         *
         * @param {ffi_ForeignFunction} fn
         * @param {...*} args
         * @return {?(*|Promise)}
         * @private
         */
        _DRYCaller(fn, ...args) {
            let that = this;
            if (!this.async) {
                if (args.length > 0) return fn(this.port, ...args);
                return fn(this.port);
            }
            return new Promise((ok, ko) => {
                args.push((err, res) => {
                    if (err) { ko(err); }
                    else { ok(res); }
                });
                fn.async(that.port, ...args);
            });
        }

        /**
         * Read data (byte) from previously given port.
         *
         * @return {(Number|Promise)} return value or Promise with it if this.async=true
         */
        read() {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.Inp32);
        }
        /**
         * Write data (byte) to previously given port.
         *
         * @param {Number} data
         * @return {?Promise} if this.async=true
         */
        write(data) {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.Out32, data);
        }

        /**
         * Read data (unsigned char (*?)) from previously given port.
         *
         * @return {(Number|Promise)} return value or Promise with it if this.async=true
         */
        readUchar() {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.DlPortReadPortUchar);
        }
        /**
         * Write data (unsigned char (*?)) to previously given port.
         *
         * @param {Number} data
         * @return {?Promise} if this.async=true
         */
        writeUchar(data) {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.DlPortWritePortUchar, data);
        }

        /**
         * Read data (unsigned short) from previously given port.
         *
         * @return {(Number|Promise)} return value or Promise with it if this.async=true
         */
        readUshort() {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.DlPortReadPortUshort);
        }
        /**
         * Write data (unsigned short) to previously given port.
         *
         * @param {Number} data
         * @return {?Promise} if this.async=true
         */
        writeUshort(data) {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.DlPortWritePortUshort, data);
        }

        /**
         * Read data (unsigned long) from previously given port.
         *
         * @return {(Number|Promise)} return value or Promise with it if this.async=true
         */
        readUlong() {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.DlPortReadPortUlong);
        }
        /**
         * Write data (unsigned long) to previously given port.
         *
         * @param {Number} data
         * @return {?Promise} if this.async=true
         */
        writeUlong(data) {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.DlPortWritePortUlong, data);
        }

        /**
         * Check if driver is loaded and usable.
         *
         * @return {(boolean|Promise)} return value or Promise with it if this.async=true
         */
        isDriverOpen() {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.IsInpOutDriverOpen);
        }

        /**
         * Check if we are running in WOW64.
         * (i.e. a 32bit process on XP x64 edition)
         *
         * @return {(boolean|Promise)} return value or Promise with it if this.async=true
         */
        is64Bit() {
            return this._DRYCaller(/** @type {ffi_ForeignFunction} */inpout.IsXP64Bit);
        }
    }

    exports.InpOut = InpOut;
})();