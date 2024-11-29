# Animal Tables Management System

## Overview
Animal Tables is a dynamic web application that provides an interactive interface for managing different categories of animals (Big Cats, Dogs, and Big Fish) with features like sorting, editing, and persistent storage.

## 🚀 Features
- **Multiple Table Management**: Handles three distinct animal categories
  - Big Cats (Lions, Tigers, Leopards)
  - Dogs (Bulldogs, Beagles)
  - Big Fish (Sharks, Whales)
- **Dynamic Sorting**:
  - Table 1: Sort by name, size, and location
  - Table 2: Sort by name and location
  - Table 3: Sort by size
- **CRUD Operations**:
  - Add new animals with details
  - Edit existing animal information
  - Delete animal entries
- **Interactive UI Elements**:
  - Hoverable image previews with zoom effect
  - Sortable column headers
  - Responsive Bootstrap-based design
- **Local Storage**: Persistent data storage across browser sessions

## 🛠️ Implementation Details

### Core Components
1. **AnimalTable Class**:
   - Constructor initializes table with specific data and sorting capabilities
   - Handles data management and UI rendering
   - Implements sorting algorithms for single and multiple fields

2. **Data Structure**:
```javascript
{
  id: number,
  name: string,
  size: number,
  location: string,
  image: string
}