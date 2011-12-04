/*
***************************************************************
** The content of this file is released to the public domain **
***************************************************************
*/

function Snippet(name, text)
{
	this.name = name;
	this.text = text;
}

var snippets = [
	new Snippet("E3 Booth", "4RK OND DR9\nS4ROT\nH2M VERLUND\nM9Z NOL HEVNO\nBROM MED STRUN\nDO UZN4G1R\nN4KR3N NOL\nSOVNGARDE\nNIM1R"),
	new Snippet("Dragonstone", "HET NOK UN\nMAHL1N DROGGE\nER2 SUL9K SE\nALDUIN VOKR3")
 	];
	
	
$(function () {
	for (var i = 0; i < snippets.length; i++)
	{
		var button = $("<input>");
		button.attr("type", "button");
		button.val(snippets[i].name);
		
		
		(function (index) {
			button.click(function () {
				$("#dcontent").val(snippets[index].text);
				$("#dcontent").change();
			});
		})(i);
	
		button.appendTo($("#snippets"));
	
	}

});