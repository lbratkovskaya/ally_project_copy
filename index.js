const items = [
  {
    itemPhoto: "./assets/kitty_mat.png",
    itemTitle: "Коврик для кота",
    purchaseNumber: 25,
    price: 200,
    discountPrice: 120
  },
  {
    itemPhoto: "./assets/kitty_mat.png",
    itemTitle: "Лежанка для кота",
    purchaseNumber: 20,
    price: 200,
    discountPrice: 130
  }, {
    itemPhoto: "./assets/kitty_mat.png",
    itemTitle: "Когтеточка для кота",
    purchaseNumber: 15,
    price: 100
  },
  {
    itemPhoto: "./assets/kitty_mat.png",
    itemTitle: "Миска для кота",
    purchaseNumber: 35,
    price: 150
  },
  {
    itemPhoto: "./assets/kitty_mat.png",
    itemTitle: "Лоток для кота",
    purchaseNumber: 5,
    price: 180
  }];

const getComparator = (optionIndex) => {
  switch (optionIndex) {
    case 0:
      return (itm1, itm2) => {
        const price1 = itm1.discountPrice && itm1.discountPrice || itm1.price;
        const price2 = itm2.discountPrice && itm2.discountPrice || itm2.price;
        return price1 - price2;
      }
    case 1:
      return (itm1, itm2) => {
        const price1 = itm1.discountPrice && itm1.discountPrice || itm1.price;
        const price2 = itm2.discountPrice && itm2.discountPrice || itm2.price;
        return price2 - price1;
      }
    case 2:
      return (itm1, itm2) => {
        const purchases1 = itm1.purchaseNumber || 0;
        const purchases2 = itm2.purchaseNumber || 0;
        return purchases2 - purchases1;
      }
    case 3:
    default:
      return () => 0
  }
};

const emptyAction = () => {
  return false;
}

const fillItemCard = (item, li, index) => {
  li.querySelector(`#item-title-${index + 1}`).textContent = item.itemTitle;
  li.querySelector(`#old-price-${index + 1}`).textContent = item.discountPrice ? `$${item.price}` : null;
  li.querySelector('img').src = item.itemPhoto;
  li.querySelector(`#new-price-${index + 1}`).textContent = item.discountPrice ? `$${item.discountPrice}` : `$${item.price}`;
  li.querySelector(`#purchase-${index + 1}`).textContent = item.purchaseNumber;
  li.querySelector(`#item-price-${index + 1}`).classList.toggle('price-discounted', !!item.discountPrice);
  const buyButton = li.querySelector('.item-card-button');
  new BuyButton(buyButton, item);
}

const subscriptionSubmit = (event) => {
  event.preventDefault();
  const emailField = document.querySelector('#subscription-email');
  const processAgree = document.querySelector('#personal-data-agree');
  let withError = false;

  if (emailField.value?.length === 0) {
    document.querySelector('#subscription-email-error').textContent = 'Нужно ввести адрес электронной почты';
    withError = true;
  }
  if (!processAgree.checked) {
    document.querySelector('#subscription-email-error').textContent = 'Вы не согласились на обработку персональных данных';
    withError = true;
  }
  if (withError) {
    return;
  }
  document.querySelector('#action-alert').textContent = `Вы подписались на новости`;
  setTimeout(() => {
    document.querySelector('#action-alert').textContent = null;
    emailField.value = null;
    processAgree.checked = false;
  }, 3000);
}

const updateSort = (comboEl) => {
  const optionsList = comboEl.querySelectorAll('.combo-option');
  const optionIndex = Array.from(optionsList).findIndex((el) => el.classList.contains('option-current'));

  const ul = document.getElementById("goods-list");

  items.sort(getComparator(optionIndex)).forEach((itm, idx) => {

    fillItemCard(itm, ul.children.item(idx), idx);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelector('[role="tablist"]');
  new TabsManual(tabList);

  const chckbxEl = document.querySelector('[role="checkbox"]');
  chckbxEl.addEventListener('change', () => {
    document.querySelector('#subscription-email-error').textContent = null;
  })
  new Checkbox(chckbxEl);

  const subscrEmail = document.querySelector('#subscription-email');
  subscrEmail.addEventListener('change', () => {
    subscrEmail.classList.toggle('filled', !!subscrEmail.value);
  })
  new FieldValidation(subscrEmail, [
    {
      name: 'emailFormat',
      message: 'Не смогли распознать формат электронной почты',
    }]);

  const comboEl = document.querySelector('#sort-select');
  comboEl.addEventListener('combo-change', () => {
    updateSort(comboEl);
  });
  new Combobox(comboEl);

  document.querySelector('#subscription').addEventListener("submit", subscriptionSubmit);

  updateSort(comboEl);
});

