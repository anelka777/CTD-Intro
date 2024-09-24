// ============= footer==================
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);
const copyright = document.createElement('p');
copyright.innerHTML = `Alena Danilchenko &copy; ${thisYear}`;
footer.appendChild(copyright);



// ============= skills section==================

const skills = [
    ["HTML", "images/html-5.png", "html"],
    ["CSS", "images/css.png", "css"],
    ["JavaScript", "images/JS.png", "javascript"],
    ["Bootstrap", "images/bootstrap.png", "bootstrap"],
    ["Git/GitHub", "images/git.png", "git/GitHub"],
    ["Figma", "images/figma.png", "figma"],
    ["Photoshop", "images/photoshop.png", "photoshop"],
    ["API", "images/api.png", "api"],
    ["Gsap", "images/gsap.png", "gsap"]
];

const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

skills.forEach(skill => {
    const skillItem = document.createElement('li');
    const skillImage = document.createElement('img');
    skillImage.src = skill[1];
    skillImage.alt = skill[2];
    skillImage.width = 50;
    const skillText = document.createElement('p');
    skillText.textContent = skill[0];
    skillItem.appendChild(skillImage);
    skillItem.appendChild(skillText);
    skillsList.appendChild(skillItem);
});

//===========leave a message  section============================//



let messageForm = document.querySelector('[name="leave_message"]');
let messageSection = document.getElementById('live-message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

let idCounter = 0;
function makeId() {
    let id = 'entry' + idCounter++;
    return id;
}

let entryById={};

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let usersName = event.target.usersName.value;
    let usersEmail = event.target.usersEmail.value;
    let usersMessage = event.target.usersMessage.value;

    console.log('Name:', usersName);
    console.log('Email:', usersEmail);
    console.log('Message:', usersMessage);
    let uid = makeId();

    let newMessage = document.createElement('li');
    newMessage.classList.add('message-item'); // for CSS
    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span> ${usersMessage}</span>
    `;
    newMessage.setAttribute('id', uid);
    entryById[uid] = { usersName: usersName, usersEmail: usersEmail, usersMessage: usersMessage };

    newMessage.appendChild(makeRemoveButton());
    newMessage.appendChild(makeEditButton());
    messageList.appendChild(newMessage);
    messageForm.reset();
    messageSection.hidden = false;
});

function makeRemoveButton() {
    let removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-button'; //for css
    removeButton.addEventListener('click', () => {
        let entry = removeButton.parentNode;
        let uid1 = entry.getAttribute('id');
        delete entryById[uid1];
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        };
    });
    return removeButton;
};


function makeEditButton() {
    let editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.type = 'button';
    editButton.className = 'edit-button'; // for CSS
    
    editButton.addEventListener('click', () => {
        let entry = editButton.parentNode;

        let oldEditButton = entry.querySelector('button.edit-button');
        oldEditButton.hidden = true;

        let oldRemoveButton = entry.querySelector('button.remove-button');
        oldRemoveButton.hidden = true;

        let uid = entry.getAttribute('id');
        let cloneForm = messageForm.cloneNode(true);
        cloneForm.className = 'edit-message-form'; // for CSS
        cloneForm.usersName.value = entryById[uid].usersName;
        cloneForm.usersEmail.value = entryById[uid].usersEmail;
        cloneForm.usersMessage.value = entryById[uid].usersMessage;


        entry.appendChild(cloneForm);
        cloneForm.addEventListener('submit', function editMessage(event) {
            event.preventDefault();

            entryById[uid].usersName = event.target.usersName.value;
            entryById[uid].usersEmail = event.target.usersEmail.value;
            entryById[uid].usersMessage = event.target.usersMessage.value;

            let newEntry = document.createElement('li');
            newEntry.classList.add('message-item');
            newEntry.setAttribute('id', uid);
            newEntry.innerHTML = `
                <a href="mailto:${entryById[uid].usersEmail}">${entryById[uid].usersName}</a>
                <span> ${entryById[uid].usersMessage}</span>
            `;
            newEntry.appendChild(makeEditButton());
            newEntry.appendChild(makeRemoveButton());
            entry.parentNode.replaceChild(newEntry, entry);
        });
    });
    return editButton;
};


/*==============================================================================*/

async function fetchData() {
    try {
        const response = await fetch('https://api.github.com/users/anelka777/repos');
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const data = await response.json();
        console.log("json data = ", data);
        repositories = [...data];
        const projectsSection = document.getElementById('projects');
        const projectsList = projectsSection.getElementsByTagName('UL');

        for (let i = 0; i < repositories.length; i++) {
            let project = document.createElement('LI');
            project.classList.add('gh-project-item');
            let link = document.createElement('A');
            link.href = repositories[i].html_url;
            link.innerText = repositories[i].html_url;
            link.target = '_blank';
            project.appendChild(link);
            projectsList[0].appendChild(project);
        }
    } catch (error) {
        console.log('An error occurred', error);
    }
}


fetchData();


