#ifndef __MODULE_DHT11_H__
#define __MODULE_DHT11_H__

#include <stdio.h>
#include <string.h>

struct dht11_data {
    uint8_t hum;
    float   temp;
};

void module_dht11_init(void);
void get_module_dht11_data(void* pvParameters);
void module_dht11_task(void* pvParameters);

#endif
