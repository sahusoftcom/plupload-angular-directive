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


# Don't be a Dick Public License

> Version 1, September 2014

> Copyright (C) 2014 Kumar Sanket
 
 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

> DON'T BE A DICK PUBLIC LICENSE
> TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 1. Do whatever you like with the original work, just don't be a dick.

     Being a dick includes - but is not limited to - the following instances:

	 1a. Outright copyright infringement - Don't just copy this and change the name.  
	 1b. Selling the unmodified original with no work done what-so-ever, that's REALLY being a dick.  
	 1c. Modifying the original work to contain hidden harmful content. That would make you a PROPER dick.  

 2. If you become rich through modifications, related works/services, or supporting the original work,
 share the love. Only a dick would make loads off this work and not buy the original work's 
 creator(s) a pint.
 
 3. Code is provided with no warranty. Using somebody else's code and bitching when it goes wrong makes 
 you a DONKEY dick. Fix the problem yourself. A non-dick would submit the fix back.
