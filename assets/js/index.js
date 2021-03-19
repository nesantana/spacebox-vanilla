const menuElement = document.querySelector('#menu');
const cardRepeatElement = document.querySelector('.cards-repeat');
const itemsMenu = [
    {
        text: 'EMPRESA',
        link: '/'
    },
    {
        text: 'SERVIÇO',
        link: '/'
    },
    {
        text: 'CONTATO',
        link: '/'
    }
];
let dados = [];

createMenu = () => {
    itemsMenu.map(({ text, link }) => {
        const newLi = document.createElement('li');
        const newLink = document.createElement('a');

        newLink.href = link;
        newLink.innerHTML = text;
        newLi.appendChild(newLink);
        menuElement.appendChild(newLi);
    });
}

createCards = (card, index) => {
    const template = `
    <div class="img">
        <img src="assets/img/${card.foto}" alt="Foto Alberto">
        <span>${card.id}</span>
    </div>
    <div class="informations">
            ${card.nome}
            <span>${card.cargo}</span>
        </div>
    </div>
    `;

    const newCardElement = document.createElement('div');
    newCardElement.classList = 'card ' + 'user' + card.id;

    if (index === 0) {
        newCardElement.classList.add('active');
    }

    newCardElement.innerHTML = template;

    cardRepeatElement.appendChild(newCardElement);
}

fetchDados = () => {
    return fetch('/dados');
}

document.addEventListener('click', (element) => {
    const el = element.target;
    const classList = [...el.classList];
    
    if (!classList.includes('active') && classList.includes('card')) {
        const user = classList[1];
        const id = Number(user.split('user')[1]);

        const oldActive = document.querySelector('.active');
        oldActive.classList.remove('active');
        
        el.classList.add('active');

        const img = document.querySelector('.card-open img');
        const nome = document.querySelector('.card-open .nome .value');
        const cargo = document.querySelector('.card-open .cargo .value');
        const idade = document.querySelector('.card-open .idade .value');

        const newDados = this.dados.find(data => data.id === id);

        img.src = 'assets/img/' + newDados.foto;
        nome.innerText = newDados.nome;
        cargo.innerText = newDados.cargo;
        idade.innerText = newDados.idade;
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    console.log('carregado completamente');
    this.createMenu();
    this.fetchDados();

    try {
        let newDados = await this.fetchDados();
        this.dados = await newDados.json();
        this.dados.map((item, index) => {
            this.createCards(item, index);
        })
    } catch (err) {
        console.error(err);
    }
});