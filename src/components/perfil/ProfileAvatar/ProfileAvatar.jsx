'use client'

import Image from 'next/image'
import { useState } from 'react'

export function ProfileAvatar({ 
  src, 
  size = 120,  
  onFileChange, 
  onUpload, 
  selectedFile 
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {src ? (
          <>
            <Image
              src={src}
              alt="Foto de perfil"
              width={size * 2}  // Carrega em resolução maior
              height={size * 2}
              quality={95}      // Qualidade máxima (1-100)
              priority={true}   // Prioriza carregamento
              className={`rounded-full object-cover border-4 border-primary transition-all duration-300 ${
                isHovered ? 'ring-4 ring-primary/30' : ''
              }`}
              style={{ 
                width: size, 
                height: size,
                filter: isHovered ? 'brightness(0.95)' : 'none'
              }}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/default-avatar.png'
              }}
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center transition-opacity duration-300">
              </div>
            )}
          </>
        ) : (
          <div 
            className={`rounded-full bg-gradient-to-br from-base-300 to-base-200 flex items-center justify-center text-4xl transition-all ${
              isHovered ? 'ring-4 ring-primary/30' : ''
            }`}
            style={{ width: size, height: size }}
          >
            👤
          </div>
        )}
      </div>

      {/* Controles de upload - só aparece em hover ou quando há arquivo selecionado */}
      <div className={`flex flex-col items-center gap-2 transition-all `}>
        <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-primary/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Selecionar foto</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && onFileChange(e.target.files[0])}
            className="hidden"
          />
        </label>
        
        {selectedFile && (
          <div className="flex flex-col items-center gap-2 w-full">
            <span className="text-sm text-center text-gray-500 truncate max-w-xs">
              {selectedFile.name}
            </span>
            <button
              onClick={onUpload}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors flex items-center gap-2 w-full justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Enviar imagem
            </button>
          </div>
        )}
      </div>

      {/* Estilos CSS customizados */}
      <style jsx>{`
        .avatar-overlay {
          background: rgba(0, 0, 0, 0.3);
          transition: opacity 0.3s ease;
        }
        .avatar-container:hover .avatar-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}