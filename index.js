(function() {
    window._ = {
        chunk: function(arr, len) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }
            if (
                typeof len !== 'number' ||
                isNaN(len) ||
                Math.floor(len) !== len
            ) {
                throw new Error('You entered not the length of the array!');
            }
            if (len === 0) {
                return arr;
            }

            const resultArr = [];
            let chunksArr = [];

            let countOfElement = 0,
                countLengthArray = 0;

            for (let i = 0; i <= arr.length; i++) {
                arr.length !== i
                    ? (chunksArr[countOfElement] = arr[i])
                    : (resultArr[countLengthArray] = chunksArr);
                countOfElement++;

                if (countOfElement === len) {
                    resultArr[countLengthArray] = chunksArr;
                    countOfElement = 0;
                    countLengthArray++;
                    chunksArr = [];
                }
            }

            return resultArr;
        },

        compact: function(arr) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }

            let resultArr = [];
            let countOfNumber = 0;

            for (let i = 0; i < arr.length; i++) {
                if (!!arr[i]) {
                    resultArr[countOfNumber] = arr[i];
                    countOfNumber++;
                }
            }

            return resultArr;
        },

        drop: function(arr, num = 1) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }

            if (typeof num !== 'number' || isNaN(num)) {
                throw new Error(
                    'You entered not the length of the array (you need to enter a number!)'
                );
            }

            if (num === 0) {
                return arr;
            }

            const resultArr = [];

            for (let i = num; i < arr.length; i++) {
                resultArr[resultArr.length] = arr[i];
            }

            return resultArr;
        },

        dropWhile: function(arr, func) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }

            if (typeof func !== 'function') {
                throw new Error('You entered not a function!');
            }

            for (let i = 0; i < arr.length; i++) {
                if (!func(arr[i], i, arr)) {
                    return drop(arr, i);
                }
            }

            return [];
        },

        take: function(arr, num = 1) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }

            if (typeof num !== 'number' || isNaN(num)) {
                throw new Error(
                    'You entered not the length of the array (you need to enter a number!)'
                );
            }

            if (num === 0) {
                return [];
            }

            let resultArr = [];
            let countOfElement = 0;

            for (let i = 0; i < num && i < arr.length; i++) {
                resultArr[countOfElement] = arr[i];
                countOfElement++;
            }

            return resultArr;
        },

        filter: function(arr, func) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }
            if (typeof func !== 'function') {
                throw new Error('You entered not a function!');
            }

            let resultArr = [];
            let count = 0;

            for (let i = 0; i < arr.length; i++) {
                if (func(arr[i])) {
                    resultArr[count] = arr[i];
                    count++;
                }
            }

            return resultArr;
        },

        find: function(arr, func, index = 0) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }
            if (typeof func !== 'function') {
                throw new Error('You entered not a function!');
            }

            for (let i = index; i < arr.length; i++) {
                if (func(arr[i])) {
                    return arr[i];
                }
            }
        },

        includes: function(arr, value, index = 0) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }

            const startIndex = index < 0 ? arr.length - Math.abs(index) : index;

            for (let i = startIndex < 0 ? 0 : startIndex; i < arr.length; i++) {
                if (arr[i] === value) {
                    return true;
                }
            }

            return false;
        },

        map: function(arr, func) {
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }
            if (typeof func !== 'function') {
                throw new Error('You entered not a function!');
            }

            let resultArr = [];

            for (let i = 0; i < arr.length; i++) {
                resultArr[i] = func(arr[i]);
            }

            return resultArr;
        },

        zip: function(...arr) {
            let count = 0;
            let resultArr = [];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].length > count) {
                    count = arr[i].length;
                }
            }

            for (let i = 0; i < count; i++) {
                resultArr[i] = [];

                for (let k = 0; k < arr.length; k++) {
                    resultArr[i][resultArr[i].length] = arr[k][i];
                }
            }

            return resultArr;
        },

        merge: function(object, other) {
            if (typeof object !== 'object') {
                throw new Error('You entered not an object!');
            }

            for (key in other) {
                if (typeof object[key] !== 'object') {
                    object[key] = other[key];
                } else if (typeof other[key] === 'object') {
                    object[key] = merge(object[key], other[key]);
                }
            }

            return object;
        },

        omit: function(object, arr) {
            if (typeof object !== 'object') {
                throw new Error('You entered not an object!');
            }
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }

            const resultObjOmit = {};

            for (let key in object) {
                let count = 0;

                for (let i = 0; i < arr.length; i++) {
                    if (key === arr[i]) {
                        count++;
                    }
                }

                if (count === 0) {
                    resultObjOmit[key] = object[key];
                }
            }

            return resultObjOmit;
        },

        omitBy: function(object, func) {
            if (typeof object !== 'object') {
                throw new Error('You entered not an object!');
            }
            if (typeof func !== 'function') {
                throw new Error('You entered not a function!');
            }

            const resultObj = {};

            for (let key in object) {
                if (!func(object[key])) {
                    resultObj[key] = object[key];
                }
            }

            return resultObj;
        },

        pick: function(object, arr) {
            if (typeof object !== 'object') {
                throw new Error('You entered not an object!');
            }
            if (!(arr instanceof Array)) {
                throw new Error('You entered not an array!');
            }

            const resultObjPick = {};

            for (let key in object) {
                for (let i = 0; i < arr.length; i++) {
                    if (key === arr[i]) {
                        resultObjPick[key] = object[key];
                    }
                }
            }

            return resultObjPick;
        },

        pickBy: function(object, func) {
            if (typeof object !== 'object') {
                throw new Error('You entered not an object!');
            }
            if (typeof func !== 'function') {
                throw new Error('You entered not a function!');
            }

            const resultObjPickBy = {};

            for (let key in object) {
                if (func(object[key])) {
                    resultObjPickBy[key] = object[key];
                }
            }

            return resultObjPickBy;
        },

        toPairs: function(object) {
            if (typeof object !== 'object') {
                throw new Error('You entered not an object!');
            }

            const resultArr = [];
            let count = 0;

            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    resultArr[count] = [key, obj[key]];
                    count++;
                }
            }

            return resultArr;
        }
    };
})();
