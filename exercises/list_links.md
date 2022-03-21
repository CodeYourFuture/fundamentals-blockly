## Lists of links
 

In this exercise, we're going to consolidate our knowledge of the blocks we've learnt so far.


Start with an empty unordered html list in the static html:

```html
<ul id="list">
</ul>
```

Now we can **dynamically** add your favourite links to the html list.

> 🔑 **Dynamically** means **html elements can be updated by our blocks program**, in this context.

> The word **static**, in contrast with **dynamic**, means **html elements are not updated by our blocks program**. The only way we can update the rendered HTML is to update the source HTML code itself.


1. Find the URLs of your three favourite websites. (Here's an example of a url you might like: ```html http://www.codeyourfuture.io``` 😊)
2. Use the blocks we have seen so far (`at the start`, `find the element with id`, `create a new ... element`, `set the attribute`, `set the text content`, and the Values blocks)


### Hints

- You will need to create an <code>&lt;a&gt;</code> inside of each <code>&lt;li&gt;</code></li>
- Remember that to set the target of an `<a>` elememt you can use the `href` attribute. Without this attribute, your link won't be styled like a link.
- How could you break your solution down into small chunks that you can test at each stage by clicking `run` ? The fewer code blocks you add before clicking `run` the easier it is to work out what your code will do. 

<span class="test-checkbox"></span>Click `run` to check the output looks something like


<ul style="background-color: azure;">
  <li><a href="http://www.codeyourfuture.io">Code your future</a></li> 
  <li><a href="http://www.google.com">Google</a></li>
  <li><a href="http://news.bbc.co.uk">BBC News</a></li>
</ul>


