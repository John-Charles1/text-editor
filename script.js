// program to implement stack data structure
class Stack {
    
    constructor() {
        const a = "ASAs";
        this.items = [];
    }
    
    // add element to the stack
    add(element) {
        return this.items.push(element);
    }
    
    // remove element from the stack
    remove() {
        if(this.items.length > 0) {
            return this.items.pop();
        }
    }
    
    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }
    
    // check if the stack is empty
    isEmpty(){
       return this.items.length == 0;
    }
   
    // the size of the stack
    size(){
        return this.items.length;
    }
 
    // empty the stack
    clear(){
        this.items = [];
    }
}


let morseAlphabet = {
    'A':'.-',
    'B':'-...',
    'C':'-.-.',
    'D':'-..',
    'E':'.',
    'F':'..-.',
    'G':'--.',
    'H':'....',
    'I':'..',
    'J':'.---',
    'K':'-.-',
    'L':'.-..',
    'M':'--',
    'N':'-.',
    'O':'---',
    'P':'.--.',
    'Q':'--.-',
    'R':'.-.',
    'S':'...',
    'T':'-',
    'U':'..-',
    'V':'...-',
    'W':'.--',
    'X':'-..-',
    'Y':'-.--',
    'Z':'--..'
};

let langArr = {'DeadFish':false, 'BrainFck':false, 'MorseCode':false, 'Drip':false, 'HTML':false};

function makeActive(str){
    switch(str){
        case "DeadFish":
            for(let lang in langArr){
                if(lang === str){  
                    langArr[lang] = true;
                }else{
                    langArr[lang] = false;
                }
            }
            console.table(langArr);
            break;
        case "BrainFck":
            for(let lang in langArr){
                if(lang === str){  
                    langArr[lang] = true;
                }else{
                    langArr[lang] = false;
                }
            }
            console.table(langArr);
            break;
        case "MorseCode":
            for(let lang in langArr){
                if(lang === str){  
                    langArr[lang] = true;
                }else{
                    langArr[lang] = false;
                }
            }
            console.table(langArr);
            break;
        case "Drip":
            for(let lang in langArr){
                if(lang === str){  
                    langArr[lang] = true;
                }else{
                    langArr[lang] = false;
                }
            }
            console.table(langArr);
            break;
        case "HTML":
            for(let lang in langArr){
                if(lang === str){  
                    langArr[lang] = true;
                }else{
                    langArr[lang] = false;
                }
            }
            console.table(langArr);
            break;
    }
}

document.getElementById("DeadFish-el").addEventListener("click", () => {
    makeActive("DeadFish");
    console.table(langArr);
});

document.getElementById("BrainFck-el").addEventListener("click", () => {
    makeActive("BrainFck");
    console.table(langArr);
});

document.getElementById("MorseCode-el").addEventListener("click", () => {
    makeActive("MorseCode");
    console.table(langArr);
});

document.getElementById("Drip-el").addEventListener("click", () => {
    makeActive("Drip");
    console.table(langArr);
});

document.getElementById("HTML-el").addEventListener("click", () => {
    makeActive("HTML");
    console.table(langArr);
});

document.getElementById('run-btn').addEventListener("click", () => {

    if(langArr['DeadFish']){
        let text = parseDeadFish(editor.getValue());
        writeInOutput(text);
    }else if(langArr['MorseCode']){
        let text = parseMorseCode(editor.getValue());
        writeInOutput(text);
    }else if(langArr['BrainFck']){
        let text = parseBrainFck(editor.getValue());
        writeInOutput(text);
    }
});

function writeInOutput(text){
    let idoc = document.getElementById('iframe').contentWindow.document;
    idoc.open();
    idoc.write(text);
    idoc.close();
}

function intToChar(int){
    return String.fromCharCode(int);
}

function parseDeadFish(text){
    let program = text.split('');

    let accumulator = 0;
    let result = "";
    for(let i = 0; i < program.length; i++){
        switch(program[i]){
            case "i":
                accumulator += 1;
                break;
            case "d":
                accumulator -= 1;
                break;
            case "s":
                accumulator *= accumulator;
                break;
            case "o":
                result += intToChar(accumulator);
                break;
        }

        if(accumulator == 256 || accumulator == -1)
            accumulator = 0;
    }
    return result;
}

function parseMorseCode(str){
    let program = str.split('');
    program.push(' ');
    let currChar = '';
    let result = "";
    for(let i = 0; i < program.length; i++){
        if(program[i] === '.'){
            currChar += '.';
        }else if(program[i] === '-'){
            currChar += '-';
        }else if(program[i] === ' '){
            for(let morseCharacter in morseAlphabet){
                if(currChar === morseAlphabet[morseCharacter]){
                    result += morseCharacter;
                    console.log(currChar);
                    currChar = '';
                    break;
                }
            }
        }else{
            result += ' ';
        }
    }

    return result;
}

function parseBrainFck(text){
    let program = text.split('');
    let tape = [0];
    let cell_index = 0;
    let result = "";
    let loop_beginning_index = 0;
    let user_input = [];
    let loop_table = {};
    let loop_stack = new Stack();
    let instruction = 0;

    for(let ip = 0; ip < program.length; ip++){
        instruction = program[ip];
        if(instruction ==='['){
            loop_stack.add(ip);
        }else if(instruction === ']'){
            loop_beginning_index = loop_stack.peek();
            loop_stack.remove();
            loop_table[loop_beginning_index] = ip;
            loop_table[ip] = loop_beginning_index;
        }
    }

    let ip = 0;
    while(ip < program.length){
        instruction = program[ip];

        if(instruction === '+'){
            tape[cell_index]++;
            if(tape[cell_index] === 256)
                tape[cell_index] = 0;
        }else if(instruction === '-'){
            tape[cell_index]--;
            if(tape[cell_index] === -1)
                tape[cell_index] = 255;
        }else if(instruction === '<'){
            cell_index--;
        }else if(instruction === '>'){
            cell_index++;
            if(cell_index >= tape.length)
                tape.push(0);
        }else if(instruction === '.'){
            result += intToChar(tape[cell_index]);
            console.log(result);
        }else if(instruction === ','){
            if(user_input == []){
                let currCell = cell_index;
                let arr = [tape[++currCell]];
                user_input.push(arr);
            }
            tape[cell_index] = user_input.charCodeAt(0);
            user_input.pop();
        }else if(instruction === '['){
            if(!tape[cell_index])
                ip = loop_table[ip];
        }else if(instruction === ']'){
            if(tape[cell_index]){
                ip = loop_table[ip];
            }
        }
        ip++;
    }
    return result;
}

function update(){
    let idoc = document.getElementById('iframe').contentWindow.document;
    idoc.open();
    // idoc.write(editor.getValue());
    idoc.close();
}

function setupEditor()
{
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/html");
  editor.setValue(``,1); //1 = moves cursor to end

  editor.getSession().on('change', function() {
    update();
  });

  editor.focus();
  
  
  editor.setOptions({
    fontSize: "16pt",
    showLineNumbers: true,
    showGutter: false,
    vScrollBarAlwaysVisible:true,
    enableBasicAutocompletion: false, enableLiveAutocompletion: false
  });

  editor.setShowPrintMargin(false);
  editor.setBehavioursEnabled(false);
}


function ready(){
    setupEditor();
    update();
}