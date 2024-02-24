function getCharTypes() {
    const upperCase = document.querySelector('#include_uppercase').checked;
    const lowerCase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const charTypes = [];

    if (upperCase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    };

    if (lowerCase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    };

    if (number) {
        charTypes.push('0123456789');
    };

    if (specialCharacter) {
        charTypes.push('!@#$%¨&*()_+=|~`{}[]:;"\'<>?,./\\');
    };

    return charTypes;
};

function getPasswordSize() {
    const size = document.querySelector('#size').value;
    
    if (isNaN(size) || size < 4 || size > 128) {
        message('Tamanho inválido, digite um número entre 4 e 128', '#dc2626');
    }

    return size;
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
};

function generatePassword(size, charTypes) {
    let passwordGenerated = '';
    
    while (passwordGenerated.length < size) {
        passwordGenerated += randomCharType(charTypes);
    };

    return passwordGenerated;
};

function message(text, bg) {
    Toastify({
        text: text,
        duration:  2000,
        style: {
            background: bg,
            boxShadow: 'none'
        }
    }).showToast();
}

const generateBt = document.querySelector('#generate').addEventListener('click', () => {
    const size = getPasswordSize();
    const charTypes = getCharTypes();
    const sizeValue = document.querySelector('#size').value;

    if (!size || sizeValue < 4) {
        document.querySelector('#password_container').classList.remove('show');
        return;
    }
        
    if (!charTypes.length) {
        message('Selecione um tipo de caractere!', '#dc2626');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);
    
    document.querySelector('#password').textContent = passwordGenerated;
    document.querySelector('#password_container').classList.add('show');

});

const btCopy = document.querySelector('#copy').addEventListener('click', () => {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message( 'Senha copiada com sucesso!', '#84cc16');
});
