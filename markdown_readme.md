/* markdown_notes.md */

*Notes on github-flavored markdown*

--based on https://help.github.com/articles/basic-writing-and-formatting-syntax/
# Heading  
## Second Heading
### Third Heading
As you are writing text, you can add markdown, so if you want **bold** on some text, or *italic*, or ~~strikethrough~~, and to put code into a sentence, like `var smurf = require('smurf');`, you can backtick it. But for a code block, you want triple backticks, so something like:
```
var smurf = require('smurf');
var smurfObject = new smurf();
console.log(smurfObject.joyfulnoise());
```
then the normal text can continue below. To create an inline link, but the linked text in brackets and the link in parentheses, like [https://about.me/craigfisk](https://about.me/craigfisk) for example. (But note that Github automatically creates links when URLs are written in a comment.)

To create lists, you just put a dash or star before text, so like:
- this
- that
- the other thing
* and something with a star, too

And for a nested list, just indent 2 spaces:
- first item
  - second item
    - third item
- regular thing

@octocat :+1: super duper!
Type ":" for a list of emoji, list filters as you type, press tab or enter to complete.

More info:

- ["About writing and formatting on GitHub"]("https://help.github.com/articles/about-writing-and-formatting-on-github)
- ["Working with advanced formatting"](https://help.github.com/articles/working-with-advanced-formatting)
- ["Mastering Markdown"](https://guides.github.com/features/mastering-markdown/)
- ["Markdown Tutorial"](http://markdowntutorial.com/)
