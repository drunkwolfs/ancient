function getDecompressedJsonParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedParam = urlParams.get(paramName);
  if (!encodedParam) {
      console.log(`No parameter found for ${paramName}`);
      return null;
  }
  try {
      const base64Decoded = atob(encodedParam);
      const charList = base64Decoded.split('').map(c => c.charCodeAt(0));
      const byteArray = new Uint8Array(charList);
      const decompressed = pako.inflate(byteArray, { to: 'string' });
      const json = JSON.parse(decompressed);
      return json;
  } catch (e) {
      console.error(`Error processing parameter ${paramName}:`, e);
      return null;
  }
}
function modifItems(itemsArray){
for (let i = 0; i < itemsArray.length; i++) {
  itemsArray[i].push(true);
}
return itemsArray;
}

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

 function initComboBox(){ 
  var comboBox = document.getElementById('cmbTop');
      for (var i = 0; i < items.length; i++) {
        if (items[i][1] == 0){
          continue;
        }
        var option = document.createElement('option');
        option.text = items[i][0];
        option.value = option.text;
        
        comboBox.add(option);
      }
    }

function initNumberCounter(){
    $(document).ready(function() {
        $('body').on('click', '.number-minus, .number-plus', function(){
            var $row = $(this).closest('.number');
            var $input = $row.find('.number-text');
            var step = $row.data('step');
            var val = parseFloat($input.val());
            if ($(this).hasClass('number-minus')) {
                val -= step;
            } else {
                val += step;
            }
            $input.val(val);
            $input.change();
            return false;
        });
    
        $('body').on('change', '.number-text', function(){
            var $input = $(this);
            var $row = $input.closest('.number');
            var step = $row.data('step');
            var min = parseInt($row.data('min'));
            var max = parseInt($row.data('max'));
            var val = parseFloat($input.val());
            if (isNaN(val)) {
                val = step;
            } else if (min && val < min) {
                val = min;	
                //delete element from table and add to listbox
                var tr = this.parentElement.parentElement.parentElement;
                var itemId = tr.firstElementChild.textContent;
                var itemPair = [];
                for(var i =0; i<items.length; i++){
                    if(items[i][0] == itemId){
                        itemPair = items[i];
                        break;
                    }
                }
                if(itemPair.length > 0){
                    itemPair[3] = true;
                    updateComboBox();
                    tr.remove();
                }
            } else if (max && val > max) {
                val = max;	
            }
            $input.val(val);
        });
    });
}