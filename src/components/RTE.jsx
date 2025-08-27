import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "", rules }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      
      <Controller
        name={name || "content"}
        control={control}
        rules={rules}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <div>
            <style>
              {`
                .tox .tox-edit-area__iframe {
                  direction: ltr !important;
                  text-align: left !important;
                }
                .tox-tinymce {
                  direction: ltr !important;
                }
                .mce-content-body {
                  direction: ltr !important;
                  text-align: left !important;
                  unicode-bidi: normal !important;
                }
                .mce-content-body p, .mce-content-body div, .mce-content-body span {
                  direction: ltr !important;
                  text-align: left !important;
                  unicode-bidi: normal !important;
                }
              `}
            </style>
            <Editor
              initialValue={defaultValue}
              apiKey='ni0co7uw233qsirfzv88mvobi8srnmi0m9r1mmzo984c1pb3'
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                directionality: 'ltr',
                language: 'en',
                forced_root_block: 'p',
                force_p_newlines: true,
                force_br_newlines: false,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", 
                  "preview", "anchor", "searchreplace", "visualblocks", "code", 
                  "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
                ],
                toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | code | help",
                content_style: `
                  body { 
                    font-family: Helvetica, Arial, sans-serif !important; 
                    font-size: 14px !important; 
                    line-height: 1.6 !important;
                    direction: ltr !important;
                    text-align: left !important;
                    unicode-bidi: normal !important;
                  }
                  * {
                    direction: ltr !important;
                    text-align: left !important;
                    unicode-bidi: normal !important;
                  }
                  p, div, span, h1, h2, h3, h4, h5, h6 {
                    direction: ltr !important;
                    text-align: left !important;
                    unicode-bidi: normal !important;
                  }
                `,
                setup: (editor) => {
                  editor.on('init', () => {
                    const body = editor.getBody();
                    if (body) {
                      body.style.direction = 'ltr';
                      body.style.textAlign = 'left';
                      body.style.unicodeBidi = 'normal';
                      body.setAttribute('dir', 'ltr');
                    }
                    
                    const iframe = editor.getContentAreaContainer().querySelector('iframe');
                    if (iframe) {
                      iframe.style.direction = 'ltr';
                    }
                  });
                  
                  editor.on('NodeChange', () => {
                    const body = editor.getBody();
                    if (body) {
                      body.style.direction = 'ltr';
                      body.style.textAlign = 'left';
                    }
                  });
                  
                  editor.on('KeyDown', (e) => {
                    setTimeout(() => {
                      const body = editor.getBody();
                      if (body) {
                        body.style.direction = 'ltr';
                        body.style.textAlign = 'left';
                      }
                    }, 0);
                  });
                },
                branding: false,
                promotion: false,
                resize: true,
                elementpath: false,
                statusbar: true,
                convert_urls: false,
                remove_script_host: false,
                relative_urls: false,
              }}
              onEditorChange={onChange}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
    </div>
  );
}