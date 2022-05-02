# 프리캠프
> 1주일동안 진행되는 사전교육

## Day 1
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
    * <b> Tag의 특징 </b>
        * Block
            * `div, h1, hr, p, ...`
        * Inline
            * `span, input, img, a, ...`
    * <b> 종속 태그 </b>
        * 혼자서는 아무것도 못하는 Tag들
        * `select, ol, ul, table, ...`
    * <b> HTML 문서구조 </b>

<style>
    th, td { border: 1px solid; }
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
> Cascading Style Sheets
* <b>Cascading</b> : 위에서 아래로 흐르는, 상속 또는 종속하는
* HTML의 색, 크기, 정렬 등을 변경하여 꾸며주는 언어
* <b>사용방법</b>
    1. html 태그 속성에 입력 - <b>Inline</b>
        * `<div style=""></div>`
    2. `<style>` 태그에 입력 - <b>Tag</b>
        * `<style> 선택자 { 속성: 값; } </style>`
    3. CSS 파일을 불러오기   - <b>Link</b>
        * `<link href="./file-name.css" rel="stylesheet"/>`
* <b>선택자</b>
    * <b>전체 </b> 선택자 : `* {}`
    * <b>태그 </b> 선택자 : `div {}`
    * <b>class</b> 선택자 : `.container {}`
    * <b>id   </b> 선택자 : `#userInfo {}`
```
선택자 {
    속성: 값;
    속성: 값;
    ...
}
```
<b>display: flex</b>

![](../pictures/flex-direction.png)
| flex-direction | justify-content | align-items |
| -------------- | --------------- | ----------- |
| row            | 가로            | 세로        |
| column         | 세로            | 가로        |

### HOMEWORK
1. 회원가입 css
    * HTML, CSS, 스크린샷 업로드
2. HTML, css 연습문제
3. 1일차 Self Check 완료 ( google team )
4. 싸이월드 왼쪽 UI 완성
    * HTML, CSS, 스크린샷 업로드
5. 1, 4번 구글 클래스룸에 업로드
    * https://classroom.google.com/w/NTA5NzYxMTkwMDY2/t/all