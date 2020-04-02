var JSON_DATA_LINK = "https://BullTronics.com/Hosting";
var JSON_DATA_ID = "5d3f4b82d1c7ae038bb112e4";
var JSON_DATA_OPERATION = "GET_DATA";
var JSON_DATA_READ_KEY = "HJDYGH3UU";

var portfolioData = null;

function loadPortfolio() {

	portfolioData = null;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			// Handle response message
			portfolioData = JSON.parse(this.responseText).data;
			updatePortfolioRow();
		}
	}

	var hostLink = JSON_DATA_LINK+"/"+JSON_DATA_ID+"&action="+JSON_DATA_OPERATION+"&key="+JSON_DATA_READ_KEY;
	xhttp.open("GET", hostLink, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

function onHoverOutCallback(e) {
	e.setAttribute("style", "");
	portfolioHighliterInit();
}

function onHoverInCallback(e) {
	portfolioHighliterClose();
	e.setAttribute("style", "background-color:rgba(255,0,0,0.3);");
}

function onClickCallback(indexPortfolio) {
	$("#portfolioDetailModal").modal();
	var modal_title = document.getElementById("portfolioDetailModalTitle");
	var modal_body = document.getElementById("portfolioDetailModalBody");
	var modal_link = document.getElementById("portfolioDetailModalLink");

	var portfolioProjects = portfolioData.projects;
	modal_title.innerHTML = portfolioProjects[indexPortfolio].title;
	modal_body.innerHTML = portfolioProjects[indexPortfolio].detail;
	modal_link.href = portfolioProjects[indexPortfolio].link;

}

/* Page Title Updater */
var callbackTitleUpdater = null;
var curLenOfTitle = 0;
function updatePageTitle() {
	if( curLenOfTitle < (portfolioData.title).length ) {
		curLenOfTitle++;
		window.document.title = (portfolioData.title).substr(0, curLenOfTitle);
	} else {
		curLenOfTitle = 0;
		window.document.title = "Smart Portfolio";
	}
}
function portfolioTitleInit() {
	callbackTitleUpdater = window.setInterval(updatePageTitle, 200);
}

/* Page Portfolio Highliter */
var callbackPortfolioHighliter = null;
var curIndexOfPortfolio = -1;
function updateHighlightPortfolio() {

	var portfolioProjects = portfolioData.projects;

	if( curIndexOfPortfolio < portfolioProjects.length ) {
		curIndexOfPortfolio++;
	} else {
		curIndexOfPortfolio = 0;
	}

	var eCur = document.getElementById("rj_blk_" + curIndexOfPortfolio.toString());
	eCur.setAttribute("style", "background-color:rgba(255,0,0,0.1);");
	if(curIndexOfPortfolio == 0) {
		var ePre = document.getElementById("rj_blk_" + (portfolioProjects.length-1).toString());
		ePre.setAttribute("style", "");
	} else {
		var ePre = document.getElementById("rj_blk_" + (curIndexOfPortfolio-1).toString());
		ePre.setAttribute("style", "");
	}

}
function portfolioHighliterInit() {
	if(callbackPortfolioHighliter == null) {
		callbackPortfolioHighliter = window.setInterval(updateHighlightPortfolio, 500);
	}
}
function portfolioHighliterClose() {
	var ePre = document.getElementById("rj_blk_" + (curIndexOfPortfolio).toString());
	ePre.setAttribute("style", "");
	window.clearInterval(callbackPortfolioHighliter);
	callbackPortfolioHighliter = null;
}

/* Page Portfolio Updater */
function updatePortfolioRow() {
	var rowElement = document.getElementById("rj_portfolio_row");
	var portfolioProjects = portfolioData.projects;

	portfolioTitleInit();

	rowElement.innerHTML = "";
	for(var projectCount = 0 ; projectCount < portfolioProjects.length ; projectCount++) {
		var el_div_col = document.createElement("div");
		rowElement.appendChild(el_div_col);
		el_div_col.className = "col-lg-4";

		var el_div_col_block = document.createElement("div");
		el_div_col.appendChild(el_div_col_block);
		el_div_col_block.id = "rj_blk_" + projectCount.toString();
		el_div_col_block.align = "center";
		el_div_col_block.setAttribute("onclick", "onClickCallback("+projectCount+")");
		el_div_col_block.setAttribute("onmouseover", "onHoverInCallback(this)");
		el_div_col_block.setAttribute("onmouseout", "onHoverOutCallback(this)");
		el_div_col_block.className = "card mb-4 box-shadow";

		var el_div_col_img = document.createElement("img");
		el_div_col_block.appendChild(el_div_col_img);
		el_div_col_img.src = "img/loading.gif";
		el_div_col_img.width = "140";
		el_div_col_img.height = "140";
		el_div_col_img.setAttribute("data", portfolioProjects[projectCount].img);
		el_div_col_img.className = "img img-responsive";

		var el_div_col_body = document.createElement("div");
		el_div_col_block.appendChild(el_div_col_body);
		el_div_col_body.className = "card-body";

		var el_div_col_title = document.createElement("h2");
		el_div_col_body.appendChild(el_div_col_title);
		el_div_col_title.className = "rj_title";
		el_div_col_title.innerHTML = portfolioProjects[projectCount].title;

		var el_div_col_brief = document.createElement("p");
		el_div_col_body.appendChild(el_div_col_brief);
		el_div_col_brief.className = "card-text";
		el_div_col_brief.innerHTML = (portfolioProjects[projectCount].brief).substr(0, 50) + "...";
	}

	portfolioHighliterInit();
}

// Fill data of rj_elements
