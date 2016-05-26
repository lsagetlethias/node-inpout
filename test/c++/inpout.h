/* 
 * File:   inpout.h
 * Author: Lilian Saget-Lethias
 */
#pragma once

#ifndef INPOUT_H
#define INPOUT_H

#ifndef _WIN32
#define _stdcall
#define DECLDIR
#else
#if defined DLL_EXPORT
#define DECLDIR __declspec(dllexport)
#else
#define DECLDIR __declspec(dllimport)
#endif
#endif

extern "C"
{
    DECLDIR short           _stdcall Inp32(short PortAddress);
    DECLDIR void            _stdcall Out32(short PortAddress, short data);
    DECLDIR bool            _stdcall IsInpOutDriverOpen();
    DECLDIR bool            _stdcall IsXP64Bit();

    DECLDIR unsigned char   _stdcall DlPortReadPortUchar (unsigned short port);
    DECLDIR void            _stdcall DlPortWritePortUchar(unsigned short port, unsigned char Value);

    DECLDIR unsigned short  _stdcall DlPortReadPortUshort (unsigned short port);
    DECLDIR void            _stdcall DlPortWritePortUshort(unsigned short port, unsigned short Value);

    DECLDIR unsigned long   _stdcall DlPortReadPortUlong(unsigned long port);
    DECLDIR void            _stdcall DlPortWritePortUlong(unsigned long port, unsigned long Value);
}

#endif /* INPOUT_H */

