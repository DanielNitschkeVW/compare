let leftInput = document.querySelector('#leftInput')
let rightInput = document.querySelector('#rightInput')
 
let leftTextarea = document.querySelector('#leftText')
let rightTextarea = document.querySelector('#rightText')

let exclLeftText = document.querySelector('#exclLeft')
let unionText = document.querySelector('#union')
let exclRightText = document.querySelector('#exclRight')

let state = {
    leftLines: [],
    rightLines: []
}
let setupButton = (input, textarea, linesArray) => {
    input.addEventListener('change', () => {
        let files = input.files;
    
        if (files.length == 0) return;
    
        const file = files[0];
    
        let reader = new FileReader();
    
        reader.onload = (e) => {
            const file = e.target.result;
    
            const lines = file.split(/\r\n|\n/);
            state[linesArray] = [...lines];
            textarea.value = lines.join('\n');
            compare();
    
        };
    
        reader.onerror = (e) => alert(e.target.error.name);
    
        reader.readAsText(file);
    });
}


let setupTextfield = (textarea, linesArray) => {
    const func = () => {
        let text = textarea.value;
        const lines = text.split(/\r\n|\n/);
        state[linesArray] = [...lines];
        textarea.value = lines.join('\n');
        compare();
    };
    
    textarea.addEventListener('propertychange ', func);
    textarea.addEventListener('change ', func);
    textarea.addEventListener('input', func);
}

let compare = () => {
    let leftSet = new Set(state.leftLines);
    let rightSet = new Set(state.rightLines);

    const uniqueLeftSide = [...leftSet];
    const uniqueRightSide = [...rightSet];

    let exclLeft = [...uniqueLeftSide.filter(line => !rightSet.has(line))];
    let exclRight = [...uniqueRightSide.filter(line => !leftSet.has(line))];

    let union = state.leftLines.length <= state.rightLines.length
        ? uniqueLeftSide.filter(line => rightSet.has(line))
        : uniqueRightSide.filter(line => leftSet.has(line));
    
    unionText.value = union.join('\n');
    exclLeftText.value = [...exclLeft.values()].join('\n');
    exclRightText.value = [...exclRight.values()].join('\n');
}

setupButton(leftInput, leftTextarea, "leftLines");
setupButton(rightInput, rightTextarea, "rightLines");


setupTextfield(leftTextarea, "leftLines");
setupTextfield(rightTextarea, "rightLines");