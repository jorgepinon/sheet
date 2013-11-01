# Sheet

Sheet is a jquery plugin that displays a lightbox-style "modal" for inline content.

## Features

* Small: 2.8k uncompressed
* It's responsive, duh
* Accepts data attributes or href/title to define the sheet's content and title (plugin options can also set title)
* Uses aria-hidden, aria-labelledby, and role="alertdialog" for accessibility
* Click events bound to the document, using bubbling
* Can fire off sheets from within a sheet! (replaces current sheet content)
* onOpen and onClose callbacks
* as a rule, clicking outside of sheet dismisses the sheet (because clicking the little 'x' feels silly)

## What it doesn't do (intentionally):
* resize/reposition the sheet on window resize. Size and position is CSS-controlled.
* show multiple sheets at once. Sheets are created and destroyed.
* add any CSS styles except for the final top position (for animation)


## Recent updates

* rewritten completely to support multiple instances with separate options and callbacks
* support for autoplay of video
* can dismiss a sheet with javascript using $('.sheet').data('dismiss')()


##Todo
* browser testing (Chrome may have autoplayVideo problems, at least it does for me. Urg.)
