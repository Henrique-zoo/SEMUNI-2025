import MarkovChain from './markovChain.js';
import readline from 'readline';

/**
 * Chatbot interativo usando cadeias de Markov
 */
class ChatBot {
    constructor(order = 2) {
        this.markov = new MarkovChain(order);
        this.trained = false;
    }

    /**
     * Treina o chatbot com um texto
     * @param {string} text
     */
    train(text) {
        this.markov.train(text);
        this.trained = true;
        console.log('\n✓ Chatbot treinado com sucesso!');
        const stats = this.markov.getStats();
        console.log(`  - Estados únicos: ${stats.uniqueKeys}`);
        console.log(`  - Transições totais: ${stats.totalTransitions}`);
        console.log(`  - Palavras iniciais: ${stats.startWords}\n`);
    }

    /**
     * Responde a uma mensagem do usuário
     * @param {string} message
     * @returns {string}
     */
    respond(message) {
        if (!this.trained) {
            return 'Desculpe, preciso ser treinado antes de conversar!';
        }

        // Usar a mensagem como seed para contextualizar a resposta
        return this.markov.generate(30, message);
    }

    /**
     * Inicia modo interativo no console
     */
    startInteractive() {
        if (!this.trained) {
            console.log('Erro: O chatbot precisa ser treinado antes de iniciar.');
            return;
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Você: '
        });

        console.log('\n=== Chatbot Markov ===');
        console.log('Digite suas mensagens (ou "sair" para encerrar)\n');

        rl.prompt();

        rl.on('line', (line) => {
            const input = line.trim();

            if (input.toLowerCase() === 'sair' || input.toLowerCase() === 'exit') {
                console.log('\nAté logo! 👋\n');
                rl.close();
                return;
            }

            if (input.length === 0) {
                rl.prompt();
                return;
            }

            const response = this.respond(input);
            console.log(`Bot: ${response}\n`);
            rl.prompt();
        });

        rl.on('close', () => {
            process.exit(0);
        });
    }
}

export default ChatBot;
