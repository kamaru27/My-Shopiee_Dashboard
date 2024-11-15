// ** React Imports
import toast from 'react-hot-toast'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { storageUrl } from '@/utils/baseUrl'
import Image from 'next/image'

type Props = {
  file?: any
  setFile: (file: any) => void
  error: any
}

const FileUploaderSingle = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: acceptedFiles => {
      const selectedFile = acceptedFiles[0]

      props.setFile(Object.assign(selectedFile))
    },
    onDropRejected: () => {
      toast.error('You can only upload files of type .png, .jpeg, .jpg')
      toast.error("You can't upload files of greater than 2mb")
    }
  })

  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      style={{ ...(props.error ? { border: '2px dashed red' } : {}), ...(props.file ? { height: 450 } : {}) }}
    >
      <input {...getInputProps()} />
      {props.file ? (
        typeof props.file === 'string' ? (
          <Image
            key={props.file}
            alt={props.file}
            className='single-file-image'
            src={storageUrl + props.file.replaceAll('\\', '/')}
          />
        ) : (
          <Image
            key={props.file?.name || ''}
            alt={props.file?.name || ''}
            className='single-file-image'
            src={URL.createObjectURL(props.file)}
          />
        )
      ) : (
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h5' sx={{ mb: 2.5 }}>
            Drop files here or click to upload.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default FileUploaderSingle