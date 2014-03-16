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


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        navigator.splashscreen.show();
        
        setTimeout(function () {
               navigator.splashscreen.hide(); }, 2000);
    }
};


function checkAnswer(answer, questionIndex) {
    //console.log("answer = " + answer);
    //console.log("question = " + questionIndex);
    var nextPage = Number(questionIndex) + 2;
    if (triviaJSON.Easy[Number(questionIndex)].answer == answer){
        alert("Correct!");
        
        var localTS = Number(localStorage.TS);
        console.log("prev TS: " + localTS);
        localStorage.TS=Number(localTS)+1;
        
        $(':mobile-pagecontainer').pagecontainer('change','#gamePage'+nextPage, {
            transition : 'flip',
            changeHash : false, 
            reverse : true,
            showLoadMsg : true,
            reload : true
        });

        
    }
    else{
        navigator.notification.vibrate(2000);
        alert("Incorrect :(");
        

        $(':mobile-pagecontainer').pagecontainer('change','#gamePage'+nextPage, {
            transition : 'flip',
            changeHash : false, 
            reverse : true,
            showLoadMsg : true,
            reload : true
        });
    }
    
    
    
}



function checkAnswerH(answer, questionIndex) {
    //console.log("answer = " + answer);
    //console.log("question = " + questionIndex);
    var nextPage = Number(questionIndex) + 2;
    if (triviaJSON.Hard[Number(questionIndex)].answer == answer){
        alert("Correct!");
        
        var localTS = Number(localStorage.TS);
        console.log("prev TS: " + localTS);
        localStorage.TS=Number(localTS)+1;
        console.log("after update TS: " +localStorage.TS);
        
        $(':mobile-pagecontainer').pagecontainer('change','#gamePageH'+nextPage, {
            transition : 'flip',
            changeHash : false, 
            reverse : true,
            showLoadMsg : true,
            reload : true
        });

        
    }
    else{
        navigator.notification.vibrate(2000);
        alert("Incorrect :(");
        

        $(':mobile-pagecontainer').pagecontainer('change','#gamePageH'+nextPage, {
            transition : 'flip',
            changeHash : false, 
            reverse : true,
            showLoadMsg : true,
            reload : true
        });
    }
    
    
    
}

var watchID = null;

function stopWatch() {
    if (watchID) 
    {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        
    }
    
}
                
function startWatch(difficulty) {
    var prevReading = { 
        x: null,
        y: null,
        z: null};
    
    
    
    watchID = navigator.accelerometer.watchAcceleration(function (acc) {
        var changes = {}, 
        bound = 0.3;
        if(prevReading.x !== null) {
            changes.x = Math.abs(prevReading.x - acc.x);
            changes.y = Math.abs(prevReading.y - acc.y);
            changes.z = Math.abs(prevReading.z - acc.z);
        }
                    
        if (changes.x > bound && changes.y > bound && changes.z > bound) {
            shaken(difficulty);   
        }
                    
        prevReading = {
            x: acc.x,
            y: acc.y,
            z: acc.z};
                    
                
    }, onError, {frequency:10000}); 
};
            
function onError() {
    alert("Accelerometer error");
}
                
function shaken(difficultySetting) {
    var response = confirm("Are you sure you want to start over?");
    
    if (response == true) {
        if (difficultySetting == 'easy') {
             $(':mobile-pagecontainer').pagecontainer('change','#newGameEasy', {
                transition : 'flip',
                changeHash : false, 
                reverse : true,
                showLoadMsg : true,
                reload : true
            });
        }
        else if (difficultySetting == 'hard') {
            $(':mobile-pagecontainer').pagecontainer('change','#newGameHard', {
                transition : 'flip',
                changeHash : false, 
                reverse : true,
                showLoadMsg : true,
                reload : true
            });
        }
        
    }
    
    
}


