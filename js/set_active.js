function _setActive(aObj, document_location) {
  for(i=0;i<aObj.length;i++) {
    if(document_location === aObj[i].href) {
      aObj[i].className='active';
    }

	// A url with "/blog/" should highlight that link
    if(document_location.indexOf("/blog/") !== -1 && aObj[i].href.indexOf("blog") !== -1)    {
      aObj[i].className='active';
    }
	// A url with "contact_us.html" should highlight that link even in case of extra parameters due to form submission
    if(document_location.indexOf("/contact_us.html") !== -1 && aObj[i].href.indexOf("contact_us") !== -1)    {
      aObj[i].className='active';
    }
  }
}

function setActive() {
  aObj = document.getElementById('navigation').getElementsByTagName('a');
  _setActive(aObj, document.location.href);
}

$(document).ready(function(){
	setActive();
});