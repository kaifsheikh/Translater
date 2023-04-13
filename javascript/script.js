// Translation Project Code Start

const fromtext = document.querySelector('.from-text'),
    totext = document.querySelector('.to-text'),
    selecttag = document.querySelectorAll('select'),
    exhangeicon = document.querySelector('.exchange'),
    translatebtn = document.querySelector("button"),
    icons = document.querySelectorAll('.row i');

selecttag.forEach((tag, id) => {
    // console.log(tag);
    for (const country_code in countries) {
        // console.log(countries[country_code]);
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = ` <option value="${country_code} ${selected}"> ${countries[country_code]} </option>`;
        tag.insertAdjacentHTML("beforeend", option); //yeah Select ka Option ka andar languages Add ho jaynge//
    }
});

exhangeicon.addEventListener("click", () => {
    let temptext = fromtext.value,
        templang = selecttag[0].value;
    fromtext.value = totext.value;
    selecttag[0].value = selecttag[1].value;
    totext.value = temptext;
    selecttag[1].value = temptext;
});

translatebtn.addEventListener("click", () => {
    let text = fromtext.value,
        translatefrom = selecttag[0].value,
        translateto = selecttag[1].value;

    // console.log(text, translatefrom, translateto);
    let apiurl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
    fetch(apiurl).then(res => res.json()).then(data => {
        console.log(data);
        totext.value = data.responseData.translatedText;
    });
});

icons.forEach(icon => {

    icon.addEventListener('click', ({ target }) => {
        // console.log(target);
        if (target.classList.contains("fa-copy")) {

            if (target.id == "from") {
                navigator.clipboard.writeText(fromtext.value);
            } else {
                navigator.clipboard.writeText(totext.value);
            }
        } else {

            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang = selecttag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(totext.value);
                utterance.lang = selecttag[1].value;
            }

            speechSynthesis.speak(utterance);
        }
    });
});