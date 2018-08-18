const articleTemplate = (function(elementFactory){
  let [ul, li, article, h1, figure, figcaption, div, p, a] = ["ul", "li", "article", "h1", "figure", "figcaption", "div", "p", "a"].map(elementFactory);
  return ({ articles })=> ul(
    articles.map(({ urlToImage, title, description, url })=> li(
        article([
          a(h1(title), { href: url, target: "_blank" }),
          p(description),
          figure([div("&nbsp;", { ["class"]:"image", style: `background-image:url(${urlToImage});` })])
        ])
    )).concat(div(["Powered by ", a("newsapi", { href: "https://newsapi.org" })]))
  );
})

((elementName)=> (content, params = {})=>
 [`<${[elementName, ...Object.keys(params).map((keyName)=>
 [keyName, `"${params[keyName]}"`].join('='))].filter(Boolean).join(' ')}${([...content].length ? "":"/")}>`,`${[...content].join('')}`, content && `</${elementName}>`].filter(Boolean).join('') );

fetch('https://newsapi.org/v2/everything?q=feminism+equality&from=2018-08-15&sortBy=popularity&apiKey=b4d4fbf7ac5d4d91be1372fb537785cf')
.then((res)=> res.json())
.then(articleTemplate)
.then((html)=> document.querySelector('#news').innerHTML = html);
