
/**
 * Theme Dark Light In App
 */

// selectors
const btnInverse = document.querySelectorAll(`.th-btn-inverse`);
const btnPrimary = document.querySelectorAll(`.th-btn-primary`);

const bgAccent = document.querySelectorAll(`.th-bg-accent`);
const bgPrimary = document.querySelectorAll(`.th-bg-primary`);
const bgInverse = document.querySelectorAll(`.th-bg-inverse`);

const textAccent = document.querySelectorAll(`.th-text-accent`);
const textPrimary = document.querySelectorAll(`.th-text`);
const textInverse = document.querySelectorAll(`.th-text-inverse`);

const shadowInverse = document.querySelectorAll(`.th-shadow`);

// Select buttons themes
const btnLight = document.getElementById(`theme_btn_light`);
const btnDark = document.getElementById(`theme_btn_dark`);

btnLight.addEventListener(`click`, () => {
    window.localStorage.removeItem(`app_th`);
    window.localStorage.setItem(`app_th`, `light`);
    ChangeTheme(`light`);
});

btnDark.addEventListener(`click`, () => {
    window.localStorage.removeItem(`app_th`);
    window.localStorage.setItem(`app_th`, `dark`);
    ChangeTheme(`dark`);
});

// Storage persist (dev)
let theme = `light`; // light | dark
const thInit = window.localStorage.getItem(`app_th`);
if(!thInit) window.localStorage.setItem(`app_th`,`light`);
else theme = thInit;

// Execute Funtion Init
ChangeTheme(theme);

// Logic
function ChangeTheme (th) {
    if(th == `light`) {
        btnLight.classList.add(`hidden`);
        btnLight.classList.remove(`block`);

        btnDark.classList.remove(`hidden`);
        btnDark.classList.add(`block`);
        theme = `light`;

        HandleClassListLight({ html:bgAccent,type:`bg-accent` });
        HandleClassListLight({ html:bgPrimary,type:`bg-primary` });
        HandleClassListLight({ html:bgInverse,type:`bg-inverse` });
        HandleClassListLight({ html:textAccent,type:`text-accent` });
        HandleClassListLight({ html:textPrimary,type:`text-primary` });
        HandleClassListLight({ html:btnInverse,type:`btn-inverse` });
        HandleClassListLight({ html:btnPrimary,type:`btn-primary` });    
        HandleClassListLight({ html:shadowInverse,type:`shadow-primary` });   
    } else {
        btnLight.classList.add(`block`);
        btnLight.classList.remove(`hidden`);

        btnDark.classList.remove(`block`);
        btnDark.classList.add(`hidden`);
        theme = `dark`;

        HandleClassListDark({ html:bgAccent,type:`bg-accent` });
        HandleClassListDark({ html:bgPrimary,type:`bg-primary` });
        HandleClassListDark({ html:bgInverse,type:`bg-inverse` });
        HandleClassListDark({ html:textAccent,type:`text-accent` });
        HandleClassListDark({ html:textPrimary,type:`text-primary` });
        HandleClassListDark({ html:btnInverse,type:`btn-inverse` });
        HandleClassListDark({ html:btnPrimary,type:`btn-primary` }); 
        HandleClassListDark({ html:shadowInverse,type:`shadow-primary` });   
    }
}

function HandleClassListLight({ html, type }) {
    const resultType = GetClassList({type});
    const removeSplit = resultType.dark.split(` `);
    const addSplit = resultType.light.split(` `);
    html.forEach(item => {
        removeSplit.forEach((th) => item.classList.remove(th));
        addSplit.forEach((th) => item.classList.add(th));
    })
}

function HandleClassListDark({ html, type }) {
    const resultType = GetClassList({type});
    const removeSplit = resultType.light.split(` `);
    const addSplit = resultType.dark.split(` `);
    html.forEach(item => {
        removeSplit.forEach((th) => item.classList.remove(th));
        addSplit.forEach((th) => item.classList.add(th));
    })
}

function GetClassList ({ type }) {
    if(type === `bg-primary`) return { dark: `bg-slate-900`, light:`bg-slate-300` };
    else if(type === `bg-accent`) return { dark: `bg-slate-700`, light:`bg-slate-100` };
    else if(type === `bg-inverse`) return { dark: `bg-slate-300`, light:`bg-slate-700` };
    else if(type === `btn-primary`) return { dark: `bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-slate-100 duration-300`, light:`duration-300 bg-slate-100 hover:bg-slate-50 text-slate-700 hover:text-slate-900` };
    else if(type === `btn-inverse`) return { dark: `bg-slate-300 hover:bg-slate-100 text-slate-700 hover:text-slate-900 duration-300`, light:`duration-300 bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-slate-100` };
    else if(type === `text-primary`) return { dark: `text-slate-200`, light:`text-slate-800` };
    else if(type === `text-inverse`) return { dark: `text-slate-800`, light:`text-slate-100` };
    else if(type === `text-accent`) return { dark: `text-slate-500`, light:`text-slate-500` };
    else if(type === `shadow-primary`) return { dark: `shadow-slate-700`, light:`shadow-slate-300` };
    return { dark: ``, light:`` }
}
