let mainImage = document.querySelector(".product .img .main-image img")
let shortcutImage = document.querySelector(".shortcut img")
let changeImageButtons = document.querySelectorAll(".product .img .other-images button")
let skuCodeSpan = document.querySelector(".product .content .detail .skuCode")
let priceSpan = document.querySelector(".product .content .price")
let stockSpan = document.querySelector(".product .content .stock span")
let stockDiv = document.querySelector(".product .content .stock")
let stockFilledBar = document.querySelector(".product .content .stock .bar .filledBar")
let colorSpan = document.querySelector(".product .content .colorDiv .colorSpan")
let colorButtons = document.querySelectorAll(".product .content .colorDiv .images button")

let quantityMinusBtn = document.querySelector(".product .content .quantity .numberBox .minus")
let quantityMinusBtn2 = document.querySelector(".shortcut .numberBox .minus")
let quantityPlusBtn = document.querySelector(".product .content .quantity .numberBox .plus")
let quantityPlusBtn2 = document.querySelector(".shortcut .numberBox .plus")
let quantityNumberSpan = document.querySelector(".product .content .quantity .numberBox .number")
let quantityNumberSpan3 = document.querySelector(".shortcut .numberBox .number")
let quantityNumber = 1
let quantityErrorP = document.querySelector(".product .content .quantity .error")
let quantityNumberSpan2 = document.querySelector(".product .content .price-div .quantity-num")
let finalPriceSpan = document.querySelector(".product .content .price-div .final")

let addCartBtn = document.querySelector(".product .content .quantity .items .addCart")
let addCartBtn2 = document.querySelector(".shortcut .addCart")

// shopping cart
let shoppingCartTitleDiv = document.querySelector(".shopping-cart .title")
let shoppingCartH2 = document.querySelector(".shopping-cart .title h2")
let shoppingCartH2Text = document.querySelector(".shopping-cart .title h2 span")
let emptyParagraph = document.querySelector(".shopping-cart .content .empty")
let emptyContinueLink = document.querySelector(".shopping-cart .content .continue")
let totalFooter = document.querySelector(".shopping-cart .total")
let contentDiv = document.querySelector(".shopping-cart .content")

let ShoppinCartPlusBtns = []
let ShoppinCartMinusBtns = []
let ShoppinCartNumSpans1 = []
let ShoppinCartNumSpans2 = []
let ShoppinCartTotals = []
let ShoppinCartNums = []
let ShoppinCartProducts = []
let itemIndexes = 0
let ShoppingCartRemoveBtns = []
let itemDivs = []
let subtotal = 0
let itemCount = 0
let subtotalSpan = document.querySelector(".shopping-cart .total .subtotal span")
let cartCountHeader = document.querySelector("header .main-header .options #shopping-cart-btn .cart-number")

// discount shopping cart
let discountSubmitBtn = document.querySelector(".shopping-cart .total .discount .items button")
let discountInput = document.querySelector(".shopping-cart .total .discount .items input")
let discountLabel = document.querySelector(".shopping-cart .total .discount label")
const discountCode = localStorage.getItem("discountCode");
let preDiscountSpan = document.querySelector(".shopping-cart .total .subtotal .pre-discount")
let dicsountUsed = false

// note shopping cart
let addNoteBtn = document.querySelector(".shopping-cart .total .options .note")
let addNoteDiv = document.querySelector(".shopping-cart .total .note-div")
let noteCancelBtn = document.querySelector(".shopping-cart .total .note-div .result .second")
let noteSaveBtn = document.querySelector(".shopping-cart .total .note-div .result .first")

// shipping shopping cart
let addShippingBtn = document.querySelector(".shopping-cart .total .options .shipping")
let addShippingDiv = document.querySelector(".shopping-cart .total .shipping-div")
let shippingCancelBtn = document.querySelector(".shopping-cart .total .shipping-div .result .second")
let shippingSaveBtn = document.querySelector(".shopping-cart .total .shipping-div .result .first")
let shippingResult = document.querySelector(".shopping-cart .total .shipping-div .shippingResult")

// options under product
let infoBtns = document.querySelectorAll("main .info .buttons button")
let infoContents = document.querySelectorAll("main .info .contents .content")
let activeInfoIndex = 0
let activeLine = document.querySelector("main .info .line .activeLine")

