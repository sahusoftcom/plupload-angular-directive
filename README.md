# [Angular plupload directive](http://sahusoftcom.github.io/plupload-angular-directive)

[![Bower version](https://badge.fury.io/bo/plupload-angular-directive.svg)](http://badge.fury.io/bo/plupload-angular-directive)

> Demo and Documentation @ http://sahusoftcom.github.io/plupload-angular-directive

The Demo and Documentation page will give you a fair idea on how to use it.

Quick example
-------------

```
<button pl-upload pl-progress-model="percent" pl-auto-upload="true" pl-files-model="files">Upload Files</button>
```

Installation
------------
```
$ bower install plupload-angular-directive
```


Roadmap
--------
1. - DONE - Implement a variable $response in onFileUploaded event, so you can write

   ```
   on-file-uploaded="action($response)"
   ```

2. - DONE - Add a config service provider for global configurations like path for SWF and SilverLight files
3. - DONE - Implement as a bower component.

Upcoming
--------
1. Provide chunk_size and other missing features
2. Fix the Issue: HTML4 support in plUpload is provided using a hidden upload form element and plUpload appends that to the body which is absolutely positioned. It remains in the DOM till the life cycle of the Angular app and may lead to a clickable area which is not visible.
3. Check Drag & Drop issues and add to the documentation.
