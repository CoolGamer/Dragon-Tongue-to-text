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
	new Snippet("GI Cover", "DOVbKiN DOVbKiN\nNaL OK ZIN LOS VbRiN\nWb DeN VOKUL MbFAERaK bST VaL\nbRK FIN NOROK PaL GRaN\nFOD NUST HON ZINDRO ZaN\nDOVbKiN Fb HIN KOGaN MU DRaL\n\nbRK FIN KEL LOST PRODb\nDO VED ViNG KO FIN KRb\nTOL FOD ZfMb WIN KeN MfZ FUNDeN\nALDUIN FfN DO JUN\nKRUZiK VOKUN STaDNAU\nVOTH aN BbLOK Wb DiVON FIN LeN"),
	new Snippet("E3 Booth", "bRK OND DRf\nSbROT\nHeMVERLUND\nMfZ NOLHE VNO\nBROM MED STRUN\nO UZNb GaR\nNbKRiN NOL\nSOVNGARDE\nNIMaR")
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