let product = {
    name: "Women Dangle Earrings",
    imgSrc: "",
    skuCode: 0,
    price: 0,
    stock: 0,
    color: "",
    setProperties: function (imgSrc, skuCode, price, stock, color) {
        this.imgSrc = imgSrc
        this.skuCode = skuCode
        this.price = price
        this.stock = stock
        this.color = color
    }
}
let product1 = { ...product }
product1.setProperties("img/product1.webp", 46546, 50.00, 50, "red")
let product2 = { ...product }
product2.setProperties("img/product2.webp", 46549, 80.00, 19, "white")
let product3 = { ...product }
product3.setProperties("img/product3.webp", 46552, 40.00, 10, "dark red")
let products = [product1, product2, product3]
let currentProduct = product1

// events
for (let btn of changeImageButtons) {
    btn.addEventListener("click", changeProduct)
}
for (let btn of colorButtons) {
    btn.addEventListener("click", changeProduct)
}

quantityMinusBtn.addEventListener("click", quantityReduce)
quantityMinusBtn2.addEventListener("click", quantityReduce)
quantityPlusBtn.addEventListener("click", quantityAdd)
quantityPlusBtn2.addEventListener("click", quantityAdd)

addCartBtn.addEventListener("click", addCart)
addCartBtn2.addEventListener("click", addCart)

discountSubmitBtn.addEventListener("click", dicsountSubmit)
discountInput.addEventListener("keyup", submitDiscountEnter)

addNoteBtn.addEventListener("click", shoppingCartAddNote)
noteCancelBtn.addEventListener("click", shoppingCartCloseNote)
noteSaveBtn.addEventListener("click", shoppingCartSaveNote)
addShippingBtn.addEventListener("click", shoppingCartAddShipping)
shippingCancelBtn.addEventListener("click", shoppingCartCloseShipping)
shippingSaveBtn.addEventListener("click", shoppingCartSaveShipping)

for (let btn of infoBtns) {
    btn.addEventListener("click", showInfoItem)
}








let shortcutDiv = document.querySelector(".shortcut")
let shortcutVisible = false

window.addEventListener("scroll", shortcutShow)

function shortcutShow() {
    if (window.scrollY > 500 && !shortcutVisible) {
        shortcutDiv.style.transform = "translateY(0)"
        shortcutVisible = true
    }
    else if (window.scrollY <= 500 && shortcutVisible) {
        shortcutDiv.style.transform = "translateY(100%)"
        shortcutVisible = false
    }
}
















// functions
function changeProduct() {
    let newSrc = this.querySelector("img").getAttribute("src")

    let newProduct = ""
    for (p of products) {
        if (p.imgSrc == newSrc) {
            newProduct = p
        }
    }

    // change little buttons below the main image
    for (let btn of changeImageButtons) {
        if (btn.getAttribute("class") == "chosen") {
            btn.classList.remove("chosen")
        }
        if (btn.innerHTML == this.innerHTML) {
            btn.classList.add("chosen")
        }
    }

    // change main image
    mainImage.setAttribute("src", newSrc)
    shortcutImage.setAttribute("src", newSrc)

    // change sku
    skuCodeSpan.textContent = newProduct.skuCode

    // change price according to currency
    if (currency == "United States USD $") {
        priceSpan.textContent = "$" + newProduct.price
    }
    else if (currency == "United Kingdom GBP £") {
        // each price should be multipied by 0.74 (usd to gbp)
        priceSpan.textContent = "£" + (newProduct.price * .74)
    }
    else if (currency == "Europe EUR €") {
        // each price should be multipied by 0.88 (usd to eur)
        priceSpan.textContent = "€" + (newProduct.price * .88)
    }

    // change stock
    let newStock = newProduct.stock
    if (newStock > 15) {
        stockSpan.textContent = newStock + " in stock"
        stockDiv.classList.add("green")
        stockDiv.classList.remove("orange")
    }
    else {
        stockSpan.textContent = "Low stock: " + newStock + " left"
        stockDiv.classList.remove("green")
        stockDiv.classList.add("orange")
    }
    stockFilledBar.style.width = (newStock / 70 * 100) + "%"

    // change color
    colorSpan.textContent = newProduct.color

    for (let btn of colorButtons) {
        if (btn.getAttribute("class") == "chosen") {
            btn.classList.remove("chosen")
        }
        if (btn.innerHTML == this.innerHTML) {
            btn.classList.add("chosen")
        }
    }

    // checking if the current quantity is still valid
    if (quantityNumber > newProduct.stock) {
        quantityNumberSpan.textContent = newProduct.stock
        quantityNumberSpan3.textContent = newProduct.stock
        quantityErrorP.style.display = "block"
        quantityErrorP.textContent = `There is only ${newProduct.stock} of this color left so the quantity number has change to  ${newProduct.stock}`
        quantityErrorP.style.color = "red"
        quantityErrorP.style.marginBottom = "8px"
        setTimeout(() => {
            quantityErrorP.style.display = "none"
        }, 3000);
    }

    currentProduct = newProduct
    calculatePrice(finalPriceSpan)
}

