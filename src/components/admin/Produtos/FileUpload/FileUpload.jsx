// components/admin/Produtos/FileUpload/FileUpload.jsx
import { useState } from 'react';

export default function FileUpload({ 
  onFileChange, 
  maxSize = 5, 
  acceptedTypes = "image/*",
  label = "Arquivo",
  helperText = ""
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`O tamanho máximo do arquivo é ${maxSize}MB`);
      return;
    }
    setSelectedFile(file);
    onFileChange(file);
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
        {helperText && <span className="label-text-alt">{helperText}</span>}
      </label>
      
      <div
        className={`border-2 border-dashed rounded-box p-6 text-center cursor-pointer transition-colors ${
          dragOver 
            ? 'border-primary bg-primary/10' 
            : 'border-base-300 hover:border-base-content/30'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept={acceptedTypes}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-base-content/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <p className="text-base-content/70 mb-2">
            {selectedFile ? selectedFile.name : 'Clique para selecionar ou arraste um arquivo'}
          </p>
          
          {selectedFile && (
            <span className="text-sm text-base-content/50">
              Tamanho: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          )}
        </div>
      </div>
    </div>
  );
}