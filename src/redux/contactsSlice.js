import { createSlice, nanoid } from "@reduxjs/toolkit";

const contactsInitialState = {
    contacts: [],
    filter: ""
  };

const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitialState,
    reducers: {
        addContact: {
            reducer(state, action) {
                state.contacts.push(action.payload);
            },
            prepare(name, number) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        number,
                    }
                };
            }
        },
        deleteContact(state, action) {
            const index = state.contacts.findIndex(contact => contact.id === action.payload);
            state.contacts.splice(index, 1);
        },
        filterContact(state, action ){
            state.filter = action.payload
        }
    },
});

export const { addContact, deleteContact, filterContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer