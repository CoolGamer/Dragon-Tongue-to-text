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
var symbols = [new Char("A"), new Char("aa", "a"), new Char("ah", "b"), new Char("B"), new Char("D"), new Char("E", "E"), new Char("ei", "e"), new Char("ey", "f"), new Char("F"), new Char("G"),
	new Char("H"), new Char("I"), new Char("ii", "i"), new Char("J"), new Char("K"), new Char("L"), new Char("M"), new Char("N"), new Char("O"), new Char("P"), new Char("R"), new Char("S"), new Char("T"),
	new Char("U"), new Char("V"), new Char("W"), new Char("Z")];

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
	var result = dict[word.toLowerCase()];
	if (result == undefined)
		return word.toUpperCase();

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
		if (i != 0 &&(i % 14) == 0)
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