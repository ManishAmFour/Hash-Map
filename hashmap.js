class HashMap {
  constructor() {
    this.loadfactor = 0.75;
    this.capacity = 16;
    this.keyValue = new Array(this.capacity).fill(null);
    this.bucket = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    let hashCode = this.hash(key);
    this.bucket[hashCode] = value;
    this.keyValue[hashCode] = key;
    this.checking();
  }

  get(key) {
    let hashedValue = this.hash(key);
    return this.bucket[hashedValue] || null;
  }

  has(key) {
    let hashCode = this.hash(key);
    let result = false;
    this.keyValue.forEach((value, index) => {
      if (value === key) {
        result = true;
      }
    });
    return result;
  }

  remove(key) {
    let hashCode = this.hash(key);
    let value = false;
    this.bucket[hashCode] = null;
  }

  length() {
    let value = 0;
    this.bucket.forEach((entries) => {
      if (entries !== null) {
        value += 1;
      }
    });
    return value;
  }

  clear() {
    this.bucket = new Array(this.capacity).fill(null);
    this.keyValue = new Array(this.capacity).fill(null);
  }

  keys() {
    let array = [];

    this.keyValue.forEach((key, index) => {
      if (key !== null) {
        array.push(key);
      }
    });
    return array;
  }

  values() {
    let array = [];
    this.bucket.forEach((entries, index) => {
      if (entries !== null) {
        array.push(entries);
      }
    });
    return array;
  }

  entries() {
    let array = [];
    for (let i = 0; i < this.keys().length; i++) {
      array.push([this.keys()[i], this.values()[i]]);
    }

    return array;
  }

  checking() {
    if (this.length() / this.bucket.length >= this.loadfactor) {
      let oldArray = [...this.bucket];
      let addedAray = new Array(this.capacity).fill(null);
      let NewArray = oldArray.concat(addedAray);
      this.bucket = NewArray;
      this.capacity = 2 * this.capacity;
    }
  }
}

export default HashMap;
