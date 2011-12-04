/*
***************************************************************
** The content of this file is released to the public domain **
***************************************************************
*/

function Char(normal, symbol)
{
	if (symbol == undefined)
		symbol = normal;

	this.symbol = symbol;
	this.normal = normal;
}

//Taken from: http://www.gameinformer.com/b/news/archive/2011/01/06/translating-the-cover.aspx
var symbols = [];


	symbols.push(new Char("?", "0"));
	symbols.push(new Char("aa", "1"));
	symbols.push(new Char("ei", "2"));
	symbols.push(new Char("ii", "3"));
	symbols.push(new Char("ah", "4"));
	symbols.push(new Char("uu", "5"));
	symbols.push(new Char("?", "6"));
	symbols.push(new Char("ir", "7"));
	symbols.push(new Char("oo", "8"));
	symbols.push(new Char("ey", "9"));


for (var i = 65; i<=90; i++) {
	if (i == 67)
		continue;
	symbols.push(new Char(String.fromCharCode(i)));

}


function addTextToTextarea(textarea, newtext)
{
	var dom = textarea[0];
	var text = textarea.val();
	
	if (dom.setSelectionRange)
	{
		//Inserts characters at the cursor
		var left = text.substr(0, dom.selectionEnd);
		var right = text.substr(dom.selectionEnd);
		var sel = dom.selectionEnd + newtext.length;
		
		textarea.val(left + newtext + right);
		
		dom.setSelectionRange(sel, sel);
	}
	else
	{
		//Inserts character always at the end
		textarea.val(text + newtext);
	}

	dom.focus();
}

function translateWord(word)
{
	word = word.toLowerCase();
	var result = dict[word];
	if (result == undefined)
	{
		if (word.substr(0, 2) == "vo")
		{
			var result2 = translateWord(word.substr(2))
			if (result2.replace("-", "") != word.toUpperCase())
				return "(opposite of " + result2 + ")";
		}
		
		for (var i = word.length - 2; i > 1; i--)
		{
			var p1 = word.substr(0, i);
			var p2 = word.substr(i);
			var result3 = translateWord(p1);
			if (result3.replace("-", "") != p1.toUpperCase()) {
				var result4 = result3 + "-" + translateWord(p2);
				if (result4.match(/[A-Z]+-[A-Z]+/) === null)
					return result4;
			}
		}
	
		return word.toUpperCase();
	}

	return result;
}


$(function () {

	var buttonsdiv = $("#buttons");
	
	var tupdatehandler = function () {
		var text = $("#tcontent").val();
		var lines = text.split(/\r?\n/);
		var result = "";
		
		for (var i = 0; i < lines.length; i++)
		{
			var words = lines[i].split(" ");
			for (var j = 0; j < words.length; j++)
			{
				result += translateWord(words[j]) + " ";
			}
			result += "\n";
		}
		$("#econtent").val(result);
	}
	
	var dupdatehandler = function () {
		var text = $("#dcontent").val();
		var newtext = "";
		for (var i = 0; i < text.length; i++)
		{
			var c = text.charAt(i);
			for (var j = 0; j < symbols.length; j++)
			{
				if (symbols[j].symbol == c)
				{
					c = symbols[j].normal;
				
					break;
				}
			}
			newtext += c;
		}
		$("#tcontent").val(newtext);
		tupdatehandler();
	}
	
	
	var clickhandler = function (event) {
		var val = event.target.value;
		addTextToTextarea($("#dcontent"), val);
		dupdatehandler();
	};	
	
	for (var i = 0; i < symbols.length; i++)
	{
		if (i != 0 &&(i % 12) == 0)
			$("<br>").appendTo(buttonsdiv);
		
		
		var input = $("<input>");
		input.attr("type", "button");
		input.attr("class", "b dragon");
		input.attr("title", symbols[i].normal);
		input.val(symbols[i].symbol);
		input.click(clickhandler);
		
		input.appendTo(buttonsdiv);
	}
	
	$("#dcontent").change(dupdatehandler);
	$("#dcontent").keyup(dupdatehandler);

});