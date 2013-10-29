# Sheet

Sheet is a jquery plugin that displays a lightbox-style modal for inline content.

## Features

* Small: 2.8k uncompressed
* Uses aria-hidden, aria-labelledby, and role="alertdialog" for accessibility
* Uses CSS transitions for animation (included CSS file is just a base, meant to be built up).
* It's responsive, duh
* Uses data attributes to define modal content and headline (js contains no content)
* Binds a single click event (to the document), using natural bubbling to handle target
* Can load sheets from within a sheet (replaces current sheet content). Good for progressive content, like a step-by-step "how to" wizard.
* onOpen and onClose callbacks
* clicking outside of sheet dismisses the sheet (as a rule)

## What it doesn't do (intentionally):
* resize/reposition the sheet on window resize
* show multiple sheets at once. Sheets are created and destroyed.
* add any CSS styles except for the final top position (for animation)


## Recent updates

* rewritten completely to support multiple instances and callbacks (onOpen and onClose)
* support for autoplay of video
 
##Todo

* browser testing (Chrome may have autoplayVideo problems, at least it does for me. Urg.)
