var urls;

urls = {
  data: [
    "https://image.shutterstock.com/image-photo/enduro-motorcycle-traveler-alone-under-260nw-1968431686.jpg",
    "https://image.shutterstock.com/image-photo/commercial-airplane-jetliner-flying-above-260nw-1930812065.jpg",
    "https://image.shutterstock.com/image-photo/overhead-view-travelers-accessories-essential-260nw-425996818.jpg",
  ],
  currentIndex: 0,
  getCurrent: function () {
    return this.data[this.currentIndex];
  },
  hasNext: function () {
    return this.currentIndex < this.data.length - 1;
  },
  hasPrevious: function () {
    return this.currentIndex > 0;
  },
  hasCurrent: function () {
    return this.getCurrent() !== undefined;
  },
  selectNext: function () {
    this.currentIndex++;
  },
  selectPrevious: function () {
    this.currentIndex--;
  },
  selectFirst: function () {
    this.currentIndex = 0;
  },
  selectLast: function () {
    this.currentIndex = this.data.length - 1;
  },
};

document.getElementById("next").addEventListener("click", (event) => {
  urls.selectNext();
  if (urls.hasCurrent()) {
  } else {
    urls.selectFirst();
  }
  with (document.getElementById("current_image")) {
    setAttribute("src", urls.getCurrent());
  }
});
document.getElementById("previous").addEventListener("click", (event) => {
  urls.selectPrevious();
  with (document.getElementById("current_image")) {
    setAttribute("src", urls.getCurrent());
  }
});

var list;

function list_hasCurrent(aList) {
  return aList.currentIndex >= 0 && aList.currentIndex < aList.data.length;
}

function list_getCurrent(aList) {
  return aList.data[aList.currentIndex];
}

function list_getNextIndex(aList) {
  return aList.currentIndex < aList.data.length
    ? aList.currentIndex + 1
    : aList.data.length;
}

list = { currentIndex: 0, data: ["a", "b", "c"] };
while (list_hasCurrent(list)) {
  if (--window.LoopTrap <= 0) throw "Infinite loop.";
  let selectedElement = document.querySelector("#list");
  let new_li = document.createElement("li");
  new_li.innerText = list_getCurrent(list);

  new_li.addEventListener("click", (event) => {
    let new_button = document.createElement("button");
    new_button.innerText = list_getCurrent(list);

    new_li.appendChild(new_button);
  });
  selectedElement.appendChild(new_li);
  list.currentIndex = list_getNextIndex(list);
}
