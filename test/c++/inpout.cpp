#include <iostream>
#include "inpout.h"

#define RED     "\x1b[31m"
#define GREEN   "\x1b[32m"
#define YELLOW  "\x1b[33m"
#define BLUE    "\x1b[34m"
#define MAGENTA "\x1b[35m"
#define CYAN    "\x1b[36m"
#define RESET   "\x1b[0m"

short _stdcall Inp32(short PortAddress) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"Inp32"RESET" on port="YELLOW"%hd"RESET"\n", PortAddress);
    return 1;
}
void _stdcall Out32(short PortAddress, short data) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"Out32"RESET" on port="YELLOW"%hd"RESET" with data="YELLOW"%hd"RESET"\n", PortAddress, data);
}
bool _stdcall IsInpOutDriverOpen() {
    printf(RED"[C++] " RESET "Hi! from "GREEN"IsInpOutDriverOpen"RESET"\n");
    return true;
}
bool _stdcall IsXP64Bit() {
    printf(RED"[C++] " RESET "Hi! from "GREEN"IsXP64Bit"RESET"\n");
    return true;
}

unsigned char _stdcall DlPortReadPortUchar(unsigned short port) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"DlPortReadPortUchar"RESET" on port="YELLOW"%hu"RESET"\n", port);
    return 1;
}
void _stdcall DlPortWritePortUchar(unsigned short port, unsigned char Value) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"DlPortReadPortUchar"RESET" on port="YELLOW"%hu"RESET" with value="YELLOW"%hhu"RESET"\n", port, Value);
}

unsigned short _stdcall DlPortReadPortUshort(unsigned short port) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"DlPortReadPortUshort"RESET" on port="YELLOW"%hu"RESET"\n", port);
    return 1;
}
void _stdcall DlPortWritePortUshort(unsigned short port, unsigned short Value) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"DlPortWritePortUshort"RESET" on port="YELLOW"%hu"RESET" with value="YELLOW"%hu"RESET"\n", port, Value);
}

unsigned long _stdcall DlPortReadPortUlong(unsigned long port) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"DlPortReadPortUlong"RESET" on port="YELLOW"%lu"RESET"\n", port);
    return 1;
}
void _stdcall DlPortWritePortUlong(unsigned long port, unsigned long Value) {
    printf(RED"[C++] " RESET "Hi! from "GREEN"DlPortWritePortUlong"RESET" on port="YELLOW"%lu"RESET" with value="YELLOW"%lu"RESET"\n", port, Value);
}