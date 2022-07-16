#ifndef __MODULE_DHT11_H__
#define __MODULE_DHT11_H__

#include <stdio.h>
#include <string.h>

void module_dht11_init(void);
void get_module_dht11_data(float* temp, int* hum);

#endif
