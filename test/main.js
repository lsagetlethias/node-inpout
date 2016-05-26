'use strict';

const   mocha   = require('mocha'),
        should  = require('should'),
        InpOut  = require('../lib/main').InpOut;

const   PORT    = 999,
        RES     = 1,
        DATA    = 2;

let inpout = new InpOut(PORT, false, (require('path').join(__dirname, 'libtestinpout')));

describe('InpOut', () => {
    describe('read', () => {
        it('returns a static 1', () => {
            let data = inpout.read();
            console.info('Read', data, typeof data);
            data.should.be.eql(RES);
        });
    });
    describe('write', () => {
        it('do not explode', () => {
            (() => {inpout.write(DATA);}).should.not.throw();
        });
    });

    describe('readUshort', () => {
        it('returns a static 1', () => {
            let data = inpout.readUshort();
            console.info('ReadUshort', data, typeof data);
            data.should.be.eql(RES);
        });
    });
    describe('writeUshort', () => {
        it('do not explode', () => {
            (() => {inpout.writeUshort(DATA);}).should.not.throw();
        });
    });

    describe('readUchar', () => {
        it('returns a static 1', () => {
            let data = inpout.readUchar();
            console.info('ReadUchar', data, typeof data);
            data.should.be.eql(RES);
        });
    });
    describe('writeUchar', () => {
        it('do not explode', () => {
            (() => {inpout.writeUchar(DATA);}).should.not.throw();
        });
    });

    describe('readUlong', () => {
        it('returns a static 1', () => {
            let data = inpout.readUlong();
            console.info('ReadUlong', data, typeof data);
            data.should.be.eql(RES);
        });
    });
    describe('writeUlong', () => {
        it('do not explode', () => {
            (() => {inpout.writeUlong(DATA);}).should.not.throw();
        });
    });

    describe('isDriverOpen', () => {
        it('returns true because test mode', () => {
            let data = inpout.isDriverOpen();
            console.info('IsDriverOpen', data, typeof data);
            data.should.be.ok;
        })
    });
    describe('is64bit', () => {
        it('returns true because test mode', () => {
            let data = inpout.is64Bit();
            console.info('Is64bit', data, typeof data);
            data.should.be.ok;
        })
    });
});
