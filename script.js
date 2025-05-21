let clickCount = 0;

const countrySelect = document.getElementById('countrySelect');
const countryInput = document.getElementById('countryInput');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');
const countryList = document.getElementById('countryList');
const countryCode = document.getElementById('countryCode');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            console.log(country);
            selectCountry(country)
            getCountryCode(country)
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function filterCountries() {
    const filter = countryInput.value.toLowerCase();
    const filteredCountries = countries.filter(country => country.toLowerCase().includes(filter));

    countryList.innerHTML = filteredCountries.map(country => 
        `<li class="list-group-item" onclick="selectCountry('${country}')">${country}</li>`
    ).join('');
    countryList.style.visibility = 'visible';
}

function selectCountry(country) {
    countryInput.value = country;
    selectedCountry = country
    getCountryCode(country)
    blurFunction()
}

function blurFunction() {
    setTimeout(() => countryList.style.visibility = 'hidden', 150);
}


function getCountryCode(countryName) {
    console.log(countryName);
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const code = data[0].idd.root + data[0].idd.suffixes.join("")
        // TODO inject countryCode to form
        countryCode.innerHTML = countryCode.innerHTML + `
            <option value="${code}">${code} (${ data[0].name.common})</option>
        `
        countryCode.value = code
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

function onVat() {
    document.getElementById('vatUE').addEventListener('change', function () {
        const vatNumField = document.getElementById('vatNumber');
        const invoiceDataField = document.getElementById('invoiceData');
        if (this.checked) {
            vatNumField.parentElement.style.display = 'block';
          invoiceDataField.parentElement.style.display = 'block';
        } else {
            vatNumField.parentElement.style.display = 'none';
          invoiceDataField.parentElement.style.display = 'none';
        }
    });
}

(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);

    fetchAndFillCountries();
    getCountryByIP();
    onVat();
})()
