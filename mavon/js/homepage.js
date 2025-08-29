let coverBtns = document.querySelectorAll(".cover .buttons button")
let coverImages = document.querySelectorAll(".cover img")
let coverContents = document.querySelectorAll(".cover .content")
let currentPage = 0
let cover = document.querySelector(".cover")

let discountCloseBtn = document.querySelector(".discount .close")
let discoundDiv = document.querySelector(".discount")
let showOfferBtn = document.querySelector(".discount .content .showBtn")
let discountInput = document.querySelector(".discount .content input")
let discountError = document.querySelector(".discount .content .error")
let offerDiv = document.querySelector(".discount .content .offer")
let codeSpan = document.querySelector(".discount .content .offer .code")
let discountCopyBtn = document.querySelector(".discount .content .offer .copy")
let discountCode = ""

let codeSpan2 = document.querySelector(".discount .success .code")
let successDiv = document.querySelector(".discount .success")
let contentDiv = document.querySelector(".discount .content")

let featuredLinks = document.querySelectorAll(".featured .items .item")

let feedbackPrevBtn = document.querySelector(".feedback .heading .buttons .prev")
let feedbackNextBtn = document.querySelector(".feedback .heading .buttons .next")
let commentItems = document.querySelectorAll(".feedback .comments .item")
let firstCommentIndex = 0

let scrollBtn = document.querySelector(".scrollBtn")
let scrollBtnVisible = false

// events
for (let i = 0; i < coverBtns.length; i++) {
    coverBtns[i].addEventListener("click", slideshow)
}
setInterval(() => {
    // removing the current page
    coverImages[currentPage].classList.remove("img-show")
    coverContents[currentPage].classList.remove("content-show")

    coverBtns[currentPage + 1].querySelector("input").checked = false

    if (currentPage < 2) {
        currentPage += 1
        animationToLeft()
    }
    else if ((currentPage == 2)) {
        currentPage = 0
        animationToRight()
    }

    coverBtns[currentPage + 1].querySelector("input").checked = true

    // showing the target page
    coverImages[currentPage].classList.add("img-show")
    coverContents[currentPage].classList.add("content-show")

    // changine header's background
    headerCoverBackground()

}, 10000);

setTimeout(() => {
    showDiscount()
}, 3000);
discountCloseBtn.addEventListener("click", closeDiscount)
showOfferBtn.addEventListener("click", showOffer)
discountCopyBtn.addEventListener("click", discountCopy)

for (let link of featuredLinks) {
    link.addEventListener("mouseenter", changeFeaturedImages)
    link.addEventListener("mouseleave", changeBackFeaturedImages)
}

feedbackNextBtn.addEventListener("click", feedbackNext)
feedbackPrevBtn.addEventListener("click", feedbackPrev)

scrollBtn.addEventListener("click", scrollToTop)
window.addEventListener("scroll", scrollBtnShow)


// functions
function slideshow(timer) {
    // removing the current page
    coverImages[currentPage].classList.remove("img-show")
    coverContents[currentPage].classList.remove("content-show")

    // determining the target page
    let btnId = ""
    btnId = this.getAttribute("id")
    if (btnId == "prevBtn") {
        if (currentPage > 0) {
            coverBtns[currentPage + 1].querySelector("input").checked = false
            currentPage -= 1
            coverBtns[currentPage + 1].querySelector("input").checked = true
            animationToRight()
        }
    }
    else if (btnId == "nextBtn") {
        coverBtns[currentPage + 1].querySelector("input").checked = false

        if (currentPage < 2) {
            currentPage += 1
            animationToLeft()
        }
        else if ((currentPage == 2)) {
            currentPage = 0
            animationToRight()
        }

        coverBtns[currentPage + 1].querySelector("input").checked = true

    }
    else {
        let input = this.querySelector("input")
        let previousPage = currentPage
        currentPage = +input.getAttribute("value") - 1


        if (currentPage < previousPage) {
            animationToRight()
        }
        else if (currentPage > previousPage) {
            animationToLeft()
        }
    }

    // showing the target page
    coverImages[currentPage].classList.add("img-show")
    coverContents[currentPage].classList.add("content-show")

    // changine header's background
    headerCoverBackground()
}

function animationToRight() {
    // adding animation
    coverImages[currentPage].classList.add("slideshow-right")
    coverContents[currentPage].classList.add("slideshow-right-content")
    // removing the animation class after its done
    setTimeout(() => {
        coverImages[currentPage].classList.remove("slideshow-right")
        coverContents[currentPage].classList.remove("slideshow-right-content")
    }, 1000);
}

function animationToLeft() {
    // adding animation
    coverImages[currentPage].classList.add("slideshow-left")
    coverContents[currentPage].classList.add("slideshow-left")
    for (btn of coverBtns) {
        btn.classList.add("not-clickable")
    }
    // removing the animation class after its done
    setTimeout(() => {
        coverImages[currentPage].classList.remove("slideshow-left")
        coverContents[currentPage].classList.remove("slideshow-left")
        for (btn of coverBtns) {
            btn.classList.remove("not-clickable")
        }
    }, 1000);
}

