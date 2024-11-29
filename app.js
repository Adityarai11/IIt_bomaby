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

  loadFromStorage() {
    const savedData = localStorage.getItem(this.tableClass);
    return savedData ? JSON.parse(savedData) : null;
  }

  saveToStorage() {
    localStorage.setItem(this.tableClass, JSON.stringify(this.data));
  }

  initialSort() {
    switch (this.tableClass) {
      case 'table-1':
        this.sortMultiple(['name', 'size', 'location']);
        break;
      case 'table-2':
        this.sortMultiple(['name', 'location']);
        break;
      case 'table-3':
        this.sort('size');
        break;
    }
  }

  sort(field) {
    if (!this.sortableFields.includes(field)) return;
    if (this.currentSortField === field) {
      this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortField = field;
      this.currentSortOrder = 'asc';
    }

    this.data.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      let comparison = 0;

      if (typeof valueA === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else {
        comparison = valueA - valueB;
      }

      return this.currentSortOrder === 'asc' ? comparison : -comparison;
    });

    this.saveToStorage();
    this.render();
  }

  sortMultiple(fields) {
    this.data.sort((a, b) => {
      for (let field of fields) {
        let comparison;
        if (typeof a[field] === 'string') {
          comparison = a[field].localeCompare(b[field]);
        } else {
          comparison = a[field] - b[field];
        }
        if (comparison !== 0) return comparison;
      }
      return 0;
    });

    this.saveToStorage();
  }

  render() {
    this.container.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${this.tableClass.replace('-', ' ').toUpperCase()}</h5>
          <button class="btn btn-primary mb-3" id="${this.tableClass}-add">Add Animal</button>
          <table class="table ${this.tableClass}">
            <thead>
              <tr>
                ${['name', 'size', 'location'].map(field => `
                  <th ${this.sortableFields.includes(field) ? `data-sort="${field}" style="cursor: pointer;"` : ''}>
                    ${field.charAt(0).toUpperCase() + field.slice(1)}
                    ${this.currentSortField === field ? (this.currentSortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
                  </th>
                `).join('')}
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.map(animal => `
                <tr data-id="${animal.id}">
                  <td class="name">${animal.name}</td>
                  <td>${animal.size}</td>
                  <td>${animal.location}</td>
                  <td><img src="${animal.image}" class="animal-image" alt="${animal.name}" /></td>
                  <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${animal.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${animal.id}">Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    document
      .getElementById(`${this.tableClass}-add`)
      .addEventListener('click', () => this.addAnimal());

    Array.from(this.container.querySelectorAll('th[data-sort]')).forEach(header => {
      header.addEventListener('click', () => this.sort(header.getAttribute('data-sort')));
    });

    Array.from(this.container.querySelectorAll('.edit-btn')).forEach(button => {
      button.addEventListener('click', () => this.editAnimal(parseInt(button.dataset.id)));
    });

    Array.from(this.container.querySelectorAll('.delete-btn')).forEach(button => {
      button.addEventListener('click', () => this.deleteAnimal(parseInt(button.dataset.id)));
    });
  }

  addAnimal() {
    const name = prompt('Enter animal name:');
    const size = parseInt(prompt('Enter animal size (number):'), 10);
    const location = prompt('Enter animal location:');
    const image = prompt('Enter animal image URL (optional):', 'default.jpg') || 'default.jpg';

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

  editAnimal(id) {
    const animal = this.data.find(animal => animal.id === id);
    if (!animal) return;

    const name = prompt('Edit animal name:', animal.name);
    const size = parseInt(prompt('Edit animal size:', animal.size), 10);
    const location = prompt('Edit animal location:', animal.location);
    const image = prompt('Edit animal image URL:', animal.image) || 'default.jpg';

    if (!name || isNaN(size) || !location) {
      alert('All fields are required!');
      return;
    }

    animal.name = name;
    animal.size = size;
    animal.location = location;
    animal.image = image;

    this.saveToStorage();
    this.render();
  }

  deleteAnimal(id) {
    this.data = this.data.filter(animal => animal.id !== id);
    this.saveToStorage();
    this.render();
  }
}

// Data for tables
const bigCatsData = [
  { id: 101, name: 'Lion', size: 190, location: 'Africa', image:  'Lion.jpg' },
  { id: 102, name: 'Tiger', size: 220, location: 'Asia', image: 'tiger.jpg' },
  { id: 103, name: 'Leopard', size: 150, location: 'Asia', image: 'leopard.jpg' },
];

const dogsData = [
  { id: 201, name: 'Bulldog', size: 25, location: 'Europe', image: 'bulldog.jpg' },
  { id: 202, name: 'Beagle', size: 20, location: 'North America', image: 'beagle.jpg' },
];

const bigFishData = [
  { id: 301, name: 'Shark', size: 300, location: 'Ocean', image: 'shark.jpg' },
  { id: 302, name: 'Whale', size: 200, location: 'Ocean', image: 'whale.jpg' },
];

// Initialize tables with sorting fields
new AnimalTable('table-1', 'table-1', bigCatsData, ['name', 'size', 'location']);
new AnimalTable('table-2', 'table-2', dogsData, ['name', 'location']);
new AnimalTable('table-3', 'table-3', bigFishData, ['size']);
