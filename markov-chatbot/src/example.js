import MarkovChain from './markovChain.js';

console.log('=== Exemplos de uso da Cadeia de Markov ===\n');

// Exemplo 1: Texto simples
console.log('1. Exemplo básico:');
const markov1 = new MarkovChain(1);
const text1 = 'O gato subiu no telhado. O gato miou. O cachorro latiu. O cachorro correu.';
markov1.train(text1);
console.log('   Texto gerado:', markov1.generate(15));

// Exemplo 2: Ordem maior (mais contexto)
console.log('\n2. Com mais contexto (ordem 2):');
const markov2 = new MarkovChain(2);
const text2 = `
    A programação é uma arte. A arte requer prática. 
    A prática leva à perfeição. A perfeição é difícil de alcançar.
    É difícil, mas não impossível. Nada é impossível para quem tenta.
`;
markov2.train(text2);
console.log('   Texto gerado:', markov2.generate(20));

// Exemplo 3: Texto maior
console.log('\n3. Com texto mais extenso:');
const markov3 = new MarkovChain(2);
const text3 = `
    Era uma vez, em uma terra distante, um reino mágico.
    O reino mágico tinha um rei sábio e justo.
    O rei sábio governava com compaixão e sabedoria.
    Todos os habitantes eram felizes e prósperos.
    Um dia, um dragão apareceu no horizonte.
    O dragão era grande e assustador, mas não era mau.
    O dragão apenas procurava um lugar para descansar.
    O rei sábio ofereceu abrigo ao dragão cansado.
    O dragão agradeceu e tornou-se protetor do reino.
    Desde então, o reino viveu em paz e harmonia.
    A paz e harmonia duraram por muitos anos.
    E todos viveram felizes para sempre.
`;
markov3.train(text3);
console.log('   Texto gerado:', markov3.generate(30));

// Exemplo 4: Com seed (palavra inicial)
console.log('\n4. Gerando com palavra-chave:');
console.log('   Seed: "reino mágico"');
console.log('   Texto gerado:', markov3.generate(25, 'reino mágico'));

// Exemplo 5: Estatísticas do modelo
console.log('\n5. Estatísticas do modelo:');
const stats = markov3.getStats();
console.log('   -', stats);

// Exemplo 6: Salvando e carregando modelo
console.log('\n6. Salvando e carregando modelo:');
const savedModel = markov3.toJSON();
console.log('   Modelo salvo (primeiros 100 chars):', savedModel.substring(0, 100) + '...');

const markov4 = new MarkovChain();
markov4.fromJSON(savedModel);
console.log('   Modelo carregado. Gerando texto:', markov4.generate(20));

console.log('\n=== Fim dos exemplos ===\n');
