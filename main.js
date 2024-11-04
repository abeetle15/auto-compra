const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const loading = document.getElementById("loading");
const message = document.getElementById("message");

// Prevent default drag behaviors
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Highlight drop zone when dragging over it
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropZone.classList.add("dragover");
}

function unhighlight(e) {
  dropZone.classList.remove("dragover");
}

// Handle dropped files
dropZone.addEventListener("drop", handleDrop, false);
fileInput.addEventListener("change", handleFiles, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles({ target: { files } });
}

function handleFiles(e) {
  const file = e.target.files[0];
  if (!file) return;

  const validTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (!validTypes.includes(file.type)) {
    showMessage("Please upload only Excel files (.xls or .xlsx)", "error");
    return;
  }

  uploadFile(file);
}

async function uploadFile(file) {
  loading.classList.add("active");
  message.className = "message";

  const formData = new FormData();
  formData.append("file", file);

  try {
    // Replace with your n8n webhook URL
    const response = await fetch(
      "https://flows.canvasia.co/webhook/file-input-choclas",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      showMessage("El archivo fue subido exitosamente", "Éxito");
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    showMessage(
      "El archivo no fue subido con éxtito. Refresque la página e intente de nuevo",
      "error"
    );
  } finally {
    loading.classList.remove("active");
  }
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}
