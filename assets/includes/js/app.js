let characterSelectedList = [];
let mainCharacterArray = [];
let gameRate = 0
let gameTime = 90;
let minutes = (gameTime >= 60) && ((gameTime % 60) === 0) ? Math.floor(gameTime / 60) - 1 : Math.floor(gameTime / 60);
let seconds = ((gameTime % 60) === 0) ? (gameTime % 60) + 60 : gameTime % 60;
let secondString = (seconds <= 10) ? `0${minutes}` : minutes;
let minutString = (minutes <= 10) ? `0${minutes}` : minutes;
let gameEnd = false;
let validWordList = [];
let mobileNumber = ""
let fullName = "";
let stepsGame;
let towCount=0;
function generatRandomNumber(end) {
    return Math.floor(Math.random() * end)
}

function convertStringToArray(strings) {
    return strings.split("")
}

function convertArrayToString(array) {
    return array.join(",").replace(/,/g, "");
}

function generateWordArray() {
    let WordPatern = [{
        wordArray: ["همدل", "دانا", "لایق"],
        wordText: `<div class="guess-content col-12 col-md-6">
        <div class="row justify-content-center">
            <button class="guess-char">ه</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">م</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">د</button>
            <button class="guess-char tow">ا</button>
            <button class="guess-char">ن</button>
            <button class="guess-char tow">ا</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">ل</button>
            <button class="guess-char">ا</button>
            <button class="guess-char">ی</button>
            <button class="guess-char">ق</button>
        </div>
    </div>`
    },
    {
        wordArray: ["صادق", "امین", "دوست"],
        wordText: `<div class="guess-content col-12 col-md-6">
        <div class="row justify-content-center">
            <button class="guess-char">ص</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">ا</button>
            <button class="guess-char">م</button>
            <button class="guess-char">ی</button>
            <button class="guess-char">ن</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">د</button>
            <button class="guess-char">و</button>
            <button class="guess-char">س</button>
            <button class="guess-char">ت</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">ق</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
        </div>
    </div>`
    },
    {
        wordArray: ["پناه", "ناجی", "همدل"],
        wordText: `<div class="guess-content col-12 col-md-6">
        <div class="row justify-content-center">
            <button class="guess-char">پ</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">ن</button>
            <button class="guess-char">ا</button>
            <button class="guess-char">ج</button>
            <button class="guess-char">ی</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">ا</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">ه</button>
            <button class="guess-char">م</button>
            <button class="guess-char">د</button>
            <button class="guess-char">ل</button>
        </div>
        </div>`
    },
    {
        wordArray: ["رفیق", "حامی", "صادق"],
        wordText: `<div class="guess-content col-12 col-md-6">
        <div class="row justify-content-center">
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">ح</button>
            <button class="guess-char">ص</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">ا</button>
            <button class="guess-char">ا</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">${generateRandomChar()}</button>
            <button class="guess-char">م</button>
            <button class="guess-char">د</button>
        </div>
        <div class="row justify-content-center">
            <button class="guess-char">ر</button>
            <button class="guess-char">ف</button>
            <button class="guess-char">ی</button>
            <button class="guess-char">ق</button>
        </div>
        </div>`
    }
]



    let allArray = [
        [{
                word: "مشوق",
                col: {
                    start: 0,
                    end: 3
                },
                row: {
                    start: 0,
                    end: 3
                },
                model: "skewedstart",
                operation: "-"
            },
            {
                word: "دوست",
                col: {
                    start: 2,
                    end: 2
                },
                row: {
                    start: 3,
                    end: 0
                },
                model: "horizontalend",
                operation: "-"
            },
            {
                word: "عاشق",
                col: {
                    start: 3,
                    end: 3
                },
                row: {
                    start: 3,
                    end: 0
                },
                model: "horizontalstart",
                operation: "-"
            }
        ],
        [{
                word: "وفا",
                col: {
                    start: 2,
                    end: 0
                },
                row: {
                    start: 0,
                    end: 1
                },
                model: "verticalend",
                operation: "-"
            },
            {
                word: "رفیق",
                col: {
                    start: 0,
                    end: 3
                },
                row: {
                    start: 0,
                    end: 3
                },
                model: "skewedstart",
                operation: "-"
            },
            {
                word: "صادق",
                col: {
                    start: 0,
                    end: 3
                },
                row: {
                    start: 0,
                    end: 3
                },
                model: "verticalstart",
                operation: "-"
            },
        ],
        [{
                word: "امین",
                col: {
                    start: 0,
                    end: 3
                },
                row: {
                    start: 3,
                    end: 0
                },
                model: "verticalstart",
                operation: "-"
            },
            {
                word: "حامی",
                col: {
                    start: 2,
                    end: 2
                },
                row: {
                    start: 3,
                    end: 0
                },
                model: "horizontalstart",
                operation: "-"
            },
            {
                word: "یار",
                col: {
                    start: 1,
                    end: 0
                },
                row: {
                    start: 3,
                    end: 3
                },
                model: "skewedstart",
                operation: "-"
            },
        ],
        [{
                word: "همدل",
                col: {
                    start: 0,
                    end: 3
                },
                row: {
                    start: 1,
                    end: 1
                },
                model: "verticalend",
                operation: "-"
            },
            {
                word: "صادق",
                col: {
                    start: 2,
                    end: 2
                },
                row: {
                    start: 3,
                    end: 0
                },
                model: "horizontalend",
                operation: "-"
            },
            {
                word: "ناجی",
                col: {
                    start: 3,
                    end: 0
                },
                row: {
                    start: 2,
                    end: 2
                },
                model: "verticalstart",
                operation: "-"
            },
        ]
    ];
    let arrayLength = WordPatern.length;
    let randomNumber = generatRandomNumber(arrayLength);
    let oldRandomeNumber = sessionStorage.getItem("generateWordArray");

    if (randomNumber == arrayLength) {
        if (oldRandomeNumber == randomNumber) {
            randomNumber--;
        }
    } else if (randomNumber == 0) {
        if (oldRandomeNumber == randomNumber) {
            randomNumber = randomNumber + 1;
        }
    } else {
        if (oldRandomeNumber == randomNumber) {
            randomNumber--;
        }

    }
    if (oldRandomeNumber != null) {
        sessionStorage.setItem("generateWordArray", randomNumber);
    } else {
        setTimeout(() => {
            sessionStorage.setItem("generateWordArray", randomNumber);
        }, 1000);
    }
    return WordPatern[randomNumber];

}

