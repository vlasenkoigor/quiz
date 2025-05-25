// import ReactQuill, { Range } from 'react-quill';
import { useEffect, useRef, useState } from 'react';
import  Dialog  from '@mui/material/Dialog';
import Gallery from './gallery/Gallery';
import { usePickGallery } from '../hooks/use-pick-gallery';

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],

    handlers: {
      image: () => {
        console.log('image clicked');
      },
    },
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
];

type EditorProps = {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
};

export const Edit: React.FC<EditorProps> = (props) => {
  // const [selection, setSelection] = useState<Range>(null);

  const { promptGallery, galleryProps } = usePickGallery();

  const [showGallery, setShowGallery] = useState(false);

  const quillRef = useRef(null);

  // modules.toolbar.handlers.image = async function () {
  //   console.log(this);
  //   setShowGallery(true);
  //
  //   const files = await promptGallery();
  //
  //   setShowGallery(false);
  //
  //   if (!files) return;
  //
  //   files.forEach((file) => {
  //     // @ts-ignore
  //     this.quill.insertEmbed(this.quill.getSelection().index, 'image', file);
  //   });
  // };

  // useEffect(() => {
  //   console.log('selection', selection);
  // }, [selection]);

  return (
    <>
      {showGallery && (
        <Dialog fullWidth={true} maxWidth={'md'} onClose={() => setShowGallery(false)} open={showGallery}>
          <Gallery {...galleryProps} />
        </Dialog>
      )}

      <div>need to replace React Quill editor</div>
      {/*<ReactQuill*/}
      {/*  readOnly={!!props.disabled}*/}
      {/*  theme="snow"*/}
      {/*  ref={quillRef}*/}
      {/*  value={props.value}*/}
      {/*  onChange={props.setValue}*/}
      {/*  onChangeSelection={setSelection}*/}
      {/*  modules={modules}*/}
      {/*  formats={formats}*/}
      {/*/>*/}
    </>
  );
};
