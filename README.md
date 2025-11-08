# SEMUNI-2025

Projetos feitos em minicursos da Semana Universitária de 2025 da UnB

## 📋 Sobre

Este repositório contém dois projetos desenvolvidos durante minicursos da Semana Universitária 2025:

1. **ESP32 Image Processing** - Processamento de imagem em tempo real com ESP32-CAM
2. **Markov Chain Chatbot** - Chatbot baseado em cadeias de Markov

## 🎯 Projetos

### 1. ESP32 Image Processing

Projeto de processamento de imagem usando microcontrolador ESP32 com câmera. Implementa diversos algoritmos de processamento digital de imagens em tempo real.

**Tecnologias:** C, ESP32, PlatformIO, Arduino Framework

**Funcionalidades:**
- Captura de imagens com ESP32-CAM
- Detecção de bordas (Operador Sobel)
- Binarização (Threshold)
- Inversão de cores
- Análise de brilho

[📖 Documentação completa](./esp32-image-processing/README.md)

### 2. Markov Chain Chatbot

Chatbot que utiliza cadeias de Markov para gerar texto de forma probabilística. Aprende padrões a partir de texto de treinamento e gera respostas contextualizadas.

**Tecnologias:** JavaScript, Node.js

**Funcionalidades:**
- Geração de texto baseada em cadeias de Markov
- Chatbot interativo via terminal
- Serialização de modelos treinados
- Configuração de ordem da cadeia
- Estatísticas do modelo

[📖 Documentação completa](./markov-chatbot/README.md)

## 🚀 Quick Start

### ESP32 Image Processing

```bash
cd esp32-image-processing
pio run --target upload
pio device monitor
```

### Markov Chain Chatbot

```bash
cd markov-chatbot
npm start
```

## 📚 Estrutura do Repositório

```
SEMUNI-2025/
├── esp32-image-processing/     # Projeto ESP32
│   ├── src/
│   │   └── main.cpp           # Código principal
│   ├── platformio.ini         # Configuração PlatformIO
│   └── README.md
│
├── markov-chatbot/            # Projeto Chatbot
│   ├── src/
│   │   ├── markovChain.js    # Implementação da cadeia
│   │   ├── chatbot.js        # Classe do chatbot
│   │   ├── index.js          # Ponto de entrada
│   │   └── example.js        # Exemplos
│   ├── package.json
│   └── README.md
│
└── README.md                  # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **C/C++** - Programação embarcada
- **JavaScript (ES6+)** - Desenvolvimento do chatbot
- **ESP32** - Microcontrolador com WiFi e Bluetooth
- **PlatformIO** - Plataforma de desenvolvimento embarcado
- **Node.js** - Runtime JavaScript
- **Git** - Controle de versão

## 📖 Aprendizados

Estes projetos cobrem diversos conceitos importantes:

- Processamento digital de imagens
- Programação de sistemas embarcados
- Algoritmos de visão computacional
- Cadeias de Markov e geração de texto
- Processamento de linguagem natural (NLP básico)
- Programação assíncrona em JavaScript
- Desenvolvimento de interfaces interativas

## 🎓 Contexto Acadêmico

Desenvolvido durante a **Semana Universitária 2025** da **Universidade de Brasília (UnB)**, estes projetos demonstram a aplicação prática de conceitos de:

- Sistemas Embarcados
- Processamento de Imagens
- Inteligência Artificial
- Probabilidade e Estatística

## 📝 Licença

Projetos desenvolvidos para fins educacionais.

## 👥 Contribuições

Sinta-se à vontade para explorar, aprender e modificar estes projetos!
