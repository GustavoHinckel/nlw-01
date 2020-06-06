import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload, FiUploadCloud } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUpload: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
  const [selectedFileUrl, setSelectedUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
   const file = acceptedFiles[0];

   const fileUrl = URL.createObjectURL(file);

   setSelectedUrl(fileUrl);
   onFileUpload(file);
  }, [onFileUpload])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept= 'image/*' />

      {
        isDragActive ?
          <p>
            <FiUploadCloud />
            Solte a imagem aqui!!!
          </p> 
          : (
             selectedFileUrl 
              ? <img src={selectedFileUrl} alt="Point thumbnail" />
              : (
                <p>
                  <FiUpload />
                  Imagem do Estabelecimento
                </p>
              )
          )
      }
    </div>
  )
}

export default Dropzone;