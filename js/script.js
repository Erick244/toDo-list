function toggleClass(elem, classes, add) {
    classes.forEach(classe => {
        add ? elem.classList.add(classe)
            : elem.classList.remove(classe);
    })
}

const criarElem = elem => document.createElement(elem);

let ids = 0;

const addId = (elem) => elem.id = `l${ids}`;

const appendAllChilds = (pai, filhos) => {
    filhos.forEach(filho => pai.appendChild(filho));
}

function newElement(text) {
    ids++;
    const elemPricipal = criarElem('div');
    toggleClass(elemPricipal, ['elemento'], true);
    addId(elemPricipal);

    const pText = criarElem('p');
    pText.innerHTML = text;
    addId(pText);

    const inputTextEdit = criarElem('input');
    inputTextEdit.setAttribute('type', 'text');
    toggleClass(inputTextEdit, ['textoEdit', 'hide'], true);
    addId(inputTextEdit);

    const botoesManipulacao = criarElem('div');
    toggleClass(botoesManipulacao, ['botoesManipulacao'], true);
    addId(botoesManipulacao);

    const botaoEdit = criarElem('button');
    toggleClass(botaoEdit, ['edit'], true);

    const botaoDel = criarElem('button');
    toggleClass(botaoDel, ['del'], true);

    const iconeEdit = criarElem('i');
    toggleClass(iconeEdit, ['fa-solid', 'fa-pen-to-square'], true);

    const iconeDel = criarElem('i');
    toggleClass(iconeDel, ['fa-solid', 'fa-trash-can'], true);

    const botoesConfirmacao = criarElem('div');
    toggleClass(botoesConfirmacao, ['botoesConfirmacao', 'hide'], true);
    addId(botoesConfirmacao);

    const botaoConfirm = criarElem('button');
    toggleClass(botaoConfirm, ['confirm'], true);

    const botaoCancel = criarElem('button');
    toggleClass(botaoCancel, ['cancel'], true);

    const iconeConfirm = criarElem('i');
    toggleClass(iconeConfirm, ['fa-solid', 'fa-check'], true);

    const iconeCancel = criarElem('i');
    toggleClass(iconeCancel, ['fa-solid', 'fa-xmark'], true);

    appendAllChilds(elemPricipal, [
        pText,
        inputTextEdit,
        botoesManipulacao,
        botoesConfirmacao
    ]);

    appendAllChilds(botoesManipulacao, [
        botaoEdit,
        botaoDel
    ]);

    botaoDel.appendChild(iconeDel);
    botaoEdit.appendChild(iconeEdit);

    appendAllChilds(botoesConfirmacao, [
        botaoConfirm,
        botaoCancel
    ]);

    botaoConfirm.appendChild(iconeConfirm);
    botaoCancel.appendChild(iconeCancel);

    botaoDel.addEventListener('click', () => del(elemPricipal.id));

    botaoEdit.addEventListener('click', () => edit(elemPricipal.id));

    botaoConfirm.addEventListener('click', () => confirm(elemPricipal.id));

    botaoCancel.addEventListener('click', () => cancel(elemPricipal.id));

    return elemPricipal;
}

const adicionar = document.querySelector('.add');
adicionar.addEventListener('click', addNewElement);

addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        addNewElement();
    }
})

const lista = document.querySelector('.lista');

function addNewElement() {
    const textInp = document.querySelector('.texto')
    const textValue = textInp.value;
    if (textValue) {
        const element = newElement(textValue);
        lista.appendChild(element);
        textInp.value = '';
    } else {
        alert('Escreva algo para adicionar...')
    }
}

function edit(id) {
    const p = document.querySelector(`p#${id}`);
    const texto = p.innerHTML;
    toggleClass(p, ['hide'], true);

    const inputEdit = document.querySelector(`.textoEdit#${id}`);
    inputEdit.value = texto;
    toggleClass(inputEdit, ['hide'], false);

    const botoesMani = document.querySelector(`.botoesManipulacao#${id}`);
    toggleClass(botoesMani, ['hide'], true);

    const botoesConfirm = document.querySelector(`.botoesConfirmacao#${id}`);
    toggleClass(botoesConfirm, ['hide'], false);
}

function confirm(id) {
    const p = document.querySelector(`p#${id}`);
    toggleClass(p, ['hide'], false);

    const inputEdit = document.querySelector(`.textoEdit#${id}`);
    toggleClass(inputEdit, ['hide'], true);

    const botoesMani = document.querySelector(`.botoesManipulacao#${id}`);
    toggleClass(botoesMani, ['hide'], false);

    const botoesConfirm = document.querySelector(`.botoesConfirmacao#${id}`);
    toggleClass(botoesConfirm, ['hide'], true);

    p.innerHTML = inputEdit.value;
}

function cancel(id) {
    const p = document.querySelector(`p#${id}`);
    toggleClass(p, ['hide'], false);

    const inputEdit = document.querySelector(`.textoEdit#${id}`);
    toggleClass(inputEdit, ['hide'], true);

    const botoesMani = document.querySelector(`.botoesManipulacao#${id}`);
    toggleClass(botoesMani, ['hide'], false);

    const botoesConfirm = document.querySelector(`.botoesConfirmacao#${id}`);
    toggleClass(botoesConfirm, ['hide'], true);
}

function del(id) {
    const elem = document.querySelector(`#${id}`);
    lista.removeChild(elem);
}
