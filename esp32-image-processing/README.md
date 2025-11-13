# ESP32 Image Processing

Projeto de processamento de imagem em tempo real usando ESP32-CAM.

## Descrição

Este projeto implementa algoritmos básicos de processamento de imagem em um microcontrolador ESP32 com câmera. O sistema captura imagens e aplica diversos filtros e transformações em tempo real.

## Funcionalidades

- **Captura de imagem**: Captura frames da câmera ESP32-CAM
- **Detecção de bordas**: Implementa operador Sobel simplificado
- **Threshold (Binarização)**: Converte imagem em preto e branco
- **Inversão de cores**: Inverte os valores dos pixels
- **Análise de brilho**: Calcula o brilho médio da imagem

## Hardware Necessário

- ESP32-CAM (AI-Thinker)
- Conversor USB-TTL (para programação)
- Cabo USB
- LED flash (integrado no módulo)

## Pinagem

O projeto está configurado para o módulo AI-Thinker ESP32-CAM com a seguinte pinagem:

```
PWDN_GPIO_NUM: 32
XCLK_GPIO_NUM: 0
SIOD_GPIO_NUM: 26 (SDA)
SIOC_GPIO_NUM: 27 (SCL)
Y9_GPIO_NUM: 35
Y8_GPIO_NUM: 34
Y7_GPIO_NUM: 39
Y6_GPIO_NUM: 36
Y5_GPIO_NUM: 21
Y4_GPIO_NUM: 19
Y3_GPIO_NUM: 18
Y2_GPIO_NUM: 5
VSYNC_GPIO_NUM: 25
HREF_GPIO_NUM: 23
PCLK_GPIO_NUM: 22
LED_PIN: 33
```

## Software Necessário

- [PlatformIO](https://platformio.org/) (recomendado)
- Ou Arduino IDE com suporte para ESP32

## Como Usar

### Compilação e Upload

#### Com PlatformIO:

```bash
cd esp32-image-processing
pio run --target upload
pio device monitor
```

#### Com Arduino IDE:

1. Instale o suporte para placas ESP32
2. Selecione a placa "AI Thinker ESP32-CAM"
3. Configure a velocidade de upload para 115200
4. Faça o upload do código

### Comandos Seriais

Conecte ao monitor serial em 115200 baud e use os seguintes comandos:

- `c` - Capturar imagem simples
- `e` - Capturar e aplicar detecção de bordas
- `t` - Capturar e aplicar threshold (binarização)
- `i` - Capturar e inverter cores
- `b` - Capturar e calcular brilho médio

## Algoritmos Implementados

### Detecção de Bordas (Sobel)

Utiliza operador Sobel simplificado para detectar bordas na imagem. Calcula gradientes nas direções X e Y e combina para obter a magnitude do gradiente.

### Threshold

Aplica binarização na imagem com limiar de 128. Pixels acima do limiar ficam brancos (255), abaixo ficam pretos (0).

### Inversão de Cores

Inverte os valores de cada pixel: `novo_valor = 255 - valor_original`

### Análise de Brilho

Calcula a média dos valores de todos os pixels da imagem, fornecendo uma medida de brilho geral.

## Configurações da Câmera

- Formato: Grayscale (escala de cinza)
- Resolução: QVGA (320x240 pixels)
- Frequência XCLK: 20MHz
- Qualidade JPEG: 12

## Limitações

- Processamento realizado em tempo real, pode haver delay dependendo da complexidade
- Memória limitada do ESP32 restringe o tamanho das imagens processadas
- Algoritmos simplificados para otimizar performance

## Possíveis Melhorias

- Adicionar mais filtros (blur, sharpen, etc.)
- Implementar streaming de imagem via WiFi
- Adicionar interface web para controle
- Salvar imagens processadas em cartão SD
- Implementar reconhecimento de padrões simples

## Licença

Projeto desenvolvido para fins educacionais durante a Semana Universitária 2025 - UnB.
