document.addEventListener('DOMContentLoaded', () => {
    const folderList = document.getElementById('folder-list');
    const noteTextarea = document.getElementById('note-textarea');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const addFolderBtn = document.getElementById('add-folder-btn');
    const currentFolderTitle = document.getElementById('current-folder-title');

    let currentFolderId = null;
    let sharkData = JSON.parse(localStorage.getItem('sharkData')) || {
        'Great White': 'Notes about the Great White Shark...',
        'Hammerhead': 'Notes about the Hammerhead Shark...'
    };

    function renderFolders() {
        folderList.innerHTML = '';
        Object.keys(sharkData).forEach(folderName => {
            const li = document.createElement('li');
            li.className = 'folder-item';
            li.textContent = folderName;
            li.dataset.folderName = folderName;
            
            if (folderName === currentFolderId) {
                li.classList.add('active');
            }

            li.addEventListener('click', () => selectFolder(folderName));
            folderList.appendChild(li);
        });
    }

    function selectFolder(folderName) {
        currentFolderId = folderName;
        currentFolderTitle.textContent = folderName;
        noteTextarea.value = sharkData[folderName] || '';
        renderFolders(); // Re-render to update active status
    }

    function saveNote() {
        if (currentFolderId) {
            sharkData[currentFolderId] = noteTextarea.value;
            localStorage.setItem('sharkData', JSON.stringify(sharkData));
            alert('Note saved to local storage!');
        } else {
            alert('Please select a shark species first.');
        }
    }

    function addFolder() {
        const folderName = prompt("Enter the name of the new shark species/folder:");
        if (folderName && !sharkData[folderName]) {
            sharkData[folderName] = '';
            renderFolders();
            selectFolder(folderName);
        } else if (folderName) {
            alert("Folder already exists!");
        }
    }

    saveNoteBtn.addEventListener('click', saveNote);
    addFolderBtn.addEventListener('click', addFolder);

    // Initialize with the first folder if it exists
    if (Object.keys(sharkData).length > 0) {
        selectFolder(Object.keys(sharkData)[0]);
    } else {
        currentFolderTitle.textContent = "Add your first shark species!";
    }
});
