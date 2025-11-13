import ChatBot from './chatbot.js';

// Texto de exemplo para treinar o chatbot
const trainingText = `
Olá, como você está? Eu estou bem, obrigado por perguntar.
O clima hoje está ótimo para sair. Gosto muito de dias ensolarados.
Você gosta de programar? Programação é uma atividade muito interessante.
JavaScript é uma linguagem muito poderosa e versátil.
Cadeias de Markov são úteis para gerar texto aleatório mas coerente.
Machine learning envolve muitos conceitos matemáticos interessantes.
A inteligência artificial está mudando o mundo rapidamente.
É importante estudar e aprender coisas novas todos os dias.
Livros são fontes excelentes de conhecimento e entretenimento.
Música pode influenciar nosso humor de maneira positiva.
Exercícios físicos são importantes para a saúde do corpo e da mente.
Viajar permite conhecer novas culturas e pessoas interessantes.
A natureza é bela e merece ser preservada por todos nós.
Tecnologia facilita nossa comunicação com pessoas distantes.
Amizade é um dos valores mais importantes na vida.
Família é a base de apoio que todos precisam.
Educação transforma vidas e abre portas para o futuro.
Criatividade é essencial para resolver problemas complexos.
Colaboração torna projetos maiores possíveis de serem realizados.
Persistência é a chave para alcançar objetivos difíceis.
`;

// Criar e treinar o chatbot
const bot = new ChatBot(2);
bot.train(trainingText);

// Iniciar modo interativo
bot.startInteractive();