function quantityReduce() {
    if (quantityNumber > 1) {
        quantityNumber -= 1
        quantityNumberSpan.textContent = quantityNumber
        quantityNumberSpan3.textContent = quantityNumber
        quantityNumberSpan2.textContent = quantityNumber
        calculatePrice(finalPriceSpan)
    }
    if (quantityNumber == 1) {
        quantityMinusBtn.classList.add("not-clickable")
        quantityMinusBtn2.classList.add("not-clickable")
    }
}
function quantityAdd() {
    if (quantityNumber < currentProduct.stock) {
        quantityNumber += 1
        quantityNumberSpan.textContent = quantityNumber
        quantityNumberSpan3.textContent = quantityNumber
        quantityNumberSpan2.textContent = quantityNumber
        calculatePrice(finalPriceSpan)
    }
    if (quantityNumber == 2) {
        quantityMinusBtn.classList.remove("not-clickable")
        quantityMinusBtn2.classList.remove("not-clickable")
    }
}

function calculatePrice(span, final = true) {
    if (final) {
        // calculate price according to currency
        if (currency == "United States USD $") {
            span.textContent = "$" + (currentProduct.price * quantityNumber)
        }
        else if (currency == "United Kingdom GBP £") {
            // each price should be multipied by 0.74 (usd to gbp)
            span.textContent = "£" + (currentProduct.price * quantityNumber * .74)
        }
        else if (currency == "Europe EUR €") {
            // each price should be multipied by 0.88 (usd to eur)
            span.textContent = "€" + (currentProduct.price * quantityNumber * .88)
        }
    }
    else {
        // calculate price according to currency
        if (currency == "United States USD $") {
            span.textContent = "$" + (currentProduct.price)
        }
        else if (currency == "United Kingdom GBP £") {
            // each price should be multipied by 0.74 (usd to gbp)
            span.textContent = "£" + (currentProduct.price * .74)
        }
        else if (currency == "Europe EUR €") {
            // each price should be multipied by 0.88 (usd to eur)
            span.textContent = "€" + (currentProduct.price * .88)
        }
    }
}

function addCart() {
    showShoppingCart()
    shoppingCartH2Text.textContent = 'Item added to your cart'
    shoppingCartH2.style.color = "#3ED660"
    setTimeout(() => {
        shoppingCartH2Text.textContent = 'Shopping Cart'
        shoppingCartH2.style.color = "black"
    }, 2000);

    emptyParagraph.style.display = "none"
    emptyContinueLink.style.display = "none"
    totalFooter.style.transform = " translateY(0)"
    contentDiv.appendChild(makeHtmlItem(currentProduct))
    ShoppinCartNums.push(quantityNumber)
    ShoppinCartProducts.push(currentProduct)

    itemCount++
    cartCountHeader.textContent = itemCount

    if (dicsountUsed) {
        setTotalWithDiscount(quantityNumber * currentProduct.price)
    }
    else {
        subtotal += quantityNumber * currentProduct.price
        setSubTotalSpan()
    }
}

