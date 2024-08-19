// ============= footer==================

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Alena Danilchenko ${thisYear}`;
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

