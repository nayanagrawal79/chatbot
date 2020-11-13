// Dicitionary of questions
const questions = {
    "1": "Question 1",
    "2": "Question 2",
    "3": "Question 3",
    "4": "Question 4",
    "5": "Question 5",
    "6": "Question 6",
    "7": "Question 7",
    "8": "Question 8",
    "9": "Question 9",
    "10": "Question 10",
    "11": "Question 11",
    "12": "Question 12",
    "13": "Question 13",
    "14": "Question 14",
    "15": "Question 15"
}

// Dicitionary of answers
const answers = {}

const talk = (question_id) => {
    // Removing onfocus to prevent function call repeatedly!
    document.querySelector('#text-message').removeAttribute('onfocus');
    start(question_id);
}

const start = (question_id) => {
    if (question_id === -1) {
        messageBot(-1);
    } else {
        messageBot(question_id); 
        collectAnswer(question_id);
    }
}

// Function to compute final score
const score = () => {
    let count = 0;
    for (let i=0; i < Object.keys(answers).length; i++) {
        if (answers[i] == 1) {count += 1;}
    }
    return count;
}

const returnFinalMessage = (score) => {
    let message = "";
    if (score >= 1 && score <= 5) {
        message += "message 1";
        return message;
    } else if (score >= 6 && score <= 10) {
        message += "message 2";
        return message;
    } else {
        message += "message 3";
        return message;
    }
}

// Display message of chatbot
const messageBot = (question_id) => {
    // Creating all the elements
    let message_bot_div = document.createElement('div');
    let icon_div = document.createElement('div');
    let icon_img = document.createElement('img');
    
    // Selecting parent element
    let message = document.querySelector('.message');

    message_bot_div.classList.add('message-bot');
    message_bot_div.classList.add('animate__animated');
    message_bot_div.classList.add('animate__fadeInUp');

    message_bot_div.style.display = 'flex';
    icon_div.classList.add('icon');
    icon_img.src = "assets/images/bot.png";
    icon_img.alt = "chatbot-icon";

    // message.appendChild(message_bot_div);
    message_bot_div.appendChild(icon_div);
    icon_div.appendChild(icon_img);

    if (question_id === 1) {
        message_bot_div.appendChild(messageBotElement('Hello!'));
        message_bot_div.appendChild(messageBotElement('I am chatbot, here to help you!'));
        message_bot_div.appendChild(messageBotElement(questions[question_id]));
    } else if (question_id === -1) {
        message_bot_div.appendChild(messageBotElement('Thanks for your answers!'));
        message_bot_div.appendChild(messageBotElement(returnFinalMessage(score())));
    } else {
        message_bot_div.appendChild(messageBotElement(questions[question_id]));
    }
    
    message.appendChild(message_bot_div);
} 

const messageBotElement = (message) => {
    // Creates the single text message element for chatbot
    let message_area = document.createElement('p');
    let message_content = document.createTextNode(message);

    message_area.classList.add('message-area');
    message_area.classList.add('animate__animated');
    message_area.classList.add('animate__fadeInUp');

    message_area.appendChild(message_content);
    return message_area;
}

const collectAnswer = (question_id) => {
    let answer = document.querySelector('.answer');
    answer.style.display = 'flex';

    document.querySelector('.yes').onclick = () => {
        answers[question_id] = 1;
        userAnswer('Yes!');
        document.querySelector('.answer').style.display = 'none';
        start(returnNextQuestion_id(question_id, 1)); // return 2 as question id
    };

    document.querySelector('.no').onclick = () => {
        answers[question_id] = 0;
        userAnswer('No!');
        document.querySelector('.answer').style.display = 'none';
        start(returnNextQuestion_id(question_id, 0));
    };
}

// Display user answer
const userAnswer = (result) => {
    // Creating all required elements
    let message_user_div = document.createElement('div');
    let user_icon_div = document.createElement('div');
    let icon_img = document.createElement('img');
    let message_area = document.createElement('p');
    let message_content = document.createTextNode(result);
    
    // Selecting the parent element
    let message = document.querySelector('.message');

    message_user_div.classList.add('message-user');
    message_user_div.classList.add('animate__animated');
    message_user_div.classList.add('animate__fadeInUp');

    user_icon_div.classList.add('chatbot-icon');
    user_icon_div.classList.add('animate__animated');
    user_icon_div.classList.add('animate__fadeInUp');

    icon_img.src = "assets/images/user.png";
    icon_img.alt = "user-icon";
    
    message_user_div.appendChild(user_icon_div);
    user_icon_div.appendChild(icon_img);
    message_user_div.style.display = 'flex';
    message_area.classList.add('message-area');
    message_area.classList.add('animate__animated');
    message_area.classList.add('animate__fadeInUp');

    message_area.appendChild(message_content);
    message_user_div.appendChild(message_area);
    message.appendChild(message_user_div);
}

// Function to return question id
const returnNextQuestion_id = (question__id, result) => {
    switch (question__id) {
        case 1:
            return 2;

        case 2:
            return 3;
        
        case 3:
            return 4;

        case 4:
            return 5;

        case 5:
            if (result) {
                return 6;
            } else {
                return 7;
            }

        case 6:
            return 7;

        case 7:
            return 8;

        case 8:
            if (result) {
                return 9;
            } else {
                return 10;
            }

        case 9:
            return 10;

        case 10:
            return 11;

        case 11:
            return 12;

        case 12:
            return 13;

        case 13:
            return 14;

        case 14:
            return 15;

        default:
            return -1;
    }
}