function makeid(length) {
    var result = [];
    var characters = '​آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        let randomNumber = generatRandomNumber(charactersLength);
        if (randomNumber === 0) {
            randomNumber = randomNumber + 1;
        }
        if (randomNumber > 34) {
            randomNumber = randomNumber - 2;
        }
        result.push(characters.charAt(randomNumber));
    }
    return result;
}

function generateRandomCharacters(lengthchar, arraychar) {

    let newChar = makeid(16 - lengthchar);
    let newCharactersArray = mainCharacterArray.concat(newChar);

    newCharactersArray.sort();

    return newCharactersArray;
}

function CreateRandomCharacterArray(word) {
    let characters = [];
    for (let i = 0; i < word.length; i++) {
        characters.push(word.charAt(i))
        let char = word.charAt(i);
        if ((mainCharacterArray.length + word.length) < 16) {
            let index = mainCharacterArray.indexOf(char);
            if (index > -1) {

            } else {
                mainCharacterArray.push(char);
            }
        } else {
            mainCharacterArray.push(char);
        }


    }
}

function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

function CreateGameSteps() {

    this.steps = generateWordArray();
    //  generateRandomCharacters(mainCharacterArray.length, mainCharacterArray);
    return {
        charecterArray: this.steps.wordText,
        wordsArray: this.steps.wordArray
    };
}

function createGuessCharacter(char) {
    let charTag = `<button class="guess-char">${char}</button>`;
    return charTag;
}

function createRowItems(charArray) {
    // console.log("createRowItems ==>",charArray)
    let rowChar = `<div class="row justify-content-center">`;
    charArray.forEach((item) => {
        rowChar += createGuessCharacter(item);
    });
    rowChar += `</div>`;
    return rowChar;
}

function createRowStepUI(rows, key) {
    let rowTag = "";

    let charArray = generateRandomCharactersByWord(rows);


    charArray.forEach((item) => {
        rowTag += createRowItems(item);
    });

    let wordContent = `
    <div class="guess-content col-12 col-md-6">
            ${rowTag}
        </div>`;
    return wordContent;

}