function headerCoverBackground() {
    if (currentPage == 0) {
        mainHeader.style.background = ""
        cover.style.background = ""
        mainHeader.style.backgroundColor = "#D6AA2B"
        cover.style.backgroundColor = "#D6AA2B"
    }
    else if (currentPage == 1) {
        mainHeader.style.background = ""
        cover.style.background = ""
        mainHeader.style.backgroundColor = "#ECA23B"
        cover.style.backgroundColor = "#ECA23B"
    }
    else if (currentPage == 2) {
        mainHeader.style.backgroundColor = ""
        mainHeader.style.background = "linear-gradient(to right, #FFC646, #FFD359, #FFD359)"
        cover.style.backgroundColor = ""
        cover.style.background = "linear-gradient(to right, #FFC646, #FFD359, #FFD359)"
    }
}

function showDiscount() {
    discoundDiv.style.opacity = "1"
    header.classList.add("blur")
    main.classList.add("blur")
    footer.classList.add("blur")
    scrollBtn.classList.add("blur")
    discoundDiv.style.display = "flex"
}

function closeDiscount() {
    discoundDiv.style.opacity = "0"
    header.classList.remove("blur")
    main.classList.remove("blur")
    footer.classList.remove("blur")
    scrollBtn.classList.remove("blur")

    setTimeout(() => {
        discoundDiv.style.display = "none"
    }, 1000);
}


function showOffer() {
    if (discountInput.value == "") {
        discountError.textContent = "Please enter your email first."
        discountInput.classList.add("errorAnimation")
        setTimeout(() => {
            discountInput.classList.remove("errorAnimation")
        }, 1500);
    }
    else {
        showOfferBtn.style.opacity = "0"
        showOfferBtn.style.display = "none"
        offerDiv.style.opacity = "1"
        let code = randomCode()
        codeSpan.textContent = code
        codeSpan2.textContent = code
        // using localStorage to be able to access it in other js files
        localStorage.setItem("discountCode", code);
    }
}

function discountCopy() {
    navigator.clipboard.writeText(localStorage.getItem("discountCode"))
    successDiv.style.opacity = "1"
    contentDiv.style.display = "none"
    setTimeout(() => {
        closeDiscount()
    }, 2000);
}

function changeFeaturedImages() {
    let img = this.querySelector(".img img")
    let previousSrc = img.getAttribute("src").slice(0, -5)
    img.setAttribute("src", previousSrc + "Hover.avif")
}

function changeBackFeaturedImages() {
    let img = this.querySelector(".img img")
    let previousSrc = img.getAttribute("src").slice(0, -10)
    img.setAttribute("src", previousSrc + ".avif")

}

function feedbackNext() {
    commentItems[firstCommentIndex].classList.remove("item-show")
    if (firstCommentIndex <= 2) {
        commentItems[firstCommentIndex + 3].classList.add("item-show")
        firstCommentIndex++
        commentItems[firstCommentIndex].style.order = 1
        commentItems[firstCommentIndex + 1].style.order = 2
        commentItems[firstCommentIndex + 2].style.order = 3
    }
    else if (firstCommentIndex <= 4) {
        commentItems[firstCommentIndex - 3].classList.add("item-show")
        firstCommentIndex++
        // 4 -> 4, 5 ,0
        // 5 -> 5, 0, 1
        commentItems[firstCommentIndex].style.order = 1
        commentItems[firstCommentIndex == 4 ? 5 : 0].style.order = 2
        commentItems[firstCommentIndex - 4].style.order = 3
    }
    else {
        commentItems[firstCommentIndex - 3].classList.add("item-show")
        firstCommentIndex = 0
        commentItems[firstCommentIndex].style.order = 1
        commentItems[firstCommentIndex + 1].style.order = 2
        commentItems[firstCommentIndex + 2].style.order = 3
    }

}

function feedbackPrev() {
    // firstCommentIndex=1 1, 2, 3 -> 0, 1, 2
    // firstCommentIndex=2 2, 3, 4 -> 1, 2, 3
    // firstCommentIndex=3 3, 4, 5 -> 2, 3, 4
    // firstCommentIndex=4 4, 5, 0 -> 3, 4, 5
    // firstCommentIndex=5 5, 0, 1 -> 4, 5, 0
    console.log(firstCommentIndex);

    if (firstCommentIndex > 0) {
        if (firstCommentIndex >= 4) {
            commentItems[firstCommentIndex - 4].classList.remove("item-show")
        } else {
            commentItems[firstCommentIndex + 2].classList.remove("item-show")
        }
        firstCommentIndex--
        commentItems[firstCommentIndex].classList.add("item-show")
        commentItems[firstCommentIndex].style.order = 1
        commentItems[firstCommentIndex + 1].style.order = 2
        if (firstCommentIndex != 5) {
            commentItems[firstCommentIndex + 2].style.order = 3
        } else {
            commentItems[0].style.order = 3
        }
    }

}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    // For other browsers:
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function scrollBtnShow() {
    if (window.scrollY > 500 && !scrollBtnVisible) {
        scrollBtn.style.transform = "translateY(0)"
        scrollBtnVisible = true
        console.log(scrollBtn)
    }
    else if (window.scrollY <= 500 && scrollBtnVisible) {
        scrollBtn.style.transform = "translateY(100px)"
        scrollBtnVisible = false
    }
}

