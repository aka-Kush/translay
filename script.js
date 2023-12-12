const selectTags = document.querySelectorAll('select');


selectTags.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id === 0 ? (country_code === "en" ? "selected" : "") : (country_code === "es" ? "selected" : "");

        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

const translateBtn = document.getElementById('translate-btn').addEventListener('click', function () {
    const text = document.getElementById('input-text').value;
    const translateTo = document.getElementById('translate-to').value;
    const translateFrom = document.getElementById('translate-from').value;
    translateText(text, translateFrom, translateTo);
})

function translateText(inputText, fromLang, toLang) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLang}|${toLang}`;

    fetch(apiUrl).then(res => res.json()).then(data => {
        if (data.responseData) {
            const translatedText = data.responseData.translatedText;
            document.getElementById('output').innerText = translatedText;
        }
        else {
            document.getElementById('output').innerText = "Error!";
        }
    }).catch(error => {
        console.log("Error: ", error);
        document.getElementById('Output').innerText = "Error!";
    })
}

function speakText(inputText) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.lang = document.getElementById('translate-to').value;
    speechSynthesis.speak(utterance);
}

const speakBtn = document.getElementById('speak-btn').addEventListener('click', function () {
    const translatedText = document.getElementById('output').innerText;
    speakText(translatedText);
});