function createUIGuessWord(gameObj) {

    let {
        charecterArray,
        wordsArray
    } = gameObj;
    jQuery("#guess-wrapper").append(charecterArray);
    // jQuery("#guess-word-content").append(keyWords);

}

function createGuessWord(word) {
    let wordTag = ` <div class="col-12 col-md-4 py-2">
        <div class="box-guess-word" data-valid="true" id='box-guess-${generatRandomNumber(10000)}'>
            <span class="guess-text">${word}</span>
            <span class="guess-icon">
            <img src='./assets/includes/image/valid-word.png' alt='' class='img-fluid'>
            </span>
        </div>
    </div>`;
    //<img src="./assets/includes/image/not-valid.png" alt="" class="img-fluid">
    return wordTag;
}
stepsGame = CreateGameSteps();
createUIGuessWord(stepsGame);


function isNumberByCodeScii(keyCode) {
    switch (true) {
        case keyCode > 47 && keyCode < 58:
            return true;
        case keyCode > 95 && keyCode < 106:
            return true;
        default:
            return false;
    }
}

function addCharSuccess(className) {
    jQuery(className).each(function () {
        jQuery(this).removeClass("char-active")
        jQuery(this).addClass("char-success")
    })
}

function setRateData() {
   if(gameRate <= 60){
    gameRate = gameRate + 20;
    jQuery("#your-rat").text(gameRate)
   }
}

function setTickForTrueWord(trueWord, word) {
    $(".not-is-valid").each(function () {
        this.remove();
    });
    if(!validWordList.includes(word)){
    validWordList.push(word);
    charM = "";
    jQuery("#guess-word-content").append(createGuessWord(word))
    jQuery(".box-guess-word").each(function () {
        let parentid = "#" + (jQuery(this).attr("id"));
        let wordTag = jQuery(parentid + " .guess-text");
        let wordText = jQuery(wordTag).text();
        let jsonWord = JSON.stringify(convertStringToArray(wordText).sort());
        if (jsonWord === trueWord) {
            jQuery(parentid + " .guess-icon").addClass("is-success")
            jQuery(parentid + " .guess-icon").empty();
            jQuery(parentid + " .guess-icon").append(`<img src='./assets/includes/image/valid-word.png' alt='' class='img-fluid'>`);
            addCharSuccess(".char-active");
            setRateData();
            characterSelectedList = []

        }
    })
    }
    
    
}

function getArrayWordConvertToArrays(arrayWord) {
    let newArray = [];
    arrayWord.map((item) => {
        let newItem = JSON.stringify(convertStringToArray(item).sort());
        newArray.push(newItem);
    })
    return newArray;
}

function notSetThisWord() {
    charM = "";
    characterSelectedList = [];
    $(".guess-char").each(function () {
        $(this).removeClass("char-active");
    })
    $(".box-guess-word").each(function () {
        let isValid = $(this).data("valid");
        let parent = $(this).parent();
        if (!isValid) {
            $(parent).remove();
        }
    });
}


function checkWordIsHas(allWordArray, charSelectedArray) {
    let wordArrayJson = getArrayWordConvertToArrays(allWordArray);
    let charJson = JSON.stringify(charSelectedArray.sort());
    wordArrayJson.map((word, index) => {
        if (word === charJson) {
            setTickForTrueWord(word, allWordArray[index]);
        }
    })
}

function wordListEqualCharList(allWordArray, char) {
    for (let i = 0; i < allWordArray.length; i++) {
        // console.log("wordListEqualCharList ==>",allWordArray[i])
    }
}
let charM = "";

let timeinterval;

function updateGameTime() {
    seconds--;
    let secondString = (seconds < 10) ? `0${seconds}` : seconds;
    let minutString = (minutes < 10) ? `0${minutes}` : minutes;
    document.getElementById("seconds").innerHTML = `${secondString}`;
    document.getElementById("minutes").innerHTML = `${minutString}`;
    gameTime--;
    if (gameRate === 60) {
        youWin();
    }
    if (gameTime <= 0) {
        gameTimeChecker();
        clearInterval(timeinterval);
        reloadGuessBox()
    } else {
        if (seconds === 0) {
            seconds = 60;
            minutes--;
        }
    }
}

