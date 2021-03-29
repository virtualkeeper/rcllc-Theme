# dreamerstexas.com
Stencil theme with changed files notations and general theme development. Uses Stencil, Node v12, and the Roots BigCommerce theme.

Version of Dreamers theme is in title, version of Roots that has been merged is in version number of theme.



# Changed files:
config.json - Update the version number and add additional settings below line 450.
manifest.json - Add regions for category page.
assets/scss/roots/mods.scss - Extra CSS at bottom of file
assets/js/theme/global.js - Commented out lines 60 - 69
templates/components/common/footer.html - Footer customizations i.e. badge, policies
templates/pages/custom/ - Entire folder containing different custom pages, category pages, etc.


//TO DO //
assets/js/theme/custom/dreamers.js - Pull in custom footer and functions



# Roots Theme

Up to date with Roots 3.0.7

Theme Manual: https://themesupport.weizenyoung.com/help/roots-theme-manual



## Install

https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil

```
npm install
stencil init
stencil start
```
