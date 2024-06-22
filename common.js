function beforeLoadPage(){
    var hiddenInput = document.querySelector('.number-text');
    var customInput = document.querySelector('.number');
    var computedStyle = window.getComputedStyle(hiddenInput);
    var backgroundColor = computedStyle.backgroundColor;
    customInput.style.backgroundColor = backgroundColor;
}

function addNumberInput(){
    console.log('addNumberInput');
    var itemPos = document.getElementById('cmbTop').value;
    var itemPair = [];
    for(var i =0; i<items.length; i++){
      if(items[i][0] == itemPos){
        itemPair = items[i];
        break;
      }
    }
    if(itemPair.length > 0){
      itemPair[3] = false;
      updateComboBox();

      var tableRef = document.getElementById("elements");
      var newRow = tableRef.insertRow();
      var newCell = newRow.insertCell();
      var newCell2 = newRow.insertCell();
      var newText = document.createTextNode(itemPair[0]);
      var clone = document.querySelector('#hide-counter .number').cloneNode(true);
      clone.setAttribute('data-max', itemPair[1]);
      newCell.appendChild(newText);
      newCell2.appendChild(clone);
    }
  }

  function updateComboBox(){
    comboBox = document.getElementById('cmbTop');
    for (var i = 0; i < items.length; i++) {
      if (items[i][1] == 0){
        continue;
      }
      const optionToStyle = comboBox.querySelector(`option[value="`+items[i][0]+`"]`); 
      console.log(optionToStyle);
      if(items[i][3]){
        optionToStyle.style.display = 'block';
      }else {
        optionToStyle.style.display = 'none';
      }
    }
    for (var i = 0; i < comboBox.options.length; i++) {
    if(comboBox.options[i].style.display == 'block')
    {
    comboBox.selectedIndex = i;
    break;
    }
   else if(i == comboBox.options.length-1){
   comboBox.selectedIndex = -1;
   }
    }
  }