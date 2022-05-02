# 프리캠프
> 1주일동안 진행되는 사전교육

## OT
#### 개발자의 자세
* 인내심 - Patience
* 검색능력 - Google Fu
* 열정 - Fassion

## Day 1
### 폴더 구조
| FOLDER        | DESCRIPTION      |
| :------------ | :--------------- |
| class         | 수업 실습 / 연습 |
| cyworld       | 과제             |
| cyworld-mento | 리뷰             |

### HTML
> Hyper Text Markup Language
* 태그 `<tag>`
    * 기능을 가진 약속된 명령어
    * html, head, body, div, h1, p, span, ...
* 속성, 값 `type, placeholder`
    * `<input type="text">` <br><input type="text">
    * `<input type="text" placeholder="이름을 입력해주세요">` <br><input type="text" placeholder="이름을 입력해주세요">
    * `<input type="password>` <br><input type="password">
    * `<input type="checkbox">` <br><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox">
* 핵심
    * 태그의 특징
    * 종속 태그
    * HTML 문서구조
* <b> Tag의 특징 </b>
    * Block
        * `div, h1, hr, p, ...`
    * Inline
        * `span, input, img, a, ...`
* <b> 종속 태그 </b>
    * 혼자서는 아무것도 못하는 Tag들
    * exp) `select, ol, ul, table, ...`
* <b> HTML 문서구조 </b>

<style>
    td { border: 1px solid; }
    table { text-align: center; }
</style>
<table>
<tr><td colspan=2>HEADER</td></tr>
<tr><td colspan=2>NAV</td></tr>
<tr>
    <td> SECTION </td>
    <td rowspan=2> ASIDE </td>
</tr>
<tr> <td> ARTICLE </td> </tr>
<tr><td colspan=2>FOOTER</td></tr>
</table>

```
<!DOCTYPE HTML>
<html>
    <head>
        <title> html 제목 </title>
        <meta content="" charset="utf-8">
    </head>
    <body>
        <header>
            <nav></nav>
        </header>

        <section>
            본문
        </section>

        <footer>
            바닥
        </footer>
    </body>
</html>
```

### CSS

### JS
