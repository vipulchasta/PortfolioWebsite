var JSON_DATA_LINK = "https://api.jsonbin.io/b/5d387aa271e1da4952dc741b";
var portfolioData = null;

function loadPortfolio() {

	portfolioData = null;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			portfolioData = JSON.parse(this.responseText);
			window.document.title = portfolioData.title;
			updatePortfolioRow();
		}
	}

	xhttp.open("GET", JSON_DATA_LINK, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

function onHoverOutCallback(e) {
	e.setAttribute("style", "");
}

function onHoverInCallback(e) {
	e.setAttribute("style", "background-color:rgba(255,0,0,0.3);");
}

function onClickCallback(indexPortfolio) {
	$("#exampleModalCenter").modal();
	var modal_title = document.getElementById("exampleModalTitle");
	var modal_body = document.getElementById("exampleModalBody");
	var modal_link = document.getElementById("exampleModalLink");

	var portfolioProjects = portfolioData.projects;
	modal_title.innerHTML = portfolioProjects[indexPortfolio].title;
	modal_body.innerHTML = portfolioProjects[indexPortfolio].detail;
	modal_link.href = portfolioProjects[indexPortfolio].link;

}

function updatePortfolioRow() {
	var rowElement = document.getElementById("rj_portfolio_row");

	var portfolioProjects = portfolioData.projects;

	rowElement.innerHTML = "";
	for(var projectCount = 0 ; projectCount < portfolioProjects.length ; projectCount++) {
		var el_div_col = document.createElement("div");
		el_div_col.className = "col-lg-4";
			var el_div_col_block = document.createElement("div");
			el_div_col_block.align = "center";
			el_div_col_block.setAttribute("onclick", "onClickCallback("+projectCount+")");
			el_div_col_block.setAttribute("onmouseover", "onHoverInCallback(this)");
			el_div_col_block.setAttribute("onmouseout", "onHoverOutCallback(this)");
			el_div_col_block.className = "card mb-4 box-shadow";
				var el_div_col_img = document.createElement("img");
				el_div_col_img.src = "/img/loading.gif";
				el_div_col_img.width = "140";
				el_div_col_img.height = "140";
				el_div_col_img.setAttribute("data", portfolioProjects[projectCount].img);
				el_div_col_img.className = "img img-responsive";

				var el_div_col_body = document.createElement("div");
				el_div_col_body.className = "card-body";

					var el_div_col_title = document.createElement("h2");
					el_div_col_title.className = "rj_title";
					el_div_col_title.innerHTML = portfolioProjects[projectCount].title;
					var el_div_col_brief = document.createElement("p");
					el_div_col_brief.className = "card-text";
					el_div_col_brief.innerHTML = (portfolioProjects[projectCount].brief).substr(0, 50) + "...";
					
					el_div_col_body.appendChild(el_div_col_title);
					el_div_col_body.appendChild(el_div_col_brief);

				el_div_col_block.appendChild(el_div_col_img);
				el_div_col_block.appendChild(el_div_col_body);
		el_div_col.appendChild(el_div_col_block);
		rowElement.appendChild(el_div_col);
	}
}

loadPortfolio();

// Fill data of rj_elements
