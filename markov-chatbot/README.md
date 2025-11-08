# Markov Chain Chatbot

Chatbot baseado em cadeias de Markov para geração de texto em português.

## Descrição

Este projeto implementa um chatbot que usa cadeias de Markov para gerar texto de forma probabilística. O bot aprende padrões de texto a partir de dados de treinamento e gera respostas baseadas nesses padrões.

## Como Funcionam as Cadeias de Markov

Uma cadeia de Markov é um modelo estatístico que prediz a próxima palavra baseado em uma ou mais palavras anteriores (contexto). Por exemplo:

- Com ordem 1: "O gato" → pode ser seguido por "subiu", "miou", etc.
- Com ordem 2: "O gato subiu" → pode ser seguido por "no", "na", etc.

Quanto maior a ordem, mais coerente o texto, mas é necessário mais dados de treinamento.

## Estrutura do Projeto

```
markov-chatbot/
├── src/
│   ├── markovChain.js    # Implementação da cadeia de Markov
│   ├── chatbot.js        # Classe do chatbot interativo
│   ├── index.js          # Ponto de entrada principal
│   └── example.js        # Exemplos de uso
├── package.json
└── README.md
```

## Instalação

### Pré-requisitos

- Node.js 14.0.0 ou superior

### Instalar

```bash
cd markov-chatbot
npm install
```

## Uso

### Modo Interativo

Execute o chatbot em modo interativo:

```bash
npm start
```

Isso iniciará um chat no terminal onde você pode conversar com o bot. Digite "sair" para encerrar.

### Exemplos

Execute os exemplos para ver o funcionamento da cadeia de Markov:

```bash
npm test
```

## Exemplos de Código

### Criando e Treinando um Modelo

```javascript
import MarkovChain from './src/markovChain.js';

// Criar uma cadeia de Markov com ordem 2
const markov = new MarkovChain(2);

// Treinar com texto
const texto = "Seu texto de treinamento aqui...";
markov.train(texto);

// Gerar texto
const textoGerado = markov.generate(50);
console.log(textoGerado);
```

### Usando o Chatbot

```javascript
import ChatBot from './src/chatbot.js';

// Criar chatbot
const bot = new ChatBot(2);

// Treinar
bot.train("Texto de treinamento...");

// Obter resposta
const resposta = bot.respond("Olá, como vai?");
console.log(resposta);

// Ou iniciar modo interativo
bot.startInteractive();
```

## API

### MarkovChain

#### Constructor

```javascript
new MarkovChain(order = 2)
```

- `order`: Número de palavras usadas como contexto (padrão: 2)

#### Métodos

- `train(text)`: Treina o modelo com um texto
- `generate(maxWords, seed)`: Gera texto
  - `maxWords`: Número máximo de palavras (padrão: 50)
  - `seed`: Palavra inicial opcional
- `toJSON()`: Serializa o modelo para JSON
- `fromJSON(json)`: Carrega modelo do JSON
- `getStats()`: Retorna estatísticas do modelo

### ChatBot

#### Constructor

```javascript
new ChatBot(order = 2)
```

#### Métodos

- `train(text)`: Treina o chatbot
- `respond(message)`: Gera resposta para uma mensagem
- `startInteractive()`: Inicia modo interativo no terminal

## Características

- **Geração de texto**: Cria frases baseadas em padrões aprendidos
- **Contexto ajustável**: Configure a ordem da cadeia (1, 2, 3, etc.)
- **Seed opcional**: Inicie a geração com uma palavra específica
- **Estatísticas**: Veja informações sobre o modelo treinado
- **Serialização**: Salve e carregue modelos treinados
- **Modo interativo**: Chat direto no terminal

## Parâmetros de Configuração

- **Order (Ordem)**: 
  - Ordem 1: Rápido, menos coerente
  - Ordem 2: Balanceado (recomendado)
  - Ordem 3+: Mais coerente, requer mais dados

## Limitações

- Requer texto de treinamento suficiente
- Não entende o significado semântico do texto
- Pode gerar frases sem sentido se mal treinado
- Não mantém contexto de conversas anteriores

## Melhorias Futuras

- [ ] Adicionar suporte para múltiplos idiomas
- [ ] Implementar limpeza avançada de texto
- [ ] Adicionar memória de conversa
- [ ] Interface web para o chatbot
- [ ] Salvar/carregar modelos em arquivo
- [ ] Adicionar testes unitários
- [ ] Suporte para pontuação mais complexa
- [ ] Análise de sentimento nas respostas

## Exemplos de Aplicação

- Geração criativa de texto
- Assistentes de escrita
- Bots de redes sociais
- Ferramentas de aprendizado de línguas
- Jogos de RPG (diálogos de NPCs)

## Referências

- [Cadeias de Markov - Wikipedia](https://pt.wikipedia.org/wiki/Cadeia_de_Markov)
- [Text Generation with Markov Chains](https://towardsdatascience.com/simulating-text-with-markov-chains-in-python-1a27e6d13fc6)

## Licença

Projeto desenvolvido para fins educacionais durante a Semana Universitária 2025 - UnB.

## Autor

SEMUNI 2025 - Universidade de Brasília
