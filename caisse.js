var changeValue = [
	10,
	20,
	50,
	100,
	200
];

var changeAmount = [
	100,  // 10.-
	60, // 20.-
	4,	// 50.-
	0,	// 100.-
	0 // 200.-
];


var allChange = [
	0,
	0,
	0,
	0,
	0
];

var inputValue = [
	10,
	20,
	50,
	100,
	200
];

var prices = [
	20
];

var pockets = [
	
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
];

var total = 0;

var totalChange = 0
var averageChange = 0;

var maxAmount = 3;

function getRandKeyPocket(){
	return pockets[Math.floor(Math.random()*pockets.length)];
}

function getRandAmount(){
	return 1;//Math.max(1, Math.floor(Math.random()*maxAmount));
}

function getRandKeyFromArray( array ){
	return Math.floor(Math.random()*array.length);
}

function getRandPrice(){
	return prices[ getRandKeyFromArray( prices ) ];
}

function getRandInput(){
	
	// vars
	var amount = 0;
	var change = 0;
	var pocket = getRandKeyPocket();
	var currentInputKey = 0;
	var currentInputValue = 0;
	
	// order tickets
	var randPrice = getRandPrice() * getRandAmount();
	
	for( var i in pocket ){
		amount += pocket[i] * inputValue[ i ];
	}
	
	/*
	// check your pocket
	while( amount <  randPrice ){
		currentInputKey = getRandKeyFromArray( inputValue );
		currentInputValue = inputValue[ currentInputKey ];
		amount += currentInputValue;
		pocket[ currentInputKey ]++;
		
	}
	
	// kleveriz your hand
	if( ( randPrice + inputValue[0] ) < amount ){
		change = amount - randPrice;
		for( var type in pocket ){
			if( pocket[type] > 0 ){
				
				currentInputValue = inputValue[ type ];
				
				for( var i = pocket[type]; i > 0; i-- ){
					if( currentInputValue > change ){ 
						break;
					}else{
						change -= currentInputValue;
						amount -= currentInputValue;
						pocket[ type ]--;
					}
				}
			}
		}
	}
	*/
	
	// do transaction
	for( var type in pocket ){
		changeAmount[type] += pocket[type];
	}
	
	change = amount - randPrice;
	totalChange += change;
	
	
	for( var type = inputValue.length - 1; type >= 0; type-- ){
		
		currentInputValue = inputValue[ type ];
		
		for( var amt = changeAmount[type]; amt > 0; amt-- ){
			
			if( currentInputValue <= change && change > 0 ){
				
				change -= currentInputValue;
				changeAmount[ type ]--;
				allChange[type]++;
			}
		}
	}
	
	total += randPrice;
	
	if( change > 0 ){
		/*console.log("price",randPrice);
		console.log("amount",amount);
		console.log("pocket",pocket);
		console.log("change",change);
		console.log("changeAmount",changeAmount);
		console.log("allChange",allChange);*/
		return false;
	}else return true;
	
	
}

for( var i = 0; i < 4000; i++ ){
	if( !getRandInput() ){
		//alert( "error at: " + i );
		break;
	}
	averageChange = totalChange / i;
}

var ca = 0;
for( var type in changeAmount ){
	ca += changeAmount[type] * inputValue[ type ];
}

console.log("number of transactions",i);
console.log("total",total);
console.log("ca",ca);
console.log("averageChange",averageChange);
console.log("changeAmount",changeAmount);
console.log("allChange",allChange);