function gameTimeChecker() {
    if (gameTime > 0) {
        return true;
    }
    jQuery("#guess-wrapper").addClass("guess-word-time-out");
    jQuery("#guess-word-content").empty();
    jQuery("#box-game-time-start-lottery").show();
    jQuery("#box-start-lottery").hide();
    jQuery("#time-poin-wrapper").hide();
    jQuery(".game-time-out").show();
    jQuery("#game-text-wrapper").hide();
    $("#point-game").text(gameRate)
    jQuery(".guess-content").remove()
    return false;

}

function youWin() {
    // jQuery("body").addClass("body-overflow");
    clearInterval(timeinterval);
    // jQuery("#you-win-wrapper").show();
    jQuery("#guess-wrapper").addClass("guess-word-time-out");
    jQuery("#wrpper-you-win").show();
    gameEnd = true;
    jQuery("#lottery-start").removeAttr("disabled");
    reloadGuessBox();

}
const faNumberConvertToEn = (phonnumber) => {
    let mobilearray = phonnumber.split(''); // empty string separator
    let number_P_E = {
        '۰': 0,
        '۱': 1,
        '۲': 2,
        '۳': 3,
        '۴': 4,
        '۵': 5,
        '۶': 6,
        '۷': 7,
        '۸': 8,
        '۹': 9
    };
    let EnArrayNumber = []
    mobilearray.map((number) => {
        if (number_P_E[number] !== undefined) {
            EnArrayNumber.push(number_P_E[number])
        } else {
            EnArrayNumber.push(number)
        }
    });
    return convertArrayToString(EnArrayNumber)
}

function reloadGuessBox() {
    charM="";
    jQuery(".char-active").each(function () {
        jQuery(this).removeClass("char-active");
    });
    jQuery(".char-success").each(function () {
        jQuery(this).removeClass("char-success");
    });
    // jQuery(".box-guess-word").each(function () {
    //     let parentid = "#" + (jQuery(this).attr("id"));
    //     // jQuery(parentid + " .guess-icon").empty();
    //     // jQuery(parentid + " .guess-icon").append(`<img src="./assets/includes/image/not-valid.png" alt="" class="img-fluid">`);
    // });
    characterSelectedList = [];
    // gameRate = 0;
    // gameEnd = true;
    // jQuery("#lottery-start").removeAttr("disabled");
    jQuery("#your-rat").text(gameRate)

}

function IsValidPhoneNumber(value) {
    return /(0|\+98)?([ ]|,|-|[()]){0,2}9[0-9]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/g.test(
        value,
    );
};

