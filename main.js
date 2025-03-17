function processText() {
    const textInput = document.getElementById("text-input").value;
    const keyInput = parseInt(document.getElementById("key-input").value);
    const method = document.getElementById("method-select").value;
    let resultText = "";

    // التحقق من صحة الإدخال
    if (!textInput) {
        alert("الرجاء إدخال نص للتشفير أو فك التشفير.");
        return;
    }

    if (isNaN(keyInput) || keyInput < 1 || keyInput > 25 || keyInput % 2 === 0) {
        alert("المفتاح يجب أن يكون رقمًا فرديًا بين 1 و 25.");
        return;
    }

    if (method === "encrypt") {
        resultText = encryptAutokey(
            encryptMultiplicative(
                encryptCaesar(textInput, keyInput),
                keyInput
            ),
            keyInput.toString()
        );
    } else {
        resultText = decryptCaesar(
            decryptMultiplicative(
                decryptAutokey(textInput, keyInput.toString()),
                keyInput
            ),
            keyInput
        );
    }

    document.getElementById("result").innerHTML = `<p id="redd">${method === "encrypt" ? "[cipher text] :" : "[plain text] :"} ${resultText}</p>`;
}

function encryptCaesar(text, key) {
    return text.split("").map(char => shiftChar(char, key)).join("");
}

function decryptCaesar(text, key) {
    return text.split("").map(char => shiftChar(char, -key)).join("");
}

function shiftChar(char, key) {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
        return String.fromCharCode(((charCode - 65 + key + 26) % 26) + 65);
    }
    if (charCode >= 97 && charCode <= 122) {
        return String.fromCharCode(((charCode - 97 + key + 26) % 26) + 97);
    }
    return char;
}

function encryptMultiplicative(text, key) {
    return text.split("").map(char => multiplyChar(char, key)).join("");
}

function decryptMultiplicative(text, key) {
    const inverseKey = modularInverse(key, 26);
    if (inverseKey === -1) {
        return "Invalid key. The key must be coprime with 26.";
    }
    return text.split("").map(char => multiplyChar(char, inverseKey)).join("");
}

function multiplyChar(char, key) {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
        return String.fromCharCode(((charCode - 65) * key % 26) + 65);
    }
    if (charCode >= 97 && charCode <= 122) {
        return String.fromCharCode(((charCode - 97) * key % 26) + 97);
    }
    return char;
}

function modularInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    return -1;
}

function encryptAutokey(plainText, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let newKey = key.toUpperCase() + plainText.toUpperCase();
    newKey = newKey.substring(0, newKey.length - key.length);
    return transformAutokey(plainText, newKey, alphabet, 1);
}

function decryptAutokey(encryptedText, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return transformAutokey(encryptedText, key.toUpperCase(), alphabet, -1);
}

function transformAutokey(text, key, alphabet, direction) {
    let newKey = key.toUpperCase();
    let resultText = '';

    for (let i = 0; i < text.length; i++) {
        const textChar = text[i];
        if (alphabet.includes(textChar.toUpperCase())) {
            const textIndex = alphabet.indexOf(textChar.toUpperCase());
            const keyIndex = alphabet.indexOf(newKey[i % newKey.length]);
            const newIndex = (textIndex + direction * keyIndex + 26) % 26;
            const newChar = alphabet[newIndex];
            resultText += textChar === textChar.toUpperCase() ? newChar : newChar.toLowerCase();
            newKey += newChar;
        } else {
            resultText += textChar;
        }
    }

    return resultText;
}
