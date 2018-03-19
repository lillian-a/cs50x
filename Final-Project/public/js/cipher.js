/**
 * cipher.js
 *
 */

function CaesarEncrypt(){
    // TO ENCRYPT PLAINTEXT INTO CIPHERTEXT
    // p = plaintext
    // c = ciphertext
    // k = key
    var p = document.getElementById("cplain").value;
    if(p.length < 1)
    {   alert("Caesar Plaintext is empty.");
        return;
    }
    var k = parseInt(document.getElementById("cshift").value);
    var c = "";
    for(var i = 0; i < p.length; i++)
    {
        if((p.charCodeAt(i) > 64) && (p.charCodeAt(i) < 91))
        {
            c += String.fromCharCode((((p.charCodeAt(i) - 65)+k)%26)+65);
        }
        else if((p.charCodeAt(i) > 96) && (p.charCodeAt(i) < 123))
        {
            c += String.fromCharCode((((p.charCodeAt(i) - 97)+k)%26)+97);
        }
        else
        {
            c += p.charAt(i);
        }
    }
    document.getElementById("ccipher").value = c;
}
    
function CaesarClear(){
    // TO CLEAR CAESAR BOXES
    document.getElementById("cplain").value = '';
    document.getElementById("ccipher").value = '';
}
    
function CaesarDecrypt(){
    // TO DECRYPT CAESAR
    var c = document.getElementById("ccipher").value;
    if(c.length < 1)
    {   alert("Caesar Ciphertext is empty.");
        return;
    }
    var k = parseInt(document.getElementById("cshift").value);
    var p = "";
    for(var i = 0; i < c.length; i++)
    {
        if((c.charCodeAt(i) > 64) && (c.charCodeAt(i) < 91))
        {
            p += String.fromCharCode(((((c.charCodeAt(i) - 65)+26)-k)%26)+65);
        }
        else if((c.charCodeAt(i) > 96) && (c.charCodeAt(i) < 123))
        {
            p += String.fromCharCode(((((c.charCodeAt(i) - 97)+26)-k)%26)+97);
        }
        else
        {
            p += c.charAt(i);
        }
    }
    document.getElementById("cplain").value = p;
}

function VigenereEncrypt(){
    var p = document.getElementById("vplain").value;
    if(p.length < 1)
    {   alert("Vigenere Plaintext is empty.");
        return;
    }
    var k = document.getElementById("vshift").value.toLowerCase();
    if(k.length < 1)
    {   alert("Vigenere Key is empty.");
        return;
    }
    for(var m = 0; m < k.length; m++)
    {
        if(!((k.charCodeAt(m) > 96) && (k.charCodeAt(m) < 123)) )
        {
            alert("Vigenere Key must be alphabetic only.");
            return;
        }
    }
    var c = "";
    for(var i = 0, j = -1; i < p.length; i++)
    {
        if((p.charCodeAt(i) > 64) && (p.charCodeAt(i) < 91))
        {
            j++;
            c += String.fromCharCode((((p.charCodeAt(i) - 65)+(k.charCodeAt([j%(k.length)])-65))%26)+65);
        }
        else if((p.charCodeAt(i) > 96) && (p.charCodeAt(i) < 123))
        {
                j++;
                c += String.fromCharCode((((p.charCodeAt(i) - 97)+(k.charCodeAt([j%(k.length)])-97))%26)+97);
        }
        else
        {
            c += p.charAt(i);
        }
    }
    document.getElementById("vcipher").value = c;
}
    
function VigenereDecrypt(){
    var p = document.getElementById("vcipher").value;
    if(p.length < 1)
    {   alert("Vigenere Ciphertext is empty.");
        return;
    }
    var k = document.getElementById("vshift").value.toLowerCase();
    if(k.length < 1)
    {   alert("Vigenere Key is empty.");
        return;
    }
    for(var m = 0; m < k.length; m++)
    {
        if(!((k.charCodeAt(m) > 96) && (k.charCodeAt(m) < 123)) )
        {
            alert("Vigenere Key must be alphabetic only.");
            return;
        }
    }
    var c = "";
    for(var i = 0, j = -1; i < p.length; i++)
    {
        if((p.charCodeAt(i) > 64) && (p.charCodeAt(i) < 91))
        {
            j++;
            c += String.fromCharCode(( ( (p.charCodeAt(i) - 65) - (k.charCodeAt([j%(k.length)])-65) ) %26)+65);
        }
        else if((p.charCodeAt(i) > 96) && (p.charCodeAt(i) < 123))
        {
            j++;
            c += String.fromCharCode((( ( (p.charCodeAt(i) - 97) - (k.charCodeAt([j%(k.length)])-97) ) +26)%26)+97);
        }
        else
        {
            c += p.charAt(i);
        }
    }
    document.getElementById("vplain").value = c;
}
    
function VigenereClear(){
    // TO CLEAR Vigenere BOXES
    document.getElementById("vplain").value = '';
    document.getElementById("vshift").value = '';
    document.getElementById("vcipher").value = '';
}
    
