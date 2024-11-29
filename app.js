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
      const storageKey = `animalTable_${this.tableClass}`;
      const storedData = localStorage.getItem(storageKey);
      return storedData ? JSON.parse(storedData) : null;
  }

  saveToStorage() {
      const storageKey = `animalTable_${this.tableClass}`;
      localStorage.setItem(storageKey, JSON.stringify(this.data));
  }

  initialSort() {
      if (this.sortableFields.includes('name')) {
          this.sortBy('name');
      } else if (this.sortableFields.length > 0) {
          this.sortBy(this.sortableFields[0]);
      }
  }

  sortBy(field) {
      if (this.currentSortField === field) {
          this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
      } else {
          this.currentSortField = field;
          this.currentSortOrder = 'asc';
      }

      this.data.sort((a, b) => {
          let comparison = 0;
          if (a[field] < b[field]) comparison = -1;
          if (a[field] > b[field]) comparison = 1;
          return this.currentSortOrder === 'asc' ? comparison : -comparison;
      });

      this.render();
  }

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

  deleteAnimal(id) {
      if (confirm('Are you sure you want to delete this animal?')) {
          this.data = this.data.filter(animal => animal.id !== id);
          this.saveToStorage();
          this.render();
      }
  }

  render() {
      const table = document.createElement('div');
      table.className = `card ${this.tableClass}`;
      
      let html = `
          <div class="card-body">
              <table class="table">
                  <thead>
                      <tr>
                          <th>Image</th>
                          ${this.sortableFields.includes('name') ? 
                              `<th class="sortable" onclick="window.${this.tableClass}.sortBy('name')">Name</th>` : 
                              '<th>Name</th>'}
                          ${this.sortableFields.includes('size') ? 
                              `<th class="sortable" onclick="window.${this.tableClass}.sortBy('size')">Size</th>` : 
                              '<th>Size</th>'}
                          ${this.sortableFields.includes('location') ? 
                              `<th class="sortable" onclick="window.${this.tableClass}.sortBy('location')">Location</th>` : 
                              '<th>Location</th>'}
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
      `;

      this.data.forEach(animal => {
          html += `
              <tr>
                  <td><img src="${animal.image}" alt="${animal.name}" class="animal-image"></td>
                  <td class="name">${animal.name}</td>
                  <td>${animal.size}</td>
                  <td>${animal.location}</td>
                  <td>
                      <button class="btn btn-danger btn-sm" onclick="window.${this.tableClass}.deleteAnimal(${animal.id})">Delete</button>
                  </td>
              </tr>
          `;
      });

      html += `
                  </tbody>
              </table>
              <button class="btn btn-primary" onclick="window.${this.tableClass}.addAnimal()">Add Animal</button>
          </div>
      `;

      table.innerHTML = html;
      this.container.innerHTML = '';
      this.container.appendChild(table);
      window[this.tableClass] = this;
  }
}

// Data for tables
const bigCatsData = [
  { id: 101, name: 'Lion', size: 190, location: 'Africa', image: 'https://raw.githubusercontent.com/adityarai11/iit_bomaby/main/img/lion.jpg' },
  { id: 102, name: 'Tiger', size: 220, location: 'Asia', image: 'https://raw.githubusercontent.com/adityarai11/iit_bomaby/main/img/tiger.jpg' },
  { id: 103, name: 'Leopard', size: 150, location: 'Asia', image: 'https://raw.githubusercontent.com/adityarai11/iit_bomaby/main/img/leopard.jpg' }
];

const dogsData = [
  { id: 201, name: 'Bulldog', size: 25, location: 'Europe', image: 'https://raw.githubusercontent.com/adityarai11/iit_bomaby/main/img/bulldog.jpg' },
  { id: 202, name: 'Beagle', size: 20, location: 'North America', image: 'https://raw.githubusercontent.com/adityarai11/iit_bomaby/main/img/beagle.jpg' }
];

const bigFishData = [
  { id: 301, name: 'Shark', size: 300, location: 'Ocean', image: 'https://raw.githubusercontent.com/adityarai11/iit_bomaby/main/img/shark.jpg' },
  { id: 302, name: 'Whale', size: 200, location: 'Ocean', image: 'https://raw.githubusercontent.com/adityarai11/iit_bomaby/main/img/whale.jpg' }
];

// Initialize tables
new AnimalTable('table-1', 'table-1', bigCatsData, ['name', 'size', 'location']);
new AnimalTable('table-2', 'table-2', dogsData, ['name', 'location']);
new AnimalTable('table-3', 'table-3', bigFishData, ['size']);