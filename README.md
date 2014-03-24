Angular plupload directive
--------------------------
> Demo and Documentation @ http://plupload-angular-directive.sahusoft.info/

The Demo and Documentation page will give you a fair idea on how to use it.

Quick example
-------------

```
<button pl-upload pl-progress-model="percent" pl-auto-upload="true" pl-files-model="files">Upload Files</button>
```



Upcoming
--------
1. Implement a variable $response in onFileUploaded event, so you can write

   ```
   on-file-uploaded="action($response)"
   ```

2. Add a config service provider for global configurations like path for SWF and SilverLight files
3. Provide chunk_size and other missing features
4. Fix the Issue: HTML4 support in plUpload is provided using a hidden upload form element and plUpload appends that to the body which is absolutely positioned. It remains in the DOM till the life cycle of the Angular app and may lead to a clickable area which is not visible.
5. Check Drag & Drop issues and add to the documentation.
6. Implement as a bower component.
