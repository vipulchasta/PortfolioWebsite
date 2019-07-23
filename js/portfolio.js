var portfolioData = null;

function loadPortfolio() {

	portfolioData = null;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			portfolioData = JSON.parse(this.responseText);
			window.document.title = portfolioData.title;
			updatePortfolioRow();
                        loadFrameworkImageLinks();
		}
	}

	xhttp.open("GET", "data/data.json", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

function updatePortfolioRow() {
	var rowElement = document.getElementById("rj_portfolio_row");

	var portfolioProjects = portfolioData.projects;
	for(var projectCount = 0 ; projectCount < portfolioProjects.length ; projectCount++) {
		var el_div_col = document.createElement("div");
		el_div_col.align = "center";
		el_div_col.className = "col-lg-4";
			var el_div_col_img = document.createElement("img");
			el_div_col_img.src = "img/loading.gif";
			el_div_col_img.width = "140";
			el_div_col_img.height = "140";
			el_div_col_img.setAttribute("data", portfolioProjects[projectCount].img);
			el_div_col_img.className = "rj_img";
			var el_div_col_title = document.createElement("h2");
			el_div_col_title.className = "rj_title";
			el_div_col_title.innerHTML = portfolioProjects[projectCount].title;
			var el_div_col_brief = document.createElement("p");
			el_div_col_brief.className = "rj_brief";
			el_div_col_brief.innerHTML = portfolioProjects[projectCount].brief;
			var el_div_col_link2detail = document.createElement("p");
			el_div_col_link2detail.className = "btn btn-secondary rj_link";
				var el_div_col_link2detail_a = document.createElement("a");
				el_div_col_link2detail_a.setAttribute("style", "text-decoration: none;");
				el_div_col_link2detail_a.className = "rj_link";
				el_div_col_link2detail_a.innerHTML = "View details &raquo;";
				el_div_col_link2detail_a.href = portfolioProjects[projectCount].link;
				el_div_col_link2detail.appendChild(el_div_col_link2detail_a);
			el_div_col.appendChild(el_div_col_img);
			el_div_col.appendChild(el_div_col_title);
			el_div_col.appendChild(el_div_col_brief);
			el_div_col.appendChild(el_div_col_link2detail);
		rowElement.appendChild(el_div_col);
	}
}

loadPortfolio();

// Fill data of rj_elements
