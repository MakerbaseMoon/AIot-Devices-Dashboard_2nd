#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "esp_log.h"
#include "esp_system.h"

#include "nvs_flash.h"

#include "app_wifi.h"
#include "app_http.h"

#include "module_dht11.h"

static void http_test_task(void *pvParameters)
{
    struct dht11_data* data = (struct dht11_data*)pvParameters;

    app_wifi_wait_connected();
    ESP_LOGI("HTTP_CLIENT", "Connected to AP, begin http example");
    char buffer[50];
    for(;;) {
        sprintf(buffer, "{\"temp\":%.2f,\"hum\":%d}", data->temp, (int)data->hum);
        http_sned_dht11_data_with_url("192.168.1.101", "/esp32/setdata", buffer);
        vTaskDelay(2000 / portTICK_RATE_MS);
    }

    ESP_LOGI("HTTP_CLIENT", "Finish http example");
    vTaskDelete(NULL);
}

void app_main(void)
{
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);
    app_wifi_initialise();

    struct dht11_data data;
    xTaskCreate(module_dht11_task, "DHT11 Task", 2048, (void *)&data, 10, NULL);
    vTaskDelay(2500 / portTICK_RATE_MS);

    xTaskCreate(&http_test_task, "http_test_task", 8192, (void *)&data, 5, NULL);
}
