class AnimalTable {
  constructor(containerId, tableClass, data, sortableFields) {
    this.container = document.getElementById(containerId);
    this.tableClass = tableClass;
    this.sortableFields = sortableFields;
    this.currentSortField = null;
    this.currentSortOrder = 'asc';
    this.data = this.loadFromStorage() || data;
    this.initialSort();
    this.render();
  }

  // ... (keep all the existing methods from the original app.js)

  addAnimal() {
    const name = prompt('Enter animal name:');
    const size = parseInt(prompt('Enter animal size (number):'), 10);
    const location = prompt('Enter animal location:');
    const image = prompt('Enter animal image URL (optional):', 'img/default.jpg') || 'img/default.jpg';

    if (!name || isNaN(size) || !location) {
      alert('All fields are required!');
      return;
    }

    if (this.data.some(animal => animal.name === name)) {
      alert('Duplicate animal name!');
      return;
    }

    this.data.push({
      id: Date.now(),
      name,
      size,
      location,
      image,
    });

    this.saveToStorage();
    this.render();
  }
}

// Data for tables
const bigCatsData = [
  { id: 101, name: 'Lion', size: 190, location: 'Africa', image: '../img/' },
  { id: 102, name: 'Tiger', size: 220, location: 'Asia', image: 'img/tiger.jpg' },
  { id: 103, name: 'Leopard', size: 150, location: 'Asia', image: 'img/leopard.jpg' },
];

const dogsData = [
  { id: 201, name: 'Bulldog', size: 25, location: 'Europe', image: 'img/bulldog.jpg' },
  { id: 202, name: 'Beagle', size: 20, location: 'North America', image: 'img/beagle.jpg' },
];

const bigFishData = [
  { id: 301, name: 'Shark', size: 300, location: 'Ocean', image: 'img/shark.jpg' },
  { id: 302, name: 'Whale', size: 200, location: 'Ocean', image: 'img/whale.jpg' },
];

// Initialize tables with sorting fields
new AnimalTable('table-1', 'table-1', bigCatsData, ['name', 'size', 'location']);
new AnimalTable('table-2', 'table-2', dogsData, ['name', 'location']);
new AnimalTable('table-3', 'table-3', bigFishData, ['size']);