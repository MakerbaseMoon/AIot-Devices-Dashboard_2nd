#include "module_dht11.h"

#define SHOW_MODULE_DHT11_H_DEBUG

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "esp_timer.h"
#include "esp_log.h"

#include "driver/gpio.h"

#include "pin.h"

#define DHT11_MIN_INTERVAL_TIME_S                                                2
#define DHT11_MIN_INTERVAL_TIME_MS              ((DHT11_MIN_INTERVAL_TIME_S)  *  1000)
#define DHT11_MIN_INTERVAL_TIME_US              ((DHT11_MIN_INTERVAL_TIME_S)  *  1000000)
#define vTaskDelay_DHT11_MIN_INTERVAL_TIME_MS   ((DHT11_MIN_INTERVAL_TIME_MS) / (portTICK_RATE_MS))

#define DHT11_MIN_HOST_START_TIME_MS              20.0
#define DHT11_MIN_HOST_WAIT_TIME_US               30.0

#define DHT11_SENSOR_START_PULL_LOW_TIME_US       80
#define DHT11_SENSOR_START_PULL_UP_TIME_US        80

#define DHT11_MIN_SENSOR_OUTPUT_0_TIME_US         26 
#define DHT11_MAX_SENSOR_OUTPUT_0_TIME_US         28
#define DHT11_SENSOR_OUTPUT_1_TIME_US             70

#define DHT11_SENSOR_OUTPUT_COMPARE_TIME_US    (((DHT11_MIN_SENSOR_OUTPUT_0_TIME_US) + (DHT11_SENSOR_OUTPUT_1_TIME_US)) / 2)

#define vTaskDelay_DHT11_MIN_HOST_START_TIME_MS ((DHT11_MIN_HOST_START_TIME_MS)      / (portTICK_RATE_MS))
#define vTaskDelay_DHT11_MIN_HOST_WAIT_TIME_US  ((DHT11_MIN_HOST_WAIT_TIME_US)       / (portTICK_RATE_MS)               / 1000)

static const char *DHT11_TAG1 = "DHT11[S]";
static const char *DHT11_TAG2 = "DHT11[E]";

void module_dht11_init(void)
{
    gpio_config_t io_conf = {
        .pin_bit_mask = DHT11_PIN_SEL,          // DHT11 pin mask.
        .mode         = GPIO_MODE_OUTPUT,       // Start for OUTPUT.
        .pull_up_en   = GPIO_PULLUP_ENABLE,     // Start for PULLUP.
        .pull_down_en = GPIO_PULLDOWN_DISABLE,  // Start not need PULLDOWN. 
        .intr_type    = GPIO_INTR_DISABLE,      // GPIO intr is disable.
    };

    gpio_config   (&io_conf);                   // gpio setting
    gpio_set_level(DHT11_PIN, 1);               // DHT11 send ready data.
}

void get_module_dht11_data(float* temp, int* hum)
{
    // struct dht11_data* data = (struct dht11_data*)pvParameters;
    uint8_t dht11_data_parts[5] = { 0, 0, 0, 0, 0 };
    int64_t dht11_data_start_time;
    uint8_t i = 0;
    int8_t  k = 0;

    /**
     *   
     * MCU Send start Signal.
     * 
     **/
    gpio_set_pull_mode(DHT11_PIN, GPIO_PULLUP_DISABLE);
    gpio_set_pull_mode(DHT11_PIN, GPIO_PULLDOWN_ENABLE);
    gpio_set_level    (DHT11_PIN, 0);
    vTaskDelay        (vTaskDelay_DHT11_MIN_HOST_START_TIME_MS);
    gpio_set_pull_mode(DHT11_PIN, GPIO_PULLDOWN_DISABLE);

    /**
     * 
     * PULL up voltage and wait for sensor response.
     * 
     **/
    gpio_set_pull_mode(DHT11_PIN, GPIO_PULLUP_ENABLE);
    gpio_set_direction(DHT11_PIN, GPIO_MODE_OUTPUT);
    gpio_set_level    (DHT11_PIN, 1);
    vTaskDelay        (vTaskDelay_DHT11_MIN_HOST_WAIT_TIME_US);
    gpio_set_level    (DHT11_PIN, 0);
    gpio_set_pull_mode(DHT11_PIN, GPIO_PULLUP_DISABLE);

    gpio_set_direction(DHT11_PIN, GPIO_MODE_INPUT);

    /**
     * 
     * DHT Sends out response Signal.
     * DHT pulls up voltage and getready for sensor's output.
     * 
     **/
    while(!gpio_get_level(DHT11_PIN));
    while( gpio_get_level(DHT11_PIN));

    /**
     * 
     * DHT Responses data to MCU.
     * 
     **/
    for(i = 0; i < 5; i++) {
        for(k = 7; k >= 0; k--) {
            while(!gpio_get_level(DHT11_PIN));
            dht11_data_start_time = esp_timer_get_time();
            while(gpio_get_level(DHT11_PIN));
            *(dht11_data_parts + i)  += (esp_timer_get_time()- dht11_data_start_time < DHT11_SENSOR_OUTPUT_COMPARE_TIME_US)? (0 << k): (1 << k);
        }
    }

    /**
     * 
     * MCU set output and pulls up voltage to end.
     * 
     **/
    gpio_set_direction(DHT11_PIN, GPIO_MODE_OUTPUT);
    gpio_set_pull_mode(DHT11_PIN, GPIO_PULLUP_ENABLE);
    gpio_set_level    (DHT11_PIN, 1);


    /**
     * 
     * Check Data is not Error. 
     * 
     **/
    if(*(dht11_data_parts + 4) - *(dht11_data_parts + 3) - *(dht11_data_parts + 2) - *(dht11_data_parts + 1) - *(dht11_data_parts + 0) < 0) {
        ESP_LOGI(DHT11_TAG2, "Data Read Error!");
    } else {
        *temp = (float)(*(dht11_data_parts + 2)) + 0.1 * (*(dht11_data_parts + 3));
        *hum  =   (int)(*(dht11_data_parts + 0));
    }
}

// void module_dht11_task(void* pvParameters)
// {
//     module_dht11_init();
//     ESP_LOGI(DHT11_TAG1, "init Success!");
//     vTaskDelay(vTaskDelay_DHT11_MIN_INTERVAL_TIME_MS);

//     for(;;) {
//         get_module_dht11_data(pvParameters);
//         vTaskDelay(vTaskDelay_DHT11_MIN_INTERVAL_TIME_MS);
//     }
// }
