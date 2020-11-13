// Dicitionary of questions
const questions = {
    "1": "Does your partner make you nervous and/ or afraid?",
    "2": "Are you more likely to be quiet since you had a partner?",
    "3": "Does your partner tend to be more dominant in your relationship?",
    "4": "Has your partner ever forced you to do something according to their wishes and / or threatened you when you refused to do something based on their wishes?",
    "5": "Did your partner physically abuse you? Like hitting, kicking.",
    "6": "Did your partner's physical abuse make it difficult for you to do activities or has caused you serious injury? ",
    "7": "Has your partner been verbally abusive to you / called you derogatory names?",
    "8": "Has your partner ever threatened to share your private photos and / or other private  documents?",
    "9": "Has your partner ever distributed your personal documents (photos, videos, etc.) to other parties without your consent?",
    "10": "Does your partner check on you often? (listening to your phone calls, checking the mileage in your car, calling your phone repeatedly when you’re not around).",
    "11": "Does your partner restrict you from the things you want to do? (example: going out with friends, going to meetings) ",
    "12": "Does your partner force you to do something embarrassing or humiliating (eg, forcing you to apologize, having to ask permission to use the car or to do something).",
    "13": "Does your partner say they will deny it, if you tell someone that your partner hurt you?",
    "14": "Does your partner often use you as the reason for conflicts?",
    "15": "Do you have a fear of losing control of your body, mind, and future?"
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
        message += "Your relationship has a low risk of becoming abusive. However, risks are still risks that must be prevented and minimized. The following are some articles in the laws and regulations in Indonesia as your guide in preventing these risks: If your partner is forcing and threatening you to do something: Article 335 Paragraph (1) of the Criminal Code. If your partner perform physical and / or psychological abuse against you: Article 352 Paragraph (2) Criminal Code; clause 22 Article 351 of the Criminal Code; Article 1365 of the Civil Code Threatens and / or has spread your personal content(s): Article 369 of the Criminal Code; Article 27 Paragraph (1) Article 45 Paragraph (1) Law Number 16 Year 2016 In addition, violent relationships can increase your risk of experiencing anxiety, depression, and various other psychological disorders. If you find that any of the following has happened to you, don't hesitate to seek help. You can contact the BullyId App team for further psychological counseling and / or legal assistance. ";
        return message;
    } else if (score >= 6 && score <= 10) {
        message += "Your relationship has a moderate risk of becoming abusive which must be prevented and minimized. The following are some articles in the laws and regulations in Indonesia as your guide in preventing these risks: If your partner is forcing and threatening you to do something: Article 335 Paragraph (1) of the Criminal Code. If your partner perform physical and / or psychological abuse against you: Article 352 Paragraph (2) Criminal Code; clause 22 Article 351 of the Criminal Code; Article 1365 of the Civil Code Threatens and / or has spread your personal content(s): Article 369 of the Criminal Code; Article 27 Paragraph (1) Article 45 Paragraph (1) Law Number 16 Year 2016 In addition, violent relationships can increase your risk of experiencing anxiety, depression, and various other psychological disorders. If you find that any of the following has happened to you, don't hesitate to seek help. You can contact the BullyId App team for further psychological counseling and / or legal assistance.";
        return message;
    } else {
        message += "Your relationship has a high risk of becoming abusive which must be prevented and followed up immediately because it has the potential to harm you physically and psychologically. Here are some articles in the laws and regulations in Indonesia as your guide in overcoming these risks: If your partner is forcing and threatening you to do something: Article 335 Paragraph (1) of the Criminal Code. If your partner perform physical and / or psychological abuse against you: Article 352 Paragraph (2) Criminal Code; clause 22 Article 351 of the Criminal Code; Article 1365 of the Civil Code Threatens and / or has spread your personal content(s): Article 369 of the Criminal Code; Article 27 Paragraph (1) Article 45 Paragraph (1) Law Number 16 Year 2016. In addition, violent relationships can increase your risk of experiencing anxiety, depression, and various other psychological disorders. For further action, you can contact the BullyId App team for psychological counseling and / or legal assistance.";
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
