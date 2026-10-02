const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

const notesFile = path.join(__dirname, "data", "notes.json");


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


// ==========================================
// HOME PAGE
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/test", (req, res) => {

    res.send("Quick Notes server is working!");

});


// ==========================================
// GET ALL NOTES
// ==========================================

app.get("/notes", (req, res) => {

    console.log("GET /notes received");

    fs.readFile(notesFile, "utf8", (error, data) => {

        if (error) {

            console.error("Error reading notes.json:");
            console.error(error);

            return res.status(500).json({
                error: "Could not read notes.json"
            });

        }

        try {

            const notes = JSON.parse(data);

            res.json(notes);

        } catch (error) {

            console.error("Invalid JSON:");
            console.error(error);

            res.status(500).json({
                error: "notes.json contains invalid JSON"
            });

        }

    });

});


// ==========================================
// CREATE NEW NOTE
// ==========================================

app.post("/notes", (req, res) => {

    console.log("POST /notes received");

    const text = req.body.text;

    if (!text || text.trim() === "") {

        return res.status(400).json({
            error: "Note text is required"
        });

    }

    fs.readFile(notesFile, "utf8", (error, data) => {

        if (error) {

            return res.status(500).json({
                error: "Could not read notes.json"
            });

        }

        try {

            const notes = JSON.parse(data);

            const newNote = {
                id: Date.now(),
                text: text.trim()
            };

            notes.push(newNote);

            fs.writeFile(
                notesFile,
                JSON.stringify(notes, null, 2),
                "utf8",
                (error) => {

                    if (error) {

                        return res.status(500).json({
                            error: "Could not save note"
                        });

                    }

                    res.status(201).json(newNote);

                }
            );

        } catch (error) {

            res.status(500).json({
                error: "Invalid notes.json"
            });

        }

    });

});


// ==========================================
// DELETE NOTE
// ==========================================

app.delete("/notes/:id", (req, res) => {

    console.log("DELETE /notes/:id received");

    const noteId = Number(req.params.id);

    fs.readFile(notesFile, "utf8", (error, data) => {

        if (error) {

            return res.status(500).json({
                error: "Could not read notes.json"
            });

        }

        try {

            const notes = JSON.parse(data);

            const updatedNotes = notes.filter(
                note => note.id !== noteId
            );

            if (updatedNotes.length === notes.length) {

                return res.status(404).json({
                    error: "Note not found"
                });

            }

            fs.writeFile(
                notesFile,
                JSON.stringify(updatedNotes, null, 2),
                "utf8",
                (error) => {

                    if (error) {

                        return res.status(500).json({
                            error: "Could not delete note"
                        });

                    }

                    res.json({
                        message: "Note deleted successfully"
                    });

                }
            );

        } catch (error) {

            res.status(500).json({
                error: "Invalid notes.json"
            });

        }

    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log("       QUICK NOTE APPLICATION");
    console.log("======================================");
    console.log(`Server running on port ${PORT}`);
    console.log("======================================");
    console.log("");

});