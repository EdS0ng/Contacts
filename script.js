'use strict';

(function(ls){

  var infoObjectArray = ls.infoObjectArray ? JSON.parse(ls.infoObjectArray) : [];
  initializeList();
  var target;

  function addContact(){
    var infoObject={};
    infoObject.contactName = $('#Name').val();
    infoObject.contactPhone = $('#Phone').val();
    infoObject.contactEmail = $('#Email').val();
    infoObject.contactAddress = $('#Address').val();
    var row = createTableRow(infoObject);
    var x = $('<div>').append(row.clone()).html(); 
    infoObjectArray.push(x);
    store();
    $('tbody').prepend(row);
  }

  function createTableRow(obj){
    var row = $('#clone').clone(true,true);
    row.removeAttr('id');
    $(row.children()[1]).children().text(obj.contactName);
    $(row.children()[1]).children().attr('data-content','<ul><li>Phone: '+obj.contactPhone+'</li><li>Email: '+obj.contactEmail+'</li><li>Address: '+obj.contactAddress+'</li></ul>');
    $(row.children()[1]).children().popover({
      title: "Contact Info",
      html:true,
      trigger:"focus"
    });
    // $('[data-toggle="tooltip"]').tooltip();
    return row;

  }

  function storeIndex(e){
    target = e.target;
    console.log(target)
  }

  function edit(){
    var infoObject={};
    infoObject.contactName = $('#editName').val();
    infoObject.contactPhone = $('#editPhone').val();
    infoObject.contactEmail = $('#editEmail').val();
    infoObject.contactAddress = $('#editAddress').val();
    var row = createTableRow(infoObject);
    console.log(target);
    var ind = $(target).closest('tr').index();
    console.log(ind);
    $($(target).closest('tr')[ind]).replaceWith(row);
    var x = $('<div>').append(row.clone()).html();
    infoObjectArray[ind] = x;
    store();
  }

  function store(i){
    ls.infoObjectArray = JSON.stringify(infoObjectArray)
  }

  function remove(e){
    var ind = $(e.target).closest('tr').index();
    $($(e.target).closest('tr')[ind]).remove();
    infoObjectArray.splice(ind,1);
    store();
  }

  function initializeList(){
    infoObjectArray.forEach(function(row){
      $('tbody').prepend(row);
      $('[data-toggle="popover"]').popover({
        title: "Contact Info",
        html:true,
        trigger:"focus"
      });
      // $('[data-toggle="tooltip"]').tooltip();
    });
    $('#editInfo').click(edit);
    $('#insertInfo').click(addContact);
    $('tbody').on('click','.edit',storeIndex);
    $('tbody').on('click','.remove',remove);

  }

})(localStorage);