function makeHtmlItem(p) {
    let itemDiv = document.createElement("div")
    itemDiv.classList.add("item")

    let imgDiv = document.createElement("div")
    imgDiv.classList.add("img")
    itemDiv.appendChild(imgDiv)

    let img = document.createElement("img")
    img.setAttribute("src", p.imgSrc)
    imgDiv.appendChild(img)

    let contentDiv = document.createElement("div")
    contentDiv.classList.add("content")
    itemDiv.appendChild(contentDiv)

    let headingLink = document.createElement("a")
    headingLink.setAttribute("href", "#")
    contentDiv.appendChild(headingLink)

    let h4 = document.createElement("h4")
    h4.textContent = p.name
    headingLink.appendChild(h4)

    let colorBox = document.createElement("span")
    colorBox.classList.add("colorBox")
    colorBox.textContent = "Color: "
    let color = document.createElement("span")
    color.classList.add("color")
    color.textContent = p.color
    colorBox.appendChild(color)
    contentDiv.appendChild(colorBox)

    let priceDiv = document.createElement("div")
    priceDiv.classList.add("price-div")
    contentDiv.appendChild(priceDiv)

    let span1 = document.createElement("span")
    span1.classList.add("price")
    span1.classList.add("first")
    calculatePrice(span1, false)
    priceDiv.appendChild(span1)

    let span2 = document.createElement("span")
    let i = document.createElement("i")
    i.classList.add("fa-solid")
    i.classList.add("fa-xmark")
    span2.appendChild(i)
    priceDiv.append(span2)

    let span3 = document.createElement("span")
    span3.classList.add("quantity-num")
    span3.textContent = quantityNumber
    priceDiv.appendChild(span3)
    ShoppinCartNumSpans2.push(span3)

    let span4 = document.createElement("span")
    span4.textContent = " = "
    priceDiv.appendChild(span4)

    let span5 = document.createElement("span")
    span5.classList.add("price")
    span5.classList.add("final")
    calculatePrice(span5)
    priceDiv.appendChild(span5)
    ShoppinCartTotals.push(span5)

    let options = document.createElement("div")
    options.classList.add("options")
    contentDiv.appendChild(options)

    let numberBox = document.createElement("div")
    numberBox.classList.add("numberBox")
    options.appendChild(numberBox)

    let removeBtn = document.createElement("button")
    removeBtn.textContent = "Remove"
    options.appendChild(removeBtn)
    removeBtn.addEventListener("click", shoppingCartRemoveItem)
    removeBtn.setAttribute("index", itemIndexes)
    ShoppingCartRemoveBtns.push(removeBtn)

    let minus = document.createElement("button")
    minus.classList.add("minus")
    if (quantityNumber == 1) {
        minus.classList.add("not-clickable")
    }
    numberBox.appendChild(minus)
    ShoppinCartMinusBtns.push(minus)
    minus.addEventListener("click", reduceQuantitiyShoppingCart)

    let iminus = document.createElement("i")
    iminus.classList.add("fa-solid")
    iminus.classList.add("fa-minus")
    minus.appendChild(iminus)
    minus.setAttribute("index", itemIndexes)

    let spanNumber = document.createElement("span")
    spanNumber.classList.add("number")
    spanNumber.textContent = quantityNumber
    numberBox.appendChild(spanNumber)
    ShoppinCartNumSpans1.push(spanNumber)


    let plus = document.createElement("button")
    plus.classList.add("plus")
    numberBox.appendChild(plus)
    plus.setAttribute("index", itemIndexes)
    ShoppinCartPlusBtns.push(plus)
    plus.addEventListener("click", addQuantitiyShoppingCart)

    let iplus = document.createElement("i")
    iplus.classList.add("fa-solid")
    iplus.classList.add("fa-plus")
    plus.appendChild(iplus)

    itemIndexes++

    itemDivs.push(itemDiv)
    return itemDiv
}

