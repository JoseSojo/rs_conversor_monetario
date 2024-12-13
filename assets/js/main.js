
const customLoad = document.getElementById(`custom_load`);
const footerSection = document.getElementById(`footer_section`);
//
const btnExecute = document.getElementById(`button_execute`);
const btnChange = document.getElementById(`button_change`);
//
const resultSpace = document.getElementById(`section_result`);
const quantityInput = document.getElementById(`input_by_quantity`);   

const payload = [];
let AllPayload = [];

let customValue = {}; // { lastUpdate:string, nextUpdate:string, value:number }

const byButton = document.getElementById(`button_by`);
const bySection = document.getElementById(`section_by`);
const byInput = document.getElementById(`input_by`);
const byResult = document.getElementById(`result_by`);

const forButton = document.getElementById(`button_for`);
const forSection = document.getElementById(`section_for`);
const forInput = document.getElementById(`input_for`);
const forResult = document.getElementById(`result_for`);

// START CONVERTIONS PAYLOAD
Init();

// START EVENTS SECTION
// Mostar el selector de monedas en  [Moneda Entrada]
byButton.addEventListener(`click`, () => RemoveOrAddListPayload(bySection));

// Mostar el selector de monedas en [Moneda Salida]
forButton.addEventListener(`click`, () =>  RemoveOrAddListPayload(forSection));

//
quantityInput.addEventListener(`keyup`, (e) => {
    const vl = parseInt(e.target.value);
    if(customValue.value) {
        const currentResutl = vl * customValue.value;
        resultSpace.value = currentResutl ? currentResutl : ``; 
        ;  
    }
})

btnExecute.addEventListener(`click`, (e) => {
     
});

btnChange.addEventListener(`click`, () => {
    const byText = byButton.innerText;
    const forText = forButton.innerText;

    if(byText.length === 2 || forText.length === 4) return;

    const currentByText = byButton.innerText;
    const currentByAttr = byButton.getAttribute(`data-value`);
    

    byButton.innerText = `${forButton.innerText}`;
    byButton.setAttribute(`data-value`, forButton.getAttribute(`data-value`));

    forButton.innerText = `${currentByText}`;
    forButton.setAttribute(`data-value`, currentByAttr);

    Convertion();
});

byInput.addEventListener(`keyup`, (e) => {
    const vl = e.target.value;
    const customPayload = GetAllPaylaod().filter(p => p[0].includes(vl.toUpperCase()) || p[1].toLowerCase().includes(vl.toLowerCase()));
    SetAllPayload(customPayload, false);
})

forInput.addEventListener(`keyup`, (e) => {
    const vl = e.target.value;
    const customPayload = GetAllPaylaod().filter(p => p[0].includes(vl.toUpperCase()) || p[1].toLowerCase().includes(vl.toLowerCase()));
    SetAllPayload(customPayload, false);
})

// END EVENTS SECTION
const GetAllPaylaod = () => {
    return AllPayload;
} 

/**
 * SetAllPayload
 * Monta los primeros 15 resultados en el dom
 * @param {object By Api} payload 
 */
const SetAllPayload = (payload, sing) => {
    if(sing) AllPayload = payload;

    const top = payload.slice(0, 15);

    AddPayloads({ html:byResult, payload:top, by:true });
    AddPayloads({ html:forResult, payload:top, by:false });
    SetEventsPayload();
};

function Init() {   
    const ExecuteRequets = async () => {
        const url = `https://v6.exchangerate-api.com/v6/fadf2f0e53e2242ecae0f467/codes`;
        const result = await fetch(url);
        const json = await result.json();
        // console.log(json.supported_codes);
        // const newCodes = [...json.supported_codes[0],...json.supported_codes[1]]; 
        SetAllPayload(json.supported_codes, true);
        
        // EXIT
        setTimeout(() => LoadEnd(), 100);
    }
    ExecuteRequets();
}

/**
 * LoadEnd
 * Quita la pantalla de carga
 */
function LoadEnd() {
    customLoad.classList.remove(`flex`);
    customLoad.classList.add(`hidden`);
}

/**
 * LoadStart
 * Agrega la pantalla de carga
 */
function LoadStart() {
    customLoad.classList.remove(`hidden`);
    customLoad.classList.add(`flex`);
}

/**
 * Convertion
 * obteiene el cambio de moneda
 */
function Convertion () {
    const ExecuteRequets = async () => {
        LoadStart();
        const moneyBy = byButton.getAttribute(`data-value`);
        const moneyFor = forButton.getAttribute(`data-value`);
        const url = `https://v6.exchangerate-api.com/v6/fadf2f0e53e2242ecae0f467/pair/${moneyBy}/${moneyFor}`;
        const result = await fetch(url);
        const json = await result.json();
        // EXIT
        customValue = {
            lastUpdate:json.time_last_update_utc,
            lastUpdateUnix:new Date(json.time_last_update_unix),
            nextUpdate:json.time_next_update_utc,
            nextUpdateUnix:new Date(json.time_next_update_unix),
            value:json.conversion_rate
        }

        footerSection.innerHTML = `
            <span>Última actualización: <b>${customValue.lastUpdate}</b></span>
            <span>Proxima Actualización: <b>${customValue.nextUpdate}</b></span>
            <span></span>
        `

        if(quantityInput.value) {
            const vl = parseInt(quantityInput.value);
            if(customValue.value) {
                const currentResutl = vl * customValue.value;
                resultSpace.value = currentResutl || currentResutl !== NaN ? currentResutl : ``; 
            }
        }

        setTimeout(() => LoadEnd(), 100);
    }
    ExecuteRequets();
}

/**
 * SetEventsPayload
 * Agrega eventos a los nuevos botones
 */
function SetEventsPayload () {
    const buttonsPayload = document.querySelectorAll(`.button-payload`);
    buttonsPayload.forEach((btn) => {
        btn.addEventListener(`click`, (e) => {
            const dataValue = e.target.getAttribute(`data-value`);
            const dataBy = e.target.getAttribute(`data-in`);
            const text = e.target.innerText;
            RemoveListPayload(bySection);
            RemoveListPayload(forSection);

            if(dataBy === `by`) {
                byButton.innerText = `${text}`;
                byButton.setAttribute(`data-value`, dataValue);
            }
            else {
                forButton.innerText = `${text}`;
                forButton.setAttribute(`data-value`, dataValue);
            }

            if(byButton.innerText !== `De` && forButton.innerText !== `Para`) Convertion();
        });
    })
}

/**
 * 
 */
function RemoveOrAddListPayload (html) {
    if(html.classList.contains(`scale-0`)) {
        html.classList.remove(`scale-0`);
        html.classList.add(`scale-100`);
    } else {
        html.classList.remove(`scale-100`);
        html.classList.add(`scale-0`);
    } 
}

function RemoveListPayload (html) {
    html.classList.remove(`scale-100`);
    html.classList.add(`scale-0`);
}

/**
 * AddPayloads
 * agrega los payload al dom
 */
function AddPayloads ({payload,html,by}) {
    let template = ``;
    payload.forEach(element => {
        template += `
            <button data-in="${by ? `by` : `for`}" data-value="${element[0]}" class="text-gray-500 button-payload text-xs border-b hover:bg-slate-100 px-3 w-full">(${element[0]}) ${element[1]}</button>
        `;
    });
    html.innerHTML = template;
}
 