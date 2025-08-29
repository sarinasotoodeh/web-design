// a:97, z:122 / A:65, Z:90 / 1: 49, 9:57
function randomCode() {
    let code = ""
    for (let i = 0; i <= 5; i++) {
        let random = Math.random()
        if (random < .33) {
            let randomSmallLetter = Math.floor(Math.random() * 26) + 97
            code += String.fromCharCode(randomSmallLetter)
        }
        else if (random < .66) {
            let randomCapitaletter = Math.floor(Math.random() * 26) + 65
            code += String.fromCharCode(randomCapitaletter)
        }
        else {
            let randomDigit = Math.floor(Math.random() * 9) + 49
            code += String.fromCharCode(randomDigit)
        }
    }
    return code
}
