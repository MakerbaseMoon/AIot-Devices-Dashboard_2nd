#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "esp_log.h"
#include "esp_system.h"
#include "esp_task_wdt.h"
#include "esp_system.h"

#include "nvs_flash.h"

#include "app_wifi.h"
#include "app_http.h"

#include "module_dht11.h"

#include "key.h"

static void http_test_task(void *pvParameters)
{
    float temp = 0;
    int   hum  = 0;

    int restart = ESP_RESTART_TIMES * 6;

    module_dht11_init();
    ESP_LOGI("DHT11", "Module init success");
    vTaskDelay(2500 / portTICK_RATE_MS);

    app_wifi_wait_connected();
    ESP_LOGI("HTTP_CLIENT", "Connected to AP, begin http example");

    char *data = NULL;
    data = (char *)malloc(30 * sizeof(char));

    if(data == NULL) {
        ESP_LOGI("malloc Error", "Unable to allocate required memory");
        return;
    }

    for(;restart > 0; restart--) {
        get_module_dht11_data(&temp, &hum);
        sprintf(data, "{\"temp\":%.2f,\"hum\":%d}", temp, hum);
        ESP_LOGI("DHT11", "%s", data);
        http_sned_dht11_data_with_url(SERVER_IP_ADDRESS, "/esp32/setdata", data);
        vTaskDelay(10000 / portTICK_RATE_MS);
    }

    free(data);
    esp_restart();

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

    xTaskCreate(&http_test_task, "http_test_task", 8192, (void *)NULL, 5, NULL);
}
