var summ = 0;
var price = 0;
var total = 0;
var totalChange = 0
var averageChange = 0;
var maxAmount = 3;

<<<<<<< HEAD
=======
var changeAmount = [
	100,  // 10.-
	60, // 20.-
	4,	// 50.-
	0,	// 100.-
	0 // 200.-
];
>>>>>>> FETCH_HEAD

var money = [ 1, 2, 5, 10, 20, 50, 100, 200 ];
var textMoney = [ 'one', 'two', 'five', 'ten', 'twenty', 'fifty', 'hundred', 'two-hundred' ];

var changeAmount = [ 0, 0, 0, 0, 0, 0, 0, 0];
var allChange = [ 0, 0, 0, 0, 0, 0, 0, 0];

var pockets = [
<<<<<<< HEAD
    [ 1, 2, 0, 2, 0, 0, 0, 0], // 20 ou 70 0u 120
    [ 0, 0, 1, 0, 1, 0, 0, 0], // 20 ou 70 0u 120
    [ 0, 0, 0, 1, 1, 0, 0, 0], // 30 ou 80
    [ 0, 0, 0, 0, 2, 0, 0, 0], // 40 ou 90
    [ 0, 0, 0, 0, 0, 1, 0, 0], // 50
    [ 0, 0, 0, 0, 0, 1, 0, 0], // 50
    [ 0, 0, 0, 0, 0, 0, 1, 0], // 100
    [ 0, 0, 0, 0, 0, 0, 1, 0], // 100
    [ 0, 0, 0, 0, 0, 0, 0, 1], // 200
=======
	
	[2,0,0,0,0], // 10
	
	[0,1,0,0,0], // 20
	[0,1,0,0,0], // 20
	[0,1,0,0,0], // 20
	[0,1,0,0,0], // 20
	[0,1,0,0,0], // 20
	[0,1,0,0,0], // 20
	
	
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	[0,0,1,0,0], // 50
	
	[0,0,0,1,0], // 100
	[0,0,0,1,0], // 100
	
	[0,0,0,0,1], // 200
>>>>>>> FETCH_HEAD
];

var prices = [];


function getRandKeyPocket() {
    return pockets[Math.floor(Math.random() * pockets.length)];
}

function getRandAmount() {
    return 1;//Math.max(1, Math.floor(Math.random()*maxAmount));
}

function getRandKeyFromArray(array) {
    return Math.floor(Math.random() * array.length);
}

function getRandPrice() {
    return price; //prices[ getRandKeyFromArray(prices) ];
}

function getRandInput() {

    // vars
    var amount = 0;
    var change = 0;
    var pocket = getRandKeyPocket();
    var currentInputKey = 0;
    var currentInputValue = 0;

    // order tickets
    var randPrice = getRandPrice() * getRandAmount();

    for (var i in pocket) {
        amount += pocket[i] * money[ i ];
    }
    
    // do transaction
    for (var type in pocket) {
        changeAmount[type] += pocket[type];
    }

    change = amount - randPrice;
    totalChange += change;


    for (var type = money.length - 1; type >= 0; type--) {

        currentInputValue = money[ type ];

        for (var amt = changeAmount[type]; amt > 0; amt--) {

            if (currentInputValue <= change && change > 0) {

                change -= currentInputValue;
                changeAmount[ type ]--;
                allChange[type]++;
            }
        }
    }

    total += randPrice;

    if (change > 0) {
        return false;
    } else
        return true;


}

var calculate = function() {
    
    doSumm();
    
    for (var i = 0; i < 4000; i++) {
        if (!getRandInput()) {
            break;
        }
        averageChange = totalChange / i;
    }

    $('#result').html(' ');
    
    $('#result').append('<h4>SumUp:</h4>');
    $('#result').append('number of transactions: ' + i+'<br/>');
    $('#result').append('Total Sells: ' + total+'<br/>');
    $('#result').append('averageChange: ' + averageChange+'<br/>');
    
    $('#result').append('<h4>Float:</h4>');
    var ca = 0;
    for (var type in changeAmount) {
        ca += changeAmount[type] * money[ type ];
        $('#result').append( textMoney[ type ]+': ' + changeAmount[type]+'<br/>');
    }
    $('#result').append('<hr/><h4>Total: ' + ca+'</h4>');
    
    $('#result').append('<h4>What we gave to customers:</h4>');
    ca = 0;
    for (var type in allChange) {
        ca += allChange[type] * money[ type ];
        $('#result').append( textMoney[ type ]+': ' + allChange[type]+'<br/>');
    }
    $('#result').append('<hr/><h4>Total: ' + ca+'</h4>');
    
    
    console.log("number of transactions", i);
    console.log("total", total);
    console.log("ca", ca);
    console.log("averageChange", averageChange);
    console.log("changeAmount", changeAmount);
    console.log("allChange", allChange);
};

var doSumm = function() {
    
    // reset
    summ = 0;
    total = 0;
    totalChange = 0
    averageChange = 0;
    changeAmount = [ 0, 0, 0, 0, 0, 0, 0, 0];
    allChange = [ 0, 0, 0, 0, 0, 0, 0, 0];
    price = $("input[name='price']").val();
    
    for( var i in textMoney ){
        var value = ( $("input[name='"+textMoney[i]+"']").val() * money[i] );
        changeAmount[i] = value;
        summ += value;
    }
    $('#float').html( summ + ' .-');
};

var handleInputUpdate = function(){
    doSumm();
};

$(document).ready(function() {
    
    $('input').keypress(handleInputUpdate);
    $('input').change(handleInputUpdate);
    handleInputUpdate();
});
