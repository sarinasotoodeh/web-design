let moreBtn = document.getElementById("more-btn")
let moreBtnIcon = document.querySelector("header .top-header #more-btn i")
let flagShowDetail = true
let detailDiv = document.querySelector("header .detail")

let currentCurrencyBtn = document.querySelector("header .top-header .currency .current")
let currentCurrencyBtnIcon = document.querySelector("header .top-header .currency .current i")
let flagShowCurrency = true
let currencyDropdown = document.querySelector("header .top-header .currency .dropdown")
let currencyDropdownItems = document.querySelectorAll("header .top-header .currency .dropdown div")
let currency = "United States USD $"

let header = document.querySelector("header")
let main = document.querySelector("main")
let footer = document.querySelector("footer")
let shoppingCartBtn = document.getElementById("shopping-cart-btn")
let shoppingCart = document.querySelector(".shopping-cart")
let shoppingCartCloseBtn = document.querySelector(".shopping-cart .close")
let body = document.querySelector("body")

let mainHeader = document.querySelector("header .main-header")

// events
moreBtn.addEventListener("click", showDetail)
currentCurrencyBtn.addEventListener("click", showCurrencyDropdown)
for (let item of currencyDropdownItems) {
    item.addEventListener("click", changeCurrency)
}
shoppingCartBtn.addEventListener("click", showShoppingCart)
shoppingCartCloseBtn.addEventListener("click", showShoppingCart)
window.addEventListener("scroll", scroll)
mainHeader.style.background = "#D6AA2B"

// functions
function showDetail() {
    if (flagShowDetail) {
        moreBtnIcon.style.transform = "rotateX(180deg)"
        detailDiv.classList.add("detail-show")
        flagShowDetail = false
    }
    else {
        moreBtnIcon.style.transform = "rotateX(0)"
        detailDiv.classList.remove("detail-show")

        flagShowDetail = true
    }
}

function showCurrencyDropdown() {
    if (flagShowCurrency) {
        currentCurrencyBtnIcon.style.transform = "rotateX(180deg)"
        currencyDropdown.classList.add("dropdown-show")
        flagShowCurrency = false
    }
    else {
        currentCurrencyBtnIcon.style.transform = "rotateX(0)"
        currencyDropdown.classList.remove("dropdown-show")
        flagShowCurrency = true
    }
}

function changeCurrency() {
    let itemInput = this.querySelector("input")
    let itemLabel = this.querySelector("label")
    if (itemInput.checked == false) {
        itemInput.checked = true
        calculateNewPrices(currency, itemLabel.textContent)
        currency = itemLabel.textContent
        let span = currentCurrencyBtn.querySelector("span")
        span.textContent = currency
        showCurrencyDropdown()
    }    
}

function calculateNewPrices(previous, now){
    // USD to GBP
    let prices = document.querySelectorAll(".price")
    if (previous == "United States USD $" && now == "United Kingdom GBP £") {
        // each price should ne multipied by 0.74 
        for (let price of prices) {
            let oldPrice = +price.textContent.slice(1)
            price.textContent = "£" + (Math.round(oldPrice * .74 * 100) / 100)
        }
    }

    // GBP to USD
    if (now == "United States USD $" && previous == "United Kingdom GBP £") {
        // each price should ne multipied by 1.36
        for (let price of prices) {
            let oldPrice = +price.textContent.slice(1)
            price.textContent = "$" + (Math.round(oldPrice * 1.36 * 100) / 100)
        }
    }

    // USD to EUR
    console.log(previous, now)
    if (now == "Europe EUR €" && previous == "United States USD $") {
        // each price should be multipied by 0.88
        for (let price of prices) {
            let oldPrice = +price.textContent.slice(1)
            price.textContent = "€" +(Math.round(oldPrice * .88 * 100) / 100)
        }
    }

    // EUR to USD
    console.log(previous, now)
    if (previous == "Europe EUR €" && now == "United States USD $") {
        // each price should be multipied by 1.14
        for (let price of prices) {
            let oldPrice = +price.textContent.slice(1)
            price.textContent = "$" + (Math.round(oldPrice * 1.14 * 100) / 100)
        }
    }

    // EUR to GBP
    console.log(previous, now)
    if (previous == "Europe EUR €" && now == "United Kingdom GBP £") {
        // each price should be multipied by .84
        for (let price of prices) {
            let oldPrice = +price.textContent.slice(1)
            price.textContent = "£" + (Math.round(oldPrice * .84 * 100) / 100)
        }
    }

    // GBP to EUR
    console.log(previous, now)
    if (now == "Europe EUR €" && previous == "United Kingdom GBP £") {
        // each price should be multipied by 1.19
        for (let price of prices) {
            let oldPrice = +price.textContent.slice(1)
            price.textContent = "€" + (Math.round(oldPrice * 1.19 * 100) / 100)
        }
    }
}

function showShoppingCart(){
    shoppingCart.classList.toggle("shopping-cart-show")
    header.classList.toggle("blur")
    main.classList.toggle("blur")
    footer.classList.toggle("blur")
    body.classList.toggle("overflow-hidden")
}

function scroll() {
    if (window.scrollY > 500) {
        mainHeader.classList.add("header-fixed")
    }
    else {
        mainHeader.classList.remove("header-fixed")
    }
}