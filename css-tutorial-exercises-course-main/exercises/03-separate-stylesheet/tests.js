const fs=require("fs");
const path=require("path");
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css=fs.readFileSync(path.resolve(__dirname, "./styles.css"), "utf8");
document.documentElement.innerHTML = html.toString();

jest.dontMock("fs");

describe("All the styles should be applied", ()=>{
  const link = document.querySelector("link");
  const body = document.querySelector("body");

  test("The <body> tag should not contain any inline style", ()=>{
    document.querySelector("head").innerHTML = `<style>${css.toString()}</style>`;
    let emptyBodyInlineStyle={};
    expect(body.style._values).toEqual(emptyBodyInlineStyle)
  });

  test("You should not change the existing <head> tag elements", ()=>{
    let head = document.querySelector('head')
    expect(head).toBeTruthy()
    
    let meta = head.querySelector("meta")
    expect(meta).toBe(null)
    
    let href = link.getAttribute("href")
    expect(href).toEqual('./styles.css')
  });
  
  test("Your <body> tag background color should be blue", ()=>{
    let styles = window.getComputedStyle(body)
    expect(styles["background-color"]).toBe("blue")
  })
});
