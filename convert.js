var http = require('http');
var url = require('url');

// server block:
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'}); // Can't properly display the degree symbol without utf-8 specified.
	var q = url.parse(req.url, true);
	var qdata = q.query;
	var full_text;

	if (qdata.full == "true") {
		full_text = true;
	} 
	else {
		full_text = false;
	}

	if (qdata.c2f) {
		res.write(convert(0,qdata.c2f,full_text));
	}
	else if (qdata.f2c) {
		res.write(convert(1,qdata.f2c,full_text));		
	}
	else if (qdata.k2c) {
		res.write(convert(2,qdata.k2c,full_text));		
	}
	else if (qdata.k2f) {
		res.write(convert(3,qdata.k2f,full_text));		
	}
	else if (qdata.c2k) {
		res.write(convert(4,qdata.c2k,full_text));		
	}
	else if (qdata.f2k) {
		res.write(convert(5,qdata.f2k,full_text));		
	}
	else {
		res.write(convert(-1,1,full_text));
	}

	res.end();

}).listen(8080, 'localhost');


function convert(type,num,full_text) {

	var result_a;
	var result_b;

	if (!isNaN(num)) {	
		switch (type) {
			case 0: // c2f
				result_a = c2f(num);
				result_b = c2k(num);
				if (full_text) {
					return num + "°C is " + result_a + "°F" + " (or " + result_b + " Kelvin).";
				}
				return result_a;
			case 1: // f2c
				result_a = f2c(num);
				result_b = c2k(result_a);
				if (full_text) {
					return num + "°F is " + result_a + "°C" + " (or " + result_b + " Kelvin).";
				}
				return result_a;
			case 2: // k2c
				result_a = k2c(num);
				result_b = c2f(result_a);
				if (full_text) {
					return num + " Kelvin is " + result_a + "°C" + " (or " + result_b + "°F ).";
				}
				return result_a;
			case 3: //k2f
				result_a = k2c(num);
				result_b = c2f(result_a);
				if (full_text) {
					return num + " Kelvin is " + result_b + "°F" + " (or " + result_a + "°C).";
				}
				return result_b;
			case 4: // c2k
				result_a = c2k(num);
				result_b = c2f(num);
				if (full_text) {
					return num + "°C is " + result_a + " Kelvin" + " (or " + result_b + "°F ).";
				}
				return result_a;
			case 5: //f2k
				result_a = f2c(num);
				result_b = c2k(result_a);
				if (full_text) {
					return num + "°F is " + result_b + " Kelvin" + " (or " + result_a + "°C).";
				}
				return result_b;
			default: // fail!
				return "Error: Not a valid conversion.";
		}
	}
	else {
		return "Error: You didn't provide a number.";
	}
}

function c2f(num) {
	var x = parseFloat((num*9/5)+32).toFixed(2);
	return x;
}

function f2c(num) {
	var x = parseFloat((num-32)*5/9).toFixed(2);
	return x;
}

function c2k(num) {
	var x = parseFloat(num);
	x = x + 273.15;
	return x.toFixed(2);
}

function k2c(num) {
	var x = parseFloat(num);
	x = x - 273.15;
	return x.toFixed(2);
}