'use strict';

const STORE = { 
  items: [
    { name: 'Apple', checked: false },
    { name: 'Banana', checked: true }
  ],
  checkbox: false
};

//Functions to handle rendering the shopping-list:
function generateListItemString(item, index) {
  return `
        <li data-item-index="${index}">
            <span class="shopping-item ${item.checked ? 'shopping-item__checked' : '' }">${item.name}</span>
            <div class="shopping-item-controls">
                <button class="shopping-item-toggle">
                    <span class="button-label">check</span>
                </button>
                <button class="shopping-item-delete">
                    <span class="button-label">delete</span>
                </button>
            </div>
        </li>`;
}

function generateFullShoppingListString(shoppingList) {
  return shoppingList.map((item, index) => generateListItemString(item, index)).join('');
}

function renderShoppingList() {
  const fullItemListString = generateFullShoppingListString(STORE.items);
  $('.js-shopping-list').html(fullItemListString);
}

//Functions to handle adding a new list item:
function handleAddingNewItem() {
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    const itemName = $('.js-shopping-list-entry').val();
    event.currentTarget.reset();
    addItemToShoppingList(itemName);
    renderShoppingList();
  });
}

function addItemToShoppingList(itemName) {
  STORE.items.push({name: itemName, checked: false});
}

//Function to grab the item index:
function grabItemIndex(target) {
  return $(target).closest('li').data('itemIndex');
}

//Functions to handle checking an item on the list:
function handleCheckingListItem() {
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    const itemIndex = grabItemIndex(this);
    toggleListItemCheck(itemIndex);
    renderShoppingList();
  });
}

function toggleListItemCheck(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

//Functions to handle deleting an item on the list:
function handleDeletingListItem() {
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    const itemIndex = grabItemIndex(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteListItem(itemIndex) {
  STORE.items.splice(itemIndex,1);
}


//filter for hide checks
function hideFilter() {
  STORE.items = STORE.items.filter(item => item.checked === false);
}

//function handling the hide/display of a checked items
function handleHideCheckedItems() {
  $('.hide-checked-items').click(function(event) {
    //if hide checkbox is checked, return true
    STORE.checkbox = !STORE.checkbox;
    const filteredItems = [...STORE.items];
    //when hide checkbox returns true, filter all items that have a value of checked: true
    if(STORE.checkbox === true){
      hideFilter(filteredItems);
    }
    console.log(filteredItems);
    renderShoppingList();
  });
}


//filter for search terms
function searchFilter(userInput){
  STORE.items = STORE.items.filter(item => item.name.includes(userInput));
}

//function handling the display of all items matching a search term
function handleSearchForItems() {
  $('#js-search-list-form').submit(event => {
    event.preventDefault();
    const searchList = $('.js-search-list').val();
    searchFilter(searchList);
    renderShoppingList();
    //console.log(searchList);
    
  });
}


//function handling the ability to edit an item name
function handleEditItemName() {

}


//Main Function:
function main() {
  renderShoppingList();
  handleAddingNewItem();
  handleCheckingListItem();
  handleDeletingListItem();
  handleHideCheckedItems();
  handleSearchForItems();
  handleEditItemName();
}

$(main);