function addQuantitiyShoppingCart() {
    let index = +this.getAttribute("index")

    // quantityNumber = ShoppinCartNums[index]
    // currentProduct = ShoppinCartProducts[index]
    // quantityNumberSpan = ShoppinCartNumSpans1[index]
    // quantityNumberSpan2 = ShoppinCartNumSpans2[index]
    // finalPriceSpan = ShoppinCartTotals[index]
    // quantityMinusBtn =  ShoppinCartMinusBtns[index]

    if (ShoppinCartNums[index] < ShoppinCartProducts[index].stock) {
        ShoppinCartNums[index] += 1
        ShoppinCartNumSpans1[index].textContent = ShoppinCartNums[index]
        ShoppinCartNumSpans2[index].textContent = ShoppinCartNums[index]

        // calculate price according to currency
        let total = ShoppinCartProducts[index].price * ShoppinCartNums[index]
        if (currency == "United States USD $") {
            ShoppinCartTotals[index].textContent = "$" + total
        }
        else if (currency == "United Kingdom GBP £") {
            // each price should be multipied by 0.74 (usd to gbp)
            ShoppinCartTotals[index].textContent = "£" + (total * .74)
        }
        else if (currency == "Europe EUR €") {
            // each price should be multipied by 0.88 (usd to eur)
            ShoppinCartTotals[index].textContent = "€" + (total * .88)
        }

        if (dicsountUsed) {
            setTotalWithDiscount(ShoppinCartProducts[index].price)
        }
        else {
            subtotal += ShoppinCartProducts[index].price
            setSubTotalSpan()
        }
    }
    if (ShoppinCartNums[index] == 2) {
        ShoppinCartMinusBtns[index].classList.remove("not-clickable")
    }

}

function reduceQuantitiyShoppingCart() {
    let index = +this.getAttribute("index")

    // quantityNumber = ShoppinCartNums[index]
    // currentProduct = ShoppinCartProducts[index]
    // quantityNumberSpan = ShoppinCartNumSpans1[index]
    // quantityNumberSpan2 = ShoppinCartNumSpans2[index]
    // finalPriceSpan = ShoppinCartTotals[index]
    // quantityMinusBtn =  ShoppinCartMinusBtns[index]


    if (ShoppinCartNums[index] > 1) {
        ShoppinCartNums[index] -= 1
        ShoppinCartNumSpans1[index].textContent = ShoppinCartNums[index]
        ShoppinCartNumSpans2[index].textContent = ShoppinCartNums[index]

        // calculate price according to currency
        let total = ShoppinCartProducts[index].price * ShoppinCartNums[index]
        if (currency == "United States USD $") {
            ShoppinCartTotals[index].textContent = "$" + total
        }
        else if (currency == "United Kingdom GBP £") {
            // each price should be multipied by 0.74 (usd to gbp)
            ShoppinCartTotals[index].textContent = "£" + (total * .74)
        }
        else if (currency == "Europe EUR €") {
            // each price should be multipied by 0.88 (usd to eur)
            ShoppinCartTotals[index].textContent = "€" + (total * .88)
        }


        if (dicsountUsed) {
            setTotalWithDiscount(-ShoppinCartProducts[index].price)
        }
        else {
            subtotal -= ShoppinCartProducts[index].price
            setSubTotalSpan()
        }
    }
    if (ShoppinCartNums[index] == 1) {
        ShoppinCartMinusBtns[index].classList.add("not-clickable")
    }
}

function shoppingCartRemoveItem() {
    let index = +this.getAttribute("index")

    // remove the html elements of this item
    contentDiv.removeChild(itemDivs[index])

    // give notification to custommer
    shoppingCartH2Text.textContent = 'Item removed from your cart'
    shoppingCartH2.style.color = "#FF4D4D"
    setTimeout(() => {
        shoppingCartH2Text.textContent = 'Shopping Cart'
        shoppingCartH2.style.color = "black"
    }, 2000);

    // reduce the item price from subtotal
    if (dicsountUsed) {
        setTotalWithDiscount(-ShoppinCartProducts[index].price * ShoppinCartNums[index])
    }
    else {
        subtotal -= ShoppinCartProducts[index].price * ShoppinCartNums[index]
        setSubTotalSpan()
    }

    // show messages when shopping cart is empty
    itemCount--
    cartCountHeader.textContent = itemCount

    if (itemCount == 0) {
        emptyParagraph.style.display = "block"
        emptyContinueLink.style.display = "block"
        if (dicsountUsed) {
            dicsountUsed = false
            preDiscountSpan.style.display = "none"
            subtotal = 0
            setSubTotalSpan()
            discountLabel.textContent = "Enter your discount code:"
            discountLabel.style.color = "black"
        }
    }
}

