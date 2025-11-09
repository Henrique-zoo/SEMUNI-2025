const chatHistory = document.getElementById('chat-history');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const resetButton = document.getElementById('reset-button');
const token_chain = new Map();
const reverse_token_chain = new Map();


displayMessage("Olá eu sou um robô e ainda estou aprendendo a falar. Quanto mais você fala comigo mais eu aprendo!", 'bot');

resetButton.addEventListener('click', () => {
    chatHistory.replaceChildren();
    displayMessage('Memória reiniciada.', 'bot');
});

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userInput = messageInput.value.trim();

    if (userInput) {
        displayMessage(userInput, 'user');
        process_text(userInput);
        displayMessage(gerar_resposta(userInput), 'bot');
        messageInput.value = '';
    }
});

function treinar_ia() {
    token_chain.clear();
    reverse_token_chain.clear();
};

function gerar_resposta(input) {
    let firstToken = getMainToken(input);
    if (firstToken === null) return "Erro ao buscar palavra principal.";
    let output = [firstToken];

    let current_token_forward = firstToken;
    let current_token_backwards = firstToken;
    do {
        if (current_token_backwards !== '\0') {
            const options_before = reverse_token_chain.get(current_token_backwards) ?? [];
            const chosen_before_token = options_before[Math.floor(Math.random() * options_before.length)];
            output.unshift(chosen_before_token);
            current_token_backwards = chosen_before_token;
        }
        if (current_token_forward !== '\0') {
            const options_beyond = token_chain.get(current_token_forward) ?? [];
            const chosen_beyond_token = options_beyond[Math.floor(Math.random() * options_beyond.length)];
            output.push(chosen_beyond_token);
            current_token_forward = chosen_beyond_token;
        }
    } while (current_token_forward !== '\0' || current_token_backwards !== '\0');
    return output.join(' ');
};

function process_text(input) {
    splitInTokens(input).forEach((token, index, tokens) => {
        const next_token = (index + 1 < tokens.length) ? tokens[index+1] : '\0';
        let next_tokens = token_chain.get(token) ?? [];
        let prev_tokens = reverse_token_chain.get(next_token) ?? [];

        next_tokens.push(next_token);
        prev_tokens.push(token);

        token_chain.set(token, next_tokens);
        reverse_token_chain.set(next_token, prev_tokens);
    });
}

function getMainToken(input) {
    const local_token_chain = splitInTokens(input).reduce(
        (acc, token) => (token_chain.has(token) ? acc.set(token, token_chain.get(token)) : acc),
        new Map()
    );

    const minEntry = Array.from(local_token_chain.entries())
        .reduce(
            (mins, entry) => {
                if (entry[1].length < (mins[0]?.[1]?.length ?? Infinity)) return [entry];
                else if (entry[1].length === mins[0][1].length) mins.push(entry);
                return mins;
            },
            [] // valor inicial do acumulador
        ).reduce(
            (max, entry) => (max === null || (entry[0].length > max[0].length) ? entry : max),
            null
        );
    
    return minEntry ? minEntry[0] : null;
}

function splitInTokens(input) {
    const regex = /\p{L}+|\d+|[,!:;.?]+|R[$]\d+,\d{2}|\d{3}[.]\d{3}[.]\d{3}-\d{2}|[(]\d{2}[)]\s*\d{5}-\d{4}/gu;
    let tokens = input.match(regex);
    if (!tokens || tokens.length === 0) return null;
    tokens.unshift('\0');
    return tokens;
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);

    chatHistory.scrollTop = chatHistory.scrollHeight;
}