function IsValidFullName(value) {
    return /^[a-zA-Z پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/g.test(value);
}

function isEmpty() {
    jQuery("input.form-control").each(function (index) {
        if (index < 2) {
            let parent = jQuery(this).parent();
            let idParent = "#" + jQuery(parent).attr("id")
            jQuery(idParent + " .error").each(function () {
                jQuery(this).remove()
            })
            if (jQuery(this).val() == "") {
                jQuery(parent).append("<span class='error'>لطفا مقادیر را وارد کنید</span>")
                jQuery(this).addClass("error-input")
            } else {

                jQuery(idParent + " .error").remove()
                jQuery(this).removeClass("error-input")
            }
        }

    })
}

function generateAlert(messageAlert) {
    let allertTag = `<div class="row justify-content-center">
                        <div class="col-12 col-md-9">
                            <div class="alert alert-success text-center" id="box-success" role="alert">
                            ${messageAlert}
                            </div>
                        </div>
                    </div>`;
    return allertTag;
}

function generateAlertError(messageAlert) {
    let allertTag = `<div class="row justify-content-center">
                        <div class="col-12 col-md-9">
                            <div class="alert alert-danger text-center" id="box-success" role="alert">
                            ${messageAlert}
                            </div>
                        </div>
                    </div>`;
    return allertTag;
}
jQuery(document).ready(function () {
    jQuery("#mobile").keydown(function (e) {

        let key = e.key;
        let inputValue = this.value;
        let searchRegExp = new RegExp(key, 'g');
        if (isNumberByCodeScii(e.keyCode) && inputValue.length < 12) {

        } else {
            this.value = this.value.replace(searchRegExp, "")
        }
    });
    jQuery("#send-game-data").on("click", function (e) {
        e.preventDefault()
        mobileNumber = faNumberConvertToEn(jQuery("#mobile").val());
        isEmpty();
        let idParentmobile = "#" + jQuery("#mobile").parent().attr("id")
        let idParentFullName = "#" + jQuery("#fullName").parent().attr("id")
        if (jQuery("#mobile").val() != "" && jQuery("#fullName").val() != "") {
            jQuery(idParentmobile + " .error").each(function () {
                jQuery(this).remove()
            });
            jQuery(idParentFullName + " .error").each(function () {
                jQuery(this).remove()
            });

            if (jQuery("#fullName").val().length > 40) {
                jQuery(idParentFullName).append("<span class='error'>تعداد کارکتر وارد شده بیش از حد مجاز است</span>")
                jQuery("#fullName").addClass("error-input");
                return;
            }
            if (IsValidPhoneNumber(mobileNumber)) {
               
                let data = {};
                fullName = jQuery("#fullName").val();
                data.mobile =mobileNumber;
                data.fullName = jQuery("#fullName").val();
                data.gameRate = (gameRate > 60) ? 60 : gameRate;
                jQuery("#send-game-data").empty();
                jQuery("#send-game-data").append(`<span class="mr-2">درحال دریافت ...</span>
                                                <div class="spinner-border" role="status">
                                                    <span class="sr-only">...</span>
                                                </div>`);
                jQuery("#send-game-data").attr("disabled", "true");
                setTimeout(() => {
                    jQuery.ajax({
                        async: false,
                        type: "POST",
                        // url: "http://localhost:1900/api/v1/guess-words/",
                        url: "https://fampayment.iran.liara.run/api/v1/guess-words/",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            jQuery("#wrapper-success").empty();
                            if (response.success) {
                                jQuery("#send-game-data").empty();
                                jQuery("#send-game-data").append(`دریافت کد`);
                                jQuery("#wrapper-success").append(generateAlert(response.message));
                            } else {
                                jQuery("#wrapper-success").append(generateAlertError(response.message));
                                jQuery("#send-game-data").empty();
                                jQuery("#send-game-data").removeAttr("disabled");
                                jQuery("#send-game-data").append(`دریافت کد`);
                            }
                            setTimeout(() => {
                                jQuery("#fullName").val('');
                                jQuery("#mobile").val('');
                                jQuery("#box-success").fadeOut();
                                jQuery("#regester").hide();
                                jQuery("#game-gratitude-box").show();
                            }, 4000);



                        },
                        error: function (error) {
                            jQuery("#send-game-data").removeAttr("disabled");
                            jQuery("#send-game-data").empty();
                            jQuery("#send-game-data").append(`دریافت کد`);
                            jQuery("#wrapper-success").empty();
                            jQuery("#wrapper-success").append(generateAlertError("خطایی رخ داده است"));

                        }
                    });
                }, 200);

            } else {
                jQuery(idParentmobile).append("<span class='error'>شماره وارد شده اشتباه است از کارکتر های غیر انگلیسی استفاده شده است</span>")
                jQuery("#mobile").addClass("error-input");
            }
        }
    })

    jQuery("#send-dear-data").on("click", function () {
        let wordList = validWordList;
        let mobileSender = mobileNumber;
        let dearMobile = faNumberConvertToEn(jQuery("#dearMobile").val());
        let idParentmobile = "#" + jQuery("#dearMobile").parent().attr("id");

        if (jQuery("#dearMobile").val() === "") {
            if (jQuery("#dearMobile").val() == "") {
                jQuery(idParentmobile).append("<span class='error'>لطفا مقادیر را وارد کنید</span>")
                jQuery("#dearMobile").addClass("error-input");
                return;
            } else {

                jQuery(idParentmobile + " .error").remove()
                jQuery("#dearMobile").removeClass("error-input")
            }
        }

        jQuery(idParentmobile + " .error").each(function () {
            jQuery(this).remove()
        });
        if(mobileSender === ""){
            jQuery(idParentmobile).append("<span class='error'>لطفا مقادیر موبایل فرستند را وارد کنید</span>")
            return;
        }
        if (IsValidPhoneNumber(dearMobile)) {
            jQuery("#dearMobile").removeClass("error-input");
            let dataReq = {
                wordList,
                mobileSender,
                dearMobile,
                fullName,
            };
            jQuery("#send-dear-data").empty();
            jQuery("#send-dear-data").append(`<span class="mr-2">درحال دریافت ...</span>
                                                <div class="spinner-border" role="status">
                                                    <span class="sr-only">...</span>
                                                </div>`);
            jQuery("#send-dear-data").attr("disabled", "true");
            setTimeout(() => {
                jQuery.ajax({
                    async: false,
                    type: "POST",
                    // url: "http://localhost:1900/api/v1/guess-words/send-dear-message/",
                    url: "https://fampayment.iran.liara.run/api/v1/guess-words/send-dear-message/",
                    data: JSON.stringify(dataReq),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        jQuery("#wrapper-success-dear").empty();
                        if (response.success) {
                            jQuery("#send-dear-data").empty();
                            jQuery("#send-dear-data").append(`ارسال متن قدردانی`);
                            jQuery("#wrapper-success-dear").append(generateAlert(response.message));
                            setTimeout(() => {
                                jQuery("#fullName").val('');
                                jQuery("#mobile").val('');
                                jQuery("#box-success").fadeOut();
                            }, 6000);
                        } else {
                            jQuery("#wrapper-success-dear").append(generateAlertError(response.message));
                            jQuery("#send-dear-data").empty();
                            jQuery("#send-dear-data").removeAttr("disabled");
                            jQuery("#send-dear-data").append(`ارسال متن قدردانی`);
                        }



                    },
                    error: function (error) {
                        console.error("error ==> ", error);
                        jQuery("#send-dear-data").removeAttr("disabled");
                        jQuery("#send-dear-data").empty();
                        jQuery("#send-dear-data").append(`ارسال متن قدردانی`);
                        jQuery("#wrapper-success-dear").empty();
                        jQuery("#wrapper-success-dear").append(generateAlertError("خطایی رخ داده است"));

                    }
                });
            }, 200);

        } else {
            jQuery(idParentmobile).append("<span class='error'>شماره وارد شده اشتباه است</span>")
            jQuery("#dearMobile").addClass("error-input");
        }
    })

    jQuery("#reload-btn").on("click", function () {
        jQuery("#guess-wrapper").removeClass("guess-word-time-out");
        jQuery(".game-time-out").hide();
        jQuery("#game-text-wrapper").show();
        gameTime = 90;
        gameRate=0;
        minutes = (gameTime >= 60) && ((gameTime % 60) === 0) ? Math.floor(gameTime / 60) - 1 : Math.floor(gameTime / 60);
        seconds = ((gameTime % 60) === 0) ? (gameTime % 60) + 60 : gameTime % 60;
        setTimeout(timeinterval = setInterval(updateGameTime, 1000), 250);
        jQuery("#point-game").text(gameRate);
        reloadGuessBox();
        jQuery("#box-game-time-start-lottery").hide();
        jQuery("#box-start-lottery").show();
        jQuery("#time-poin-wrapper").show();
        $(".guess-content").remove();
        stepsGame = CreateGameSteps();
        createUIGuessWord(stepsGame)
    })
    // jQuery("#you-win-close").on("click", function () {
    //     jQuery("#you-win-wrapper").hide();
    //     jQuery("#guess-word-game").focus();
    //     jQuery("body").removeClass("body-overflow")
    // })
    jQuery("#lottery-start").on("click", function () {
        if (gameEnd) {
            jQuery("#game-end-points").text(gameRate)
            jQuery("#guess-word-game").hide();
            jQuery("#regester").show();
        }
    })
    jQuery("#lottery-time-out").on("click", function () {
            jQuery("#game-end-points").text(gameRate)
            jQuery("#guess-word-game").hide();
            jQuery("#regester").show();
    })
    jQuery("#start-game").on("click", function () {
        jQuery("#start-game-wapper").hide();
        jQuery("#guess-word-game").show();
        jQuery("body").addClass("body-overflow");
        jQuery("#game-guide").show();
    });
    jQuery("#accept-game-guide").on("click", function () {
        jQuery("body").removeClass("body-overflow");
        timeinterval = setInterval(updateGameTime, 1000);
        jQuery("#game-guide").hide();
        updateGameTime();
    });

    jQuery("body").delegate(".guess-char","click", function () {
        let character = jQuery(this).text();
        
        if (gameTimeChecker() && gameRate <= 60) {
            let index = characterSelectedList.indexOf(character);
                charM += character;
                if (charM.length < 5) {
                    notSetWords(charM);
                    characterSelectedList.push(character);
                    jQuery(this).addClass("char-active");
                    checkWordIsHas(stepsGame.wordsArray, characterSelectedList)
                } else {
                    notSetThisWord();
                }
        }
    });

});