function setSubTotalSpan(span = subtotalSpan, t = subtotal) {
    // calculate price according to currency
    if (currency == "United States USD $") {
        span.textContent = "$" + (t)
    }
    else if (currency == "United Kingdom GBP £") {
        // each price should be multipied by 0.74 (usd to gbp)
        span.textContent = "£" + (t * .74)
    }
    else if (currency == "Europe EUR €") {
        // each price should be multipied by 0.88 (usd to eur)
        span.textContent = "€" + (t * .88)
    }
}

function dicsountSubmit() {
    let customerDiscountCode = discountInput.value

    if (customerDiscountCode.trim() == discountCode && discountCode) {
        if (dicsountUsed) {
            discountLabel.textContent = "This code has been used and can’t be reapplied."
            discountLabel.style.color = "#FF4D4D"
        }
        else {
            discountLabel.textContent = "Great! You’ve saved 10% with your discount code."
            discountLabel.style.color = "#3ED660"
            setSubTotalSpan(preDiscountSpan)
            preDiscountSpan.style.display = "inline"
            subtotal *= .9
            setSubTotalSpan()
            dicsountUsed = true
        }
    } else {
        discountLabel.textContent = "That code didn’t work. Please check it and try again."
        discountLabel.style.color = "#FF4D4D"
    }
}

function setTotalWithDiscount(difference) {
    let subtotalWithoutDiscount = subtotal * 10 / 9
    let finalSwithoutD = subtotalWithoutDiscount + difference
    subtotal = finalSwithoutD * .9
    setSubTotalSpan(preDiscountSpan, finalSwithoutD)
    setSubTotalSpan(subtotalSpan)
}

function submitDiscountEnter(event) {
    if (event.keyCode == 13) {
        dicsountSubmit()
    }
}

function shoppingCartAddNote() {
    addNoteDiv.style.top = "0"
    contentDiv.classList.add("blur")
    shoppingCartTitleDiv.classList.add("blur")
}

function shoppingCartCloseNote() {
    addNoteDiv.style.top = "110%"
    contentDiv.classList.remove("blur")
    shoppingCartTitleDiv.classList.remove("blur")
}

function shoppingCartSaveNote() {
    let text = this.querySelector("span")
    text.textContent = ""
    let loadingIcon = this.querySelector("i")
    loadingIcon.style.visibility = "visible"
    setTimeout(() => {
        shoppingCartCloseNote()
        text.textContent = "Save"
        loadingIcon.style.visibility = "hidden"
    }, 1000);
}

function shoppingCartAddShipping() {
    addShippingDiv.style.top = "0"
    contentDiv.classList.add("blur")
    shoppingCartTitleDiv.classList.add("blur")
}


function shoppingCartCloseShipping() {
    addShippingDiv.style.top = "110%"
    contentDiv.classList.remove("blur")
    shoppingCartTitleDiv.classList.remove("blur")
    shippingResult.style.visibility = "hidden"

}

function shoppingCartSaveShipping() {
    let text = this.querySelector("span")
    text.textContent = ""
    let loadingIcon = this.querySelector("i")
    loadingIcon.style.visibility = "visible"
    setTimeout(() => {
        text.textContent = "Calculate"
        loadingIcon.style.visibility = "hidden"
        shippingResult.style.visibility = "visible"
        addShippingDiv.style.top = "-30px"
        addShippingDiv.style.height = "calc(100% + 30px)"
    }, 1000);
}

function showInfoItem() {
    let infoIndex = +this.getAttribute("index")
    let contentDiv = infoContents[infoIndex]
    let prevContentDiv = infoContents[activeInfoIndex]

    // show div
    contentDiv.classList.add("content-show")
    prevContentDiv.classList.remove("content-show")

    // button style
    this.classList.add("active")
    infoBtns[activeInfoIndex].classList.remove("active")

    // underline
    let underlineWidth = this.getAttribute("lineWidth")
    let underlineLeft = this.getAttribute("left")
    activeLine.style.width = underlineWidth
    activeLine.style.left = underlineLeft

    for (let btn of infoBtns) {
        btn.classList.add("not-clickable")
    }

    setTimeout(() => {
        contentDiv.style.display = "block"
        prevContentDiv.style.display = "none"
        activeInfoIndex = infoIndex
for (let btn of infoBtns) {
        btn.classList.remove("not-clickable")
    }
    }, 400);
}
