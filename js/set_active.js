function _setActive(aObj, document_location) {
  for(i=0;i<aObj.length;i++) {
    if(document_location === aObj[i].href) {
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