import {
    ADD_ENTRY,
    LOAD_ENTRIES,
    CLEAR_LIST,
    SELECT_ENTRY,
    DELETE_ENTRY,
    // UPDATING
} from './types'
import { AsyncStorage } from 'react-native';

//A little overkill but, who knows...
const generateKey = () => {
    return Date.now().toString()
}

export const addEntry = (item) => {

    return (dispatch) => {
        AsyncStorage.getAllKeys().then((keys) => {
            if (keys != null) {
                item.id = generateKey()
                AsyncStorage.setItem(item.id, JSON.stringify(item)).then(() => {
                    dispatch({ type: ADD_ENTRY, payload: item });
                });

            }
        });
    };
}

// export const startUpdating = () => {
//     return({ type:UPDATING, payload: true})
// }

export const addRandomEntry = () => {

    return (dispatch) => {

        AsyncStorage.getAllKeys().then((keys) => {

            randomKey = Math.floor(Math.random() * keys.length);

            AsyncStorage.getItem(keys[randomKey]).then((randomItem) => {
                const newItem = JSON.parse(randomItem)
                newItem.id = generateKey()
                AsyncStorage.setItem(newItem.id, JSON.stringify(newItem)).then((item) => {
                    dispatch({ type: ADD_ENTRY, payload: item });
                });
            })
        });

    };

};

export const deleteEntry = (id, navigation) => {
    return (dispatch) => {
        AsyncStorage.removeItem(id.toString()).then((item) => {
            dispatch({ type: DELETE_ENTRY, payload: id })
            navigation.goBack()
        })
    }
};

export const loadEntries = () => {

    return (dispatch) => {
        AsyncStorage.getAllKeys().then((keys) => {
            AsyncStorage.multiGet(keys)
                .then((stores) => {

                    //Map the entry's position in the array into itself
                    const newArray = stores.map((results, i, store) => {
                        data = JSON.parse(store[i][1]);
                        data.index = i;
                        return data
                    });

                    dispatch({ type: LOAD_ENTRIES, payload: newArray.length > 0 ? newArray : [] });
                }).catch((error)=>{
                    console.log("error: ", error)
                });
        });
    }
};

export const selectEntry = (id, navigation) => {
    return (dispatch) => {
        AsyncStorage.getItem(id.toString()).then((item) => {
            parsedEntry = JSON.parse(item)
            parsedEntry.id = id
            dispatch({ type: SELECT_ENTRY, payload: parsedEntry })
            navigation.navigate('Details')
        })
    }
}

export const clearList = () => {
    return (dispatch) => {
        AsyncStorage.clear((error) => {
            console.log(error)
        }).then(() => {
            dispatch({ type: CLEAR_LIST, payload: "complete" });
        });
    }
};