#include <Arduino.h>
#include "esp_camera.h"
#include "esp_timer.h"

// Camera pins for AI-Thinker ESP32-CAM
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

#define LED_PIN 33  // Flash LED pin

// Configuração da câmera
camera_config_t camera_config = {
    .pin_pwdn = PWDN_GPIO_NUM,
    .pin_reset = RESET_GPIO_NUM,
    .pin_xclk = XCLK_GPIO_NUM,
    .pin_sscb_sda = SIOD_GPIO_NUM,
    .pin_sscb_scl = SIOC_GPIO_NUM,
    .pin_d7 = Y9_GPIO_NUM,
    .pin_d6 = Y8_GPIO_NUM,
    .pin_d5 = Y7_GPIO_NUM,
    .pin_d4 = Y6_GPIO_NUM,
    .pin_d3 = Y5_GPIO_NUM,
    .pin_d2 = Y4_GPIO_NUM,
    .pin_d1 = Y3_GPIO_NUM,
    .pin_d0 = Y2_GPIO_NUM,
    .pin_vsync = VSYNC_GPIO_NUM,
    .pin_href = HREF_GPIO_NUM,
    .pin_pclk = PCLK_GPIO_NUM,
    .xclk_freq_hz = 20000000,
    .ledc_timer = LEDC_TIMER_0,
    .ledc_channel = LEDC_CHANNEL_0,
    .pixel_format = PIXFORMAT_GRAYSCALE,  // Escala de cinza para processamento
    .frame_size = FRAMESIZE_QVGA,  // 320x240
    .jpeg_quality = 12,
    .fb_count = 1
};

// Função para aplicar filtro de detecção de bordas (Sobel simplificado)
void apply_edge_detection(uint8_t* img, int width, int height) {
    uint8_t* temp = (uint8_t*)malloc(width * height);
    if (temp == NULL) {
        Serial.println("Erro ao alocar memória para processamento");
        return;
    }
    
    memcpy(temp, img, width * height);
    
    // Aplicar operador Sobel simplificado
    for (int y = 1; y < height - 1; y++) {
        for (int x = 1; x < width - 1; x++) {
            int gx = -temp[(y-1)*width + (x-1)] + temp[(y-1)*width + (x+1)]
                     -2*temp[y*width + (x-1)] + 2*temp[y*width + (x+1)]
                     -temp[(y+1)*width + (x-1)] + temp[(y+1)*width + (x+1)];
            
            int gy = -temp[(y-1)*width + (x-1)] - 2*temp[(y-1)*width + x] - temp[(y-1)*width + (x+1)]
                     +temp[(y+1)*width + (x-1)] + 2*temp[(y+1)*width + x] + temp[(y+1)*width + (x+1)];
            
            int magnitude = abs(gx) + abs(gy);
            img[y*width + x] = (magnitude > 255) ? 255 : magnitude;
        }
    }
    
    free(temp);
}

// Função para aplicar threshold (binarização)
void apply_threshold(uint8_t* img, int width, int height, uint8_t threshold) {
    for (int i = 0; i < width * height; i++) {
        img[i] = (img[i] > threshold) ? 255 : 0;
    }
}

// Função para inverter cores
void invert_colors(uint8_t* img, int width, int height) {
    for (int i = 0; i < width * height; i++) {
        img[i] = 255 - img[i];
    }
}

// Função para calcular brilho médio da imagem
float calculate_brightness(uint8_t* img, int width, int height) {
    unsigned long sum = 0;
    for (int i = 0; i < width * height; i++) {
        sum += img[i];
    }
    return (float)sum / (width * height);
}

void setup() {
    Serial.begin(115200);
    Serial.println("\n=== ESP32 Processamento de Imagem ===");
    
    // Configurar LED
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW);
    
    // Inicializar câmera
    esp_err_t err = esp_camera_init(&camera_config);
    if (err != ESP_OK) {
        Serial.printf("Erro ao inicializar câmera: 0x%x\n", err);
        return;
    }
    
    Serial.println("Câmera inicializada com sucesso!");
    Serial.println("Comandos disponíveis:");
    Serial.println("  'c' - Capturar e processar imagem");
    Serial.println("  'e' - Detecção de bordas");
    Serial.println("  't' - Aplicar threshold");
    Serial.println("  'i' - Inverter cores");
    Serial.println("  'b' - Calcular brilho médio");
}

void loop() {
    if (Serial.available() > 0) {
        char cmd = Serial.read();
        
        // Limpar buffer serial
        while (Serial.available() > 0) {
            Serial.read();
        }
        
        if (cmd == 'c' || cmd == 'e' || cmd == 't' || cmd == 'i' || cmd == 'b') {
            // Acender LED durante captura
            digitalWrite(LED_PIN, HIGH);
            
            // Capturar imagem
            camera_fb_t* fb = esp_camera_fb_get();
            if (!fb) {
                Serial.println("Erro ao capturar imagem");
                digitalWrite(LED_PIN, LOW);
                return;
            }
            
            Serial.printf("Imagem capturada: %dx%d pixels\n", fb->width, fb->height);
            
            // Processar conforme comando
            switch (cmd) {
                case 'e':
                    Serial.println("Aplicando detecção de bordas...");
                    apply_edge_detection(fb->buf, fb->width, fb->height);
                    Serial.println("Detecção de bordas concluída!");
                    break;
                    
                case 't':
                    Serial.println("Aplicando threshold (limiar = 128)...");
                    apply_threshold(fb->buf, fb->width, fb->height, 128);
                    Serial.println("Threshold aplicado!");
                    break;
                    
                case 'i':
                    Serial.println("Invertendo cores...");
                    invert_colors(fb->buf, fb->width, fb->height);
                    Serial.println("Cores invertidas!");
                    break;
                    
                case 'b':
                    float brightness = calculate_brightness(fb->buf, fb->width, fb->height);
                    Serial.printf("Brilho médio: %.2f (0-255)\n", brightness);
                    break;
            }
            
            // Retornar buffer da câmera
            esp_camera_fb_return(fb);
            digitalWrite(LED_PIN, LOW);
            
            Serial.println("Processamento concluído!\n");
        }
    }
    
    delay(10);
}
