const button = document.querySelector("#add_button");
const input_question = document.querySelector("#question_statement");
check_first_question = true;

button.addEventListener("click", () => {
    const question_statement = "Q: " + input_question.value;

    // Creating the MCQ box
    const newWindow = document.createElement("div");
    newWindow.className = "mcq-window";
    const bottom_display = document.querySelector("#bottom");
    bottom_display.appendChild(newWindow);

    //Placing the Question inside the MCQ Box
    const newQuestion = document.createElement("div");
    newQuestion.className = "question-statement";
    newQuestion.innerText = question_statement;
    newWindow.appendChild(newQuestion);

    // const question_box = document.querySelector("#question_box");
    // const newMCQinput = document.createElement("div");
    // newMCQinput.innerHTML = question_box.innerHTML;
    // newMCQinput.style.cssText = "border: red solid 1px; width: 906px";

    //Creating The Bigger MCQ Box
    const OptionsBox = document.createElement("div");
    OptionsBox.className = "options-box";
    // OptionsBox.style.cssText = 'background-color: #F2F2F2; display:flex; flex-direction: column; width: 906px; margin-left: 26px';
    newWindow.appendChild(OptionsBox);

    // Creating single MCQ boxes (in a loop)
    const mcqButtons = [];
    for (i = 1; i <= 4; i++) {
        const MCQbox = document.createElement("div");
        MCQbox.className = "mcq-box";
        // MCQbox.style.cssText = 'border: black solid 1px; display: flex; align-items: center; justify-content: center; height: 70px;';

        const MCQinput = document.createElement("input");
        // MCQinput.id = "mcq-input-" + i;
        // console.log(MCQinput.id);
        MCQinput.type = "text";
        MCQinput.placeholder = "Add Option " + i;
        MCQinput.style.fontFamily = "'Rajdhani', sans-serif";
        MCQinput.className = "mcq-input";
        // MCQinput.style.cssText = 'padding-left: 23px; flex-grow: 11.94; flex-wrap: wrap; height: 70px; font-size: 32px; align-content: center; outline: 0;';
        const newButton = document.querySelector("#add_button").cloneNode(true);
        newButton.className = "mcq-add-btn";
        mcqButtons.push(newButton);
        MCQbox.appendChild(MCQinput);
        MCQbox.appendChild(newButton);

        OptionsBox.appendChild(MCQbox);

        // Allowing Enter key press to serve the same functionality as button click for MCQ options
        MCQinput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                newButton.click();
            }
        });
    }

    //Creating radio buttons and MCQ options from inputs
    for (let i = 0; i < mcqButtons.length; i++) {
        mcqButtons[i].addEventListener("click", (event) => {
            const MCQboxselector = event.currentTarget.parentElement;
            const input = MCQboxselector.querySelector(".mcq-input");
            const value = input.value;

            MCQboxselector.remove();

            // Create a display element for the answer
            const displayOption = document.createElement("div");
            displayOption.className = "mcq-answer";
            displayOption.innerText = value;


            const answerRow = document.createElement("div");
            answerRow.className = "mcq-answer-row";

            // Creating Radio Button with each answer
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.className = "radio-button";
            radioButton.id = "radio-button-" + i;
            radioButton.name = "mcq";

            const label = document.createElement("label");
            label.htmlFor = radioButton.id;
            label.className = "radio-label-text";
            label.innerText = value;

            answerRow.appendChild(radioButton);
            answerRow.appendChild(label);

            OptionsBox.appendChild(answerRow);
        });

    }

    //Delete Button
    const deleteBox = document.createElement("button");
    deleteBox.id = "delete-box";

    const trashIcon = document.createElement("i");
    trashIcon.className = "far fa-trash-alt";
    trashIcon.id = "trash-icon";
    deleteBox.appendChild(trashIcon);

    const deleteText = document.createElement("div");
    deleteText.innerText = "Delete";
    deleteText.id = "delete-text";
    deleteText.style.fontFamily = "'Rajdhani', sans-serif";
    deleteBox.appendChild(deleteText);

    //Delete functionality
    deleteBox.addEventListener("click", () => {
        newWindow.remove();
    });

    //Edit Button
    const EditBox = document.createElement("button");
    EditBox.id = "edit-box";

    const EditIcon = document.createElement("i");
    EditIcon.className = "fa-regular fa-pen-to-square";
    EditIcon.id = "trash-icon";
    EditBox.appendChild(EditIcon);

    const EditText = document.createElement("div");
    EditText.innerText = "Edit Question";
    EditText.id = "edit-text";
    EditText.style.fontFamily = "'Rajdhani', sans-serif";
    EditBox.appendChild(EditText);

    //Creating Action Box for both delete and edit buttons
    const actionBox = document.createElement("div");
    actionBox.id = "action-box";

    actionBox.appendChild(deleteBox);
    actionBox.appendChild(EditBox);

    newWindow.appendChild(actionBox);

    // Edit functionality
    EditBox.addEventListener("click", () => {
        const EditQuestion = document.createElement("input");
        EditQuestion.type = "text";
        EditQuestion.id = "edit-question-box";
        EditQuestion.placeholder = "Enter Your New Question Statement (Press Enter while empty to keep unchanged)";

        newWindow.appendChild(EditQuestion);
        EditQuestion.focus();
        
        EditQuestion.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                if (EditQuestion.value == "")
                {
                    newWindow.removeChild(EditQuestion);
                    return;
                }
                event.preventDefault();
                newQuestion.innerText = "Q: " + EditQuestion.value;
                newWindow.removeChild(EditQuestion);
                // EditQuestion.remove();
            }
        });
    });

    //empty the question input field when the button is clicked or enter is pressed
    input_question.value = "";
});

// Allowing Enter key press to serve the same functionality as button click for Questions
input_question.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});