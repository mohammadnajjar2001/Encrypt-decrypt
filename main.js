function processText() {
    const textInput = document.getElementById("text-input").value;
    const keyInput = document.getElementById("key-input").value;
    
    const methodSelect = document.getElementById("method-select");
    const method = methodSelect.value;
    let resultText = "";

    
        if (method === "encrypt") {
            resultText1 = encryptCaesar(textInput, parseInt(keyInput));
            resultText2 = encryptMultiplicative(resultText1, parseInt(keyInput));
            resultText3 = encryptAutokey(resultText2, keyInput);
        } else if (method === "decrypt") {
            resultText1 = decryptAutokey(textInput, keyInput);
            resultText2 = decryptMultiplicative(resultText2, parseInt(keyInput));
            resultText3 = decryptCaesar(resultText2, parseInt(keyInput));
            
        }
    
    if (method === "encrypt") {
    document.getElementById("result").innerHTML = "Result:<br> <p id=redd>[Caeser] : "
         + resultText1 + "</p><p id=redd>[Multiplicative] : " 
        + resultText2 + "</p><p id=redd>[cipher text] : " + resultText3+"</p>";    }
    
    else{
    document.getElementById("result").innerHTML = "Result:<br> <p id=redd>[Autokey] : "
         + resultText1 + "</p><p id=redd>[Multiplicative] : " 
        + resultText2 + "</p><p id=redd>[plain text] : " + resultText3+"</p>";

    }
    }

function encryptCaesar(text, key) {
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        let encryptedCharCode;

        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            encryptedCharCode = ((charCode - 65 + key) % 26) + 65;
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            encryptedCharCode = ((charCode - 97 + key) % 26) + 97;
        } else {
            // Non-alphabetic characters
            encryptedCharCode = charCode;
        }

        const encryptedChar = String.fromCharCode(encryptedCharCode);
        encryptedText += encryptedChar;
    }

    return encryptedText;
}

function decryptCaesar(text, key) {
    let decryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        let decryptedCharCode;

        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            decryptedCharCode = ((charCode - 65 - key + 26) % 26) + 65;
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            decryptedCharCode = ((charCode - 97 - key + 26) % 26) + 97;
        } else {
            // Non-alphabetic characters
            decryptedCharCode = charCode;
        }

        const decryptedChar = String.fromCharCode(decryptedCharCode);
        decryptedText += decryptedChar;
    }

    return decryptedText;
}

function encryptMultiplicative(text, key) {
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        let encryptedCharCode;

        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            encryptedCharCode = ((charCode - 65) * key % 26) + 65;
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            encryptedCharCode = ((charCode - 97) * key % 26) + 97;
        } else {
            // Non-alphabetic characters
            encryptedCharCode = charCode;
        }

        const encryptedChar = String.fromCharCode(encryptedCharCode);
        encryptedText += encryptedChar;
    }

    return encryptedText;
}

function decryptMultiplicative(text, key) {
    let decryptedText = "";

    // Calculate the modular multiplicative inverse of the key
    let inverseKey = -1;
    for (let i = 0; i < 26; i++) {
        if ((key * i) % 26 === 1) {
            inverseKey = i;
            break;
        }
    }

    if (inverseKey === -1) {
        return "Invalid key. The key must be coprime with 26.";
    }

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        let decryptedCharCode;

        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            decryptedCharCode = ((charCode - 65) * inverseKey % 26) + 65;
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            decryptedCharCode = ((charCode - 97) * inverseKey % 26) + 97;
        } else {
            // Non-alphabetic characters
            decryptedCharCode = charCode;
        }

        const decryptedChar = String.fromCharCode(decryptedCharCode);
        decryptedText += decryptedChar;
    }

    return decryptedText;
}

function encryptAutokey(plainText, key) {
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let newKey = key.toUpperCase() + plainText.toUpperCase();
newKey = newKey.substring(0, newKey.length - key.length);
let encryptedText = '';

for (let x = 0; x < plainText.length; x++) {
const plainChar = plainText[x];
const keyChar = newKey[x];

if (alphabet.includes(plainChar.toUpperCase())) {
    const plainIndex = alphabet.indexOf(plainChar.toUpperCase());
    const keyIndex = alphabet.indexOf(keyChar);
    const total = (plainIndex + keyIndex) % 26;
    const encryptedChar = alphabet[total];
    encryptedText += (plainChar === plainChar.toUpperCase()) ? encryptedChar : encryptedChar.toLowerCase();
} else {
    encryptedText += plainChar;
}
}

return encryptedText;
}

function decryptAutokey(encryptedText, key) {
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let newKey = key.toUpperCase();
let decryptedText = '';

for (let x = 0; x < encryptedText.length; x++) {
const encryptedChar = encryptedText[x];
const keyChar = newKey[x];

if (alphabet.includes(encryptedChar.toUpperCase())) {
    const encryptedIndex = alphabet.indexOf(encryptedChar.toUpperCase());
    const keyIndex = alphabet.indexOf(keyChar.toUpperCase());
    let decryptedIndex = (encryptedIndex - keyIndex) % 26;
    if (decryptedIndex < 0) {
        decryptedIndex += 26;
    }
    const decryptedChar = alphabet[decryptedIndex];
    decryptedText += (encryptedChar === encryptedChar.toUpperCase()) ? decryptedChar : decryptedChar.toLowerCase();
    newKey += (encryptedChar === encryptedChar.toUpperCase()) ? decryptedChar : decryptedChar.toLowerCase();
} else {
    decryptedText += encryptedChar;
    newKey += encryptedChar;
}
}

return decryptedText;
}
