var JSON_DATA_LINK = "https://shop.BullTronics.com/SrvHosting";
var JSON_ADMIN_DATA_OPERATION = "GET_ADMIN_DATA";
var JSON_DATA_UPDATE_OPERATION = "UPDATE_DATA";
var JSON_DATA_ID = "5d3f4b82d1c7ae038bb112e4";

var	pageDocument = null;

function listPortfolio() {

	var pageData = pageDocument.data;
	var elePortfolioList = document.getElementById("portfolioList");
	elePortfolioList.innerHTML = "";
	var projectCount = 0;
	if(pageData.projects != null) {
		for(projectCount = 0 ; projectCount < pageData.projects.length ; projectCount++) {
			var newElement = document.createElement("div");
			elePortfolioList.appendChild(newElement);
			newElement.className = "col-sm-3 col-md-3 col-3";
			newElement.align = "center";
				var newChildElement = document.createElement("div");
				newElement.appendChild(newChildElement);
				newChildElement.className = "card mb-4 box-shadow";
				newChildElement.innerHTML = "P" + (projectCount+1);
				newChildElement.setAttribute("onclick", "onClickCallback("+projectCount+")");
		}
	}

	var newElement = document.createElement("div");
	elePortfolioList.appendChild(newElement);
	newElement.className = "col-sm-3 col-md-3 col-3";
	newElement.align = "center";
		var newChildElement = document.createElement("div");
		newElement.appendChild(newChildElement);
		newChildElement.className = "card mb-4 box-shadow";
		newChildElement.innerHTML = "New";
		newChildElement.setAttribute("onclick", "onClickCallback("+projectCount+")");

}

function listLogs() {

	var eleAccessLogs = document.getElementById("accessLogs");	
	eleAccessLogs.innerHTML = "";
	var accessLogs = pageDocument.accessLog;
	for(var logIndex = 0 ; logIndex < accessLogs.length ; logIndex++) {
		var newElement = document.createElement("div");
		eleAccessLogs.appendChild(newElement);
		newElement.className = "";
		//newElement.align = "center";
			var newChildElement = document.createElement("div");
			newElement.appendChild(newChildElement);
			newChildElement.className = "card mb-4 box-shadow";
			newChildElement.setAttribute("style", "width:100%; padding:20px;");
			newChildElement.innerHTML = "<p>" + 
										"User IP Address: <a href='http://ip-api.com/#"+accessLogs[logIndex].userAddr+"'>" + accessLogs[logIndex].userAddr + "</a><br>"  + 
										"Operation Performed: " + accessLogs[logIndex].operation + "<br>" +
										"Access Time: " + new Date(accessLogs[logIndex].accessTime) + "<br>" +
										"Country: " + accessLogs[logIndex].country + "<br>" +
										"UserAgent: " + accessLogs[logIndex].userAgent +
										"</p>";
	}
}

function loadData() {
	if(pageDocument == null) {
		alert("Data Mismatch");
		return;
	}

	var eleInputWebsiteTitle = document.getElementById("inputWebsiteTitle");
	var eleInputWebsiteAuthor = document.getElementById("inputWebsiteAuthor");
	var eleInputWebsiteDescription = document.getElementById("inputWebsiteDescription");

	var pageData = pageDocument.data;
	eleInputWebsiteTitle.value = pageData.title;
	eleInputWebsiteAuthor.value = pageData.author;
	eleInputWebsiteDescription.value = pageData.description;

	listPortfolio();
	listLogs();

	var eleAdminPageModifyForm = document.getElementById("adminPageModifyForm");
	var eleAdminPageModifyFormLoader = document.getElementById("adminPageModifyFormLoader");

	eleAdminPageModifyForm.removeAttribute("hidden");
	eleAdminPageModifyFormLoader.setAttribute("hidden","");
}

function removePortfolio() {
	var portfolioProjects = pageDocument.data.projects;
	var elePortfolioIndex = document.getElementById("inputPortFolioIndex");
	var indexPortfolio = elePortfolioIndex.value;
	portfolioProjects.splice(indexPortfolio, 1);
	$("#portfolioModal").modal('hide');
	listPortfolio();
}

function addNewPortfolio() {
	var portfolioProjects = pageDocument.data.projects;
	portfolioProjects.push({});
	listPortfolio();
}

function onClickCallback(indexPortfolio) {
	var portfolioProjects = pageDocument.data.projects;
	if(portfolioProjects == null) {
		portfolioProjects = [];
		pageDocument.data.projects = portfolioProjects;
	}
	if( indexPortfolio >= portfolioProjects.length ) {
		addNewPortfolio();
	}
	$("#portfolioModal").modal();
	var elePortfolioTitle = document.getElementById("inputPortFolioTitle");
	var elePortfolioBrief = document.getElementById("inputPortFolioBrief");
	var elePortfolioImageLink = document.getElementById("inputPortFolioImageLink");
	var elePortfolioProjectLink = document.getElementById("inputPortFolioProjectLink");
	var elePortfolioProjectDetail = document.getElementById("inputPortFolioProjectDetail");
	var elePortfolioIndex = document.getElementById("inputPortFolioIndex");

	var portfolioProjects = pageDocument.data.projects;
	elePortfolioTitle.value = portfolioProjects[indexPortfolio].title;
	elePortfolioBrief.value = portfolioProjects[indexPortfolio].brief;
	elePortfolioImageLink.value = portfolioProjects[indexPortfolio].img;
	elePortfolioProjectLink.value = portfolioProjects[indexPortfolio].link;
	elePortfolioProjectDetail.value = portfolioProjects[indexPortfolio].detail;
	elePortfolioIndex.value = indexPortfolio;
}

