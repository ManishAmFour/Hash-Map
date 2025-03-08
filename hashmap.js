class HashMap {
  constructor(loadfactor, capacity) {
    this.loadfactor = loadfactor;
    this.capacity = capacity;
    this.keyValue = [];
    this.bucket = [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }

  set(key, value) {
    let hashCode = this.hash(key);

    let valueStored = { hashCode, value };
    if (this.bucket.length > this.loadfactor * this.capacity)
      for (let i = 0; i < this.bucket.length; i++) {
        if (this.bucket[i].hashCode === hashCode) {
          this.bucket[i].value = valueStored.value;
          /*
          this.keyValue.forEach((keys, index) => {
            if (keys[1] === hashCode) {
              keys[0] = valueStored.value;
            }
          });*/
          break;
        }

        if (this.bucket[i].hashCode === undefined) {
          this.keyValue.push([key, hashCode]);

          this.bucket[i].hashCode = valueStored.hashCode;
          this.bucket[i].value = valueStored.value;
          break;
        }
      }
  }

  get(key) {
    let hashCode = this.hash(key);
    let returnValue = null;
    this.bucket.forEach((element, index) => {
      if (hashCode === element.hashCode) {
        returnValue = element.value;
      }
    });

    return returnValue;
  }

  has(key) {
    let hashCode = this.hash(key);
    let value = false;
    this.bucket.forEach((element, index) => {
      if (hashCode === element.hashCode) {
        value = true;
      }
    });
    return value;
  }

  remove(key) {
    let hashCode = this.hash(key);
    let value = false;

    for (let i = 0; i < this.bucket.length; i++) {
      if (hashCode === this.bucket[i].hashCode) {
        this.bucket[i] = {};
        value = true;
        break;
      }
    }

    return value;
  }

  length() {
    let value = 0;
    this.bucket.forEach((entries, index) => {
      if (entries.hashCode) {
        console.log(entries.value);
        value += 1;
      }
    });
    return value;
  }

  clear() {
    for (let i = 0; i < this.bucket.length; i++) {
      this.bucket[i] = {};
    }
  }

  keys() {
    return this.keyValue;
  }

  values() {
    let array = [];
    this.bucket.forEach((entries, index) => {
      if (entries.value) {
        array.push(entries.value);
      }
    });
    return array;
  }

  entries() {
    let array = [];

    this.bucket.forEach((entries, index) => {
      if (entries.value) {
      }
    });

    return array;
  }
}

export default HashMap;
