
import store from './store/store';
import { addNote, removeNote } from './actions/actions';

// use store.getState() to get the app state from the store.

console.log('Before: ', store.getState());
store.dispatch(addNote('One', 'One content'));
store.dispatch(addNote('Two', 'two content'));
store.dispatch(addNote('Three', 'three content'));
console.log('After: ', store.getState());


// ------ HTML references ------
let notesUList = document.getElementById('notes');
let addNoteForm = document.getElementById('add-note');
let addNoteTitle = addNoteForm['title'];
let addNoteContent = addNoteForm['content'];



// ------ Redux ------
function deleteNote(index) {
    store.dispatch(removeNote(index));
}


function renderNotes() {
    let notes = store.getState().notes;

    notesUList.innerHTML = '';

    notes.map((note, index) => {
        let noteItem = `
            <li>
                <b>${ note.title }</b>
                <button data-id="${ index }">x</button>
                <br />
                <span> ${ note.content }</span>
            </li>
        `;
        notesUList.innerHTML += noteItem;
    })

    setDeleteNoteButtonsEventListeners();
}

// note this still runs, it just gives us the opportunity to unsubcribe later if needed
const unsubcribe = store.subscribe(() => {
    renderNotes();
})

// unsubcribe(); // <-- the store returns a function, therefore we can unsubcribe if needed by calling this



// ------ Event Listeners ------
addNoteForm.addEventListener('submit', e => {

    e.preventDefault();

    let title = addNoteTitle.value;
    let content = addNoteContent.value;

    store.dispatch(addNote(title, content));

    // console.log('Title:', addNoteTitle.value, 'Content:', addNoteContent.value);
})

function setDeleteNoteButtonsEventListeners() {
    let buttons = document.querySelectorAll('ul#notes li button');
    
    for (let btn of buttons) {
        btn.addEventListener('click', () => {
            deleteNote(btn.dataset.id);
        })

    }
}





// ------ Render the initial Notes ------
renderNotes();