function updatePortfolioData() {
	var elePortfolioTitle = document.getElementById("inputPortFolioTitle");
	var elePortfolioBrief = document.getElementById("inputPortFolioBrief");
	var elePortfolioImageLink = document.getElementById("inputPortFolioImageLink");
	var elePortfolioProjectLink = document.getElementById("inputPortFolioProjectLink");
	var elePortfolioProjectDetail = document.getElementById("inputPortFolioProjectDetail");
	var elePortfolioIndex = document.getElementById("inputPortFolioIndex");

	var indexPortfolio = elePortfolioIndex.value;
	var portfolioProjects = pageDocument.data.projects;
	portfolioProjects[indexPortfolio].title = elePortfolioTitle.value;
	portfolioProjects[indexPortfolio].brief = elePortfolioBrief.value;
	portfolioProjects[indexPortfolio].img = elePortfolioImageLink.value;
	portfolioProjects[indexPortfolio].link = elePortfolioProjectLink.value;
	portfolioProjects[indexPortfolio].detail = elePortfolioProjectDetail.value;
	$("#portfolioModal").modal('hide');
}

function initAdmin( adminKey ) {
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			var response = JSON.parse(this.responseText);
			//updatePortfolioRow();
			if(response.success == true && response.data != null) {
				pageDocument = response.data;
				$("#adminLoginModal").modal('hide');
				loadData();
			} else {
				alert("Invalid Password");
			}
		}
	}

	var hostLink = JSON_DATA_LINK+"?id="+JSON_DATA_ID+"&operation="+JSON_ADMIN_DATA_OPERATION+"&key="+adminKey;
	xhttp.open("GET", hostLink, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

/* Set Login Modal As Permanent */
$('#adminLoginModal').modal({
    backdrop: 'static',
    keyboard: false
})



function loadAdminPage() {
	var eleInputWebsitePassword = document.getElementById("inputWebsitePassword");
	var adminKey = eleInputWebsitePassword.value;
	initAdmin(adminKey);
}



function updatePageAdmin( adminKey ) {
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {

			var response = JSON.parse(this.responseText);
			if(response.success == true) {
				$("#adminUpdateConfirmationModal").modal('hide');
			} else {
				alert("Invalid Password: "+ adminKey);
			}
		}
	}

	var eleInputWebsiteTitle = document.getElementById("inputWebsiteTitle");
	var eleInputWebsiteAuthor = document.getElementById("inputWebsiteAuthor");
	var eleInputWebsiteDescription = document.getElementById("inputWebsiteDescription");
	//var eleInputWebsitePortfolio = document.getElementById("inputWebsitePortfolio");

	var pageData = pageDocument.data;
	pageData.title = eleInputWebsiteTitle.value;
	pageData.author = eleInputWebsiteAuthor.value;
	pageData.description = eleInputWebsiteDescription.value;

	var newData = encodeURIComponent( JSON.stringify(pageData) );
	var postData = "id="+JSON_DATA_ID+"&operation="+JSON_DATA_UPDATE_OPERATION+"&key="+adminKey+"&data="+newData;
	xhttp.open("POST", JSON_DATA_LINK, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(postData);
}


function updateWebsiteData() {
	var eleInputWebsiteUpdateConfirmationPassword = document.getElementById("inputWebsiteUpdateConfirmationPassword");
	var adminKey = eleInputWebsiteUpdateConfirmationPassword.value;
	updatePageAdmin(adminKey);
}

function updateWebsiteDataConfirmation() {
	$("#adminUpdateConfirmationModal").modal('show');
}

var currentToggleButton = 1;
function toggleFunction() {
	var eleToggleLink = document.getElementById("toggleLink");
	var eleAdminPageModifyForm = document.getElementById("adminPageModifyForm");
	var eleLogsListBlock = document.getElementById("logsListBlock");
	if(currentToggleButton == 1) {
		eleToggleLink.innerHTML = "Edit Portfolio";
		currentToggleButton = 2;
		eleAdminPageModifyForm.setAttribute("hidden", "");
		eleLogsListBlock.removeAttribute("hidden");
	} else {
		eleToggleLink.innerHTML = "View Logs";
		currentToggleButton = 1;
		eleLogsListBlock.setAttribute("hidden", "");
		eleAdminPageModifyForm.removeAttribute("hidden");
	}
}