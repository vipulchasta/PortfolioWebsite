var frameworkLoadCallback = null;
var frameworkLastPageModifiedTime = null;

function loadFrameworkImageLinks() {
	
	var imageElements = document.getElementsByClassName("rj_img");
	
	for( var imageElementsIndex = 0 ; imageElementsIndex < imageElements.length ; imageElementsIndex++ ) {
		
		var currentSrcValue = imageElements[ imageElementsIndex ].src;
		var currentDataAttributeValue = imageElements[ imageElementsIndex ].getAttribute("data");
		var frameworkFinalImageLink = currentDataAttributeValue;
		
		if( currentDataAttributeValue != null ) {
			imageElements[ imageElementsIndex ].src = frameworkFinalImageLink;
		}
	}
}

function loadFramework() {
	
	if( (frameworkLastPageModifiedTime == null) || (frameworkLastPageModifiedTime != document.lastModified) ) {

		loadFrameworkImageLinks();

		frameworkLastPageModifiedTime = document.lastModified;
		
	}
}


window.onload = loadFramework();

frameworkLoadCallback = setInterval(loadFramework, 500);



function loadFrameworkTitleLinks() {
	
	var imageElements = document.getElementsByClassName("rj_img");
	
	for( var imageElementsIndex = 0 ; imageElementsIndex < imageElements.length ; imageElementsIndex++ ) {
		
		var currentSrcValue = imageElements[ imageElementsIndex ].src;
		var currentDataAttributeValue = imageElements[ imageElementsIndex ].getAttribute("data");
		var frameworkFinalImageLink = currentDataAttributeValue;
		
		if( currentDataAttributeValue != null ) {
			imageElements[ imageElementsIndex ].src = frameworkFinalImageLink;
		}
	}

	var titleElements = document.getElementsByClassName("rj_title");
	
	for( var imageElementsIndex = 0 ; imageElementsIndex < imageElements.length ; imageElementsIndex++ ) {
		
		var currentSrcValue = imageElements[ imageElementsIndex ].src;
		var currentDataAttributeValue = imageElements[ imageElementsIndex ].getAttribute("data");
		var frameworkFinalImageLink = currentDataAttributeValue;
		
		if( currentDataAttributeValue != null ) {
			imageElements[ imageElementsIndex ].src = frameworkFinalImageLink;
		}
	}
}
