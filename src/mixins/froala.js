export default data = () => {
    return {
        config: {
            pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'embedly', 'emoticons', 'entities', 'file', 'fontAwesome', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageTUI', 'imageManager', 'inlineStyle', 'inlineClass', 'lineBreaker', 'lineHeight', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'table', 'url', 'video', 'wordPaste'],
    
            events: {
              initialized: function () {
                console.log('initialized')
              },
            "image.beforeUpload": function(files) {
            var editor = this;
            if (files.length) {
                // Create a File Reader.
                var reader = new FileReader();
                // Set the reader to insert images when they are loaded.
                reader.onload = function(e) {
                var result = e.target.result;
                editor.image.insert(result, null, null, editor.image.get());
                };
                // Read image as base64.
                reader.readAsDataURL(files[0]);
            }
            editor.popups.hideAll();
            // Stop default upload chain.
            return false;
            }
                }
          },
    }
}