const noteForm = document.getElementById("noteForm");

const noteInput = document.getElementById("noteInput");

const notesContainer = document.getElementById("notesContainer");

const message = document.getElementById("message");


// ==========================================
// GET NOTES FROM BACKEND
// ==========================================

async function loadNotes() {

    try {

        const response = await fetch("/notes");

        if (!response.ok) {

            throw new Error("Failed to load notes");

        }

        const notes = await response.json();

        displayNotes(notes);

    } catch (error) {

        console.error(error);

        message.textContent = "Could not load notes.";

    }
}


// ==========================================
// DISPLAY NOTES
// ==========================================

function displayNotes(notes) {

    notesContainer.innerHTML = "";

    if (notes.length === 0) {

        notesContainer.innerHTML = `
            <p class="empty-message">
                No notes yet. Add your first note!
            </p>
        `;

        return;
    }

    notes.forEach(note => {

        const noteElement = document.createElement("div");

        noteElement.className = "note";


        const textElement = document.createElement("span");

        textElement.className = "note-text";

        textElement.textContent = note.text;


        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener(
            "click",
            () => deleteNote(note.id)
        );


        noteElement.appendChild(textElement);

        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);

    });
}


// ==========================================
// CREATE NOTE
// ==========================================

noteForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const text = noteInput.value.trim();

    if (!text) {

        return;
    }

    try {

        const response = await fetch("/notes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });


        if (!response.ok) {

            throw new Error("Failed to create note");

        }


        noteInput.value = "";

        message.textContent = "";

        await loadNotes();

    } catch (error) {

        console.error(error);

        message.textContent = "Could not create note.";

    }

});


// ==========================================
// DELETE NOTE
// ==========================================

async function deleteNote(id) {

    try {

        const response = await fetch(`/notes/${id}`, {

            method: "DELETE"

        });


        if (!response.ok) {

            throw new Error("Failed to delete note");

        }


        await loadNotes();

    } catch (error) {

        console.error(error);

        message.textContent = "Could not delete note.";

    }

}


// ==========================================
// LOAD NOTES WHEN PAGE OPENS
// ==========================================

loadNotes();