jQuery("body").delegate(".not-valid-words","click" ,function(){
    charM = "";
    characterSelectedList = [];
    $(".guess-char").each(function () {
        $(this).removeClass("char-active");
    })
    $(".box-guess-word").each(function () {
        let isValid = $(this).data("valid");
        let parent = $(this).parent();
        if (!isValid) {
            $(parent).remove();
        }
    });
})

function createGuessWordNotSet(word) {
    let wordTag = ` <div class="col-12 col-md-4 py-2 not-is-valid" id='box-guess-${generatRandomNumber(10000)}'>
        <div class="box-guess-word" data-valid="false">
            <span class="guess-text">${word}</span>
            <span class="guess-icon not-valid-words">
            <img src="./assets/includes/image/not-valid.png" alt="" class="img-fluid">
            </span>
        </div>
    </div>`;
    return wordTag;
}

function notSetWords(word) {
    $(".not-is-valid").each(function () {
        this.remove();
    });
    if (word.length > 0) {
        $("#guess-word-content").append(createGuessWordNotSet(word))
    }
}

function generateRandomCharactersByWord(wordArrayObj) {

    let allCharArray = [];
    for (let i = 0; i < 4; i++) {
        let xArray = [];
        for (let j = 0; j < 4; j++) {
            xArray.push(generateRandomChar());
        }
        allCharArray.push(xArray);
    }
    wordArrayObj.forEach((item) => {

        let char = 0
        if (item.model == "skewedstart") {

            let row = item.row.start;
            let col = item.col.start;

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (j == i) {
                        allCharArray[i][j] = item.word.charAt(char)
                        col++;
                        char++;
                    }
                }
                if (i == col) {
                    row++;
                }
            }

        }
        if (item.model == "skewedend") {
            let row = item.row.start;
            let col = item.col.start;

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {

                    if (j == col) {

                        allCharArray[i][j] = item.word.charAt(char)
                        col--;
                        char++;
                    }
                }
                if (i == row) {
                    row--;
                }
            }
            console.log(item)
        }
        if (item.model == "horizontalend") {
            let row = item.row.start;
            let col = item.col.start;
            console.log("row", row)
            console.log("col", col)
            for (let i = 3; i >= 0; i--) {
                for (let j = 3; j >= 0; j--) {

                    if (j == col) {

                        allCharArray[i][j] = item.word.charAt(char);
                        console.log(`col ${col} @@ j ${j}`, j, allCharArray[i][j]);
                        char++;
                    }
                }
                if (i == row) {
                    row--;
                }
            }
            console.log(item)
        }
        if (item.model == "horizontalstart") {
            let row = item.row.start;
            let col = item.col.start;
            console.log("row", row)
            console.log("col", col)
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {

                    if (j == col) {

                        allCharArray[i][j] = item.word.charAt(char);
                        console.log(`col ${col} @@ j ${j}`, j, allCharArray[i][j]);
                        char++;
                    }
                }
                if (i == row) {
                    row--;
                }
            }
            console.log(item);
        }
        if (item.model == "verticalstart") {
            let row = item.row.end;
            let col = item.col.start;
            console.log("row", row)
            console.log("col", col)
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {

                    if (j == col && row == i) {

                        allCharArray[i][j] = item.word.charAt(char);
                        console.log(`col ${col} @@ j ${j}`, j, allCharArray[i][j]);
                        char++;
                        col++;
                    }
                }
                if (i == row) {
                    // row++;
                }
            }
            console.log(item)
        }
        if (item.model == "verticalend") {
            let row = item.row.end;
            let col = item.col.start;
            console.log("row", row)
            console.log("col", col)
            for (let i = 3; i >= 0; i--) {
                for (let j = 3; j >= 0; j--) {

                    if (j == col && row == i) {

                        allCharArray[i][j] = item.word.charAt(char);
                        console.log(`col ${col} @@ j ${j}`, j, allCharArray[i][j]);
                        char++;
                        col--;
                    }
                }
                if (i == row) {
                    // row++;
                }
            }
            console.log(item)
        }
    })
    return allCharArray;
}

function generateRandomChar() {
    var characters = '​آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی';
    let randomNumber = generatRandomNumber(34);
    if (randomNumber === 0) {
        randomNumber = randomNumber + 1;
    }
    if (randomNumber > 34) {
        randomNumber = randomNumber - 2;
    }
    return characters.charAt(randomNumber);
}
// wordNew();
