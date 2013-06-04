# Sheet

Sheet is a jquery plugin that displays a lightbox-style modal for inline content.

## Features

* Small: 2.3k uncompressed (Google Closure brings it down to 1.14KB and 563 bytes gzipped)
* Uses aria-hidden, aria-labelledby, and role="alertdialog" for accessibility
* Uses CSS transitions for animation (included CSS file is just a base, meant to be built up).
* It's responsive, duh
* Uses data attributes to define modal content and headline (js contains no content)
* Binds a single click event (to the document), using natural bubbling to handle target
* Can load sheets from within a sheet (replaces current sheet content). Good for progressive content, like a step-by-step "how to" wizard.
* onOpen and onClose callbacks
* clicking outside of sheet dismisses the sheet (as a rule)
 
##Todo

* browser testing
