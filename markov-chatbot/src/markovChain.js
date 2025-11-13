/**
 * Classe MarkovChain para geração de texto baseada em cadeias de Markov
 */
class MarkovChain {
    /**
     * Construtor da cadeia de Markov
     * @param {number} order - Ordem da cadeia (número de palavras usadas como contexto)
     */
    constructor(order = 2) {
        this.order = order;
        this.chain = new Map();
        this.startWords = [];
    }

    /**
     * Treina o modelo com um texto de entrada
     * @param {string} text - Texto para treinar o modelo
     */
    train(text) {
        // Normalizar e dividir o texto em palavras
        const words = this.normalizeText(text);
        
        if (words.length < this.order + 1) {
            console.warn('Texto muito curto para treinar o modelo');
            return;
        }

        // Armazenar palavras iniciais (para começar frases)
        for (let i = 0; i < words.length - this.order; i++) {
            if (this.isStartOfSentence(words, i)) {
                const key = words.slice(i, i + this.order).join(' ');
                if (!this.startWords.includes(key)) {
                    this.startWords.push(key);
                }
            }
        }

        // Construir a cadeia de Markov
        for (let i = 0; i < words.length - this.order; i++) {
            const key = words.slice(i, i + this.order).join(' ');
            const nextWord = words[i + this.order];

            if (!this.chain.has(key)) {
                this.chain.set(key, []);
            }
            this.chain.get(key).push(nextWord);
        }
    }

    /**
     * Normaliza o texto (remove pontuação extra, converte para minúsculas)
     * @param {string} text - Texto para normalizar
     * @returns {Array<string>} Array de palavras
     */
    normalizeText(text) {
        return text
            .toLowerCase()
            .replace(/[—–]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0);
    }

    /**
     * Verifica se a palavra está no início de uma frase
     * @param {Array<string>} words - Array de palavras
     * @param {number} index - Índice da palavra
     * @returns {boolean}
     */
    isStartOfSentence(words, index) {
        if (index === 0) return true;
        const prevWord = words[index - 1];
        return /[.!?]$/.test(prevWord);
    }

    /**
     * Gera texto baseado no modelo treinado
     * @param {number} maxWords - Número máximo de palavras a gerar
     * @param {string} seed - Palavra inicial opcional
     * @returns {string} Texto gerado
     */
    generate(maxWords = 50, seed = null) {
        if (this.chain.size === 0) {
            return 'Erro: O modelo não foi treinado ainda.';
        }

        let result = [];
        let currentKey;

        // Escolher palavra inicial
        if (seed) {
            const normalizedSeed = this.normalizeText(seed);
            const seedKey = normalizedSeed.slice(-this.order).join(' ');
            
            if (this.chain.has(seedKey)) {
                currentKey = seedKey;
                result = normalizedSeed.slice();
            } else {
                currentKey = this.getRandomStartKey();
                result = currentKey.split(' ');
            }
        } else {
            currentKey = this.getRandomStartKey();
            result = currentKey.split(' ');
        }

        // Gerar palavras
        for (let i = 0; i < maxWords - this.order; i++) {
            const possibleNextWords = this.chain.get(currentKey);
            
            if (!possibleNextWords || possibleNextWords.length === 0) {
                break;
            }

            // Escolher próxima palavra aleatoriamente
            const nextWord = possibleNextWords[
                Math.floor(Math.random() * possibleNextWords.length)
            ];
            
            result.push(nextWord);

            // Atualizar a chave para as próximas 'order' palavras
            const words = currentKey.split(' ');
            words.shift();
            words.push(nextWord);
            currentKey = words.join(' ');

            // Parar se chegou ao fim de uma frase e já gerou palavras suficientes
            if (/[.!?]$/.test(nextWord) && result.length >= maxWords / 2) {
                break;
            }
        }

        // Capitalizar primeira letra e retornar
        return this.capitalize(result.join(' '));
    }

    /**
     * Obtém uma chave inicial aleatória
     * @returns {string}
     */
    getRandomStartKey() {
        if (this.startWords.length > 0) {
            return this.startWords[Math.floor(Math.random() * this.startWords.length)];
        }
        const keys = Array.from(this.chain.keys());
        return keys[Math.floor(Math.random() * keys.length)];
    }

    /**
     * Capitaliza a primeira letra do texto
     * @param {string} text
     * @returns {string}
     */
    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    /**
     * Salva o modelo treinado como JSON
     * @returns {string}
     */
    toJSON() {
        return JSON.stringify({
            order: this.order,
            chain: Array.from(this.chain.entries()),
            startWords: this.startWords
        });
    }

    /**
     * Carrega um modelo do JSON
     * @param {string} json
     */
    fromJSON(json) {
        const data = JSON.parse(json);
        this.order = data.order;
        this.chain = new Map(data.chain);
        this.startWords = data.startWords;
    }

    /**
     * Retorna estatísticas do modelo
     * @returns {Object}
     */
    getStats() {
        return {
            order: this.order,
            uniqueKeys: this.chain.size,
            startWords: this.startWords.length,
            totalTransitions: Array.from(this.chain.values()).reduce(
                (sum, arr) => sum + arr.length, 0
            )
        };
    }
}

export default MarkovChain;
