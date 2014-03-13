/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for PhoneGap to load



document.addEventListener("deviceready", onDeviceReady, false);


var triviaJSON = {"Answers": [ {"answer":"A", "question":"Picture1", "optionA":"Sao Paulo, Brazil", "optionB":"Manado, Indonesia", "optionC":"Vladivostok, Russia", "optionD":"Istanbul, Turkey"}]};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.show();

        setTimeout( function() {
               navigator.splashscreen.hide(); }, 2000);
    }
};










function shuffleQuestions(numElement) {
    return Math.floor(Math.random() * (Number(numElement) -1 + 1));
};



function loadQuestion() {
    var element = document.getElementById('question');
    var elem = triviaJSON.Answers.length;
    var tempElem;
    
    var index = shuffleQuestions(elem);
    
    element.innerHTML = triviaJSON.Answers[index].question;
    element = document.getElementById('optionA');
    
    while (element.hasChildNodes())
        element.removeChild(element.lastChild);
    
    tempElem = document.createElement("a");
    tempElem.href="javascript:checkAnswer('A'," + index + ")";
    tempElem.innerHTML=triviaJSON.Answers[index].optionA;
    element.appendChild(tempElem);
    
    element = document.getElementById('optionB');
    while (element.hasChildNodes())
        element.removeChild(element.lastChild);
    tempElem = document.createElement("a");
    tempElem.href="javascript:checkAnswer('B'," + index + ")";
    tempElem.innerHTML=triviaJSON.Answers[index].optionB;
    element.appendChild(tempElem);
    
};

function checkAnswer(answer, questionIndex){
    console.log("answer = " + answer);
    console.log("question = " + questionIndex);
    if (triviaJSON.Answers[Number(questionIndex)].answer == answer)
        alert("Correct!");
    else
        alert("Incorrect :(");
}
